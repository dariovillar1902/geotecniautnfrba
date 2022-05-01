import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';

export const Navbar = () => {

    return (
        /* <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link
                className="navbar-brand"
                to="/"
            >
                ApuntesCivil
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')}
                        to="/apuntes"
                    >
                        Apuntes
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')}
                        to="/opiniones"
                    >
                        Opiniones
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')}
                        to="/general"
                    >
                        Info General
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')}
                        to="/foro"
                    >
                        Foro
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')}
                        to="/subirmaterial"
                    >
                        Subir Material
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span
                        className='nav-item nav-link text-info'>
                    </span>

                    <button
                        className="nav-item nav-link btn"
                    >
                        Cerrar sesión
                    </button>
                </ul>
            </div>
        </nav> */
        <header className="d-flex justify-content-center py-3 navbar-dark bg-dark">
            <ul className="nav nav-pills">
                <li className="nav-item dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Unidad 2
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/propiedades"
                                >
                                    Propiedades índice
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/clasificacion"
                                >
                                    Clasificación SUCS y AASHTO
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/limites"
                                >
                                    Límite Líquido y Límite Plástico
                                </NavLink>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </li>

                <li className="nav-item dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Unidad 3
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                            {/* <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel1"
                                >
                                    1° Nivel
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel2"
                                >
                                    2° Nivel
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel3"
                                >
                                    3° Nivel
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel4"
                                >
                                    4° Nivel
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel5"
                                >
                                    5° Nivel
                                </NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/nivel6"
                                >
                                    6° Nivel
                                </NavLink>
                            </Dropdown.Item> 
                            <hr className="dropdown-divider" />
                            <Dropdown.Item>
                                <NavLink
                                    className={({ isActive }) => 'nav-item nav-link dropdown-item' + (isActive ? ' active' : '')}
                                    to="/apuntes/otros"
                                >
                                    Otros/Generales
                                </NavLink>
                            </Dropdown.Item>*/
                            }</Dropdown.Menu>
                    </Dropdown>
                </li>
                <li className="nav-item"><a href="/" className="nav-link">Unidad 4</a></li>
                <li className="nav-item"><a href="/" className="nav-link">Unidad 5</a></li>
                <li className="nav-item"><a href="/" className="nav-link">Unidad 6</a></li>
            </ul>
        </header>
    )
}