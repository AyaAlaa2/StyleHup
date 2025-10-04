import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "../reducers/loggedReducer";

export const store = configureStore({
  reducer: {
    user: loggedReducer,
  },
});
