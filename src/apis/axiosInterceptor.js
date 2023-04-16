import axios from "axios";
import { GetToken } from "../authentication/LocalStorageManager";

export const axiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = GetToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

export default axiosInterceptor;