import React, {Fragment, useEffect, useState} from 'react';
import Axios from "axios";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavabarAdmin";
import {Link, NavLink} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import StatuUser from "../services/StatuUser";
import UserAPI from "../services/UserAPI";
import {toast} from "react-toastify";

const AdminListUsers = ({history}) => {

    const token = window.localStorage.getItem("authToken");

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 15;
    const pagesCount = Math.ceil(users.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const start = currentPage * itemsPerPage - itemsPerPage;

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage);

    useEffect(() => {
        const tokenD = AuthAPI.decryptAdmin(token)
        const tokenR = tokenD.roles
        if (StatuUser.StatuRole(tokenR) == true) {
            const data = UserAPI.findAll()
                .then(data => setUsers(data))
        }else {
            window.alert("vous n'est pas atauriser a etre dans la partie admin")
            history.push("/#")
        }
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
    }

    const handleDelete = async id => {
        const originalUsersList = [...users]
        try {
            setUsers(users.filter(user => user.id !== id))
            await UserAPI.deleteUser(id)
        }catch (error){
            toast.error("erreur lors de la supression")
            setUsers(originalUsersList);
        }

    }


    return (
        <Fragment>
            <Header name="Administration"/>
            <NavbarAdmin/>
            <div className="form-group container col-lg-8">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher....."/>

            </div>


            <div className="container col-lg-8">
                <table className="table table-hover">

                    <thead className="text-center">
                    <tr>
                        <th>ID.</th>
                        <th>Nom:</th>
                        <th>Email:</th>
                        <th>Roles</th>
                    </tr>
                    </thead>

                    <tbody className="text-center">
                    {paginatedUsers.map(user => <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roles}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Supprimer</button>
                        </td>
                    </tr>)}

                    </tbody>
                </table>
                <div className="row">
                    <div className="col-lg-8-md-10 mx-auto">
                        <ul className="pagination pagination-lg">
                            <li className={"page-item" + (currentPage === 1 && " disabled")}>
                                <button className="page-link"
                                        onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                            </li>
                            {pages.map(page => (
                                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                                    <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                                </li>))}

                            <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                                <button className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminListUsers;
