import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const access_token = localStorage.getItem('JWT_Access_Token')
    
    if (!access_token) {
        return <Navigate to="/login" />
      }

    return children;
}