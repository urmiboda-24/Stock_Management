import {
  GET_TRANSACTION_LIST_FAILURE,
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  ROW_PER_PAGE_CHANGE,
} from "./actionType";

import {
  GetTransactionFailurePayload,
  GetTransactionPayload,
  GetTransactionSuccessPayload,
  RowPerPagePayload,
} from "./types";

export const rowsPerPageChange = (payload: RowPerPagePayload) => ({
  type: ROW_PER_PAGE_CHANGE,
  payload,
});

export const getTransactionList = (callback: GetTransactionPayload) => ({
  type: GET_TRANSACTION_LIST_REQUEST,
  callback,
});

export const getTransactionListSuccess = (
  callback: GetTransactionSuccessPayload
) => ({
  type: GET_TRANSACTION_LIST_SUCCESS,
  callback,
});

export const getTransactionListFailure = (
  callback: GetTransactionFailurePayload
) => ({
  type: GET_TRANSACTION_LIST_FAILURE,
  callback,
});
// export const pageChange = (payload:)
