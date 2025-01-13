import {
  EditProfilePayload,
  GetUserProfilePayload,
  UpdateUserProfileImagePayload,
} from "../../store/profileSetting/types";

export interface IProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  num: number | null;
  city: string;
  state: string;
  zip: string;
}

export interface IProfileAttr {
  id: number;
  full_name: string;
  email: string;
  password: string;
  created_at: number;
  updated_at: number;
  user_id: null | number;
  first_name: null | string;
  last_name: null | string;
  birthday: null | string;
  gender: null | string;
  phone_number: null | string;
  address: null | string;
  block_no: null | string;
  city: null | string;
  state: null | string;
  profile_pic: null | string;
  cover_pic: null | string;
  zip: null | string;
  company_news: null | string;
  account_activity: null | string;
  meetups: null | string;
}
export interface IUpdateProfileImagPayload {
  file: File;
}

export interface IUserProfileContainerDispatch {
  getUserProfileRequest: (callback: GetUserProfilePayload) => {};
  editUserProfilePhotoRequest: (payload: UpdateUserProfileImagePayload) => {};
  editProfileRequest: (payload: EditProfilePayload) => {};
}
