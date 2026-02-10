import { takeEvery, call, fork, put } from "redux-saga/effects";

import * as api from "../api/users";
import * as actions from "../actions/users";

function* getUsers() {
    try {  
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({
            items: result.data,
        }));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

const userSagas = [
    fork(watchGetUsersRequest),
];

export default userSagas;