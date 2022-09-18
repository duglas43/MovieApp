import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileActive: false,
  isMini: false,
};

const sidebarSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setActive(state, action) {
      state.mobileActive = action.payload;
    },
    setMini(state, action) {
      state.isMini = action.payload;
    },
  },
});

export const { setActive, setMini } = sidebarSlice.actions;
export default sidebarSlice.reducer;
