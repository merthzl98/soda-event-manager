import React, { useState } from "react";

const AlertContext = React.createContext({
  hasError: {},
  setHasError: () => {},
});

export const AlertProvider = (props) => {
  const [hasError, setHasError] = useState({
    open: false,
    message: "",
    vertical: "top",
    horizontal: "center",
  });

  const contextValue = {
    hasError,
    setHasError,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
