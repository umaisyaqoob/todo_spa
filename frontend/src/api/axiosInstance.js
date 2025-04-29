import axios from "axios";

const apiUrl = import.meta.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("JWT_Access_Token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers = [];

// Response Interceptor (Handle 401 Error)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("JWT_Refresh_Token");
        const res = await axios.post(`${apiUrl}/api/refresh`, { refresh: refreshToken });

        const newAccessToken = res.data.access;
        localStorage.setItem("JWT_Access_Token", newAccessToken);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("JWT_Access_Token");
        localStorage.removeItem("JWT_Refresh_Token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
