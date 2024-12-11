import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import Chatwidget from "./components/Chatwidget";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
      <App />
      <Chatwidget />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
