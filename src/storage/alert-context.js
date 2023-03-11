import React, { useState } from "react";

const AlertContext = React.createContext({
  hasError: {},
  setHasError: () => {},
  handleShowError: () => {},
});

export const AlertProvider = (props) => {
  const [hasError, setHasError] = useState({
    open: false,
    message: "",
    vertical: "top",
    horizontal: "center",
  });

  const handleShowError = (newState, errorMeassage) => {
    setHasError({ open: true, message: errorMeassage, ...newState });
  };

  const contextValue = {
    hasError,
    setHasError,
    handleShowError,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
