"use Client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieServices from "../Services/movieServices";

export const getAllMovies = createAsyncThunk(
  "movie/getAllMovies",
  async (_, thunkAPI) => {
    try {
      const response = await movieServices.getAllMovies();
      return response;
    } catch (error) {
      console.error("Fetching movies details failed:", error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  movies: null,
  movieDetails: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.isLoading = "true";
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.isLoading = "false";
        state.isSuccess = "true";
        state.isError = "false";
        state.movieDetails = action.payload;
      });
  },
});

export default movieSlice.reducer;
