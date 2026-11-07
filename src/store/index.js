import { configureStore } from "@reduxjs/toolkit";
import repairsReducer from "../features/repairs/repairsSlice";

export const store = configureStore({
  reducer: {
    repairs: repairsReducer,
  },
});