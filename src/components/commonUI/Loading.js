import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = (props) => {

  const closeLoading = () => {
    props.setIsLoading(false);
  };
  
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.isLoading}
        onClick={closeLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
