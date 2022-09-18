import { configureStore } from "@reduxjs/toolkit";
import rightBarSlice from "./slices/rightBarSlice";
import sidebarSlice from "./slices/sidebarSlice";
const store = configureStore({
  reducer: { rightBarSlice, sidebarSlice },
});
export default store;
