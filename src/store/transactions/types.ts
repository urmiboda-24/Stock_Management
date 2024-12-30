import {
  GET_TRANSACTION_LIST_FAILURE,
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  ROW_PER_PAGE_CHANGE,
} from "./actionType";

//LOGIN
export interface RowPerPagePayload {
  rowPerPagePage: number;
}

export interface GetTransactionPayload {
  callback: any;
}

export interface RowPerPageChange {
  type: typeof ROW_PER_PAGE_CHANGE;
  payload: RowPerPagePayload;
}

export interface GetTransactionSuccessPayload {
  success: boolean;
  status: number;
  data: [
    {
      id: number;
      user_id: number;
      bill_title: string;
      issue_date: string;
      due_date: string;
      total: number;
      status: string;
    }
  ];
}

export interface GetTransactionFailurePayload {
  error: string;
}

export interface GetTransactionRequest {
  type: typeof GET_TRANSACTION_LIST_REQUEST;
  payload: GetTransactionPayload;
}

export interface GetTransactionSuccess {
  type: typeof GET_TRANSACTION_LIST_SUCCESS;
  payload: GetTransactionSuccessPayload;
}

export interface GetTransactionFailure {
  type: typeof GET_TRANSACTION_LIST_FAILURE;
  payload: GetTransactionFailurePayload;
}

export type TransactionsActions =
  | RowPerPageChange
  | GetTransactionRequest
  | GetTransactionSuccess
  | GetTransactionFailure;
