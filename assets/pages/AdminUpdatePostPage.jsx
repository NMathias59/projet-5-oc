import React, {Fragment, useEffect, useState} from 'react';

import Axios from "axios";
import {Link} from "react-router-dom";
import Field from "../components/form/Field";
import Header from "../components/Header";

const AdminUpdatePostPage = (props) => {

    const {id} = props.match.params

    const [post, setPost] = useState({
        "title": "",
        "content": "",
        "createdAt": "",
        "category": ""
    })

    const [errors, setErrors] = useState({
        "title": "",
        "content": "",
        "createdAt": "",
        "category": ""
    })

    const fetchPost = async id => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/posts/" + id)
                .then(response => response.data);
            const {content, createdAt, title, category} = data;
            setPost({content, createdAt, title, category});
        } catch (error) {
            console.log(error.response)
        }
    }


    useEffect(() => {
        fetchPost(id)
    }, [id])

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            const response = await Axios.put(
                "http://127.0.0.1:8000/api/posts/" + id, post)
            window.alert("modifications reussites")
            props.history.replace("/admin")
        }catch (error){
            console.log(error.response)
        }
    }


    return (
        <Fragment>
            <Header name="modifier l'article"/>
            <article className="container">
                <form onSubmit={handleSubmit}>
                    <Field name="title"
                           label="Titre"
                           placeholder="Titre du post"
                           value={post.title}
                           onChange={handleChange}
                           error={errors.title}
                    />
                    <Field name="content"
                           label="Contenu"
                           placeholder="Contenu du post"
                           value={post.content}
                           onChange={handleChange}
                           error={errors.content}
                    />
                    <Field name="createdAt"
                           label="Date"
                           placeholder="Date de creation du post"
                           value={post.createdAt}
                           onChange={handleChange}
                           error={errors.createdAt}
                    />
                    <Field name="category"
                           label="Categorie"
                           placeholder="Categorie du post"
                           value={post.category}
                           onChange={handleChange}
                           error={errors.category}
                    />
                    <div className="form-group ">
                        <button type="submit" className="btn btn-success">Eregistrer</button>
                        <Link to="/admin" className="btn">Retour a la page d'acceuil</Link>
                    </div>
                </form>
            </article>
        </Fragment>
    );
};

export default AdminUpdatePostPage;