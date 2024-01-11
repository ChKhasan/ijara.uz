import axiosInstance from "./fetchConfig/axios";
export default {
  async postRegister(requestConfig = {}) {
    return await axiosInstance().post("/register/", requestConfig);
  },
  async postLogin(requestConfig = {}) {
    return await axiosInstance().post("/api/token/", requestConfig);
  },
};
