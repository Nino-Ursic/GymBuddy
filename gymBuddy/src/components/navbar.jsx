
import "./navbar.css";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/home">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/training">Training</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/trainingPlan">Training Plan</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/history">History</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/settings">Settings</NavLink>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;

