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
import { useState } from "react";

const drawerWidth = 240;

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allRoutes = {
    "/": "All Customers",
    "room-types": "Room Types",
    rooms: "Rooms",
    offers: "Offers",
  };

  const indexToRoute = {
    0: "All Customers",
    1: "Room Types",
    2: "Rooms",
    3: "Offers",
  };

  const allIcons = [
    <PersonIcon />,
    <HouseIcon />,
    <MeetingRoomIcon />,
    <LocalOfferIcon />,
  ];

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "#b85042",
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
            backgroundColor: "#e7e8d1",
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
                  backgroundColor:
                    indexToRoute[selectedIndex] == allRoute[1]
                      ? "#b85042"
                      : "#fff",
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    {allIcons[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={allRoute[1]}
                    sx={{
                      color:
                        indexToRoute[selectedIndex] == allRoute[1]
                          ? "#fff"
                          : "#b85042",
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
            backgroundColor: "#e7e8d1",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Customers />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room-detail/:id" element={<RoomsDetail />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/room-types" element={<RoomTypes />} />
            <Route path="/room-type-detail/:id" element={<RoomTypeDetail />} />
            <Route path="/add-room-type" element={<AddRoomType />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
