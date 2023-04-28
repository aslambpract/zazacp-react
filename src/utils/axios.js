import axios from "axios";
import { HOST_API } from "../config";

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isSubAdmin");
      localStorage.removeItem("isImpersonate");
      return (window.location = "/auth/login");
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers.Authorization = "Bearer " + token;
    config.headers["front-end-path"] = window.location.pathname;
  }
  return config;
});

export default axiosInstance;
