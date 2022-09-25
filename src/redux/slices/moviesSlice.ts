import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchMainSliderItems = createAsyncThunk(
  "mainSlider/fetchMainSliderItemsStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );

    return data.results as MovieItem[];
  }
);
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results as MovieItem[];
  }
);
export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results as MovieItem[];
  }
);
export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMoviesStatus",
  async (params, thunkAPI) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&page=1`
    );
    return data.results as MovieItem[];
  }
);
export const fetchFilterMovies = createAsyncThunk(
  "movies/fetchFilterMoviesStatus",
  async (params:FetchMovieArgs) => {
    const { searchValue, sortBy, genres, runtimeLte, page } = params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&sort_by=${sortBy}&with_genres=${genres}&with_runtime.lte=${runtimeLte}&query=${searchValue}&page=${page}`
    );
    return data as fetchObj;
  }
);
export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMoviesStatus",
  async (params:FetchMovieArgs) => {
    const { searchValue, page } = params;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU&query=${searchValue}&page=${page}`
    );
    return data as fetchObj;
  }
);
export type FetchMovieArgs = {
  searchValue?: string;
  sortBy?: string;
  genres?: number[];
  runtimeLte?: number;
  page?: number;
};
export type MovieItem={
  adult: Boolean,
  backdrop_path:string;
  genre_ids:number[];
  id: number;
  original_language: string;
  original_title:string;
  overview:string;
  popularity: number,
  poster_path: string;
  release_date: string;
  title:string;
  video: Boolean;
  vote_average: number;
  vote_count: number;
}
type fetchObj={
  page:number;
  results: MovieItem[];
  total_pages:number;
  total_results:number;
}
type Status ="loading" | "success" | "error" 
interface MoviesSliceState {
  mainSliderItems: MovieItem[],
  mainSliderStatus: Status, 
  popularMovies: MovieItem[],
  popularMoviesStatus: Status, 
  topRatedMovies: MovieItem[],
  topRatedMoviesStatus: Status, 
  upcomingMovies: MovieItem[],
  upcomingMoviesStatus: Status, 
  filterMovies: fetchObj,
  filterMoviesStatus: Status, 
  searchMovies: fetchObj,
  searchMoviesStatus: Status, 
}
const initialState:MoviesSliceState = {
  mainSliderItems: [],
  mainSliderStatus: "loading", // loading | success | error
  popularMovies: [],
  popularMoviesStatus: "loading", // loading | success | error
  topRatedMovies: [],
  topRatedMoviesStatus: "loading", // loading | success | error
  upcomingMovies: [],
  upcomingMoviesStatus: "loading", // loading | success | error
  filterMovies: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  filterMoviesStatus: "loading", // loading | success | error
  searchMovies: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  searchMoviesStatus: "loading", // loading | success | error
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchMainSliderItems.pending, (state) => {
      state.mainSliderStatus = "loading";
      state.mainSliderItems = [];
    });

    builder.addCase(fetchMainSliderItems.fulfilled, (state, action:PayloadAction<MovieItem[]> ) => {
      state.mainSliderItems = action.payload;
      state.mainSliderStatus = "success";
    });
    builder.addCase(fetchMainSliderItems.rejected, (state) => {
      state.mainSliderStatus = "error";
      state.mainSliderItems = [];
    });
    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.popularMoviesStatus = "loading";
      state.popularMovies = [];
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action:PayloadAction<MovieItem[]> ) => {
      state.popularMovies = action.payload;
      state.popularMoviesStatus = "success";
    });
    builder.addCase(fetchPopularMovies.rejected, (state) => {
      state.popularMoviesStatus = "error";
      state.popularMovies = [];
    });
    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.topRatedMoviesStatus = "loading";
      state.topRatedMovies = [];
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action:PayloadAction<MovieItem[]> ) => {
      state.topRatedMovies = action.payload;
      state.topRatedMoviesStatus = "success";
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state) => {
      state.topRatedMoviesStatus = "error";
      state.topRatedMovies = [];
    });
    builder.addCase(fetchUpcomingMovies.pending, (state) => {
      state.upcomingMoviesStatus = "loading";
      state.upcomingMovies = [];
    });
    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action:PayloadAction<MovieItem[]> ) => {
      state.upcomingMovies = action.payload;
      state.upcomingMoviesStatus = "success";
    })
    builder.addCase(fetchUpcomingMovies.rejected, (state) => {
      state.upcomingMoviesStatus = "error";
      state.upcomingMovies = [];
    });
    builder.addCase(fetchFilterMovies.pending, (state) => {
      state.filterMoviesStatus = "loading";
      state.filterMovies = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 1,
      };
    });
    builder.addCase(fetchFilterMovies.fulfilled, (state, action ) => {
      state.filterMovies = action.payload;
      state.filterMoviesStatus = "success";
    });
    builder.addCase(fetchFilterMovies.rejected, (state) => {
      state.filterMoviesStatus = "error";
      state.filterMovies = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 1,
      };
    });
    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.searchMoviesStatus = "loading";
      state.searchMovies = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 1,
      };
    });
    builder.addCase(fetchSearchMovies.fulfilled, (state, action ) => {
      state.searchMovies = action.payload;
      state.searchMoviesStatus = "success";
    });
    builder.addCase(fetchSearchMovies.rejected, (state) => {
      state.searchMoviesStatus = "error";
      state.searchMovies = {
        page: 1,
        results: [],
        total_pages: 1,
        total_results: 1,
      };
    });
  }
});

export const selectMovies = (state:RootState) => state.moviesSlice;
export default moviesSlice.reducer;
