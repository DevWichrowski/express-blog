import React from 'react';
import "./NewestPosts.scss";
import Slider from "react-slick";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {Zoom} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const NewestPosts = props => {

    const history = useHistory();
    const navigateTo = id => {
        history.push(`/single-post/${id}`);
        props.elementRef.current.scrollIntoView({
            behavior: 'smooth',
            block: "start",
        })
    };

    const settings = {
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        draggable: false,
    };

    return (
        <div className="newest-posts">
            <h3>Newest posts</h3>
            {console.log('element', props.element)}
            <div className="newest-post-container">
                <Slider {...settings}>
                    {props.element.map(post => {
                        return (
                            <div className="newest-post-img-container" key={post._id}
                                 onClick={() => navigateTo(post._id)}>
                                <Tooltip TransitionComponent={Zoom} title={post.description}
                                         aria-label={post.description}
                                         placement="top">
                                    <img src={post.imageUrl} alt={post.title || 'My new post'}/>
                                </Tooltip>
                                <div className="newest-post-info">
                                    <h3 className="newest-post-title">{post.title}</h3>
                                    <div className="post-info">
                                        <div className="info-col">
                                            <VisibilityIcon/>
                                            <p className="info-text">{post.views}</p>
                                        </div>
                                        <div className="info-col">
                                            <AccessTimeIcon/>
                                            <p className="info-text">{post.readTime}min</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
};

NewestPosts.propTypes = {
    element: PropTypes.array.isRequired,
    elementRef: PropTypes.object.isRequired,
};

export default NewestPosts;