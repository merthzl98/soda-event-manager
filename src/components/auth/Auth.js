import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AuthContext from "../../storage/auth-context";
import Error from "../commonUI/Error";
import AlertContext from "../../storage/alert-context";
import "./Auth.scss";
import AuthService from "../../services/AuthService";

const Auth = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const history = useHistory();

  const { login, isLoading, setIsLoading } = useContext(AuthContext);

  const { hasError } = useContext(AlertContext);

  const handleNameChange = (e) => {
    setEnteredName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const postUserInfo = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const userData = {
      username: enteredName,
      password: enteredPassword,
    };

    AuthService.postUserCredentials(userData)
      .then((response) => {
        login(response.data);
        history.replace("/manager");
      })

      .then(setIsLoading(false));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-inputs">
          <TextField
            required
            id="standard-required"
            label="Username"
            variant="standard"
            onChange={handleNameChange}
          />

          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="login-action">
          <Button onClick={postUserInfo} variant="contained" size="large">
            {isLoading ? (
              <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                <CircularProgress color="inherit" />
              </Stack>
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </div>
      {hasError.open && <Error />}
    </div>
  );
};

export default Auth;
