import axios from "./fetchConfig/axios";
import axiosInstance from "./fetchConfig/axios-instance";
export default {
  async getBusRoutes(requestConfig = {}) {
    return await axios().get("/api/proxy", requestConfig);
  },
  async getBusRoute(requestConfig = {}) {
    return await axios().get("/api/proxy", requestConfig);
  },
  async postBusRoutes(requestConfig = {}) {
    return await axios().post("/api/proxy/", requestConfig);
  },
  async portTransport(requestConfig = {}) {
    return await axiosInstance().post("/api/transport/", requestConfig);
  },
  async getTransport(requestConfig = {}) {
    return await axios().get("/api/transport/", requestConfig);
  },
  async searchLeaflet(requestConfig = {}) {
    return await axios().get(
      "https://nominatim.openstreetmap.org/search",
      requestConfig
    );
  },
};
