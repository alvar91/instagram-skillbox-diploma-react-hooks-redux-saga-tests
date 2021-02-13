// Core
import React from "react";
import renderer from "react-test-renderer";

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

describe("App", () => {
  it("App correctly renders main page markup", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Router>
        </MuiThemeProvider>
      </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
