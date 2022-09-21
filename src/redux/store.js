import { configureStore } from "@reduxjs/toolkit";
import rightBarSlice from "./slices/rightBarSlice";
import sidebarSlice from "./slices/sidebarSlice";
import filterSlice from "./slices/filterSlice";
const store = configureStore({
  reducer: { rightBarSlice, sidebarSlice, filterSlice },
});
export default store;
