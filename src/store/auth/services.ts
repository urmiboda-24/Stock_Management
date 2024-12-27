import baseService from "../../services/base-services";

const login = async (payload: { email: string; password: string }) =>
  baseService.post("signIn", payload);

const signUp = async (payload: {
  email: string;
  password: string;
  full_name: string;
}) => baseService.post("signUp", payload);

export default {
  login,
  signUp,
};
