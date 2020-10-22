import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import Axios from "axios";
import Field from "../components/form/Field";


const PostPage = (props) => {

    const {id} = props.match.params

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    console.log(id)

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([

    ])
    const [comment, setComment] = useState({
        "content": "",
        "createdAt": "",
        "repport": true
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
            console.log(error.response)
        }
    }

    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setComment({...comment, [name]: value});
    }

    const handleSubmit= async event =>{
        event.preventDefault();
        try{
            const response = await Axios.post(
                "http://127.0.0.1:8000/api/comments", {comment, post: `/api/posts/${comments.post}`})
                .then(response => console.log(response.data));
        }catch (error){
            console.log(error.response)
        }
    }


    useEffect(() => {
        fetchPost(id)
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
                            <form onSubmit={handleSubmit}>
                                <Field
                                    name="content"
                                    label="Commantaire"
                                    placeholder="votre commentaire"
                                    value={comment.content}
                                    onChange={handleChange}
                                    error={errors.content}
                                />
                                <Field
                                    name="createdAt"
                                    label="Date"
                                    placeholder=""
                                    value={comment.createdAt}
                                    onChange={handleChange}
                                    error={errors.content}
                                />
                                <div className="form-group ">
                                    <button type="submit" className="btn btn-success">Eregistrer</button>
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
