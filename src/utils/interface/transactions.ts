import {
  GetTransactionPayload,
  RowPerPagePayload,
} from "../../store/transactions/types";

export interface ITransactionInitialState {
  rowPerPage: number;
  pageNumber: number;
  transactionList: [];
  isLoading: boolean;
}

export interface ITransactionContainerDispatch {
  rowsPerPageChange: (payload: RowPerPagePayload) => {};
  getTransactionList: (callback: GetTransactionPayload) => {};
}
