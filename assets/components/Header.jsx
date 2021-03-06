import React, {Fragment} from 'react';

const Header = ({name, author}) => {
    return (
        <div>
            <header className="masthead" id="home-bg">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="site-heading">
                                <h1>{name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
