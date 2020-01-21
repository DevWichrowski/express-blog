import React, {useEffect, useState} from 'react';
import "./Login.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {loginPending} from "../../store/actions/auth.actions";
import {getUserSelector} from "../../store/selectors/users.selectors";
import {NavLink, useHistory} from "react-router-dom";
import {getAllPosts} from "../../store/selectors/posts.selectors";

const Login = props => {
    const {loggedUser} = props;
    const history = useHistory();

    useEffect(() => {
        if (loggedUser != null) {
            history.push('/')
        }
    }, [loggedUser]);

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const submit = e => {
        e.preventDefault();
        props.login({
            login,
            password
        })
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login-form" onSubmit={submit}>
                <TextField
                    className="form-text-field"
                    id="outlined-basic"
                    label="Login"
                    variant="outlined"
                    onChange={e => setLogin(e.target.value)}
                />
                <TextField
                    className="form-text-field"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" type="submit">
                    Login
                </Button>

                <NavLink to="/register-develop">
                    <p>Register user - for develop purpose only</p>
                </NavLink>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    loggedUser: getUserSelector(state),
    allPosts: getAllPosts(state),
});


const mapDispatchToProps = dispatch => ({
    login: payload => dispatch(loginPending(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
