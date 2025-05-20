import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    allCustomers: [],
    allRooms: [],
    allRoomTypes: [],
    offers: {},
  },
  reducers: {
    updateAllCustomers: (state, action) => {
      state.allCustomers = action.payload;
    },
    updateAllRooms: (state, action) => {
      state.allRooms = action.payload;
    },
    updateAllRoomTypes: (state, action) => {
      state.allRoomTypes = action.payload;
    },
    updateOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
});

export const {
  updateAllCustomers,
  updateAllRooms,
  updateAllRoomTypes,
  updateOffers,
} = roomSlice.actions;

export default roomSlice.reducer;
