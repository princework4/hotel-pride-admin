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
import {
  updateIsUserLoggedIn,
  updateLoggedInUser,
  updateLoggedInUserType,
} from "./features/auth/authSlice";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const drawerWidth = 240;

function App() {
  const authRedux = useSelector((state) => state.authReducer);
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

  useEffect(() => {
    if (sessionStorage.getItem("userObj")) {
      const obj = JSON.parse(sessionStorage.getItem("userObj"));
      dispatch(updateLoggedInUser(obj));
      dispatch(updateIsUserLoggedIn(obj.isLoggedIn));
      dispatch(updateLoggedInUserType(obj.loggedInUserType));
    }
  }, []);

  async function fetchAllRoomTypes() {
    const response = await getAllRoomTypes();
    if (response.status === 200) {
      dispatch(updateAllRoomTypes(response.data));
    } else {
      toast.error("Please try again later.");
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
    } else {
      toast.error("Please try again later.");
    }
  }

  async function fetchAllCustomers() {
    const response = await getAllCustomers();
    const finalArr = [];
    for (let i = 0; i < response.length; i++) {
      const customerObj = {
        id: i,
        index: i + 1,
        name: response[i].user.name,
        email: response[i].user.email,
        roomNumber: response[i].rooms[0].roomNumber,
        roomType: response[i].rooms[0].roomType,
        checkIn: response[i].checkInDate,
        checkOut: response[i].checkOutDate,
        bookingNumber: response[i].bookingNumber,
      };
      finalArr.push(customerObj);
    }
    dispatch(updateAllCustomers(finalArr));
  }

  useEffect(() => {
    fetchAllRoomTypes();
    fetchAllRooms();
    fetchAllCustomers();

    dispatch(updateLocation(window.location.pathname));
  }, []);

  function getBackgroundColor(allRoutesPaths) {
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

  function handleLogout() {
    dispatch(updateLoggedInUser({}));
    dispatch(updateLoggedInUserType(""));
    dispatch(updateIsUserLoggedIn(false));
    toast.success("Logged Out Successfully");
    sessionStorage.removeItem("userObj");
  }

  return (
    <>
      <BrowserRouter basename="/admin">
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
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: "bolder" }}
              >
                Admin Panel
              </Typography>
              {authRedux.isUserLoggedIn && (
                <Button
                  onClick={handleLogout}
                  variant="filled"
                  sx={{ background: "#fff", color: "#c4b991" }}
                >
                  Logout
                </Button>
              )}
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
                  <ProtectedRoute>
                    <Customers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-detail/:bookingNumber"
                element={
                  <ProtectedRoute>
                    <CustomersDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms"
                element={
                  <ProtectedRoute>
                    <Rooms />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rooms-detail/:id"
                element={
                  <ProtectedRoute>
                    <RoomsDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-rooms"
                element={
                  <ProtectedRoute>
                    <AddRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/room-types"
                element={
                  <ProtectedRoute>
                    <RoomTypes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/room-type-detail/:id"
                element={
                  <ProtectedRoute>
                    <RoomTypeDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-room-type"
                element={
                  <ProtectedRoute>
                    <AddRoomType />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/offers"
                element={
                  <ProtectedRoute>
                    <Offers />
                  </ProtectedRoute>
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
