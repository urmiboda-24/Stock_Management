import { ITransactionInitialState } from "../../utils/interface/transactions";
import {
  GET_TRANSACTION_LIST_FAILURE,
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  ROW_PER_PAGE_CHANGE,
} from "./actionType";

import { TransactionsActions } from "./types";

const initialState: ITransactionInitialState = {
  rowPerPage: 10,
  pageNumber: 1,
  transactionList: [],
  isLoading: false,
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
      console.log(action.payload.data, "abc");

      return {
        ...state,
        isLoading: false,
        transactionList: action.payload.data,
      };
    case GET_TRANSACTION_LIST_FAILURE:
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
