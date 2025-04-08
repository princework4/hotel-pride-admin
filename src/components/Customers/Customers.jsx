import React from "react";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "checkIn", headerName: "Check In", width: 100 },
    { field: "checkOut", headerName: "Check Out", width: 100 },
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
              onClick={() => navigate("/customer-detail")}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [
    { id: 1, name: "Test 1", checkIn: "05-04-2025", checkOut: "09-04-2025" },
    { id: 2, name: "Test 2", checkIn: "07-04-2025", checkOut: "08-04-2025" },
    { id: 3, name: "Test 3", checkIn: "07-04-2025", checkOut: "08-04-2025" },
    { id: 4, name: "Test 4", checkIn: "08-04-2025", checkOut: "10-04-2025" },
    { id: 5, name: "Test 5", checkIn: "07-04-2025", checkOut: "08-04-2025" },
    { id: 6, name: "Test 6", checkIn: "05-04-2025", checkOut: "09-04-2025" },
    { id: 7, name: "Test 7", checkIn: "08-04-2025", checkOut: "10-04-2025" },
    { id: 8, name: "Test 8", checkIn: "08-04-2025", checkOut: "10-04-2025" },
    { id: 9, name: "Test 9", checkIn: "05-04-2025", checkOut: "09-04-2025" },
    { id: 10, name: "Test 10", checkIn: "05-04-2025", checkOut: "09-04-2025" },
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
            color: "var(--terra-cotta)",
            fontSize: "25px",
            fontWeight: "bolder",
          }}
        >
          All Customers
        </Typography>
        <Button
          variant="contained"
          style={{ backgroundColor: "var(--terra-cotta)" }}
          onClick={() => navigate("/add-rooms")}
        >
          Add
        </Button>
      </Box>
      <Paper sx={{ width: "100%", height: 450, marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default Customers;
