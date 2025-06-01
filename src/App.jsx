import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HouseIcon from "@mui/icons-material/House";
import "./App.css";
import Rooms from "./components/Rooms/Rooms";
import RoomTypes from "./components/RoomTypes/RoomTypes";
import Offers from "./components/Offers/Offers";
import AddRoom from "./components/Rooms/AddRoom";
import RoomsDetail from "./components/Rooms/RoomsDetail";
import RoomTypeDetail from "./components/RoomTypes/RoomTypeDetail";
import AddRoomType from "./components/RoomTypes/AddRoomType";
import Customers from "./components/Customers/Customers";
import Toast from "./components/Toast/Toast";
import { useEffect, useState } from "react";
import CustomersDetail from "./components/Customers/CustomersDetail";
import { getAllRooms } from "./services/rooms";
import {
  updateAllCustomers,
  updateAllRoomTypes,
  updateAllRooms,
} from "./features/room/roomSlice";
import { getAllRoomTypes } from "./services/roomTypes";
import { getAllCustomers } from "./services/customers";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "./features/nonFunctional/nonFunctionalSlice";
import LogInForm from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const drawerWidth = 240;

function App() {
  const nonFunctionalRedux = useSelector((state) => state.nonFunctionalReducer);
  const dispatch = useDispatch();

  const allRoutes = {
    Login: ["/login"],
    "All Customers": ["/customer", "/customer-detail"],
    "Room Types": ["/room-types", "/room-type-detail", "/add-room-type"],
    Rooms: ["/rooms", "/rooms-detail", "/add-rooms"],
    Offers: ["/offers"],

    // customer: "All Customers",
    // "room-types": "Room Types",
    // "room-type-detail": "Room Types",
    // "add-room-type": "Room Types",
    // rooms: "Rooms",
    // "room-detail": "Rooms",
    // "add-room": "Rooms",
    // offers: "Offers",
  };

  const allIcons = [
    <LoginIcon />,
    <PersonIcon />,
    <HouseIcon />,
    <MeetingRoomIcon />,
    <LocalOfferIcon />,
  ];

  async function fetchAllRoomTypes() {
    const response = await getAllRoomTypes();
    if (response.status === 200) {
      dispatch(updateAllRoomTypes(response.data));
    }
  }

  async function fetchAllRooms() {
    const response = await getAllRooms();
    if (response.status === 200) {
      const transformedData = [];
      for (let i = 0; i < response.data.length; i++) {
        const obj = {
          id: response.data[i].id,
          roomNumber: response.data[i].roomNumber,
          available: response.data[i].available,
          roomType: response.data[i].roomType.typeName,
        };
        transformedData.push(obj);
      }
      dispatch(updateAllRooms(transformedData));
    }
  }

  async function fetchAllCustomers() {
    const response = await getAllCustomers();
    if (response.status === 200) {
      const finalArr = [];
      for (let i = 0; i < response.data.length; i++) {
        const customerObj = {
          id: i,
          index: i + 1,
          name: response.data[i].user.name,
          email: response.data[i].user.email,
          roomNumber: response.data[i].rooms[0].roomNumber,
          roomType: response.data[i].rooms[0].roomType,
          checkIn: response.data[i].checkInDate,
          checkOut: response.data[i].checkOutDate,
          bookingNumber: response.data[i].bookingNumber,
        };
        finalArr.push(customerObj);
      }
      dispatch(updateAllCustomers(finalArr));
    }
  }

  useEffect(() => {
    fetchAllRoomTypes();
    fetchAllRooms();
    fetchAllCustomers();

    dispatch(updateLocation(window.location.pathname));
  }, []);

  function getBackgroundColor(allRoutesPaths) {
    console.log(nonFunctionalRedux);
    for (let i = 0; i < allRoutesPaths.length; i++) {
      if (nonFunctionalRedux.location.includes(allRoutesPaths[i])) {
        return "#c4b991";
      }
    }
    return "#fff";
  }

  function getTextColor(allRoutesPaths) {
    for (let i = 0; i < allRoutesPaths.length; i++) {
      if (nonFunctionalRedux.location.includes(allRoutesPaths[i])) {
        return "#fff";
      }
    }
    return "#c4b991";
  }

  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              backgroundColor: "#c4b991",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: "bolder" }}
              >
                Admin Panel
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
              backgroundColor: "#f5f5f5",
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              {Object.entries(allRoutes).map((allRoute, index) => (
                <Link
                  to={allRoute[1][0]}
                  style={{ width: "100%" }}
                  key={allRoute[0]}
                >
                  <ListItem
                    // to={allRoute[1][0]}
                    // component={Link}
                    disablePadding
                    sx={{
                      // backgroundColor:
                      //   indexToRoute[selectedIndex] == allRoute[1]
                      //     ? "#c4b991"
                      //     : "#fff",
                      backgroundColor: getBackgroundColor(allRoute[1]),
                    }}
                    // onClick={() => setSelectedIndex(index)}
                  >
                    <ListItemButton>
                      <ListItemIcon>{allIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={allRoute[0]}
                        sx={{
                          // color:
                          //   indexToRoute[selectedIndex] == allRoute[1]
                          //     ? "#fff"
                          //     : "#c4b991",
                          color: getTextColor(allRoute[1]),
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{
              height: "100vh",
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              backgroundColor: "#f5f5f5",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LogInForm />} />
              <Route
                path="/customer"
                element={
                  // <ProtectedRoute>
                  <Customers />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/customer-detail/:bookingNumber"
                element={
                  // <ProtectedRoute>
                  <CustomersDetail />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  // <ProtectedRoute>
                  <Rooms />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/rooms-detail/:id"
                element={
                  // <ProtectedRoute>
                  <RoomsDetail />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/add-rooms"
                element={
                  // <ProtectedRoute>
                  <AddRoom />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/room-types"
                element={
                  // <ProtectedRoute>
                  <RoomTypes />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/room-type-detail/:id"
                element={
                  // <ProtectedRoute>
                  <RoomTypeDetail />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/add-room-type"
                element={
                  // <ProtectedRoute>
                  <AddRoomType />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/offers"
                element={
                  // <ProtectedRoute>
                  <Offers />
                  // </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
      <Toast />
    </>
  );
}

export default App;
