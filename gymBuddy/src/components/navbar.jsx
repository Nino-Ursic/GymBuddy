
import "./navbar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut} from "../config/firebase-config";
import { useAuth } from "./authContext";

function Navbar() {

    const navigate = useNavigate();

    function toLogIn(){
        navigate('/');
    }
    function toLogOut(){
        logOut();
        navigate('/');
    }
    const {currentUser} = useAuth();

    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/home">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/training">Training</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/trainingPlan">Training Plan</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/myTraining">My Training</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/settings">Settings</NavLink>
                    {currentUser && 
                        <button className="navbar-btn logout-navbar-btn" onClick={toLogOut}>
                            Log Out
                        </button>
                    }
                    {!currentUser &&
    	                <button className="navbar-btn logout-navbar-btn" onClick={toLogIn}>
                            Log in
                        </button>
                    }
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;

