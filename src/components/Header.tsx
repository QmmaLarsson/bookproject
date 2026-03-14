import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Header.css";


const Header = () => {
    const { user, logout } = useAuth();
    
    return (
        <header>
            <ul className="main-menu">
                <li><NavLink to="/" className="menu-link">Startsida</NavLink></li>
                <li><NavLink to="/admin" className="menu-link">Min sida</NavLink></li>
                <li>{!user ? <NavLink to="/login" className="menu-link">Logga in</NavLink> : <button onClick={logout} className="menu-button">Logga ut</button>}</li>
            </ul>
        </header>
    )
}

export default Header