import { IProfile, IProfileAttr } from "../../utils/interface/profileSetting";
import {
  ADD_PROFILE_FAILURE,
  ADD_PROFILE_REQUEST,
  ADD_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_IMAGE_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST,
  EDIT_PROFILE_IMAGE_SUCCESS,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from "./actionType";

export interface GetUserProfilePayload {
  callback: any;
}

export interface FailurePayload {
  error: string;
}
export interface GetUserProfileSuccessPayload {
  success: boolean;
  status: number;
  data: IProfileAttr[];
}

export interface GetUserProfileRequest {
  type: typeof GET_PROFILE_REQUEST;
  payload: GetUserProfilePayload;
}

export interface GetUserProfileSuccess {
  type: typeof GET_PROFILE_SUCCESS;
  payload: GetUserProfileSuccessPayload;
}

export interface GetUserProfileFailure {
  type: typeof GET_PROFILE_FAILURE;
  payload: FailurePayload;
}

//PROFILE_IMG

export interface UpdateUserProfileImagePayload {
  value: { file: File };
  callback: any;
}

export interface UpdateUserProfileImageSuccessPayload {
  success: boolean;
  status: number;
  message: string;
}

export interface UpdateUserProfileImageRequest {
  type: typeof EDIT_PROFILE_IMAGE_REQUEST;
  payload: UpdateUserProfileImagePayload;
}

export interface UpdateUserProfileImageSuccess {
  type: typeof EDIT_PROFILE_IMAGE_SUCCESS;
  payload: UpdateUserProfileImageSuccessPayload;
}

export interface UpdateUserProfileImageFailure {
  type: typeof EDIT_PROFILE_IMAGE_FAILURE;
  payload: FailurePayload;
}

//EDIT_PROFILE
export interface EditProfilePayload {
  value: IProfile;
  callback: any;
}

export interface EditProfileSuccessPayload {
  success: boolean;
  status: number;
}

export interface EditProfileRequest {
  type: typeof EDIT_PROFILE_REQUEST;
  payload: EditProfilePayload;
}

export interface EditProfileSuccess {
  type: typeof EDIT_PROFILE_SUCCESS;
  payload: EditProfileSuccessPayload;
}

export interface EditProfileFailure {
  type: typeof EDIT_PROFILE_FAILURE;
  payload: FailurePayload;
}

//ADD_PROFILE
export interface AddProfilePayload {
  value: IProfile;
  callback: any;
}

export interface AddProfileSuccessPayload {
  success: boolean;
  status: number;
}

export interface AddProfileRequest {
  type: typeof ADD_PROFILE_REQUEST;
  payload: AddProfilePayload;
}

export interface AddProfileSuccess {
  type: typeof ADD_PROFILE_SUCCESS;
  payload: AddProfileSuccessPayload;
}

export interface AddProfileFailure {
  type: typeof ADD_PROFILE_FAILURE;
  payload: FailurePayload;
}

export type UserProfileActions =
  | GetUserProfileRequest
  | GetUserProfileSuccess
  | GetUserProfileFailure
  | UpdateUserProfileImageRequest
  | UpdateUserProfileImageSuccess
  | UpdateUserProfileImageFailure
  | EditProfileRequest
  | EditProfileSuccess
  | EditProfileFailure
  | AddProfileRequest
  | AddProfileSuccess
  | AddProfileFailure;
