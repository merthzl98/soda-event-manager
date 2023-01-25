import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import MenagerPage from "./pages/MenagerPage";
import AuthContext from "./storage/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        {/* <Redirect to="/login" /> */}
      </Route>
      {!authCtx.isLoggedIn && (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}

      <Route path="/menager">
        {authCtx.isLoggedIn && <MenagerPage />}
        {!authCtx.isLoggedIn && <Redirect to="/login" />}
      </Route>

      {/* <Route path="*">
        <Redirect to="/" />
      </Route> */}
    </Switch>
  );
}

export default App;
