import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./components/Login";
import "bootswatch/dist/pulse/bootstrap.min.css";
import { UserProvider } from "./components/UserProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import RoutersUser from "./components/Routers";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <RoutersUser/>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
