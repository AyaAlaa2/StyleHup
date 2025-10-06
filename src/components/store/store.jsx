import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "../reducers/loggedReducer";
import cartReducer from "../reducers/cartReducer";

export const store = configureStore({
  reducer: {
    user: loggedReducer,
    cart: cartReducer,
  },
});
