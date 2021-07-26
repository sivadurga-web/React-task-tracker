// Header file - adds the title of the page
import propTypes  from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = ({title,onAdd, isShowed}) => {
    const location =  useLocation();
    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* { location.pathname==='/' && ( */}
            { location.pathname==='/React-task-tracker/' && (
                <Button color={isShowed ? 'red' : 'green'} text={isShowed ? 'Close' : 'Add Task'} onAdd={onAdd} />
            )}
        </header>
    )
}

// Title of the app
Header.defaultProps = {
    title : 'Task Tracker', 
}

// Checking the data types of the props
Header.propTypes = {
    title : propTypes.string.isRequired,
}
export default Header
