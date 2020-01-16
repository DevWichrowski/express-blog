import {addPostApi, loginPostApi, logoutAllApi} from "../../core/api";
import {addPostFailure, addPostSuccess} from "../actions/posts.actions";
import {all, put, takeLatest} from "@redux-saga/core/effects";
import {loginFailure, loginSuccess, logoutAllFailure, logoutAllSuccess} from "../actions/auth.actions";
import {clearUser, getMyProfilePending} from "../actions/users.actions";


function* loginGen(action) {
    try {
        const response = yield loginPostApi(action.payload);
        const data = yield response.data;

        yield put(loginSuccess(data))
        yield put(getMyProfilePending())
    } catch (e) {
        console.log('error', e);
        loginFailure(e)
    }
}

function* logoutAllGen(action) {
    try {
        const response = yield logoutAllApi(action.payload);
        const data = yield response.data;
        yield put(logoutAllSuccess(data))
        yield put(clearUser())
    } catch (e) {
        console.log('error', e);
        logoutAllFailure(e)
    }
}

export default function* authSaga() {
    yield all([
        yield takeLatest('LOGIN_PENDING', loginGen),
        yield takeLatest('LOGOUT_ALL_PENDING', logoutAllGen),
    ]);
}