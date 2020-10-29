/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";


// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import ListePosts from "./pages/ListePosts";
import AdminListPosts from "./pages/AdminListPosts";
import AdminUpdatePostPage from "./pages/AdminUpdatePostPage";
import NewPost from "./pages/NewPost";
import AdminListUsers from "./pages/AdminListUsers";
import AdminListComment from "./pages/AdminListComments";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AuthAPI from "./services/AuthAPI";
import AuthContext from "./contexts/AuthContext";
import SignInPage from "./pages/SignInPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


require("./styles/app.css")

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    )

    const NavbarWithRouter = withRouter(Navbar)

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated
    }

    return (
        <AuthContext.Provider value={contextValue}>
            <HashRouter>
                <NavbarWithRouter/>
                <main>
                    <Switch>
                        <PrivateRoute path="/admin/post/:id"  component={AdminUpdatePostPage}/>
                        <PrivateRoute path="/admin/post/:id"  component={PostPage}/>
                        <PrivateRoute path="/admin/users"  component={AdminListUsers}/>
                        <PrivateRoute path="/admin/newPost" component={NewPost}/>
                        <PrivateRoute path="/admin/comment"  component={AdminListComment}/>
                        <Route path="/post/:id" component={PostPage}/>
                        <Route path="/post" component={PostPage}/>
                        <Route path="/listePosts" component={ListePosts}/>
                        <PrivateRoute path="/admin"  component={AdminListPosts}/>
                        <Route path="/signin" component={SignInPage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </main>
                <Footer/>
            </HashRouter>
            <ToastContainer />
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)