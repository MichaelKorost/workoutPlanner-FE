import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBreakpoints } from "@mui/system";

// import toastify styles
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      smallPhone: 381,
      phone: 420,
      sm: 550,
      tablet: 769,
      md: 980,
      midLarge: 1170,
      lg: 1280,
      xl: 1920,
    },
  },
});
const breakpoints = createBreakpoints({});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
