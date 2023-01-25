import React from "react";
import { useContext } from "react";
import AuthContext from "../storage/auth-context";

const MenagerPage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      MenagerPage <button onClick={authCtx.logout}>log out</button>
    </div>
  );
};

export default MenagerPage;
