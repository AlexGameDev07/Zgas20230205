import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="side-nav">
            <div className="logo">
                ZGAS
            </div>
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/Branches">Sucursales</Link></li>
                <li><Link to="/Products">Productos</Link></li>
                <li><Link to="/Employee">Empleados</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;