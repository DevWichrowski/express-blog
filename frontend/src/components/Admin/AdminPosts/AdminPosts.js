import {useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import Chip from "@material-ui/core/Chip";
import {getAllPosts, getSinglePostSelector} from "../../../store/selectors/posts.selectors";
import {deletePostPending, getPostsPending, getSinglePostPending} from "../../../store/actions/posts.actions";
import {connect} from "react-redux";

const AdminPosts = (props) => {
    const history = useHistory();

    useEffect(() => {
        props.getAllPosts();
    }, [])

    const editPost = id => history.push(`/edit-post/${id}`);
    const goToPost = post => history.push(`/post/${post.title}`)

    return (
        <div>
            <h1>HOME</h1>
            {props.allPosts.map((post, index) => {
                return (
                    <div key={post._id}>
                        <hr/>
                        <h1 onClick={() => goToPost(post)} style={{cursor: 'pointer'}}>{post.title}</h1>
                        <img src={post.imageUrl} style={{width: '600px', height: '500px'}}/>
                        <p>{post.description}</p>
                        <p>Author: {post.user && post.user.login}</p>
                        {console.log('post', post)}
                        <div>
                            {post != null && post.tags.length > 0 ? post.tags.map((tag, index) => {
                                return (
                                    <Chip key={index} label={tag.value} color="primary"/>
                                )
                            }) : null}
                        </div>
                        <strong style={{cursor: 'pointer'}} onClick={id => props.deletePost(post._id)}>DELETE -
                            X</strong>
                        <br/>
                        <strong style={{cursor: 'pointer'}} onClick={id => editPost(post._id)}>EDIT POST</strong>
                        <hr/>
                    </div>
                )
            })}
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
    getSinglePost: payload => dispatch(getSinglePostPending(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPosts);

