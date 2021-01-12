// Core
import React from "react";
import ReactDOM from "react-dom";

// Styles
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";

// Instruments
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary";

// App
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
