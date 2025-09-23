import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { CustomButtonStyle } from "../../MUIStyle/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { confirmOfflineBooking } from "../../services/booking";
import { updateCustomerCheckoutDate } from "../../services/customers";
import "./ExtendBooking.css";
import { useNavigate } from "react-router-dom";

const ExtendBooking = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const authRedux = useSelector((state) => state.authReducer);
  const [bookingStartDate, setBookingStartDate] = useState(null);
  const [bookingEndDate, setBookingEndDate] = useState(null);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [dateErrors, setDateErrors] = useState({ start: "", end: "" });
  const [searchBookingId, setSearchBookingId] = useState("");
  const [filteredRow, setFilteredRow] = useState(null);
  const [previousRoomTypes, setPreviousRoomTypes] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  function getRoomTypeNumber(roomType) {
    return roomType?.toLowerCase() === "non-ac room"
      ? 1
      : roomType?.toLowerCase() === "deluxe room"
      ? 2
      : 3;
  }

  const applyFilter = () => {
    const getFilteredRow = roomRedux.allCustomers.filter((customer) =>
      customer?.bookingNumber
        ?.toString()
        .toLowerCase()
        .includes(searchBookingId?.toLowerCase())
    );

    if (getFilteredRow.length > 0) {
      const booking = getFilteredRow[0];
      setFilteredRow({
        name: booking.name,
        email: booking.email,
        mobile: booking.mobile,
        adult: booking.noOfAdults,
        child: booking.noOfChilds,
        roomType: booking.roomType,
        roomNumber: booking.roomNumber,
        amountPaid: booking.amountPaid,
        rooms: booking.rooms,
        bookingNumber: booking.bookingNumber,
      });

      const originalCheckout = dayjs(booking.checkOut, "DD-MM-YYYY");
      setBookingStartDate(originalCheckout);
      setBookingEndDate(null);
      setTotalPayableAmount(0);

      let roomTypeArray =
        booking.rooms?.map((r) => getRoomTypeNumber(r.roomType)) || [];
      let roomTypeObj = { 1: 0, 2: 0, 3: 0 };

      roomTypeArray.forEach((type) => {
        if (type === 1) roomTypeObj[1]++;
        else if (type === 2) roomTypeObj[2]++;
        else roomTypeObj[3]++;
      });

      setPreviousRoomTypes(roomTypeObj);
    } else {
      toast.error("No booking found with that ID.");
    }
  };

  useEffect(() => {
    if (bookingStartDate && bookingEndDate) {
      const d1 = dayjs(bookingStartDate);
      const d2 = dayjs(bookingEndDate);
      const noOfDaysForStay = d2.diff(d1, "day");

      const totalAmount =
        Object.entries(previousRoomTypes).reduce((acc, [roomId, count]) => {
          const roomType = roomRedux.allRoomTypesWithKeyAsId[roomId];
          return (
            acc + (roomType ? roomType.pricePerNight * Number(count || 0) : 0)
          );
        }, 0) * noOfDaysForStay;

      const tax = (totalAmount * roomRedux.taxPercent) / 100;
      setTotalPayableAmount(totalAmount + Number(tax.toFixed(2)));
    }
  }, [bookingStartDate, bookingEndDate, roomRedux]);

  async function handleSubmit() {
    const response = await updateCustomerCheckoutDate(
      filteredRow.bookingNumber,
      Number(totalPayableAmount),
      bookingEndDate
    );

    if (response.status === 200) {
      toast.success("Updated Checkout date successfully");
      navigate("/customer");
    } else {
      toast.error(
        response?.data?.error ||
          response?.message ||
          response?.error ||
          "Please try again later."
      );
    }
  }

  return (
    <Box sx={{ width: "600px", margin: "20px auto 0" }}>
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
          Extend Booking
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
            onClick={applyFilter}
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
            Search
          </Button>
        </Box>
      </Box>

      <Paper
        sx={{
          width: "100%",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
          <TextField
            type="text"
            name="name"
            label="Full Name"
            variant="outlined"
            value={filteredRow?.name || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            value={filteredRow?.email || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
          <TextField
            type="number"
            name="mobile"
            label="Mobile Number"
            variant="outlined"
            value={filteredRow?.mobile || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Booking Start Date"
              value={bookingStartDate}
              onChange={setBookingStartDate}
              disablePast
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  sx: TextFieldStyle,
                  error: Boolean(dateErrors.start),
                  helperText: dateErrors.start,
                },
              }}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Booking End Date"
              value={bookingEndDate}
              onChange={setBookingEndDate}
              disablePast
              minDate={
                bookingStartDate
                  ? dayjs(bookingStartDate).add(1, "day")
                  : undefined
              }
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  sx: TextFieldStyle,
                  error: Boolean(dateErrors.end),
                  helperText: dateErrors.end,
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="form-group2">
          <FormControl sx={{ mt: 2, minWidth: "46%" }}>
            <TextField
              type="number"
              name="adult"
              label="No. of Adult"
              variant="outlined"
              value={filteredRow?.adult || ""}
              disabled
              sx={TextFieldStyle}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, minWidth: "46%" }}>
            <TextField
              type="number"
              name="child"
              label="No. of Child"
              variant="outlined"
              value={filteredRow?.child || ""}
              disabled
              sx={TextFieldStyle}
            />
          </FormControl>
        </div>

        <FormControl sx={{ mt: 2, minWidth: "100%" }}>
          <TextField
            type="text"
            name="roomType"
            label="Room Type"
            variant="outlined"
            value={filteredRow?.roomType || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: "100%" }}>
          <TextField
            type="text"
            name="roomNumber"
            label="Room Number"
            variant="outlined"
            value={filteredRow?.roomNumber || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: "100%" }}>
          <TextField
            type="number"
            name="amountPaid"
            label="Amount Paid"
            variant="outlined"
            value={filteredRow?.amountPaid || ""}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: "100%" }}>
          <TextField
            type="number"
            name="extendedAmount"
            label="Extended Amount"
            variant="outlined"
            value={totalPayableAmount}
            disabled
            sx={TextFieldStyle}
          />
        </FormControl>

        <Button
          type="submit"
          sx={CustomButtonStyle}
          fullWidth
          disabled={!totalPayableAmount}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default ExtendBooking;
