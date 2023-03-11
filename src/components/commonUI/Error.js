import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import AlertContext from "../../storage/alert-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = (props) => {
  const { hasError, setHasError } = useContext(AlertContext);

  const { vertical, horizontal, open } = hasError;

  const handleHideError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setHasError({ ...hasError, open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleHideError}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          sx={{ width: "100%" }}
          onClose={handleHideError}
          severity="error"
        >
          {hasError?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Error;
