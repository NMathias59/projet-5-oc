import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import Axios from "axios";
import { Button } from "@chakra-ui/core";
import { Icon } from "@chakra-ui/core";
import Field from "../components/form/Field";
import {Link} from "react-router-dom";

const PostPage = (props) => {

    const {id} = props.match.params

    console.log(id)

    const [post, setPost] = useState([])
    const [comments, setComment] = useState([])

    const fetchPost = async id => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/posts/" + id)
                .then(response => response.data);
            console.log(data)
            const {author, content, createdAt, title } = data;
            const {comments} = data
            setPost({author, content, createdAt, title});
            setComment(comments);
        } catch (error) {
            console.log(error.response)
        }

    }

    useEffect(() => {
        fetchPost(id)
        console.log(post.title)
    }, [id])


    return (
        <Fragment>
            <Header name={post.title} author={post.author}/>
            <article>
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <p>{post.content}</p>
                    </div>
                </div>

                <div className="container">
                    <div className="card my-4">
                        <h5 className="card-header">Poster un commentaire:</h5>
                        <div className="card-body">
                            <form >
                                <Field
                                    name="title"
                                    placeholder="votre commentaire"
                                />

                                <div className="form-group ">
                                    <button type="submit" className="btn btn-success">Eregistrer</button>
                                    <Link to="/admin" className="btn">Retour a la liste des articles</Link>
                                </div>
                            </form>
                        </div>
                    </div>


                    {comments.map(comment =>
                        <div key={comment.id} className="media mb-4">
                            <div className="media-body">
                                <h5 className="mt-0">{comment.user.name}</h5>
                                <p>{comment.content}</p>
                                <button className="btn btn-secondary">signaler</button>
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
