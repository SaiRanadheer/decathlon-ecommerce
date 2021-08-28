import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import "./styles.css";
import App from "./App";
import store from "./store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
);
