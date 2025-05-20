import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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

const drawerWidth = 240;

function App() {
  const nonFunctionalRedux = useSelector((state) => state.nonFunctionalReducer);
  const dispatch = useDispatch();
  console.log(window.location);

  const allRoutes = {
    customer: "All Customers",
    "room-types": "Room Types",
    rooms: "Rooms",
    offers: "Offers",
  };

  const allIcons = [
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
                <ListItem
                  key={allRoute[1]}
                  to={allRoute[0]}
                  component={Link}
                  disablePadding
                  sx={{
                    // backgroundColor:
                    //   indexToRoute[selectedIndex] == allRoute[1]
                    //     ? "#c4b991"
                    //     : "#fff",
                    backgroundColor: nonFunctionalRedux.location.includes(
                      allRoute[0]
                    )
                      ? "#c4b991"
                      : "#fff",
                  }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <ListItemButton>
                    <ListItemIcon>{allIcons[index]}</ListItemIcon>
                    <ListItemText
                      primary={allRoute[1]}
                      sx={{
                        // color:
                        //   indexToRoute[selectedIndex] == allRoute[1]
                        //     ? "#fff"
                        //     : "#c4b991",
                        color: nonFunctionalRedux.location.includes(allRoute[0])
                          ? "#fff"
                          : "#c4b991",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
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
              <Route path="" element={<LogInForm />} />
              <Route path="/customer" element={<Customers />} />
              <Route
                path="/customer-detail/:bookingNumber"
                element={<CustomersDetail />}
              />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/room-detail/:id" element={<RoomsDetail />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/room-types" element={<RoomTypes />} />
              <Route
                path="/room-type-detail/:id"
                element={<RoomTypeDetail />}
              />
              <Route path="/add-room-type" element={<AddRoomType />} />
              <Route path="/offers" element={<Offers />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
      <Toast />
    </>
  );
}

export default App;
