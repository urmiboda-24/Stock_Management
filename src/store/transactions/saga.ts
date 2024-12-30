import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST } from "../auth/actionType";
import service from "./services";
import { getTransactionListFailure, getTransactionListSuccess } from "./action";
import { GET_TRANSACTION_LIST_REQUEST } from "./actionType";
import { GetTransactionSuccessPayload } from "./types";

function* transactionSaga(action: any) {
  try {
    const response: GetTransactionSuccessPayload = yield call(
      service.getTransactionList
    );
    console.log("abc=>saga", response);

    yield put(
      getTransactionListSuccess({
        data: response.data,
        success: response.success,
        status: response.status,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getTransactionListFailure({
        error: e.message,
      })
    );
  }
}

function* transactionsSaga() {
  yield all([takeLatest(GET_TRANSACTION_LIST_REQUEST, transactionSaga)]);
}

export default transactionsSaga;
