import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../services/customers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";

const Customers = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const [allCustomers, setAllCustomers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      setAllCustomers(finalArr);
    }
  }

  useEffect(() => {
    // fetchAllCustomers();
    dispatch(updateLocation(window.location.pathname));
  }, []);

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "roomNumber", headerName: "Room No", width: 100 },
    { field: "roomType", headerName: "Room Type", width: 150 },
    { field: "checkIn", headerName: "Check In", width: 150 },
    { field: "checkOut", headerName: "Check Out", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(`/customer-detail/${params.row.bookingNumber}`)
              }
            >
              Edit
            </Button>
            {/* <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button> */}
          </>
        );
      },
    },
  ];

  // const rows = [
  //   { id: 1, name: "Test 1", checkIn: "05-04-2025", checkOut: "09-04-2025" },
  //   { id: 2, name: "Test 2", checkIn: "07-04-2025", checkOut: "08-04-2025" },
  //   { id: 3, name: "Test 3", checkIn: "07-04-2025", checkOut: "08-04-2025" },
  //   { id: 4, name: "Test 4", checkIn: "08-04-2025", checkOut: "10-04-2025" },
  //   { id: 5, name: "Test 5", checkIn: "07-04-2025", checkOut: "08-04-2025" },
  //   { id: 6, name: "Test 6", checkIn: "05-04-2025", checkOut: "09-04-2025" },
  //   { id: 7, name: "Test 7", checkIn: "08-04-2025", checkOut: "10-04-2025" },
  //   { id: 8, name: "Test 8", checkIn: "08-04-2025", checkOut: "10-04-2025" },
  //   { id: 9, name: "Test 9", checkIn: "05-04-2025", checkOut: "09-04-2025" },
  //   { id: 10, name: "Test 10", checkIn: "05-04-2025", checkOut: "09-04-2025" },
  // ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      {/* {toast.success("testing")} */}
      <Box
        // sx={{ boxShadow: 3 }}
        style={{ maxWidth: "90%", margin: "20px auto 0" }}
      >
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
            All Customers
          </Typography>
          {/* <Button
            variant="contained"
            style={{ backgroundColor: "var(--sage)" }}
            onClick={() => navigate("/add-rooms")}
          >
            Add
          </Button> */}
        </Box>
        <Paper
          sx={{ width: "100%", height: 450, marginTop: "20px", boxShadow: 3 }}
        >
          <DataGrid
            rows={roomRedux.allCustomers}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Customers;
