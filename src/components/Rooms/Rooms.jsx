import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../../services/rooms";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { updateAllRooms } from "../../features/room/roomSlice";
import { ADMIN } from "../../constants";

const Rooms = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const authRedux = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);
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

  const columns = [
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
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "10px" }}
              onClick={() => handleClick(params.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [
    { id: 1, roomNumber: "101", roomType: "Non - AC", available: true },
    { id: 2, roomNumber: "102", roomType: "Deluxe", available: true },
    { id: 3, roomNumber: "103", roomType: "Deluxe", available: false },
    { id: 4, roomNumber: "104", roomType: "Superior", available: true },
    { id: 5, roomNumber: "105", roomType: "Deluxe", available: true },
    { id: 6, roomNumber: "201", roomType: "Non - AC", available: false },
    { id: 7, roomNumber: "202", roomType: "Superior", available: true },
    { id: 8, roomNumber: "203", roomType: "Superior", available: false },
    { id: 9, roomNumber: "204", roomType: "Non - AC", available: false },
    { id: 10, roomNumber: "205", roomType: "Non - AC", available: true },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

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
        <Button
          variant="contained"
          style={{ backgroundColor: "var(--sage)" }}
          onClick={() => navigate("/add-rooms")}
        >
          Add
        </Button>
      </Box>
      <Paper
        sx={{ width: "100%", height: 450, marginTop: "20px", boxShadow: 3 }}
      >
        <DataGrid
          // rows={rows}
          // columns={columns}
          rows={roomRedux.allRooms}
          columns={allColumns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default Rooms;
