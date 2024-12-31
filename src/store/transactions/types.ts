import { IPagination } from "../../utils/interface/common";
import { ITransactionAttr } from "../../utils/interface/transactions";
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

export interface RowPerPagePayload {
  rowPerPagePage: number;
}

export interface GetTransactionPayload {
  value: IPagination;
  callback: any;
}

export interface GetTransactionRequest {
  type: typeof GET_TRANSACTION_LIST_REQUEST;
  payload: GetTransactionPayload;
}

export interface RowPerPageChange {
  type: typeof ROW_PER_PAGE_CHANGE;
  payload: RowPerPagePayload;
}
interface IUser {
  User: ITransactionAttr[];
  total: string;
}

interface IEditTransaction {
  bill_for: string;
  status: string;
  id: string;
}
export interface FailurePayload {
  error: string;
}
export interface GetTransactionSuccessPayload {
  success: boolean;
  status: number;
  data: IUser;
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
  payload: FailurePayload;
}

export interface EditTransactionPayload {
  value: IEditTransaction;
  callback: any;
}

export interface EditTransactionSuccessPayload {
  success: boolean;
  status: number;
  data: boolean;
}
export interface EditTransactionRequest {
  type: typeof EDIT_TRANSACTION_REQUEST;
  payload: EditTransactionPayload;
}

export interface EditTransactionSuccess {
  type: typeof EDIT_TRANSACTION_SUCCESS;
  payload: EditTransactionSuccessPayload;
}

export interface EditTransactionFailure {
  type: typeof EDIT_TRANSACTION_FAILURE;
  payload: FailurePayload;
}

export interface DeleteTransactionPayload {
  value: { id: string };
  callback: any;
}

export interface DeleteTransactionSuccessPayload {
  success: boolean;
  status: number;
}
export interface DeleteTransactionRequest {
  type: typeof DELETE_TRANSACTION_REQUEST;
  payload: DeleteTransactionPayload;
}

export interface DeleteTransactionFailure {
  type: typeof DELETE_TRANSACTION_FAILURE;
  payload: FailurePayload;
}

export interface DeleteTransactionSuccess {
  type: typeof DELETE_TRANSACTION_SUCCESS;
  payload: DeleteTransactionSuccessPayload;
}

export type TransactionsActions =
  | RowPerPageChange
  | GetTransactionRequest
  | GetTransactionSuccess
  | GetTransactionFailure
  | EditTransactionRequest
  | EditTransactionSuccess
  | EditTransactionFailure
  | DeleteTransactionRequest
  | DeleteTransactionFailure
  | DeleteTransactionSuccess;
