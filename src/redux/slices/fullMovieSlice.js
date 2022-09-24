import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFullMovie = createAsyncThunk(
  "fullMovie/fetchFullMovie",
  async (id, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU`
    );
    return data;
  }
);
export const fetchMovieTrailers = createAsyncThunk(
  "fullMovie/fetchMovieTrailers",
  async (id, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a8a6fa2f944128e9712135bc3ca000b1`
    );
    return data.results;
  }
);

const initialState = {
  fullMovieInfo: [],
  trailers: [],
  trailersStatus: "loading", // loading | success | error
  fullMovieInfoStatus: "loading", // loading | success | error
};

const fullMovieSlice = createSlice({
  name: "fullMovie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFullMovie.pending]: (state) => {
      state.fullMovieInfoStatus = "loading";
      state.fullMovieInfo = [];
    },
    [fetchFullMovie.fulfilled]: (state, action) => {
      state.fullMovieInfo = action.payload;
      state.fullMovieInfoStatus = "success";
    },
    [fetchFullMovie.rejected]: (state) => {
      state.fullMovieInfoStatus = "error";
      state.fullMovieInfo = [];
    },
    [fetchMovieTrailers.pending]: (state) => {
      state.trailersStatus = "loading";
      state.trailers = [];
    },
    [fetchMovieTrailers.fulfilled]: (state, action) => {
      state.trailers = action.payload;
      state.trailersStatus = "success";
    },
    [fetchMovieTrailers.rejected]: (state) => {
      state.trailersStatus = "error";
      state.trailers = [];
    },
  },
});
export const selectFullMovie = (state) => state.fullMovieSlice;
export default fullMovieSlice.reducer;
