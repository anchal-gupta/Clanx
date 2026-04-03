import { configureStore } from "@reduxjs/toolkit";
import { gamificationReducer } from "./gamificationSlice";

export const createAppStore = () =>
  configureStore({
    reducer: {
      gamification: gamificationReducer,
    },
  });
