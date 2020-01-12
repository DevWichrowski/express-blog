import React from 'react';
import './App.scss';
import "./styles/global.scss"
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import {Route, Router} from "react-router-dom";
import AddPost from "./components/AddPost/AddPost";
import EditPost from "./components/EditPost/EditPost";
import history from "./core/history";
import Login from "./components/Login/Login";
import ManagePosts from "./components/ManagePosts/ManagePosts";
import SinglePost from "./components/SinglePost/SinglePost";
import MenageUsers from "./components/MenageUsers/MenageUsers";

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <Navigation/>
                <div className="app-content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/add-post" component={AddPost}/>
                    <Route path="/edit-post/:id" component={EditPost}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/manage-posts" component={ManagePosts}/>
                    <Route path="/single-post/:id" component={SinglePost}/>
                    <Route path="/menage-users" component={MenageUsers}/>
                </div>
            </Router>
        </div>
    );
}

export default App;
