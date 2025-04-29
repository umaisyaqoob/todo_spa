import "./Navbar.css"
import { MdTaskAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../store/slices/todoSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import UserContext from "../../context/userContext";

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, setuser } = useContext(UserContext);

  const handleLogedOut = () => {
    localStorage.removeItem("JWT_Access_Token")
    localStorage.removeItem("JWT_Refresh_Token")
    navigate('/login')
  }

  const handleCreateTasks = () => {
    dispatch(createTask())
  }

  return (
    <>
        <div className="navbar-main">
          <div className="navbar container">
          <div className=""style={{fontSize: '40px', color: 'white', display: 'flex'}}><MdTaskAlt/> {user}</div>
          <div className="">
            <ul>
              <li className="rounded-lg h-10 p-2 text-white bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out cursor-pointer" onClick={handleCreateTasks}>Create Task</li>
              <li className="rounded-lg h-10 p-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer" onClick={handleLogedOut}>Logout</li>
            </ul>
          </div>
          </div>
        </div>
    </>
  )
}

export default Navbar