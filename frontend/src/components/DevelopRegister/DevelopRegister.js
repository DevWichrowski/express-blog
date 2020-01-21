import React, {useState} from 'react';
import "./DevelopRegister.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {registerUserPending} from "../../store/actions/users.actions";

const DevelopRegister = props => {
    const [newUser, setNewUser] = useState({});

    const submitRegister = () => {
        if (newUser.password === newUser.repeatedPassword) {
            props.register({
                login: newUser.login,
                email: newUser.email,
                avatar: newUser.avatarUrl,
                password: newUser.password,
                nickname: newUser.nickname,
                role: "admin"
            })
        }
    };

    const handleValues = (event, label) => {
        setNewUser({...newUser, [`${label}`]: event.target.value})
    };

    return (
        <div>
            <h1>Register</h1>
            <form className="register-develop-form">
                <div className="register-develop-container">
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Login"
                               onChange={e => handleValues(e, 'login')}/>
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Nickname"
                               onChange={e => handleValues(e, 'nickname')}/>
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Email"
                               onChange={e => handleValues(e, 'email')}/>
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Avatar URL"
                               onChange={e => handleValues(e, 'avatar')}/>
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Password"
                               onChange={e => handleValues(e, 'password')} type="password"/>
                    <TextField className="text-field" id="standard-basic" variant="outlined" label="Re-type password"
                               onChange={e => handleValues(e, 'repeatedPassword')} type="password"/>
                    <Button className="post-button-submit" variant="contained" color="primary" onClick={submitRegister}>
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(registerUserPending(payload))
});

export default connect(null, mapDispatchToProps)(DevelopRegister)