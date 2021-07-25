import {FaTimes, FaEdit} from 'react-icons/fa'
import { useContext,useState } from 'react'
import { TaskContext } from '../App'
import EditTask from './EditTask';

const Task = ({task}) => {
    const {tasks,setTasks} =useContext(TaskContext);
    const [showEdit,setShowEdit] =useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
   // delete Task function
    const deleteTask = async(id) => {  
       await fetch(`https://reactjs-task-tracker-app.herokuapp.com/tasks/${id}`,{
           method: 'DELETE',
       })
        setTasks( tasks.filter( task=> (task.id!== id) ))
    }
    const fetchTask = async (id) => {
        const res = await fetch(`https://reactjs-task-tracker-app.herokuapp.com/tasks/${id}`);
        const data = await res.json();
        return data
    }
    // Toggle task reminder 
    const ToggleReminder = async (id) => {  
        const taskToToggle = await fetchTask(id);
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`https://reactjs-task-tracker-app.herokuapp.com/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type' :'application/json',
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks( tasks.map( task=> {
            
            task.reminder =  (task.id=== id) ?data.reminder : task.reminder;
            return task
        }))
    }
    const updateShowEditTask = () => {
        setShowEditTask(!showEditTask)
        setShowEdit(!showEdit)
    }
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick ={()=>ToggleReminder(task.id)} onMouseEnter={()=>setShowEdit(true)} onMouseLeave={()=>setShowEdit(false)}>
            <h3>{task.name} 
            <div className='options'>
            { showEdit && (!showEditTask) && <FaEdit style = {{color: 'blue', cursor:'pointer'}} onClick={updateShowEditTask } />}
            <FaTimes style={ {color: 'red', cursor:'pointer'}} onClick={() => deleteTask(task.id)} />
            </div>
            </h3>
            <p>{task.time}</p>
            {showEditTask && <EditTask task={task} updateShowEditTask={updateShowEditTask}/> }
        </div>
    )
}

export default Task
