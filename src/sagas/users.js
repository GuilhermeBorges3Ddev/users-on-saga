import { takeEvery, takeLatest, call, fork, take, put } from "redux-saga/effects";

import * as api from "../api/users";
import * as actions from "../actions/users";

const loggingUserError = (error) => {
  console.error("Logging error: ", error?.message);
}

function* getUsers() {
    try {  
        const result = yield call(api.getUsers);
        yield put(actions.getUsersSuccess({
            items: result.data,
        }));
    } catch (e) {
        yield put(actions.usersError('Failed to fetch users'));
        loggingUserError(e);
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
    yield put(actions.usersError('Failed to create an user with name ' + action.payload.firstName + ' ' + action.payload.lastName));
    loggingUserError(e);
  }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser(userId) {
    try {
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    } catch (e) {
        yield put(actions.usersError('Failed to delete an user with id ' + userId));
        loggingUserError(e);
    }
}

function* watchDeleteUserRequest(){
    while(true){
        const {payload} = yield take(actions.Types.DELETE_USER_REQUEST);
        yield call(deleteUser, payload.userId);
    }
}

const userSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest),
];

export default userSagas;