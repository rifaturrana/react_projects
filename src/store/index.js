import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { cartReducer } from "./reducers/Cart";

const rootReducer = {
  cart: cartReducer,
};

const myLogger = (store) => (next) => (action) => {
  console.log(`Prev State: ${JSON.stringify(store.getState())}`);
  console.log(`ACTION: ${JSON.stringify(action)}`);
  next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([myLogger, logger]),
});
