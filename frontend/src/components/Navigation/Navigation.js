import React, {useEffect} from 'react';
import AppBar from "@material-ui/core/AppBar";
import "./Navigation.scss";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import AdminDrawer from "./AdminDrawer/AdminDrawer";
import {connect} from "react-redux";
import {getMyProfilePending} from "../../store/actions/users.actions";
import {getUserSelector} from "../../store/selectors/users.selectors";
import {logoutAllPending} from "../../store/actions/auth.actions";

const Navigation = props => {
    const {loggedUser} = props;


    useEffect(() => {
        if (localStorage.getItem('token') && loggedUser == null) {
            props.getMyProfilePending();
        }

    }, [loggedUser]);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [side]: open});
    };


    return (
        <div className="navigation">
            <AdminDrawer state={state} toggleDrawer={toggleDrawer}/>
            <AppBar position="static">
                <Toolbar variant="dense" className="navigation-bar">
                    <div className="nav-left-column">
                        <NavLink exact to="/">
                            <Typography color="inherit" className="navigation-link">
                                Home
                            </Typography>
                        </NavLink>
                    </div>

                    <div className="nav-right-column">
                        {loggedUser ? (<NavLink exact to="/" onClick={() => props.logoutAll()}>
                            <Typography color="inherit" className="navigation-link">
                                Logout
                            </Typography>
                        </NavLink>) : (<NavLink to="/login">
                            <Typography color="inherit" className="navigation-link">
                                Login
                            </Typography>
                        </NavLink>)}
                        {loggedUser ? (<Typography color="inherit" className="navigation-link"
                                                   onClick={toggleDrawer('right', true)}>
                            Admin Panel
                        </Typography>) : null}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = state => ({
    loggedUser: getUserSelector(state),
});

const mapDispatchToProps = dispatch => ({
    getMyProfilePending: payload => dispatch(getMyProfilePending(payload)),
    logoutAll: payload => dispatch(logoutAllPending(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);