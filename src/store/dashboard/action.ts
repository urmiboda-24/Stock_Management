import {
  GET_DASHBOARD_DATA_FAILURE,
  GET_DASHBOARD_DATA_REQUEST,
  GET_DASHBOARD_DATA_SUCCESS,
} from "./actionType";
import {
  GetDashboardFailure,
  GetDashboardFailurePayload,
  GetDashboardRequest,
  GetDashboardSuccess,
  GetDashboardSuccessPayload,
} from "./type";

export const getDashboardDataRequest = (): GetDashboardRequest => ({
  type: GET_DASHBOARD_DATA_REQUEST,
});

export const getDashboardDataSuccess = (
  payload: GetDashboardSuccessPayload
): GetDashboardSuccess => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  payload,
});

export const getDashboardDataFailure = (
  payload: GetDashboardFailurePayload
): GetDashboardFailure => ({
  type: GET_DASHBOARD_DATA_FAILURE,
  payload,
});
