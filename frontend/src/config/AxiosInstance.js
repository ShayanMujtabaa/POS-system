import axios from "axios";
import useUserStore from "../ZustState/User";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000", // Base URL of your backend
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const { userToken } = useUserStore.getState();
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
});

export default axiosInstance;
