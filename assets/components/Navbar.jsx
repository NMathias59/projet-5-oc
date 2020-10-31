import React, {Fragment, useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import StatuUser from "../services/StatuUser";
import {toast} from "react-toastify";

const Navbar = ({history}) => {
    const token = window.localStorage.getItem("authToken")

    const {isAuthenticated, setIsAuthenticated} = useContext(
        AuthContext
    )
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecté.")
        history.push("/#")
    }
    const [role, setRole] = useState({
        "roles":""
    })
    useEffect(() => {
        if (!isAuthenticated){

        }else{
            setRole(AuthAPI.decryptAdmin(token))
            StatuUser.StatuRole(role.roles)
        }

    }, []);

    const handleAdmin = () =>{
        if (StatuUser.StatuRole(role.roles) == true){
            toast.info("accee a la partie admin")
            history.push("/admin")
        }else {
            toast.dismiss("vous n'est pas atauriser a etre dans la partie admin")
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <NavLink className="nav-item btn" to="/#">Mon Blog d'actualités</NavLink>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Accueil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/listePosts">Tous les articles</NavLink>
                            </li>

                            {(!isAuthenticated && (
                                <Fragment>
                                    <li className="nav-item">
                                        <NavLink className="nav-link btn btn-primary" to="/login">Login</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link btn btn-info" to="/signin">Sign in</NavLink>
                                    </li>
                                </Fragment>
                            )) || (
                                <Fragment>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                                    </li>
                                </Fragment>
                            )}
                            {(StatuUser.StatuRole(role.roles) == true && (
                                <Fragment>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-primary" onClick={handleAdmin} >Administration </button>
                                    </li>
                                </Fragment>
                            ))}

                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
