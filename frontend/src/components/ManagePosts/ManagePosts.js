import React, {useEffect} from 'react';
import "./ManagePosts.scss";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getAllPosts, getSinglePostSelector} from "../../store/selectors/posts.selectors";
import {deletePostPending, getPostsPending, getSinglePostPending} from "../../store/actions/posts.actions";
import {getMyProfilePending} from "../../store/actions/users.actions";
import {connect} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import {NavLink} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        width: '80%',
        overflowX: 'auto',
        margin: '20px auto'
    },
    table: {
        minWidth: 650,
    },
});

const ManagePosts = props => {
    const classes = useStyles();

    useEffect(() => {
        props.getAllPosts();
    }, []);

    const deletePostClick = (id) => {
        props.deletePost(id);
    };

    return (
        <div className="menage-posts">
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Post Title</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Views</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allPosts.map(row => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{moment(row.date).format('DD/MM/YYYY HH:mm')}</TableCell>
                                <TableCell align="right">{row.user.nickname}</TableCell>
                                <TableCell align="right">{row.views}</TableCell>
                                <TableCell align="right">
                                    <DeleteIcon className="delete-icon"
                                                onClick={() => deletePostClick(row._id)}/>
                                    <NavLink to={`/edit-post/${row._id}`}>
                                        <EditIcon/>
                                    </NavLink>
                                    <NavLink to={`/single-post/${row._id}`}>
                                        <VisibilityIcon/>
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({
    allPosts: getAllPosts(state),
    singlePost: getSinglePostSelector(state)
});


const mapDispatchToProps = dispatch => ({
    getAllPosts: payload => dispatch(getPostsPending(payload)),
    deletePost: payload => dispatch(deletePostPending(payload)),
    getSinglePost: payload => dispatch(getSinglePostPending(payload)),
    getMyProfilePending: payload => dispatch(getMyProfilePending(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePosts);
