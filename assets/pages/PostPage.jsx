import React, {Fragment, useEffect, useState} from 'react';
import Header from "../components/Header";
import Axios from "axios";

const PostPage = (props) => {

    const {id} = props.match.params

    console.log(id)

    const [post, setPost] = useState([

    ])

    const fetchPost = async id => {
        try {
            const data = await Axios
                .get("http://127.0.0.1:8000/api/posts/" + id)
                .then(response => response.data);
            console.log(data)
            const { author, content, createdAt, title} = data;

            setPost({ author, content, createdAt, title })
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
            <Header name={post.title}/>
            <article>
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <p>{post.content}</p>
                    </div>
                </div>
            </article>

        </Fragment>
    );
};

export default PostPage;
