import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";
import filterSlice from "./slices/filterSlice";
import moviesSlice from "./slices/moviesSlice";
import fullMovieSlice from "./slices/fullMovieSlice";
const store = configureStore({
  reducer: { UiSlice, filterSlice, moviesSlice, fullMovieSlice },
});
export default store;
