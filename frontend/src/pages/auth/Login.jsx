// create component using 
// 1- function declaration
// 2- default export
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const accessToken = localStorage.getItem("JWT_Access_Token");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    if (accessToken) {
        navigate('/')
    }

    const handleSingupClick = () => {
        navigate('/signup')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${apiUrl}/api/login`;
            const payload = { username, password };
            const config = { headers: { 'Content-Type': 'application/json' } };
            const response = await axios.post(url, payload, config);
            
            if (response.status === 200) {
                localStorage.setItem("JWT_Access_Token", response.data.access_token);
                localStorage.setItem("JWT_Refresh_Token", response.data.refresh_token);
                navigate("/");
            } else {
                setError("Invalid login credentials")
            }
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                setError(error.response.data.detail || "An error occurred. Please try again.");
            } else {
                setError("An error occurred. Please check your connection.");
            }
        }
    }

    return (
        <>
            <section className="main h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
                <form className="login-form w-1/3 rounded-xl p-[25px] border border-gray-700 shadow-xl bg-gray-800 bg-opacity-90 backdrop-blur-lg" onSubmit={handleSubmit}>
                    <h1 className="w-full text-center text-[30px] mb-3 text-white font-semibold tracking-wide">Login</h1>

                    <input
                        type="text" name="name" id="name" value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        className="w-full rounded-lg h-10 p-3 mb-5 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300"
                        placeholder="Username*"
                    />

                    <input type="password" name="password" id="password" value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="w-full rounded-lg h-10 p-3 mb-3 outline-none bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-400 transition duration-300"
                        placeholder="Password*"
                    />

                    {error && <p className="text-red-400 bg-red-900 bg-opacity-40 text-center py-2 rounded-lg border border-red-500 shadow-md">{error}</p>}

                    <p className="text-red-400 hover:text-red-500 transition text-sm underline mb-2 ms-1 cursor-pointer"
                        onClick={handleSingupClick}>Create an account
                    </p>

                    <input type="submit" value={'Login'} 
                        className="w-full rounded-lg h-10 p-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer font-semibold shadow-lg" 
                    />

                </form>
            </section>
        </>
    )
}

export default Login