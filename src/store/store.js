import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/authSlice/authSlice.js";

const store = configureStore({
  reducer: { authReducers },
});

export default store;
