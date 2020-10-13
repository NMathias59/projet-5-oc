import React, {Fragment, useEffect, useState} from 'react';
import Axios from "axios";
import Header from "../components/Header";
import NavbarAdmin from "../components/NavabarAdmin";
import {Link, NavLink} from "react-router-dom";

const AdminListUsers = () => {

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
        const data = Axios
            .get("http://127.0.0.1:8000/api/users")
            .then(response => response.data["hydra:member"])
            .then(data => setUsers(data))
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
    }

    const handleDelete = id => {
        Axios.delete("http://127.0.0.1:8000/api/users/" + id)
            .then(response => console.log(response))
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
