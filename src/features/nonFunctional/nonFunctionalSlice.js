import { createSlice } from "@reduxjs/toolkit";

export const nonFunctionalSlice = createSlice({
  name: "nonFunctional",
  initialState: {
    location: "",
  },
  reducers: {
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { updateLocation } = nonFunctionalSlice.actions;

export default nonFunctionalSlice.reducer;
