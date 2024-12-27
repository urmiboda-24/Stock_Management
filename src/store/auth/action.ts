import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionType";

import {
  LoginPayload,
  LoginRequest,
  LoginSuccess,
  LoginSuccessPayload,
  LoginFailure,
  SignUpPayload,
  SignUpRequest,
  SignUpSuccess,
  SignUpSuccessPayload,
  FailurePayload,
  SignUpFailure,
} from "./types";

export const loginRequest = (payload: LoginPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: FailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const signUpRequest = (payload: SignUpPayload): SignUpRequest => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signUpSuccess = (
  payload: SignUpSuccessPayload
): SignUpSuccess => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const signUpFailure = (payload: FailurePayload): SignUpFailure => ({
  type: SIGNUP_FAILURE,
  payload,
});
