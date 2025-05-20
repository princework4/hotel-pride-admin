import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    guestOptions: {
      adults: 1,
      children: 0,
      rooms: 1,
    },
    checkInDate: null,
    checkOutDate: null,
  },
  reducers: {
    increaseAdults: (state) => {
      state.guestOptions.adults += 1;
    },
    decreaseAdults: (state) => {
      state.guestOptions.adults -= 1;
    },
    increaseChildrens: (state) => {
      state.guestOptions.children += 1;
    },
    decreaseChildrens: (state) => {
      state.guestOptions.children -= 1;
    },
    increaseRooms: (state) => {
      state.guestOptions.rooms += 1;
    },
    decreaseRooms: (state) => {
      state.guestOptions.rooms -= 1;
    },
    updateCheckInDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    updateCheckOutDate: (state, action) => {
      state.checkOutDate = action.payload;
    },
    resetGuestOptions: (state) => {
      state.guestOptions.adults = 1;
      state.guestOptions.children = 0;
      state.guestOptions.rooms = 1;
      state.checkInDate = null;
      state.checkOutDate = null;
    },
  },
});

export const {
  increaseAdults,
  decreaseAdults,
  increaseChildrens,
  decreaseChildrens,
  increaseRooms,
  decreaseRooms,
  updateCheckInDate,
  updateCheckOutDate,
  resetGuestOptions,
} = searchSlice.actions;

export default searchSlice.reducer;
