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

import {
  AddProfileFailure,
  AddProfilePayload,
  AddProfileRequest,
  AddProfileSuccess,
  AddProfileSuccessPayload,
  EditProfileFailure,
  EditProfilePayload,
  EditProfileRequest,
  EditProfileSuccess,
  EditProfileSuccessPayload,
  FailurePayload,
  GetUserProfilePayload,
  GetUserProfileRequest,
  GetUserProfileSuccessPayload,
  UpdateUserProfileImageFailure,
  UpdateUserProfileImagePayload,
  UpdateUserProfileImageRequest,
  UpdateUserProfileImageSuccess,
  UpdateUserProfileImageSuccessPayload,
} from "./types";

export const getUserProfileRequest = (
  payload: GetUserProfilePayload
): GetUserProfileRequest => ({
  type: GET_PROFILE_REQUEST,
  payload,
});

export const getUserProfileSuccess = (
  payload: GetUserProfileSuccessPayload
) => ({
  type: GET_PROFILE_SUCCESS,
  payload,
});

export const getUserProfileFailure = (payload: FailurePayload) => ({
  type: GET_PROFILE_FAILURE,
  payload,
});

export const editUserProfilePhotoRequest = (
  payload: UpdateUserProfileImagePayload
): UpdateUserProfileImageRequest => ({
  type: EDIT_PROFILE_IMAGE_REQUEST,
  payload,
});

export const editUserProfilePhotoSuccess = (
  payload: UpdateUserProfileImageSuccessPayload
): UpdateUserProfileImageSuccess => ({
  type: EDIT_PROFILE_IMAGE_SUCCESS,
  payload,
});

export const editUserProfilePhotoFailure = (
  payload: FailurePayload
): UpdateUserProfileImageFailure => ({
  type: EDIT_PROFILE_IMAGE_FAILURE,
  payload,
});

export const editProfileRequest = (
  payload: EditProfilePayload
): EditProfileRequest => ({
  type: EDIT_PROFILE_REQUEST,
  payload,
});

export const editProfileSuccess = (
  payload: EditProfileSuccessPayload
): EditProfileSuccess => ({
  type: EDIT_PROFILE_SUCCESS,
  payload,
});

export const editProfileFailure = (
  payload: FailurePayload
): EditProfileFailure => ({
  type: EDIT_PROFILE_FAILURE,
  payload,
});

export const addProfileRequest = (
  payload: AddProfilePayload
): AddProfileRequest => ({
  type: ADD_PROFILE_REQUEST,
  payload,
});

export const addProfileSuccess = (
  payload: AddProfileSuccessPayload
): AddProfileSuccess => ({
  type: ADD_PROFILE_SUCCESS,
  payload,
});

export const addProfileFailure = (
  payload: FailurePayload
): AddProfileFailure => ({
  type: ADD_PROFILE_FAILURE,
  payload,
});
