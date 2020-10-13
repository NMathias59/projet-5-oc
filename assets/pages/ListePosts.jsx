import React, {Fragment} from 'react';
import PostHomePage from "../components/PostHomePage";
import PostListPosts from "../components/PostListPosts";

const ListePosts = () => {

    return (

        <Fragment>
            <header className="masthead" id="home-bg">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>Mon blog actus</h1>
                                <span className="subheading"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <PostListPosts/>
            <hr/>
        </Fragment>
    );
};

export default ListePosts;
