import { createSlice } from "@reduxjs/toolkit";

export const formPostSlice = createSlice({
  name: "formPost",
  initialState: {
    open: false,
    openEdit: false,
    change: 0,
    tags: "Công nghệ",
    name: "",
    month: "",
    year: "",
    datas: {},
  },
  reducers: {
    openFormPost: (state, action) => {
      return { ...state, open: true, name: action.payload };
    },
    closeFormPost: (state) => {
      return { ...state, open: false };
    },
    openFormEdit: (state, action) => {
      return { ...state, openEdit: true, datas: action.payload };
    },
    handleChangePost: (state) => {
      return { ...state, change: state.change + 1 };
    },
    handleChangeTag: (state, action) => {
      return { ...state, tags: action.payload };
    },
    handleChangeTime: (state, action) => {
      return {
        ...state,
        month: action.payload.month,
        year: action.payload.year,
      };
    },
  },
});

export const {
  openFormPost,
  openFormEdit,
  closeFormPost,
  handleChangePost,
  handleChangeTag,
} = formPostSlice.actions;
export default formPostSlice.reducer;
