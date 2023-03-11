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

const handleSuccessResponse = (response) => {
  return response;
};

const handleErrorResponse = (error, setHasError) => {
  const errorMessage = error.response.data.message;
  // const errorTry = error.message;
  console.log("error: " + errorMessage);
  // console.log("errorTry", errorTry);
  setHasError({
    open: true,
    message: errorMessage,
  });
  return Promise.reject(error);
};

export const registerIntercepts = (setHasError) => {
  axiosApiGlobal.interceptors.response.use(handleSuccessResponse, (error) =>
    handleErrorResponse(error, setHasError)
  );
};

export default axiosApiGlobal;