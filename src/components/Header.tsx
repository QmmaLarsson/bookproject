import { NavLink } from "react-router-dom"
import "./Header.css";

const Header = () => {

    return (
        <header>
            <ul className="main-menu">
                <li><NavLink to="/" className="menu-link">Startsida</NavLink></li>
            </ul>
        </header>
    )
}

export default Header