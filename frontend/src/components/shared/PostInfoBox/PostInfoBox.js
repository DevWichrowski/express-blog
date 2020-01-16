import React from 'react';
import PropTypes from "prop-types";
import "./PostInfoBox.scss";


const PostInfoBox = props => {
    return (
        <div className="post-info-box">
            <h2>{props.title}</h2>
            {props.children}
        </div>
    );
};

PostInfoBox.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PostInfoBox;