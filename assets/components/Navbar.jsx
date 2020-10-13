import React, {Fragment, useContext} from 'react';
import {NavLink} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(
        AuthContext
    )

    const handleLogout = () => {
        AuthAPI.logout();
        onLogout(false);
        history.push("/#")
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="index.html">Start Bootstrap</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">

                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Accueil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/listePosts">Tous les articles</NavLink>
                            </li>

                            {(!isAuthenticated && (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link btn btn-primary" to="/login">Admin login</NavLink>
                                    </li>

                                </Fragment>
                            )) || (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/admin">Administration </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-danger">logout</button>
                                    </li>
                                </Fragment>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
