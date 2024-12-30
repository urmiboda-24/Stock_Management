/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AppRoutings } from "../utils/enums/app-routings";
import { HttpStatusCodes } from "../utils/enums/http-status-codes";
import {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  SOMETHING_WENT_WRONG,
} from "../utils/constants/constant";
import { hideLoader } from "../utils/helper";
import Config, { NODE_ENV_TYPES } from "../config";
import { showToast } from "../component/toast";

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let isTokenRequired = true;
    if (config.url?.includes(AppRoutings.LogIn)) {
      isTokenRequired = false;
    }
    if (isTokenRequired === true) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.auth_token = `${token}`;
      }
    }

    if (config.url) {
      config.url = Config.env.BaseUrl + config.url;
    }

    if (config.url) {
      config.headers["Cache-Control"] =
        "no-cache, no-store, must-revalidate, post-check=0, pre-check=0";
      config.headers.Pragma = "no-cache";
      config.headers.Expires = "0";
    }

    return config;
  },
  (error: AxiosError) => {
    hideLoader();
    showToast(error.message, "error");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    hideLoader();
    return response.data;
  },
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCodes.Unauthorized:
        showToast(UNAUTHORIZED, "error");
        break;
      case HttpStatusCodes.BadRequest:
        if ((error?.response?.data as any).validation.body.message) {
          const errorArray = (
            error?.response?.data as any
          ).validation.body.message
            .split(". ")
            .map((error: string) => error.replace(/"/g, ""));
          errorArray.map((error: string) => {
            showToast(error, "error");
          });
        }
        break;
      case HttpStatusCodes.InternalServerError:
        if (Config.env.NodeEnv === NODE_ENV_TYPES.Development) {
          showToast(INTERNAL_SERVER_ERROR, "error");
        } else {
          showToast(SOMETHING_WENT_WRONG, "error");
        }
        break;
      case HttpStatusCodes.NotFound:
        showToast(
          error.response?.data
            ? (error?.response?.data as any).message.toString()
            : error.message,
          "error"
        );
        break;
      default:
        showToast(
          error.response?.data
            ? error.response?.data?.toString()
            : error.message,
          "error"
        );
        break;
    }

    hideLoader();

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
