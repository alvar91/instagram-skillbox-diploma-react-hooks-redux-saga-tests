// Core
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Instruments
import ErrorBoundary from "./";

// App
import MockErrorComponent from "../../mock/MockErrorComponent";

configure({ adapter: new Adapter() });

describe("error-boundary", () => {
  it("Error-boundary should catch render error from children component", () => {
    const testRenderer = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/`]}>
          <ErrorBoundary>
            <MockErrorComponent />
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>
    );

    expect(testRenderer.find('ErrorBoundary').state("hasError")).toEqual(true);
  });
});
