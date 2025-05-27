import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    return (
        <>
            <nav className={`side-nav${open ? " open" : ""}`}>
                <div className="logo">
                    ZGAS
                </div>
                <button className="hamburger" onClick={handleToggle} aria-label="Abrir menú">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <ul className={`nav-links${open ? " show" : ""}`}>
                    <li><Link to="/" onClick={handleClose}>Inicio</Link></li>
                    <li><Link to="/Branches" onClick={handleClose}>Sucursales</Link></li>
                    <li><Link to="/Products" onClick={handleClose}>Productos</Link></li>
                    <li><Link to="/Employee" onClick={handleClose}>Empleados</Link></li>
                </ul>
            </nav>
            {/* Fondo oscuro al abrir menú en móvil */}
            {open && <div className="nav-overlay" onClick={handleClose}></div>}
        </>
    );
}

export default NavBar;