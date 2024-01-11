import axios from "./fetchConfig/axios";
import axiosInstance from "./fetchConfig/axios-instance";
export default {
  async getAnnouncement(requestConfig = {}) {
    return await axios().get("/api/announcement", requestConfig);
  },
  async postAnnouncement(requestConfig = {}) {
    return await axiosInstance().post("/api/announcement/", requestConfig);
  },
  async getMyAnnouncement(requestConfig = {}) {
    return await axiosInstance().get("/api/my-announcement/", requestConfig);
  },
};
