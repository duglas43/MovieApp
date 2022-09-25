import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
interface UiState {
  sideBarMobileActive: boolean;
  sideBarMini: boolean;
  activePageId: number;
}
const initialState:UiState = {
  sideBarMobileActive: false,
  sideBarMini: false,
  activePageId: 0,
};

const Ui = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    setActiveSideBar(state, action) {
      state.sideBarMobileActive = action.payload;
    },
    setMiniSideBar(state, action) {
      state.sideBarMini = action.payload;
    },
    setActivePageId(state, action) {
      state.activePageId = action.payload;
    },
    setPagePath(state, action) {
      const id = pageList.find((item) => item.type === action.payload)?.id;
      state.activePageId = id;
      id ? (state.sideBarMini = true) : (state.sideBarMini = false);
    },
  },
});
export const pageList = [
  {
    id: 0,
    title: "Домашняя страница",
    type: "home",
  },
  {
    id: 1,
    title: "Навигатор",
    type: "navigation",
  },
  {
    id: 2,
    title: "Поиск",
    type: "search",
  },
  {
    id: 3,
    title: "Понравившиеся",
    type: "liked",
  },
  {
    id: 4,
    title: "История",
    type: "history",
  },
];
export const {
  setActiveSideBar,
  setMiniSideBar,
  setActivePageId,
  setPagePath,
} = Ui.actions;
export const selectUi = (state:RootState) => state.UiSlice;
export default Ui.reducer;
