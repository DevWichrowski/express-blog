import {all} from "@redux-saga/core/effects";
import postsSaga from "./posts.saga";
import authSaga from "./auth.saga";
import usersSaga from "./users.saga";

function* rootSaga() {
    yield all([
        postsSaga(),
        authSaga(),
        usersSaga(),
    ]);
}

export default rootSaga;