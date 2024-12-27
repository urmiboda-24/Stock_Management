import { LoginPayload, SignUpPayload } from "../../store/auth/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  fullName: string;
}

export interface ILoginContainerDispatch {
  loginRequest: (payload: LoginPayload) => {};
}

export interface ISignUpContainerDispatch {
  signUpRequest: (payload: SignUpPayload) => {};
}
