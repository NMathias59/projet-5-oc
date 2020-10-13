import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import Axios from "axios";
import {Link} from "react-router-dom";
import Field from "../components/form/Field";

const AdminUpdatePostPage = (props) => {

    const {id} = props.match.params

    console.log(id)

    const [post, setPost] = useState([])
    const [comments, setComment] = useState([])

    const fetchPost = async id => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/posts/" + id)
                .then(response => response.data);
            const {author, content, createdAt, title} = data;
            const {comments} = data
            setPost({author, content, createdAt, title});
            setComment(comments);
        } catch (error) {
            console.log(error.response)
        }
    }

    const updatePost = async id => {
        try {
            const data = await Axios
                .put("http://127.0.0.1:8000/api/posts/" + id, {
                    ...post
                })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost(id)
        console.log(post.title)
    }, [id])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = id => {
        updatePost(id)
    }


    return (
        <Fragment>
            <Header name="modifier l'article"/>
            <article className="container">

                <form onSubmit={handleSubmit}>
                    <div className="form-group col-lg-8-md-10 mx-auto">
                        <Field name="title"
                               label="Titre"
                               placeholder="Titre de l'article"
                               value={post.title}
                               onChange={handleChange}

                        />
                        <Field name="content"
                               label="Contenue"
                               placeholder="Contenue de l'article"
                               value={post.content}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group ">
                        <button type="submit" className="btn btn-success">Eregistrer</button>
                        <Link to="/admin" className="btn">Retour a la liste des articles</Link>
                    </div>
                </form>
            </article>
        </Fragment>
    );
};

export default AdminUpdatePostPage;