import { Redirect, Route, Switch } from "react-router-dom";
import { useContext, useEffect } from "react";

import { registerIntercepts } from "./services/http-common";
import LoginPage from "./pages/LoginPage";
import ManagerPage from "./pages/ManagerPage";
import AuthContext from "./storage/auth-context";
import "./App.scss";
import AlertContext from "./storage/alert-context";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { setHasError } = useContext(AlertContext);

  useEffect(() => {
    registerIntercepts(setHasError);
  }, [setHasError]);

  return (
    <Switch>
      {isLoggedIn ? (
        <Route path="/" exact>
          <Redirect to="/manager" />
        </Route>
      ) : (
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      )}

      {isLoggedIn ? (
        <Route path="/login">
          <Redirect to="/manager" />
        </Route>
      ) : (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}

      <Route path="/manager">
        {isLoggedIn && <ManagerPage />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>

      {isLoggedIn ? (
        <Route path="*">
          <Redirect to="/manager" />
        </Route>
      ) : (
        <Route path="*">
          <Redirect to="/" />
        </Route>
      )}
    </Switch>
  );
};

export default App;
