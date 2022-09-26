import { createSlice } from "@reduxjs/toolkit";

export const formLoginSlice = createSlice({
  name: "formLogin",
  initialState: {
    open: false,
    login: false,
  },
  reducers: {
    openFormLogin: (state) => {
      return { ...state, open: true };
    },
    closeFormLogin: (state) => {
      return { ...state, open: false };
    },
    login: (state) => {
      return { ...state, login: true };
    },
    logout: (state) => {
      return { ...state, login: false };
    },
  },
});

export const { openFormLogin, closeFormLogin, login, logout } =
  formLoginSlice.actions;

export default formLoginSlice.reducer;
