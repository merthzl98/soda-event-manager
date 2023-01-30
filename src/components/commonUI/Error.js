import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AuthContext from "../../storage/auth-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = (props) => {
  const authCtx = useContext(AuthContext);

  const { error, setError } = authCtx;

  const { vertical, horizontal, open } = error;

  const hideError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ ...error, open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={hideError}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert sx={{ width: "100%" }} onClose={hideError} severity="warning">
          {props.children}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Error;
