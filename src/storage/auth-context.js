import React, { useState, useCallback } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  error: {},
  setError: () => {},
  showError: () => {},
  isLoading: false,
  setIsLoading: () => {},
  errorContent: "",
  setErrorContent: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorContent, setErrorContent] = useState(null);
  const tokenData = retrieveStoredToken({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const showError = (newState) => {
    setError({ open: true, ...newState });
  };

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  //Set Global Token in Axios
  axios.defaults.headers.common["Authorization"] = token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    error,
    setError,
    showError,
    isLoading,
    setIsLoading,
    errorContent,
    setErrorContent,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
