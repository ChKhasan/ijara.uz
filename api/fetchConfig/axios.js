import axios from "axios";
import { useRouter } from "vue-router";

const axiosInstance = (app) => {
  const runtimeConfig = useRuntimeConfig()
  console.log();
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.BASE_URL
    //   headers: { Authorization: `Bearer tolemn` },
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
      // const handleError = {
      //   statusCode: error.response.status,
      //   message: error.response.statusText,
      // };
      // throw handleError;
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default axiosInstance;
