import React, {useState} from 'react';
import "./AddUserModal.scss";
import {seletAddUserModal} from "../../../store/selectors/modals.selector";
import {connect} from "react-redux";
import {closeAddUserModal} from "../../../store/actions/modals.actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Avatar from "@material-ui/core/Avatar";


const AddUserModal = props => {

    const [login, setLogin] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [password, setPassword] = useState(null);
    const [retypedPassword, setRetypedPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const createUser = () => {
        console.log('Login', login);
        console.log('nickname', nickname);
        console.log('password', password);
        console.log('retypedPassword', retypedPassword);
        console.log('email', email);
        console.log('avatar', avatar);
    };

    return (
        <Dialog className="add-user-modal" onClose={props.closeAddUserModal} aria-labelledby="customized-dialog-title"
                open={props.addUserModal}>
            <DialogTitle id="customized-dialog-title" onClose={props.closeAddUserModal}>
                Add users
            </DialogTitle>
            <DialogContent className="content" dividers>
                <div className="avatar-container">
                    <Avatar src="https://byuc.files.wordpress.com/2012/07/avat-2.jpg" alt="" className="user-avatar"/>
                </div>
                <div className="flex-container">
                    <TextField id="standard-basic" label="Login" variant="outlined"/>
                    <TextField id="standard-basic" label="Nickname" variant="outlined" className="right-input"/>
                </div>

                <div className="flex-container">
                    <TextField id="standard-basic" label="Password" variant="outlined" type="password"/>
                    <TextField id="standard-basic" label="Retype password" variant="outlined" type="password"
                               className="right-input"/>
                </div>


                <TextField id="standard-basic" label="E-mail" variant="outlined" className="input"/>
                <TextField id="standard-basic" label="Avatar" variant="outlined" className="input"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeAddUserModal} color="primary">Cancel</Button>
                <Button onClick={createUser} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = state => ({
    addUserModal: seletAddUserModal(state)
});

const mapDispatchToProps = dispatch => ({
    closeAddUserModal: () => dispatch(closeAddUserModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);