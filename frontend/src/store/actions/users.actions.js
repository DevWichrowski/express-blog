export const GET_MY_PROFILE_PENDING = 'GET_MY_PROFILE_PENDING';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export const GET_MY_PROFILE_FAILURE = 'GET_MY_PROFILE_FAILURE';

export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const CLEAR_USER = "CLEAR_USER";

export const getMyProfilePending = payload => ({
    type: GET_MY_PROFILE_PENDING,
    payload
});

export const getMyProfileSuccess = payload => ({
    type: GET_MY_PROFILE_SUCCESS,
    payload
});

export const getMyProfileFailure = payload => ({
    type: GET_MY_PROFILE_FAILURE,
    payload
});


export const getUsersPending = payload => ({
    type: GET_USERS_PENDING,
    payload
});

export const getUsersSuccess = payload => ({
    type: GET_USERS_SUCCESS,
    payload
});

export const getUsersFailure = payload => ({
    type: GET_USERS_FAILURE,
    payload
});

export const clearUser = () => ({
    type: CLEAR_USER
});
