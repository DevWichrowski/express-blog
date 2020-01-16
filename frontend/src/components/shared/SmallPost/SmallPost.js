import React from 'react';
import "./SmallPost.scss";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PropTypes from "prop-types";
import {NavLink, useHistory} from "react-router-dom";

const SmallPost = props => {
    const history = useHistory();
    const navigateTo = id => history.push(`/single-post/${id}`);

    return (
        <div className="small-post" onClick={() => navigateTo(props._id)}>
            <NavLink to={`/single-post/${props._id}`}>
                <img className="post-img"
                     src={props.imageUrl}/>
                <h4>{props.title ? props.title : null}</h4>
            </NavLink>
            <div className="sp-info">
                <div className="info-col">
                    <VisibilityIcon/>
                    <p className="info-text">{props.views}</p>
                </div>

                <div className="info-col">
                    <AccessTimeIcon/>
                    <p className="info-text">{props.readTime}min</p>
                </div>
            </div>
        </div>
    );
}

SmallPost.propTypes = {
    _id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    views: PropTypes.number,
    readTime: PropTypes.number
};

export default SmallPost;