import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

const rightBarSlice = createSlice({
  name: "rightBar",
  initialState,
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = rightBarSlice.actions;
export default rightBarSlice.reducer;
