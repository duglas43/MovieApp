import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePageId: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActivePageId(state, action) {
      state.activePageId = action.payload;
    },
  },
});

export const { setActivePageId } = filterSlice.actions;
export default filterSlice.reducer;
