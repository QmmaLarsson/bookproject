import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./Header.css";


const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <ul className="main-menu">
                <li className="main-li"><NavLink to="/" className="menu-link main-link">Startsida</NavLink></li>
                {user && (<li><NavLink to="/admin" className="menu-link">Mina recensioner</NavLink></li>)}
                <li>{!user ? <NavLink to="/login" className="menu-link">Logga in</NavLink> : <button onClick={logout} className="menu-button" style={{ fontSize: '1.6rem' }}>Logga ut</button>}</li>
            </ul>
        </header>
    )
}

export default Header