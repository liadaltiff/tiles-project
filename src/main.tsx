import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { TilesProvider } from "./TilesContext";
import { UsersProvider } from "./UsersContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TilesProvider>
          <UsersProvider>
            <App />
          </UsersProvider>
        </TilesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
