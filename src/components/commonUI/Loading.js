import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "../../storage/auth-context";

export const Loading = () => {
  const authCtx = useContext(AuthContext);

  const { isLoading, setIsLoading } = authCtx;
  
  const closeLoading = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={closeLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
