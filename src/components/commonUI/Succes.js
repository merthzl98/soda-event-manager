import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Succes = (props) => {

  const { vertical, horizontal, open } = props.success;

  const hideSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSuccess({ ...props.success, open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideSuccess}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert sx={{ width: "100%" }} onClose={hideSuccess} severity="success">
          {props.children}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Succes;
