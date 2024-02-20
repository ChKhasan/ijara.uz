import axios from "axios";
import { useRouter } from "vue-router";

const axiosInstance = (app) => {
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.BASE_URL,
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  axiosInstance.interceptors.request.use((config) => {
    // console.log("API onRequest:", config);
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const handleError = {
        statusCode: error.response.status,
        message: error.response.statusText,
      };
      if (error.response && error.response.status == 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/");
      }
      throw handleError;
      // return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default axiosInstance;
