import {
  DeleteTransactionPayload,
  EditTransactionPayload,
  GetTransactionPayload,
  RowPerPagePayload,
} from "../../store/transactions/types";

export interface ITransactionInitialState {
  rowPerPage: number;
  pageNumber: number;
  isLoading: boolean;
  total: number;
}
export interface ITransactionAttr {
  id: number;
  user_id: number;
  bill_title: string;
  issue_date: string;
  due_date: string;
  total: number;
  status: string;
}
export interface ITableColumn {
  id: keyof ITransactionAttr;
  label: string;
}

export interface IEditTransaction {
  bill_title: string;
  status: string;
  id: string;
}

export interface ITransactionContainerDispatch {
  rowsPerPageChange: (payload: RowPerPagePayload) => {};
  getTransactionList: (callback: GetTransactionPayload) => {};
  editTransactionRequest: (payload: EditTransactionPayload) => {};
  deleteTransactionRequest: (payload: DeleteTransactionPayload) => {};
}
