import React, {Fragment, useContext, useEffect, useState} from 'react';
import Axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/form/Field";
import Header from "../components/Header";
import {toast} from "react-toastify";


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
    const fetchPost = async id => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/posts/" + id)
                .then(response => response.data);
            console.log(data)
            const {author, content, createdAt, title} = data;
            const {comments} = data
            setPost({author, content, createdAt, title});
            setComments(comments);
        } catch (error) {
            window.alert(error.response)
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
            const response = await Axios.post(
                "http://127.0.0.1:8000/api/comments", comment)
                .then(response => console.log(response.data));
                toast.success("commentaire poster");
        } catch (error) {
            console.log(error.response.data)
        }
    }


    useEffect(() => {
        fetchPost(id)
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
