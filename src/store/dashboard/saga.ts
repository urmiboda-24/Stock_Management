import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_DASHBOARD_DATA_REQUEST } from "./actionType";
import dashboardService from "./services";
import { GetDashboardSuccessPayload } from "./type";
import { getDashboardDataFailure, getDashboardDataSuccess } from "./action";
function* getDashboardSaga(action: any) {
  try {
    const response: GetDashboardSuccessPayload = yield call(
      dashboardService.getDashboard
    );

    yield put(getDashboardDataSuccess(response));
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getDashboardDataFailure({
        error: e.message,
      })
    );
  }
}

function* dashboardSaga() {
  yield all([takeLatest(GET_DASHBOARD_DATA_REQUEST, getDashboardSaga)]);
}

export default dashboardSaga;
