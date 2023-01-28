import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { useContext } from "react";
import LoginPage from "./pages/LoginPage";
import MenagerPage from "./pages/MenagerPage";
import AuthContext from "./storage/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  const {isLoggedIn} = authCtx;

  return (
    <Switch>
      <Route path="/" exact>
        {/* <Redirect to="/login" /> */}
      </Route>
      {!isLoggedIn && (
        <Route path="/login">
          <LoginPage />
        </Route>
      )}

      <Route path="/menager">
        {isLoggedIn && <MenagerPage />}
        {!isLoggedIn && <Redirect to="/login" />}
      </Route>

      {/* <Route path="*">
        <Redirect to="/" />
      </Route> */}
    </Switch>
  );
}

export default App;
