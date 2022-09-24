import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  sortBy: { type: "popularity.desc", name: "Популярности" },
  genres: [],
  dateLte: "",
  dateGte: "",
  runtimeLte: 200,
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setGenre(state, action) {
      state.genres.includes(action.payload)
        ? (state.genres = state.genres.filter(
            (item) => item !== action.payload
          ))
        : state.genres.push(action.payload);
    },
    setDateGte(state, action) {
      state.dateGte = action.payload;
    },
    setDateLte(state, action) {
      state.dateLte = action.payload;
    },
    setRuntimeLte(state, action) {
      state.runtimeLte = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.searchValue = action.payload.searchValue || state.searchValue;
        state.sortBy = action.payload.sortBy || state.sortBy;
        state.genres =
          !action.payload.genres || action.payload.genres.length === 0
            ? state.genres
            : action.payload.genres.map(Number);
        state.dateGte = action.payload.dateGte || state.dateGte;
        state.dateLte = action.payload.dateLte || state.dateLte;
        state.runtimeLte =
          Number(action.payload.runtimeLte) || state.runtimeLte;
        state.page = Number(action.payload.page) || state.page;
      } else {
        state.searchValue = "";
        state.sortBy = "popularity.desc";
        state.genres = "";
        state.dateLte = "";
        state.dateGte = "";
        state.runtimeLte = 200;
        state.page = 1;
      }
    },
    clearFilters(state) {
      state.searchValue = "";
      state.sortBy = { type: "popularity.desc", name: "Популярности" };
      state.genres = [];
      state.dateLte = "";
      state.dateGte = "";
      state.runtimeLte = 200;
      state.page = 1;
    },
  },
});
export const selectFilter = (state) => state.filterSlice;
export const genreList = [
  {
    id: 28,
    name: "боевик",
  },
  {
    id: 12,
    name: "приключения",
  },
  {
    id: 16,
    name: "мультфильм",
  },
  {
    id: 35,
    name: "комедия",
  },
  {
    id: 80,
    name: "криминал",
  },
  {
    id: 99,
    name: "документальный",
  },
  {
    id: 18,
    name: "драма",
  },
  {
    id: 10751,
    name: "семейный",
  },
  {
    id: 14,
    name: "фэнтези",
  },
  {
    id: 36,
    name: "история",
  },
  {
    id: 27,
    name: "ужасы",
  },
  {
    id: 10402,
    name: "музыка",
  },
  {
    id: 9648,
    name: "детектив",
  },
  {
    id: 10749,
    name: "мелодрама",
  },
  {
    id: 878,
    name: "фантастика",
  },
  {
    id: 10770,
    name: "телевизионный фильм",
  },
  {
    id: 53,
    name: "триллер",
  },
  {
    id: 10752,
    name: "военный",
  },
  {
    id: 37,
    name: "вестерн",
  },
];
export const sortList = [
  {
    type: "popularity.desc",
    name: "Популярности",
  },
  {
    type: "vote_average.desc",
    name: "Рейтингу",
  },
  {
    type: "release_date.desc",
    name: "Дате выхода",
  },
];
export const {
  setSearchValue,
  setSortBy,
  setGenre,
  setDateGte,
  setDateLte,
  setRuntimeLte,
  setFilters,
  setPage,
  clearFilters,
  incrementPage,
} = filterSlice.actions;
export default filterSlice.reducer;
