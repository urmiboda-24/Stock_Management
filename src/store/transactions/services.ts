import baseService from "../../services/base-services";

const getTransactionList = async () => baseService.get("transaction");

export default {
  getTransactionList,
};
