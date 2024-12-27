import { all, call, put, takeLatest } from "redux-saga/effects";
import { LoginResponse, SignUpResponse } from "./types";
import {
  loginFailure,
  loginSuccess,
  signUpFailure,
  signUpSuccess,
} from "./action";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./actionType";
import authService from "./services";

function* loginSaga(action: any) {
  try {
    const response: LoginResponse = yield call(authService.login, {
      email: action.payload.values.email,
      password: action.payload.values.password,
    });

    yield put(loginSuccess(response));
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.message,
      })
    );
  }
}

function* signUpSaga(action: any) {
  try {
    const response: SignUpResponse = yield call(authService.signUp, {
      email: action.payload.values.email,
      password: action.payload.values.password,
      full_name: action.payload.values.full_name,
    });

    yield put(signUpSuccess(response));

    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      signUpFailure({
        error: e.message,
      })
    );
  }
}

function* authSaga() {
  yield all([takeLatest(LOGIN_REQUEST, loginSaga)]);
  yield all([takeLatest(SIGNUP_REQUEST, signUpSaga)]);
}

export default authSaga;
