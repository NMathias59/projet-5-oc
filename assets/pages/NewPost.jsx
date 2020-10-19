import React, {Fragment, useState} from 'react';
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Field from "../components/form/Field";
import Axios from "axios";

const NewPost = (props) => {

    const [post,setPost] = useState({
        title: "",
        content: "",
        createdAt:"",
        category:""
});

    const [errors, setErrors] = useState({
        title: "",
        content: "",
        createdAt:"",
        category:""
    })


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
           const response = await Axios.post("http://127.0.0.1:8000/api/posts",  post)
            props.history.replace("/admin")

        }catch (error){
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
