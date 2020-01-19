import axios from "axios";

export const HOST = "http://localhost:8000";

export const getAllPostsApi = () => {
    return axios.get(`${HOST}/posts`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const addPostApi = (body) => {
    const token = localStorage.token;

    return axios.post(`${HOST}/posts/add`, body, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

export const deletePostApi = (id) => {
    return axios.delete(`${HOST}/posts/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const getSinglePostApi = (id) => {
    return axios.get(`${HOST}/posts/${id}`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const editPostApi = (id, body) => {
    return axios.patch(`${HOST}/posts/${id}`, body, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const loginPostApi = body => {
    return axios.post(`${HOST}/users/login`, body, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const getMyProfileApi = id => {
    const token = localStorage.token;

    return axios.get(`${HOST}/users/me`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const logoutAllApi = body => {
    const token = localStorage.token;

    return axios.post(`${HOST}/users//me/logoutall`, body, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
};

export const getRelatedPostsApi = body => {
    // const token = localStorage.token;

    return axios.post(`${HOST}/posts/related-posts`, body, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const getNewestPostsApi = () => {
    return axios.get(`${HOST}/posts/newest-posts`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};

export const getUsersApi = () => {
    return axios.get(`${HOST}/users/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
};