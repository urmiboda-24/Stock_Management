import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/saga";
import transactionsSaga from "./transactions/saga";
import dashboardSaga from "./dashboard/saga";

export function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(transactionsSaga)]);
  yield all([fork(dashboardSaga)]);
}
