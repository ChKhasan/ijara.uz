import axiosInstance from "./fetchConfig/axios-instance";
export default {
  async postLike(requestConfig = {}) {
    return await axiosInstance().post("/api/like/", requestConfig);
  },
  async getLike(requestConfig = {}) {
    return await axiosInstance().get("/api/like/", requestConfig);
  },
  async deleteLike(requestConfig = {}) {
    return await axiosInstance().delete(
      "/api/like/" + requestConfig.id,
      requestConfig
    );
  },
};
