import React, {Fragment, useState} from 'react';
import Header from "../components/Header";
import {Link} from "react-router-dom";
import Field from "../components/form/Field";
import Axios from "axios";

const NewPost = () => {

    const [post,setPost] = useState({
        title: "",
        content: ""
});

    const [errors, setErrors] = useState({
        title: "",
        content: ""
    })


    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
           const response = await Axios.post("http://127.0.0.1:8000/api/posts",  post)
            console.log(response.data)
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
