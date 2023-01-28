import React, { useState, useContext } from "react";
import "./Auth.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import AuthContext from "../../storage/auth-context";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Error from "../commonUI/Error";

const url = "http://localhost/manager-app/api/v1/auth/login";

const Auth = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const { login } = authCtx;

  const handleNameChange = (e) => {
    setEnteredName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setEnteredPassword(e.target.value);
  };

  const showError = (newState) => {
    setError({ open: true, ...newState });
  };

  const postUserInfo = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const userData = {
      username: enteredName,
      password: enteredPassword,
    };

    try {
      const response = await axios.post(url, userData);
      console.log(response);
      login(response.data);
      history.replace("/menager");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showError({
        vertical: "top",
        horizontal: "center",
      });
    }
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
      {error && (
        <Error error={error} setError={setError}>
          Entered username or password wrong!
        </Error>
      )}
    </div>
  );
};

export default Auth;
