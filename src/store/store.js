import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import nonFunctionalReducer from "../features/nonFunctional/nonFunctionalSlice";
import guestReducer from "../features/guest/guestSlice";
import roomReducer from "../features/room/roomSlice";
import searchReducer from "../features/search/searchSlice";

export default configureStore({
  reducer: {
    authReducer,
    nonFunctionalReducer,
    // guestReducer,
    roomReducer,
    // searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
