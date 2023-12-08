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

export const getMovieDetail = createAsyncThunk(
  "movie/getMovieDetail",
  async (_, thunkAPI) => {
    try {
      const response = await movieServices.getMovieDetails();
      console.log("API Response:", response);
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
    builder
      .addCase(getMovieDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        console.log("Action (getMovieDetail):", action);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.movieDetails = action.payload;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        console.error("Fetching movie details failed:", action.error);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
