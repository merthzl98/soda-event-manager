import React, { useState, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

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
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
