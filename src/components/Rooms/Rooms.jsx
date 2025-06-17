import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../../services/rooms";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { updateAllRooms } from "../../features/room/roomSlice";
import { ADMIN } from "../../constants";

import "./Rooms.css";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`room-card ${room.available ? "available" : "unavailable"}`}
    >
      {console.log(room)}
      <h3>Room #{room.roomNumber}</h3>
      <h5>{room.roomType}</h5>
      <span className="tag">
        {room.available ? "🟢 Available" : "🔴 Occupied"}
      </span>
      <br />
      <Button
        className="edit-btn"
        variant="contained"
        // color="primary"
        onClick={() => navigate(`/rooms-detail/${room.id}`)}
      >
        ✏️ Edit
      </Button>
    </div>
  );
};

const Rooms = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const authRedux = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchAllRooms();
    dispatch(updateLocation(window.location.pathname));
  }, []);

  async function handleClick(id) {
    const response = await deleteRoom(id);
    if (response.status === 200) {
      toast.success("Record deleted successfully");
    } else {
      toast.error(
        response?.data?.error || response?.message || response?.error
      );
    }
  }

  const allColumns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "roomNumber", headerName: "Room Number", width: 150 },
    { field: "roomType", headerName: "Room Type", width: 150 },
    {
      field: "available",
      headerName: "Availability",
      type: "boolean",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value === true ? "Available" : "Occupied"}
            color={params.value === true ? "success" : "error"}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/rooms-detail/${params.id}`)}
            >
              Edit
            </Button>
            {authRedux.loggedInUserType === ADMIN && (
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: "10px" }}
                onClick={() => handleClick(params.id)}
              >
                Delete
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box style={{ maxWidth: "90%", margin: "20px auto 0" }}>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            color: "var(--sage)",
            fontSize: "25px",
            fontWeight: "bolder",
          }}
        >
          Rooms Availability
        </Typography>
        <FormControlLabel
          sx={{
            "& span:last-child": {
              color: "var(--sage)",
              fontSize: "17px",
              fontWeight: "600 !important",
            },
          }}
          control={
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              sx={{
                "& .Mui-checked": {
                  color: "#c4b991 !important",
                },
                "& .Mui-checked+.MuiSwitch-track": {
                  backgroundColor: "#c4b991 !important",
                },
              }}
            />
          }
          label="Table View"
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "var(--sage)" }}
          onClick={() => navigate("/add-rooms")}
        >
          Add
        </Button>
      </Box>
      <Box className={!checked ? "rooms_page" : ""}>
        <Paper
          sx={{
            width: "100%",
            marginTop: "20px",
            boxShadow: !checked ? 0 : 3,
            background: !checked ? "transparent" : "#fff",
          }}
          className="rooms-grid"
        >
          {checked ? (
            <DataGrid
              rows={roomRedux.allRooms}
              columns={allColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[
                5,
                10,
                roomRedux.allRooms.length < 50 ? roomRedux.allRooms.length : 50,
                roomRedux.allRooms.length > 50 ? roomRedux.allRooms.length : 50,
                100,
              ]}
              sx={{ border: 0 }}
            />
          ) : (
            roomRedux.allRooms.map((room) => (
              <RoomCard key={room.roomNumber} room={room} />
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Rooms;
