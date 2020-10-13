import React, {Fragment, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";
import {NavLink} from "react-router-dom";
import NavbarAdmin from "../components/NavabarAdmin";
import Header from "../components/Header";

const AdminListPosts = () => {

    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;
    const pagesCount = Math.ceil(posts.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');
    const start = currentPage * itemsPerPage - itemsPerPage;

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.name.toLowerCase().includes(search.toLowerCase()) ||
        p.createdAt.toLowerCase().includes(search.toLowerCase())
    )

    const paginatedPosts = filteredPosts.slice(start, start + itemsPerPage);

    useEffect(() => {
        const data = Axios
            .get("http://127.0.0.1:8000/api/posts")
            .then(response => response.data["hydra:member"])
            .then(data => setPosts(data))
    }, []);



    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = event => {
        const value = event.currentTarget.value;
        setSearch(value);
    }

    const handleDelete =  async id => {

       try {
           await Axios.delete("http://127.0.0.1:8000/api/posts/" + id)
               .then(response => console.log(response))
       }catch (error){
           console.log(error.response)
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
                        <th>Date:</th>
                        <th>Auteur:</th>
                        <th>Titre:</th>
                        <th>Contenue:</th>

                    </tr>
                    </thead>

                    <tbody className="text-center">
                    {paginatedPosts.map(post => <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.createdAt}</td>
                        <td>{post.author.name}</td>
                        <td>{post.title}</td>
                        <td><Link to={"/post/" + post.id} className="btn btn-primary">Article</Link></td>
                        <td><NavLink to={"/admin/post/" + post.id} className="btn btn-info">Modifier</NavLink></td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Supprimer</button>
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

    )
        ;
};

export default AdminListPosts;
