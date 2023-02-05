import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'


export const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div style={{
                        display: "flex",
                        width: "55%",
                        direction: "rtl",
                    }}
                >
                    <a className="navbar-brand">
                        <Link 
                            className="navbar-brand" 
                            to="/"
                        >
                            Carlos Dias 💚 Silvia Gonzalez
                        </Link>
                    </a>
                </div>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                        to="/"
                    >
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-info">
                        Jose
                    </span>
                    
                    <button 
                        className="nav-item nav-link btn-dark" 
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
            </div>
        </nav>
    )
}