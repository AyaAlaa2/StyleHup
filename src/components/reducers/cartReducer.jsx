import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem) existingItem.quantity += 1;
      else state.items.push({ ...product, quantity: 1 });
    },
    removeOneFromCart: (state, action) => {
      const { product, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== product.id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeOneFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
