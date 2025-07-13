import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    allCustomers: [],
    allRooms: [],
    allRoomTypes: [],
    offers: {},
    refundStatusCache: {},
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
    updateRefundStatusCache: (state, action) => {
      const { bookingId, status } = action.payload;
      state.refundStatusCache[bookingId] = status;
    },
  },
});

export const {
  updateAllCustomers,
  updateAllRooms,
  updateAllRoomTypes,
  updateOffers,
  updateRefundStatusCache,
} = roomSlice.actions;

export default roomSlice.reducer;
