import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMainSliderItems = createAsyncThunk(
  "mainSlider/fetchMainSliderItemsStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );

    return data;
  }
);
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results;
  }
);
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results;
  }
);
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results;
  }
);
export const fetchFilterMovies = createAsyncThunk(
  "movies/fetchFilterMoviesStatus",
  async (params, thunkAPI) => {
    const { searchValue, sortBy, genres, runtimeLte, page } = params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&sort_by=${sortBy}&with_genres=${genres}&with_runtime.lte=${runtimeLte}&query=${searchValue}&page=${page}`
    );
    return data.results;
  }
);
export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMoviesStatus",
  async (params, thunkAPI) => {
    const { searchValue, page } = params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&query=${searchValue}&page=${page}`
    );
    return data;
  }
);
const initialState = {
  mainSliderItems: [],
  mainSliderStatus: "loading", // loading | success | error
  popularMovies: [],
  popularMoviesStatus: "loading", // loading | success | error
  topRatedMovies: [],
  topRatedMoviesStatus: "loading", // loading | success | error
  upcomingMovies: [],
  upcomingMoviesStatus: "loading", // loading | success | error
  filterMovies: [],
  filterMoviesStatus: "loading", // loading | success | error
  searchMovies: [],
  searchMoviesStatus: "loading", // loading | success | error
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMainSliderItems.pending]: (state) => {
      state.mainSliderStatus = "loading";
      state.mainSliderItems = [];
    },
    [fetchMainSliderItems.fulfilled]: (state, action) => {
      state.mainSliderItems = action.payload.results;
      state.mainSliderStatus = "success";
    },
    [fetchMainSliderItems.rejected]: (state, action) => {
      state.mainSliderStatus = "error";
      state.mainSliderItems = [];
    },
    [fetchPopularMovies.pending]: (state) => {
      state.popularMoviesStatus = "loading";
      state.popularMovies = [];
    },
    [fetchPopularMovies.fulfilled]: (state, action) => {
      state.popularMovies = action.payload;
      state.popularMoviesStatus = "success";
    },
    [fetchPopularMovies.rejected]: (state, action) => {
      state.popularMoviesStatus = "error";
      state.popularMovies = [];
    },
    [fetchTopRatedMovies.pending]: (state) => {
      state.topRatedMoviesStatus = "loading";
      state.topRatedMovies = [];
    },
    [fetchTopRatedMovies.fulfilled]: (state, action) => {
      state.topRatedMovies = action.payload;
      state.topRatedMoviesStatus = "success";
    },
    [fetchTopRatedMovies.rejected]: (state, action) => {
      state.topRatedMoviesStatus = "error";
      state.topRatedMovies = [];
    },
    [fetchUpcomingMovies.pending]: (state) => {
      state.upcomingMoviesStatus = "loading";
      state.upcomingMovies = [];
    },
    [fetchUpcomingMovies.fulfilled]: (state, action) => {
      state.upcomingMovies = action.payload;
      state.upcomingMoviesStatus = "success";
    },
    [fetchUpcomingMovies.rejected]: (state, action) => {
      state.upcomingMoviesStatus = "error";
      state.upcomingMovies = [];
    },
    [fetchFilterMovies.pending]: (state) => {
      state.filterMoviesStatus = "loading";
      state.filterMovies = [];
    },
    [fetchFilterMovies.fulfilled]: (state, action) => {
      state.filterMovies = action.payload;
      state.filterMoviesStatus = "success";
    },
    [fetchFilterMovies.rejected]: (state, action) => {
      state.filterMoviesStatus = "error";
      state.filterMovies = [];
    },
    [fetchSearchMovies.pending]: (state) => {
      state.searchMoviesStatus = "loading";
      state.searchMovies = [];
    },
    [fetchSearchMovies.fulfilled]: (state, action) => {
      state.searchMovies = action.payload;
      state.searchMoviesStatus = "success";
    },
    [fetchSearchMovies.rejected]: (state, action) => {
      state.searchMoviesStatus = "error";
      state.searchMovies = [];
    },
  },
});
export const selectMovies = (state) => state.moviesSlice;
export default moviesSlice.reducer;
