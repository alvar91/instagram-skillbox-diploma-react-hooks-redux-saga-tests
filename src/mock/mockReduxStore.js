// Core
import { createStore, applyMiddleware } from "redux";

// Instruments
import { rootReducer } from "../redux/rootReducer";
import {
  composeEnhancers,
  middleware,
  sagaMiddleware,
} from "../redux/middleware";
import { rootSaga } from "../redux/rootSaga";

// Mock state
import { mockFactoryStore } from "./mockFactoryStore";

export const mockReduxStore = (storeOptionsObj) => {
  const initialState = mockFactoryStore(storeOptionsObj);
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
