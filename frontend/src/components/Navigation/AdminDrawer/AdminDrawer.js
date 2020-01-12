import React from 'react';
import "./AdminDrawer.scss";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {NavLink} from "react-router-dom";


const AdminDrawer = props => {
    const sideList = side => (
        <div
            className="admin-drawer"
            role="presentation"
            onClick={props.toggleDrawer(side, false)}
            onKeyDown={props.toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key="My account">
                    My account
                </ListItem>
                <NavLink exact to="/manage-posts">
                    <ListItem button key="Administrate posts">
                        Administrate posts
                    </ListItem>
                </NavLink>
                <NavLink exact to="/add-post">
                    <ListItem button key="Add posts">
                        Add posts
                    </ListItem>
                </NavLink>
                <NavLink exact to="/menage-users">
                    <ListItem button key="Menage users">
                        Menage users
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );

    return (
        <div className="admin-drawer">
            <Drawer anchor="right" open={props.state.right} onClose={props.toggleDrawer('right', false)}>
                {sideList('right')}
            </Drawer>
        </div>
    );
}

export default AdminDrawer;
