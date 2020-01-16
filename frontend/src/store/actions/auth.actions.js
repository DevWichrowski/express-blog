export const LOGIN_PENDING = "LOGIN_PENDING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_ALL_PENDING = "LOGOUT_ALL_PENDING";
export const LOGOUT_ALL_SUCCESS = "LOGOUT_ALL_SUCCESS";
export const LOGOUT_ALl_FAILURE = "LOGOUT_ALl_FAILURE";


export const loginPending = payload => ({
    type: LOGIN_PENDING,
    payload,
});

export const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload,
});

export const loginFailure = payload => ({
    type: LOGIN_FAILURE,
    payload
});

export const logoutAllPending = payload => ({
    type: LOGOUT_ALL_PENDING,
    payload
});

export const logoutAllSuccess = payload => ({
    type: LOGOUT_ALL_SUCCESS,
    payload
});

export const logoutAllFailure = payload => ({
    type: LOGOUT_ALl_FAILURE,
    payload
});