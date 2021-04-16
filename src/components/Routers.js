import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { userContext } from "./UserProvider";

export default function RoutersUser() {
  const {user} = useContext(userContext);
    return (
    <Router>
      <Switch>
        {!user && <Route path="/" component={Login} />}
        {user && <Route path="/" component={Home} />}
      </Switch>
    </Router>
  );
}

