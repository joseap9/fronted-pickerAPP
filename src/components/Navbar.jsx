import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'


export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div style={{
                        display: "flex",
                        width: "40%",
                        direction: "rtl",
                    }}
                >
                    <h1 className="navbar-brand" onClick={ () => window.location.reload() }>
                        <Link 
                            className="navbar-brand" 
                            to="/"
                        >
                             Picker App ✅
                        </Link>
                    </h1>
                </div>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                            to="/"
                        >
                            24H
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                            to="/last-day"
                        >
                            Ultimo Día
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                            to="/last-seven-days"
                        >
                            Semanal Pickers
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse">
                    <div className="navbar-nav">
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                            to="/last-thirty-days"
                        >
                            Mensual Tienda
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">
                        <div className="navbar-collapse">
                            <div className="navbar-nav">
                                <NavLink 
                                    className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                                    to="/busqueda"
                                >
                                    Buscar
                                </NavLink>
                            </div>
                        </div>

                        <span className="nav-item nav-link text-info">
                            { user.name }
                        </span>
                        
                        <button 
                            className="nav-item nav-link btn-light" 
                            onClick={ startLogout }
                        >
                            Salir
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    )
}