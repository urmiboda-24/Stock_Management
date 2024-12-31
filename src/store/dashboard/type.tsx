import {
  GET_DASHBOARD_DATA_FAILURE,
  GET_DASHBOARD_DATA_REQUEST,
  GET_DASHBOARD_DATA_SUCCESS,
} from "./actionType";

export interface DashboardAttr {
  stock_name: string;
  current_value: string;
  status: string;
  average: string;
  day: string[];
  day_value: number[];
  week: string[];
  week_value: number[];
  month: string[];
  month_value: number[];
  year: number[];
  year_value: number[];
}

export interface GetDashboardSuccessPayload {
  success: boolean;
  status: number;
  data: DashboardAttr[];
}
export interface GetDashboardFailurePayload {
  error: string;
}
export interface GetDashboardRequest {
  type: typeof GET_DASHBOARD_DATA_REQUEST;
}

export interface GetDashboardSuccess {
  type: typeof GET_DASHBOARD_DATA_SUCCESS;
  payload: GetDashboardSuccessPayload;
}
export interface GetDashboardFailure {
  type: typeof GET_DASHBOARD_DATA_FAILURE;
  payload: GetDashboardFailurePayload;
}
export type DashboardAction =
  | GetDashboardRequest
  | GetDashboardSuccess
  | GetDashboardFailure;
