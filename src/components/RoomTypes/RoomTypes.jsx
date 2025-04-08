import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteRoomType, getAllRoomTypes } from "../../services/roomTypes";

const RoomTypes = () => {
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const navigate = useNavigate();

  async function fetchAllRoomTypes() {
    const response = await getAllRoomTypes();
    setAllRoomTypes(response.data);
  }

  useEffect(() => {
    fetchAllRoomTypes();
  }, []);

  async function handleClick(id) {
    const response = await deleteRoomType(id);
    if (response?.status === 200) {
      toast.success("Record deleted successfully");
    } else {
      toast.error(response?.message || response?.error);
    }
  }

  const rows = [
    { id: 1, roomType: "Non - Ac" },
    { id: 2, roomType: "Deluxe" },
    { id: 3, roomType: "Executive" },
  ];

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
            color: "var(--terra-cotta)",
            fontSize: "25px",
            fontWeight: "bolder",
          }}
        >
          Room Types
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "var(--terra-cotta)" }}
          onClick={() => navigate("/add-room-type")}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bolder" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Room Type</TableCell>
              <TableCell sx={{ fontWeight: "bolder" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.roomType}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/room-type-detail/${row.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginLeft: "10px" }}
                    onClick={handleClick}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoomTypes;
