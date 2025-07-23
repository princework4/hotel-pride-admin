import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../services/customers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import {
  updateAllCustomers,
  updateRefundStatusCache,
} from "../../features/room/roomSlice";
import { cancelBooking, getRefundStatus } from "../../services/booking";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Customers = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchBookingId, setSearchBookingId] = useState("");

  async function fetchAllCustomers() {
    const data = await getAllCustomers();
    const refundCache = roomRedux.refundStatusCache;

    const finalArr = await Promise.all(
      data.map(async (item, i) => {
        let refundStatus = "N/A";
        const bookingId = item.bookingNumber;

        if (item?.status?.toLowerCase() === "cancelled") {
          if (refundCache[bookingId]) {
            refundStatus = refundCache[bookingId];
          } else {
            try {
              const refundRes = await getRefundStatus(bookingId);
              refundStatus = refundRes?.data?.refundStatus || "N/A";
              dispatch(
                updateRefundStatusCache({ bookingId, status: refundStatus })
              );
            } catch {
              refundStatus = "N/A";
            }
          }
        }

        return {
          id: i,
          index: i + 1,
          name: item.user.name,
          email: item.user.email,
          roomNumber: item.rooms[0].roomNumber,
          roomType: item.rooms[0].roomType,
          checkIn: item.checkInDate,
          checkOut: item.checkOutDate,
          bookingStatus: item.status,
          bookingNumber: bookingId,
          amountPaid: item.totalAmount,
          refundStatus,
        };
      })
    );

    dispatch(updateAllCustomers(finalArr));
  }

  useEffect(() => {
    fetchAllCustomers();
    dispatch(updateLocation(window.location.pathname));
  }, []);

  const handleCancelBooking = async (bookingNumber) => {
    try {
      const response = await cancelBooking(bookingNumber);
      if (response.status === 200) {
        toast.success("Booking cancelled successfully.");
        fetchAllCustomers();
      } else {
        toast.error(
          response?.message || response?.error || "Please try again later."
        );
      }
    } catch (error) {
      toast.error("Unable to cancel stay. Please try again later.");
    }
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "roomNumber", headerName: "Room No", width: 100 },
    { field: "roomType", headerName: "Room Type", width: 150 },
    { field: "bookingStatus", headerName: "Booking Status", width: 150 },
    { field: "bookingNumber", headerName: "Booking ID", width: 150 },
    {
      field: "refundStatus",
      headerName: "Refund Status",
      width: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color:
              params?.value?.toLowerCase() === "processed"
                ? "green"
                : params?.value?.toLowerCase() === "pending"
                ? "orange"
                : "gray",
            fontWeight: "bold",
            marginTop: "15px",
          }}
        >
          {params.value.toUpperCase()}
        </Typography>
      ),
    },
    { field: "checkIn", headerName: "Check In", width: 150 },
    { field: "checkOut", headerName: "Check Out", width: 150 },
    { field: "amountPaid", headerName: "Amount Paid", width: 150 },
    {
      field: "action",
      headerName: "Actions",
      width: 250,
      renderCell: (params) =>
        params?.row?.bookingStatus?.toLowerCase() !== "cancelled" && (
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
            <Button
              variant="contained"
              color="error"
              sx={{ marginLeft: "5px" }}
              onClick={() => handleCancelBooking(params.row.bookingNumber)}
            >
              Cancel
            </Button>
          </>
        ),
    },
  ];

  const filteredRows = roomRedux.allCustomers.filter((customer) =>
    customer?.bookingNumber
      ?.toString()
      .toLowerCase()
      .includes(searchBookingId?.toLowerCase())
  );

  const handleExportToExcel = () => {
    const exportData = roomRedux.allCustomers.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "customers.xlsx");
  };

  return (
    <>
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
            All Customers
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Search by Booking ID"
              variant="outlined"
              size="small"
              value={searchBookingId}
              onChange={(e) => setSearchBookingId(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#fff",
                  "& fieldset": {
                    borderColor: "var(--sage)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--sage)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--sage)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "var(--sage)",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--sage)",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleExportToExcel}
              sx={{
                marginLeft: "10px",
                height: "40px",
                backgroundColor: "var(--sage)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "var(--sage)",
                  opacity: 0.9,
                },
              }}
            >
              Export to Excel
            </Button>
          </Box>
        </Box>
        <Paper
          sx={{ width: "100%", height: 450, marginTop: "20px", boxShadow: 3 }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[10, 50, 100]}
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Customers;
