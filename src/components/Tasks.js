import { useContext } from "react"
import Task from "./Task"
import { TaskContext } from "../App"
const Tasks = () => {
    // Listing all the created tasks
    const {tasks,setTasks} = useContext(TaskContext);
    const height = document.getElementsByClassName('container');
    console.log(height)
//     if(height[0].offset >400) {
//     const tasksStyle = {
//         overflow: 'auto'    
//     }
// }
    return (
        <div >
            {
                (tasks.length >0 ) ?
                tasks.map( task => <Task key={task.id} task={task}/>) :
                <p>No more tasks to show</p>
            }
        </div>
    )
}

export default Tasks
