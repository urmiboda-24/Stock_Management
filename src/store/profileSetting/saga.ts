import { all, call, put, takeLatest } from "redux-saga/effects";
import service from "./services";

import {
  EditProfileRequest,
  EditProfileSuccessPayload,
  GetUserProfileRequest,
  GetUserProfileSuccessPayload,
  UpdateUserProfileImageRequest,
  UpdateUserProfileImageSuccessPayload,
} from "./types";
import {
  editProfileFailure,
  editProfileSuccess,
  editUserProfilePhotoFailure,
  editUserProfilePhotoSuccess,
  getUserProfileFailure,
  getUserProfileSuccess,
} from "./action";
import {
  EDIT_PROFILE_IMAGE_REQUEST,
  EDIT_PROFILE_REQUEST,
  GET_PROFILE_REQUEST,
} from "./actionType";

function* getUserProfileSaga(action: GetUserProfileRequest) {
  try {
    const response: GetUserProfileSuccessPayload = yield call(
      service.getUserProfile
    );
    yield put(
      getUserProfileSuccess({
        data: response.data,
        success: response.success,
        status: response.status,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getUserProfileFailure({
        error: e.message,
      })
    );
  }
}

function* editUserProfileImageSaga(action: UpdateUserProfileImageRequest) {
  try {
    const response: UpdateUserProfileImageSuccessPayload = yield call(
      service.editUserProfileImage,
      action.payload.value
    );

    yield put(
      editUserProfilePhotoSuccess({
        success: response.success,
        status: response.status,
        message: response.message,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      editUserProfilePhotoFailure({
        error: e.message,
      })
    );
  }
}

function* editProfileSaga(action: EditProfileRequest) {
  try {
    const { firstName, lastName, birthDate, phone, num, ...value } =
      action.payload.value;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      birthday: birthDate,
      phone_number: phone,
      block_no: num,
      ...value,
    };
    const response: EditProfileSuccessPayload = yield call(
      service.editProfile,
      payload
    );
    yield put(
      editProfileSuccess({
        success: response.success,
        status: response.status,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      editProfileFailure({
        error: e.message,
      })
    );
  }
}

function* userProfileSaga() {
  yield all([takeLatest(GET_PROFILE_REQUEST, getUserProfileSaga)]);
  yield all([takeLatest(EDIT_PROFILE_IMAGE_REQUEST, editUserProfileImageSaga)]);
  yield all([takeLatest(EDIT_PROFILE_REQUEST, editProfileSaga)]);
}

export default userProfileSaga;
