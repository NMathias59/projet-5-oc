import React, {Fragment} from 'react';
import {Link, NavLink} from "react-router-dom";

const NavbarAdmin = () => {

    return (
        <Fragment>
            <nav className=" col-lg-12 text-center">
                <Link to="/admin" className="btn btn-group">Articles</Link>
                <Link to="/admin/users" className="btn btn-group">Utilisateurs</Link>
                <Link to="/admin/comment" className="btn btn-group">Commentaires</Link>
                <Link to="/admin/newPost" className="btn-primary btn-group">Nouveau article</Link>

            </nav>

        </Fragment>
    );
};

export default NavbarAdmin;
