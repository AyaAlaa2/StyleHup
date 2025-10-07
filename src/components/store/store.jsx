import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "../reducers/loggedReducer";
import cartReducer from "../reducers/cartReducer";
import wishlistReducer from "../reducers/wishListReducer";

export const store = configureStore({
  reducer: {
    user: loggedReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
