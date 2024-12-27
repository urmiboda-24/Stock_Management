import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

//LOGIN
export interface LoginPayload {
  values: { email: string; password: string };
  callback: any;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  data: [
    {
      id: number;
      full_name: string;
      email: string;
      created_at: number;
      updated_at: number;
    }
  ];
  token: string;
  message: string;
}

export interface LoginSuccessPayload {
  success: boolean;
  status: number;
  data: [
    {
      id: number;
      full_name: string;
      email: string;
      created_at: number;
      updated_at: number;
    }
  ];
  token: string;
  message: string;
}

export interface FailurePayload {
  error: string;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginPayload;
}

export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailure = {
  type: typeof LOGIN_FAILURE;
  payload: FailurePayload;
};

//SIGNUP
export interface SignUpPayload {
  values: { email: string; password: string; full_name: string };
  callback: any;
}

export interface SignUpSuccessPayload {
  success: boolean;
  status: number;
  message: string;
}

export interface SignUpResponse {
  success: boolean;
  status: number;
  message: string;
}

export type SignUpRequest = {
  type: typeof SIGNUP_REQUEST;
  payload: SignUpPayload;
};

export type SignUpSuccess = {
  type: typeof SIGNUP_SUCCESS;
  payload: SignUpSuccessPayload;
};

export type SignUpFailure = {
  type: typeof SIGNUP_FAILURE;
  payload: FailurePayload;
};

// export type AuthInfo = {
//   type: typeof SET_AUTH_INFO;
// };

export type AuthActions =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure;
