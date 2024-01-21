import axiosInstance from "./fetchConfig/axios-instance";
import axios from "./fetchConfig/axios";
export default {
  async postComment(requestConfig = {}) {
    return await axiosInstance().post("/api/comment/", requestConfig);
  },
  async getComment(requestConfig = {}) {
    return await axios().get("/api/comment/", requestConfig);
  },
  async deleteComment(requestConfig = {}) {
    return await axiosInstance().delete(
      "/api/comment/" + requestConfig.id,
      requestConfig
    );
  },
};
