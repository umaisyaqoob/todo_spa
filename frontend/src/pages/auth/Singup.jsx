import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: "",
    });

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            general: "",
        });

        try {
            const url = `${apiUrl}/api/signup`;
            const payload = { username, email, password, confirmPassword };
            const config = { headers: { "Content-Type": "application/json" } };
            const response = await axios.post(url, payload, config);

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                const errorData = error.response.data;
                
                // Assuming backend returns errors in this format
                // { username: "Error message", email: "Error message", password: "Error message" }
                
                setErrors({
                    username: errorData.username || "",
                    email: errorData.email || "",
                    password: errorData.password || "",
                    confirmPassword: errorData.confirmPassword || "",
                    general: errorData.detail || "An error occurred. Please try again.",
                });
            } else {
                setErrors({ ...errors, general: "An error occurred. Please check your connection." });
            }
        }
    };

    return (
        <>
            <section className="main h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <form
                    className="login-form w-1/3 rounded-xl p-[25px] border border-gray-700 shadow-xl bg-gray-800 bg-opacity-90 backdrop-blur-lg"
                    onSubmit={handleSubmit}
                >
                    <h1 className="w-full text-center text-[30px] mb-3 text-white font-semibold tracking-wide">Signup</h1>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full rounded-lg h-10 p-3 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300 ${!errors.username && 'mb-5'}`}
                        placeholder="Username*"
                    />
                    {errors.username && (
                        <p className="text-red-400 text-sm mb-5 ms-1">{errors.username}</p>
                    )}

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-lg h-10 p-3 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300 ${!errors.email && 'mb-5'}`}
                        placeholder="Email*"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mb-5 ms-1">{errors.email}</p>
                    )}

                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full rounded-lg h-10 p-3 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300 ${!errors.password && 'mb-5'}`}
                        placeholder="Password*"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mb-5 ms-1">{errors.password}</p>
                    )}

                    <input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full rounded-lg h-10 p-3 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300 ${!errors.confirmPassword && 'mb-5'}`}
                        placeholder="Confirm Password*"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-400 text-sm mb-5 ms-1">{errors.confirmPassword}</p>
                    )}

                    {/* {errors.general && (
                        <p className="text-red-400 bg-red-900 bg-opacity-40 text-center py-2 rounded-lg border border-red-500 shadow-md">
                            {errors.general}
                        </p>
                    )} */}

                    <p
                        className="text-red-400 hover:text-red-500 transition text-sm underline mb-2 ms-1 cursor-pointer"
                        onClick={handleLoginClick}
                    >
                        Already have an account?
                    </p>

                    <input
                        type="submit"
                        value="Signup"
                        className="w-full rounded-lg h-10 p-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer font-semibold shadow-lg"
                    />
                </form>
            </section>
        </>
    );
}
