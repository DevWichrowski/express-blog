import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getAllPosts, getSinglePostSelector } from "../../store/selectors/posts.selectors";
import { deletePostPending, getPostsPending, getSinglePostPending } from "../../store/actions/posts.actions";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { getMyProfilePending } from "../../store/actions/users.actions";
import Slider from 'react-slick';
import "./Home.scss"

const Home = (props) => {
    const history = useHistory();

    useEffect(() => {
        props.getAllPosts();
    }, []);

    const editPost = id => history.push(`/edit-post/${id}`);
    const goToPost = post => history.push(`/single-post/${post._id}`);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        swipeToSlide: false,
        draggable: false,
        speed: 1500,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };
    let topThree = null;
    let rest = null;

    if (props.allPosts.length !== 0) {
        const a = [...props.allPosts];
        a.sort(function (a, b) { return b.views - a.views });
        topThree = a.splice(0, 3);
        rest = a.splice(3);
        rest.sort(function(a, b){return new Date(b.date)- new Date(a.date)});
    }

    return (
        <div style={{ paddingTop: 30 }}>
            {topThree !== null ?
                <div className="slider">
                    <Slider {...settings} style={{ height: 400 }}>
                        {topThree.map((post, index) => {
                            return (
                                <div key={post._id} className="image-cont" onClick={() => goToPost(post)}>
                                    <img src={post.imageUrl} className="cover-image" />
                                    <div className="post-title">{post.title}</div>
                                </div>
                            )
                        })}
                    </Slider>
                </div> : null}
            {rest !== null ?
                <div className="rest-posts">
                    {rest.map((post, index) => {
                        return (
                            <div key={post._id} className="post" onClick={() => goToPost(post)}>
                                <div class="image-conte">
                                <img src={post.imageUrl}/>
                                    </div>
                                </div>
                        )
                    })}
                </div> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

