import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "./actionType";

import { AuthActions } from "./types";
export interface IAuthState {
  pending: boolean;
  token: string;
  error: string | null;
  userEmail: string;
  isAuthenticated: boolean;
  role: string;
  userId: string;
  userName: string;
}
const initialState: IAuthState = {
  pending: false,
  token: "",
  error: null,
  userEmail: "",
  isAuthenticated: false,
  role: "",
  userId: "",
  userName: "",
};

const reducers = (state = initialState, action: AuthActions): unknown => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.token,
        error: null,
        isAuthenticated: true,
        role: action.payload.data[0].email.includes("admin") ? "admin" : "user",
        userEmail: action.payload.data[0].email,
        userId: action.payload.data[0].id,
        userName: action.payload.data[0].full_name,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        token: "",
        error: action.payload.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        pending: false,
        token: "",
        error: "",
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        pending: false,
        token: "",
        error: action.payload.error,
      };
    // case SET_AUTH_INFO:
    //   return {
    //     ...state,
    //     token: "",
    //     userEmail: "",
    //   };
    default:
      return state;
  }
};

export default reducers;
