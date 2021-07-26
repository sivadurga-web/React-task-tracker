import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer style={{textAlign: 'center'}}>
            <p> Copyright &copy; 2021</p>
            <Link to="/React-task-tracker/about">About</Link>
            {/* <Link to="/about">About</Link> */}
        </footer>
    )
}

export default Footer
