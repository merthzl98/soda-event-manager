import axios from "axios";

//Set Global baseURL
const axiosApiGlobal = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//Set Global Token in Axios
axiosApiGlobal.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiGlobal;
