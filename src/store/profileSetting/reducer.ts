import { IProfileAttr } from "../../utils/interface/profileSetting";
import {
  EDIT_PROFILE_IMAGE_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST,
  EDIT_PROFILE_IMAGE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
} from "./actionType";
import { UserProfileActions } from "./types";
interface IState {
  isLoading: boolean;
  profileData: IProfileAttr[];
}
const initialState: IState = {
  isLoading: false,
  profileData: [],
};

const userProfileReducers = (
  state = initialState,
  action: UserProfileActions
): unknown => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profileData: action.payload.data,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case EDIT_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    // case DELETE_TRANSACTION_REQUEST:
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case DELETE_TRANSACTION_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    // case DELETE_TRANSACTION_FAILURE:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.payload.error,
    //   };
    default:
      return state;
  }
};

export default userProfileReducers;
