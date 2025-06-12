import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUserLoggedIn: false,
    loggedInUser: {},
    loggedInUserType: "",
  },
  reducers: {
    updateIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    updateLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    updateLoggedInUserType: (state, action) => {
      state.loggedInUserType = action.payload;
    },
  },
});

export const {
  updateIsUserLoggedIn,
  updateLoggedInUser,
  updateLoggedInUserType,
} = authSlice.actions;

export default authSlice.reducer;
