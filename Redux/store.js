"use client";

import movieReducer from "./Features/movieSlice";
import calcReducer from "./Features/calcSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    calc: calcReducer,
  },
});
