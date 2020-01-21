export const GET_MY_PROFILE_PENDING = 'GET_MY_PROFILE_PENDING';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export const GET_MY_PROFILE_FAILURE = 'GET_MY_PROFILE_FAILURE';

export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

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

export const getUsersFailure = () => ({
    type: GET_USERS_FAILURE,
});

export const registerUserPending = payload => ({
    type: REGISTER_USER_PENDING,
    payload
});

export const registerUserSuccess = payload => ({
    type: REGISTER_USER_SUCCESS,
    payload
});

export const registerUserFailure = () => ({
    type: REGISTER_USER_FAILURE
});

export const clearUser = () => ({
    type: CLEAR_USER
});
