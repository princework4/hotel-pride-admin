import { createSlice } from "@reduxjs/toolkit";

export const guestSlice = createSlice({
  name: "guest",
  initialState: {
    guestDetails: {},
  },
  reducers: {
    updateGuestDetails: (state, action) => {
      state.guestDetails = action.payload;
    },
  },
});

export const { updateGuestDetails } = guestSlice.actions;

export default guestSlice.reducer;
