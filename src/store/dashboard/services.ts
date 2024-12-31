import baseService from "../../services/base-services";

const getDashboard = async () => baseService.get("getRandomStock");

export default {
  getDashboard,
};
