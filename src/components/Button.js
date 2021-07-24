// Button for adding a task 
const Button = ({color, text,onAdd}) => {

    return (
        <button className='btn' style={ {backgroundColor : color}} onClick={ e=> {e.preventDefault();onAdd()}}>{text}</button>
    )
}

export default Button
