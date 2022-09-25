import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchFullMovie = createAsyncThunk(
  "fullMovie/fetchFullMovie",
  async (id: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=a8a6fa2f944128e9712135bc3ca000b1&language=ru-RU`
    );
    return data as FullMovieObj;
  }
);
export const fetchMovieTrailers = createAsyncThunk(
  "fullMovie/fetchMovieTrailers",
  async (id: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a8a6fa2f944128e9712135bc3ca000b1`
    );
    return data.results as VideosList[];
  }
);

type FullMovieObj = {
  adult: Boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: Boolean;
  vote_average: number;
  vote_count: number;
};
type VideosList = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};
interface FullMovieState {
  fullMovieInfo: FullMovieObj;
  trailers: VideosList[];
  trailersStatus: "loading" | "success" | "error";
  fullMovieInfoStatus: "loading" | "success" | "error";
}
const initialState: FullMovieState = {
  fullMovieInfo: null,
  trailers: [],
  trailersStatus: "loading", // loading | success | error
  fullMovieInfoStatus: "loading", // loading | success | error
};

const fullMovieSlice = createSlice({
  name: "fullMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFullMovie.pending, (state) => {
      state.fullMovieInfoStatus = "loading";
      state.fullMovieInfo = null;
    });
    builder.addCase(
      fetchFullMovie.fulfilled,
      (state, action: PayloadAction<FullMovieObj>) => {
        state.fullMovieInfo = action.payload;
        state.fullMovieInfoStatus = "success";
      }
    );
    builder.addCase(fetchFullMovie.rejected, (state) => {
      state.fullMovieInfoStatus = "error";
      state.fullMovieInfo = null;
    });
    builder.addCase(fetchMovieTrailers.pending, (state) => {
      state.trailersStatus = "loading";
      state.trailers = [];
    });
    builder.addCase(
      fetchMovieTrailers.fulfilled,
      (state, action: PayloadAction<VideosList[]>) => {
        state.trailers = action.payload;
        state.trailersStatus = "success";
      }
    );
    builder.addCase(fetchMovieTrailers.rejected, (state) => {
      state.trailersStatus = "error";
      state.trailers = [];
    });
  },
});
export const selectFullMovie = (state: RootState) => state.fullMovieSlice;
export default fullMovieSlice.reducer;
