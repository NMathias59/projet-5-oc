import React, {Fragment, useContext, useEffect, useState} from 'react';
import Axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/form/Field";
import Header from "../components/Header";
import {toast} from "react-toastify";
import PostAPI from "../services/PostAPI";
import CommentAPI from "../services/CommentAPI";


const PostPage = (props) => {

    const {isAuthenticated, setIsAuthenticated} = useContext(
        AuthContext
    )
    const {id} = props.match.params
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({
        "content": "",
        "repport": true,
        "post": "api/posts/" + id
    })
    const [errors, setErrors] = useState({
        "content": ""
    })
    const postID = async id => {
        try {
            const data = await PostAPI.fetchPost(id)
                .then(response => response.data);
            const {author, content, createdAt, title} = data;
            const {comments} = data
            setPost({author, content, createdAt, title});
            setComments(comments);
        } catch (error) {
            toast.error("erreur de chargement des articles")
        }
    }

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setComment({...comment, [name]: value});
    }
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await CommentAPI.PostComment(comment)
            toast.success("commentaire poster");
            document.location.reload(true)
        } catch (error) {
            toast.error("Erreur lors de l'envoi");
        }
    }

    useEffect(() => {
        postID(id)
    }, [id])


    return (
        <Fragment>
            <Header name={post.title} author={post.author}/>
            <article>
                <div className="container">
                    <div className="card">
                        <div className="row">
                            <div className=" col-md-10 mx-auto">
                                <p>{post.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                < div className="container">
                    {isAuthenticated && (
                        <div className="card my-4">
                            <h5 className="card-header">Poster un commentaire:</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="content"
                                        label="Commantaire"
                                        placeholder="votre commentaire"
                                        value={comment.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                    />
                                    <div className="form-group ">
                                        <button type="submit" className="btn btn-success">Eregistrer</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    ) || (
                        <div className="card my-4">
                            <h5 className="card-header">Veuiller vous connectez pour poster un commentaire:</h5>
                        </div>
                    )}

                    {comments.map(comment =>
                        <div key={comment.id} className="media mb-4">
                            <div className="media-body">
                                <h5 className="mt-0">{comment.user.name}</h5>
                                <p>{comment.content}</p>
                                <span>{comment.createdAt}</span>
                                <hr/>
                            </div>
                        </div>
                    )}
                </div>
            </article>

        </Fragment>
    );
};

export default PostPage;
