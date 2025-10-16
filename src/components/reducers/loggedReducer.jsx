import { createSlice } from "@reduxjs/toolkit";

const initState = { user: {}, logged: false };

const loggedReducer = createSlice({
  name: "logged",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.logged = true;
    },
    logout: (state) => {
      state.user = {};
      state.logged = false;
    },
  },
});

export const { login, logout } = loggedReducer.actions;
export default loggedReducer.reducer;
