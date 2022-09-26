import { configureStore } from "@reduxjs/toolkit";
import formLoginReducer from "./slices/formLoginSlice";
import formPostReducer from "./slices/formPostSlice";
export const store = configureStore({
  reducer: {
    formLogin: formLoginReducer,
    formPost: formPostReducer,
  },
});
