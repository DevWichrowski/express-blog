import {getMyProfileApi, getUsersApi, postUser} from "../../core/api";
import {all, put, takeLatest} from "@redux-saga/core/effects";
import {
    getMyProfileFailure,
    getMyProfileSuccess,
    getUsersFailure,
    getUsersSuccess, registerUserFailure,
    registerUserSuccess
} from "../actions/users.actions";


function* getMyProfileGen(action) {
    try {
        const response = yield getMyProfileApi(action.payload);
        const data = yield response.data;

        yield put(getMyProfileSuccess(data))
    } catch (e) {
        console.log('error', e);
        getMyProfileFailure(e)
    }
}

function* getUsersGen(action) {
    try {
        const response = yield getUsersApi(action.payload);
        const data = yield response.data;

        yield put(getUsersSuccess(data));
    } catch (e) {
        console.log('Error', e);
        yield put(getUsersFailure(e))
    }
}

function* registerUserGen(action) {
    try {
        const response = yield postUser(action.payload);
        const data = yield response.data;

        yield put(registerUserSuccess(data))
    } catch (e) {
        console.log('error', e);
        registerUserFailure(e)
    }
}

export default function* usersSaga() {
    yield all([
        yield takeLatest('GET_MY_PROFILE_PENDING', getMyProfileGen),
        yield takeLatest('GET_USERS_PENDING', getUsersGen),
        yield takeLatest('REGISTER_USER_PENDING', registerUserGen)
    ]);
}