import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import AuthContext from "../../storage/auth-context";
import Error from "../commonUI/Error";
import AlertContext from "../../storage/alert-context";
import "./Auth.scss";
import AuthService from "../../services/AuthService";
// import loginBg from "../../assets/bg/output-onlinejpgtools.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "} */}
      {"Soda Entertainment"} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

  const theme = createTheme();

  // const loginPageStyle = {
  //   background: `url(${loginBg})`,
  //   backgroundSize: "cover",
  //   width: "100%",
  //   height: "100vh",
  //   position: "absolute",
  //   top: "0",
  //   right: "0",
  //   zIndex: "-500",
  // };

  return (
    <div 
    // style={loginPageStyle}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ padding: "60px" }}>
          <Paper elevation={3} sx={{ padding: "0px 40px 2px 40px" }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box
                component="form"
                onSubmit={postUserInfo}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                  onChange={handleNameChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? (
                    <Stack
                      sx={{ color: "grey.500" }}
                      spacing={2}
                      direction="row"
                    >
                      <CircularProgress color="inherit" />
                    </Stack>
                  ) : (
                    "Log In"
                  )}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Paper>
        </Container>
      </ThemeProvider>
      {hasError.open && <Error />}
    </div>
  );
};

export default Auth;
