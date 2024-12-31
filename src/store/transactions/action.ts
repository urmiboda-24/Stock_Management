import {
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_FAILURE,
  EDIT_TRANSACTION_REQUEST,
  EDIT_TRANSACTION_SUCCESS,
  GET_TRANSACTION_LIST_FAILURE,
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  ROW_PER_PAGE_CHANGE,
} from "./actionType";

import {
  DeleteTransactionFailure,
  DeleteTransactionPayload,
  DeleteTransactionRequest,
  DeleteTransactionSuccess,
  DeleteTransactionSuccessPayload,
  EditTransactionFailure,
  EditTransactionPayload,
  EditTransactionRequest,
  EditTransactionSuccess,
  EditTransactionSuccessPayload,
  FailurePayload,
  GetTransactionPayload,
  GetTransactionRequest,
  GetTransactionSuccessPayload,
  RowPerPagePayload,
} from "./types";

export const rowsPerPageChange = (payload: RowPerPagePayload) => ({
  type: ROW_PER_PAGE_CHANGE,
  payload,
});

export const getTransactionList = (
  payload: GetTransactionPayload
): GetTransactionRequest => ({
  type: GET_TRANSACTION_LIST_REQUEST,
  payload,
});

export const getTransactionListSuccess = (
  payload: GetTransactionSuccessPayload
) => ({
  type: GET_TRANSACTION_LIST_SUCCESS,
  payload,
});

export const getTransactionListFailure = (payload: FailurePayload) => ({
  type: GET_TRANSACTION_LIST_FAILURE,
  payload,
});

export const editTransactionRequest = (
  payload: EditTransactionPayload
): EditTransactionRequest => ({
  type: EDIT_TRANSACTION_REQUEST,
  payload,
});

export const editTransactionSuccess = (
  payload: EditTransactionSuccessPayload
): EditTransactionSuccess => ({
  type: EDIT_TRANSACTION_SUCCESS,
  payload,
});

export const editTransactionFailure = (
  payload: FailurePayload
): EditTransactionFailure => ({
  type: EDIT_TRANSACTION_FAILURE,
  payload,
});

export const deleteTransactionRequest = (
  payload: DeleteTransactionPayload
): DeleteTransactionRequest => ({
  type: DELETE_TRANSACTION_REQUEST,
  payload,
});

export const deleteTransactionSuccess = (
  payload: DeleteTransactionSuccessPayload
): DeleteTransactionSuccess => ({
  type: DELETE_TRANSACTION_SUCCESS,
  payload,
});

export const deleteTransactionFailure = (
  payload: FailurePayload
): DeleteTransactionFailure => ({
  type: DELETE_TRANSACTION_FAILURE,
  payload,
});
