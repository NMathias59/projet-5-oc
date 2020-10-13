import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";

const PostListPosts = () => {


    const [posts, setPosts] = useState([])
    const [errors, setErrors] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;
    const pagesCount = Math.ceil(posts.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    useEffect(() => {
        const data = Axios
            .get("http://127.0.0.1:8000/api/posts")
            .then(response => response.data["hydra:member"])
            .then(data => setPosts(data))
    }, [])

   const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedPosts = posts.slice(start, start + itemsPerPage)

    return (
        <Fragment>

            {paginatedPosts.map(post => <div key={post.id} className="container">
                <div className="row">
                    <div className="col-lg-8-md-10 mx-auto">
                        <div className="post-preview">
                            <Link to={"/post/" + post.id}>
                                <h2 className="post-title">
                                    {post.title}
                                </h2>
                                <h3 className="post-subtitle">
                                    {post.author.name}
                                </h3>
                            </Link>
                            <p className="post-meta">
                                Poster le :  {(post.createdAt)}
                            </p>
                        </div>


                    </div>
                </div>
            </div>)}
            <div className="row">
                <div className="col-lg-8-md-10 mx-auto">
                    <ul className="pagination pagination-lg">
                        <li className={"page-item" + (currentPage === 1 && " disabled")}>
                            <button className="page-link" onClick={() =>  handlePageChange(currentPage - 1)}>&laquo;</button>
                        </li>
                        {pages.map(page => (
                            <li key={page} className={"page-item" + (currentPage === page && " active")}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
                            </li>))}

                        <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                        </li>
                    </ul>
                </div>
            </div>

        </Fragment>
    );
};

export default PostListPosts;
