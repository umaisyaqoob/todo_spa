import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { fetchTasks } from "../../store/slices/todoSlice";
import Loader from "../../components/loader/Loader";

const TodoApp = () => {
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {dispatch(fetchTasks());}, [dispatch]);


  // if (status === "failed") return <h2>Error: {error}</h2>;

  return (
    <>
      <Navbar/>
      {status === "loading" ? 
      <Loader/>
      :
      ( <>
    <div className="container pt-11vh">
       
      
      <h2>My Todo List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
        
    </div></>)}
    </>
  );
};

export default TodoApp
