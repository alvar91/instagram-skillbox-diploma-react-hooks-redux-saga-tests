// Core
import { createStore, applyMiddleware } from "redux";

// Instruments
import { rootReducer } from "../redux/rootReducer";
import { composeEnhancers, middleware, sagaMiddleware } from "../redux/middleware";
import { rootSaga } from "../redux/rootSaga";

// Mock state
import {mockInitialStore} from "./mockInitialStore";

export const mockReduxStore = createStore(
  rootReducer,
  mockInitialStore,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

