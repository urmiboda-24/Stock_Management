import baseService from "../../services/base-services";
import { IPagination } from "../../utils/interface/common";
import { IEditTransaction } from "../../utils/interface/transactions";

const getTransactionList = async (payload: IPagination) =>
  baseService.post("transaction", payload);

const editTransaction = async (payload: IEditTransaction) =>
  baseService.post("editTransaction", {
    title: payload.bill_title,
    status: payload.status,
    id: payload.id,
  });

const deleteTransaction = async (payload: { id: string }) =>
  baseService.post("deleteTransaction", payload);

export default {
  getTransactionList,
  editTransaction,
  deleteTransaction,
};
