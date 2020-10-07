/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/app.js');


const App = () => {
    return (
        <HashRouter>
            <Navbar/>

            <Switch>

                <Route path="/post/:id" component={PostPage}/>
                <Route path="/post" component={PostPage}/>
                <Route path="/" component={HomePage}/>
            </Switch>
            <Footer/>
        </HashRouter>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)