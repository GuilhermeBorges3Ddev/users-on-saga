import { takeEvery, takeLatest, call, fork, put } from "redux-saga/effects";

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

function* createUser(action) {
  try {
      yield call(api.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName });
      yield call(getUsers);
  } catch (e) {
    console.error(e);
  }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

const userSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
];

export default userSagas;