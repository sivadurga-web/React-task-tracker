import Header from "./components/Header";
import Tasks from "./components/Tasks";
import React  from "react";
import Task from "./components/Task";
import { useState,useEffect } from "react";
import AddTask from "./components/AddTask";
export const TaskContext = React.createContext();

function App() {
  // default tasks
  const [tasks,setTasks] = useState([]);
  const value = {tasks, setTasks};
  
  //Fetching task from backend
  useEffect(()=> {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])
  // Fetching tasks
  const fetchTasks = async() => {
    const res = await fetch('https://reactjs-task-tracker-app.herokuapp.com/tasks'); 
    // change the server address to your server in app.js, editTask.js, AddTask.js, task.js
    const data = await res.json();
    console.log(data);
    return data
  }

  // Add task expand or collapse button
  const [ShowAddTask,setShowAddTask] = useState(false);
  return (
    <div className="container" id='container'>
      <TaskContext.Provider value={value} >
      <Header onAdd={()=>setShowAddTask(!ShowAddTask)} isShowed={ShowAddTask}/>
      { ShowAddTask && <AddTask onAdd={()=>setShowAddTask(!ShowAddTask)} />}
      <Tasks />
      </TaskContext.Provider>
    </div>
  );
}
export default App;