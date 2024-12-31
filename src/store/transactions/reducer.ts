import { ITransactionInitialState } from "../../utils/interface/transactions";
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

import { TransactionsActions } from "./types";

const initialState: ITransactionInitialState = {
  rowPerPage: 5,
  pageNumber: 1,
  isLoading: false,
  total: 0,
};

const transactionsReducers = (
  state = initialState,
  action: TransactionsActions
): unknown => {
  switch (action.type) {
    case ROW_PER_PAGE_CHANGE:
      return {
        ...state,
        rowPerPage: action.payload.rowPerPagePage,
      };
    case GET_TRANSACTION_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        total: +action.payload.data.total,
      };
    case GET_TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case EDIT_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_TRANSACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default transactionsReducers;
