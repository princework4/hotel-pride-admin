import React from "react";
import { Route, Routes } from "react-router-dom";
import Rooms from "./components/Rooms/Rooms";
import RoomTypes from "./components/RoomTypes/RoomTypes";
import Offers from "./components/Offers/Offers";
import AddRoom from "./components/Rooms/AddRoom";
import RoomsDetail from "./components/Rooms/RoomsDetail";
import RoomTypeDetail from "./components/RoomTypes/RoomTypeDetail";
import AddRoomType from "./components/RoomTypes/AddRoomType";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route path="/room-detail" element={<RoomsDetail />} />
        <Route path="/add-rooms" element={<AddRoom />} />
        <Route path="/room-types" element={<RoomTypes />} />
        <Route path="/room-type-detail" element={<RoomTypeDetail />} />
        <Route path="/add-room-type" element={<AddRoomType />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </>
  );
};

export default Routing;
