import { useState,useContext } from "react"
import { TaskContext } from "../App";
const AddTask = ({onAdd}) => {
    const [name,setName] = useState('');
    const [time, setTime] = useState('');
    const [reminder,setReminder] = useState(false);
    const {tasks,setTasks} =  useContext(TaskContext);
    const AddTask = async (task) => {
        const res = await fetch('https://my-json-server.typicode.com/sivadurga-web/React-task-tracker/tasks',{
            method: 'POST',
            headers: {
                'Content-type' :'application/json',
            },
            body: JSON.stringify(task),
        })
        const data = await res.json();
        setTasks([...tasks,data])
        console.log(res);
    }
 const addToTask = (e) => {
        e.preventDefault();
        if(!name) {
            alert('Please add Task name')
            return;
        }
        const task = {
            name: name,
            time: time,
            reminder: reminder,
        }
        AddTask(task);
        setName('');
        setTime('');
        setReminder(false);
        onAdd();
    }
    return (
        
        <form onSubmit={addToTask} className='add-form'>
            <h4 >Create New Task</h4>
            <div className='form-control'>
                <label>Task - </label>
                <input type="text" placeholder='Add Task' value={name} onChange={e=> setName(e.target.value)}/>
            </div>
            <div className ='form-control'>
                <label>Day and Time - </label>
                <input type="text" placeholder='Add Day & Time' value={time} onChange={e=> setTime(e.target.value)}/>
            </div>
            <div className ='form-control-check'>
                <label>Set Reminder - </label>
                <input type="checkbox" checked={reminder} value={reminder} onChange={() => setReminder(!reminder)}/>
            </div>
            <button className='btn' style={{background : 'black'}}> Create Task</button>
        </form>
    )
}

export default AddTask
