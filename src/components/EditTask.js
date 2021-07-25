import { useState,useContext } from "react";
import { TaskContext } from "../App";
import {addToTask} from './AddTask'
const EditTask = ({task,updateShowEditTask}) => {
    const [name,setName] = useState(task.name);
    const [time, setTime] = useState(task.time);
    const [reminder,setReminder] = useState(task.reminder);
    const {tasks,setTasks} = useContext(TaskContext);
    const fetchTask = async (id) => {
        const res = await fetch(`https://reactjs-task-tracker-app.herokuapp.com/tasks/${id}`);
        const data = await res.json();
        return data
    }
    // Toggle task reminder 
    const update = async () => {  
        const id = task.id
        const taskToToggle = await fetchTask(id);
        const updTask = {...taskToToggle,name: name,time: time,reminder: reminder}
        const res = await fetch(`https://reactjs-task-tracker-app.herokuapp.com/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' :'application/json',
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks( tasks.map( Task=> {
            if(Task.id ===data.id) {
                return data;
            }
            return task
        }))
    }
    const updateTask = (e) => {
        e.preventDefault();
        if(!name) {
            alert('Please add Task name')
            return;
        }
        update();
        updateShowEditTask();
    }
    return (
        <form  className='add-form'>
            <h4 >Update Task</h4>
            <div className='form-control'>
                <label>Task - </label>
                <input type="text" placeholder='Add Task' value={name} onChange={e=> setName(e.target.value)}/>
            </div>
            <div className ='form-control'>
                <label>Day and Time - </label>
                <input type="text" placeholder='Add Day  &amp Time' value={time} onChange={e=> setTime(e.target.value)}/>
            </div>
            <div className ='form-control-check'>
                <label>Set Reminder - </label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={() => setReminder(!reminder)}/>
            </div>
            <button className='btn' style={{background : 'black'}} onClick={updateTask}>Update Task</button>
            <button className='btn' style={{background : 'red'}} onClick={updateShowEditTask}>Cancel</button>
        </form>
    )
}

export default EditTask
