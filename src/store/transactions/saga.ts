import { all, call, put, takeLatest } from "redux-saga/effects";
import service from "./services";
import {
  deleteTransactionFailure,
  deleteTransactionSuccess,
  editTransactionSuccess,
  getTransactionListFailure,
  getTransactionListSuccess,
} from "./action";
import {
  DELETE_TRANSACTION_REQUEST,
  EDIT_TRANSACTION_REQUEST,
  GET_TRANSACTION_LIST_REQUEST,
} from "./actionType";
import {
  DeleteTransactionRequest,
  DeleteTransactionSuccessPayload,
  EditTransactionRequest,
  EditTransactionSuccessPayload,
  GetTransactionRequest,
  GetTransactionSuccessPayload,
} from "./types";

function* getTransactionListSaga(action: GetTransactionRequest) {
  try {
    const response: GetTransactionSuccessPayload = yield call(
      service.getTransactionList,
      {
        search: action.payload.value.search,
        sortBy: action.payload.value.sortBy,
        sortOrder: action.payload.value.sortOrder.toUpperCase(),
        page: action.payload.value.page,
        pageSize: action.payload.value.pageSize,
      }
    );
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

function* editTransactionSaga(action: EditTransactionRequest) {
  const { bill_for, status, id } = action.payload.value;
  try {
    const response: EditTransactionSuccessPayload = yield call(
      service.editTransaction,
      {
        bill_title: bill_for,
        status: status,
        id: id,
      }
    );

    yield put(
      editTransactionSuccess({
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

function* deleteTransactionListSaga(action: DeleteTransactionRequest) {
  try {
    const response: DeleteTransactionSuccessPayload = yield call(
      service.deleteTransaction,
      action.payload.value
    );
    yield put(
      deleteTransactionSuccess({
        success: response.success,
        status: response.status,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      deleteTransactionFailure({
        error: e.message,
      })
    );
  }
}

function* transactionsSaga() {
  yield all([takeLatest(GET_TRANSACTION_LIST_REQUEST, getTransactionListSaga)]);
  yield all([takeLatest(EDIT_TRANSACTION_REQUEST, editTransactionSaga)]);
  yield all([
    takeLatest(DELETE_TRANSACTION_REQUEST, deleteTransactionListSaga),
  ]);
}

export default transactionsSaga;
