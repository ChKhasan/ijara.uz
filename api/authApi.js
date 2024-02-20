import axios from "./fetchConfig/axios";
import axiosInstance from "./fetchConfig/axios-instance";
export default {
  async getuserInfo(requestConfig = {}) {
    return await axiosInstance().get("/api/users/me", requestConfig);
  },
  async postRegister(requestConfig = {}) {
    return await axios().post("/register/", requestConfig);
  },
  async postLogin(requestConfig = {}) {
    return await axios().post("/api/token/", requestConfig);
  },
  async putUserInfo(requestConfig = {}) {
    return await axiosInstance().put(
      `/api/users/${requestConfig.id}/`,
      requestConfig.data
    );
  },
};
