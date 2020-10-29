import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Field from "../components/form/Field";
import Axios from "axios";
import AuthAPI from "../services/AuthAPI";
import StatuUser from "../services/StatuUser";

const NewPost = ({history}) => {

    const token = window.localStorage.getItem("authToken")

    const [post, setPost] = useState({
        title: "",
        content: "",
        createdAt: "",
        category: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        content: "",
        createdAt: "",
        category: ""
    })

    useEffect(() => {

        const tokenD = AuthAPI.decryptAdmin(token)
        const tokenR = tokenD.roles
        if (StatuUser.StatuRole(tokenR) == true) {

        } else {
            window.alert("vous n'est pas atauriser a etre dans la partie admin")
            history.push("/")
        }
    }, []);


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await Axios.post("http://127.0.0.1:8000/api/posts", post)
            props.history.replace("/admin")
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <Fragment>
            <Header name="Nouveau Article"/>
            <article>
                <div className="container ">
                    <form onSubmit={handleSubmit}>
                        <Field name="title"
                               label="Titre"
                               placeholder="Titre de l'article"
                               value={post.title}
                               onChange={handleChange}
                               error={errors.title}
                        />
                        <Field name="content"
                               label="Contenue"
                               placeholder="Contenue de l'article"
                               value={post.content}
                               onChange={handleChange}
                               error={errors.content}
                        />

                        <Field name="createdAt"
                               label="Date"
                               placeholder="Date"
                               value={post.createdAt}
                               onChange={handleChange}
                               error={errors.createdAt}
                        />
                        <Field name="category"
                               label="Categorie"
                               placeholder="Categories"
                               value={post.category}
                               onChange={handleChange}
                               error={errors.category}
                        />

                        <div className="form-group ">
                            <button type="submit" className="btn btn-success">Eregistrer</button>
                            <Link to="/admin" className="btn">Retour a la liste des articles</Link>
                        </div>
                    </form>
                </div>
            </article>
        </Fragment>
    );
};

export default NewPost;
