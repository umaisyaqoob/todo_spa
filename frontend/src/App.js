import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/auth/Login' // Here LoginPage importing from default export, therefor i'm importing custom name
import SingupPage from './pages/auth/Singup' // Here LoginPage importing from default export, therefor i'm importing custom name
import { NotFound } from "./pages/errors/NotFound";
import Home from "./pages/dashboard/Home";
import Loader from "./components/loader/Loader";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import logo from './logo.svg';
import './App.css';
import {UserProvider} from "./context/userContext";

function App() {
  return (
    <Router>
        <Routes>
            {/* <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute> } /> */}
            <Route path="/" element={<UserProvider> <Home /> </UserProvider>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingupPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
