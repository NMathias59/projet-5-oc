import React, {Fragment} from 'react';
import Header from "../components/Header";
import PostHomePage from "../components/PostHomePage";

const HomePage = () => {
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
            <PostHomePage/>
            <hr/>
        </Fragment>
    );
};

export default HomePage;
