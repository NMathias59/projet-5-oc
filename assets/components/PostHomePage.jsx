import React, {Fragment, useState, useEffect} from 'react';
import Axios from "axios";
import {Link} from "react-router-dom";

const PostHomePage = () => {

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [errors, setErrors] =  useState([])

    const itemsPerPage = 7;
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
    },[])

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedPosts = posts.slice(start, start + itemsPerPage)



    return (
<Fragment>
        {paginatedPosts.map(post  => <div key={post.id} className="container">
            <div className="row">
                <div className="col-lg-8-md-10 mx-auto">
                    <div className="post-preview">
                        <Link to={"/post/" + post.id }>
                            <h2 className="post-title">
                                {post.title}
                            </h2>
                            <h3 className="post-subtitle">
                                {post.author.name}
                            </h3>
                        </Link>
                        <p className="post-meta">
                            Poster le : {post.createdAt}
                        </p>
                    </div>

                </div>
            </div>
        </div>)}


</Fragment>
    );
};

export default PostHomePage;
