import {createSelector} from 'reselect';

export const selectPosts = state => state.posts;

export const getAllPosts = createSelector(
    selectPosts,
    state => state.posts
);

export const getSinglePostSelector = createSelector(
    selectPosts,
    state => state.singlePost
);

export const getRelatedPostsSelector = createSelector(
    selectPosts,
    state => state.relatedPosts
);

export const getNewestPostsSelector = createSelector(
    selectPosts,
    state => state.newestPosts,
);