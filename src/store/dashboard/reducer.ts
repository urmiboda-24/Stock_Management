import {
  GET_DASHBOARD_DATA_FAILURE,
  GET_DASHBOARD_DATA_REQUEST,
  GET_DASHBOARD_DATA_SUCCESS,
} from "./actionType";
import { DashboardAction, DashboardAttr } from "./type";
interface IState {
  isLoading: boolean;
  dashboardData: DashboardAttr[];
}

const initialState: IState = {
  isLoading: false,
  dashboardData: [],
};

const dashboardReducers = (
  state = initialState,
  action: DashboardAction
): unknown => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        error: "",
        dashboardData: action.payload.data,
        isLoading: false,
      };
    case GET_DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducers;
