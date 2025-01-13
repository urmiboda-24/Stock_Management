import baseService from "../../services/base-services";
import {
  IProfile,
  IUpdateProfileImagPayload,
} from "../../utils/interface/profileSetting";

const getUserProfile = async () => baseService.get(`getUserProfile`);

const editUserProfileImage = async (payload: IUpdateProfileImagPayload) => {
  const formData = new FormData();
  formData.append("image1", payload.file);

  return baseService.post("updateProfilePic", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const editProfile = async (payload: any) =>
  baseService.post("updateUserInfo", payload);

export default {
  getUserProfile,
  editUserProfileImage,
  editProfile,
};
