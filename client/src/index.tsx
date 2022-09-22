import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

axios.defaults.baseURL = process.env.REACT_APP_SERVER || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
