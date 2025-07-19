import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../services/rooms";
import { toast } from "react-toastify";
import { getAllRoomTypes } from "../../services/roomTypes";
import { updateCustomerCheckoutDate } from "../../services/customers";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import dayjs from "dayjs";

const CustomersDetail = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const { bookingNumber } = useParams();
  const [customerBookingNumber, setCustomerBookingNumber] =
    useState(bookingNumber);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [oldCheckoutDate, setOldCheckoutDate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const oldDate = roomRedux.allCustomers?.map((customer) => {
      if (customer.bookingNumber === customerBookingNumber) {
        return customer.checkOut;
      }
      return "";
    });
    setOldCheckoutDate(oldDate[0].split("-").reverse().join("-"));
    dispatch(updateLocation(window.location.pathname));
  }, []);

  // function handleChange(e) {
  //   const { name, value } = e.target;

  //   setRoomDetails((preval) => {
  //     return {
  //       ...preval,
  //       [name]: value,
  //     };
  //   });
  // }

  async function handleClick() {
    const response = await updateCustomerCheckoutDate(
      customerBookingNumber,
      checkoutDate
    );

    if (response.status === 200) {
      toast.success("Updated Customer details successfully");
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
    <Box
      sx={{
        width: "500px",
        margin: "20px auto 0",
      }}
    >
      <Typography
        style={{
          color: "var(--sage)",
          fontSize: "25px",
          fontWeight: "bolder",
        }}
      >
        Update Customer Details
      </Typography>
      <Box
        sx={{
          width: "500px",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="text"
            name="bookingNumber"
            label="Booking Number"
            variant="outlined"
            value={customerBookingNumber}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="text"
            name="oldCheckoutDate"
            label="Old Checkout Date"
            variant="outlined"
            value={oldCheckoutDate.split("-").reverse().join("-")}
            sx={TextFieldStyle}
            disabled={true}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="New Checkout Date"
              value={checkoutDate}
              onChange={(newValue) => setCheckoutDate(newValue)}
              disablePast={true}
              minDate={dayjs(new Date(oldCheckoutDate)).add(1, "day")}
              format="DD-MM-YYYY"
              sx={{
                "& fieldset": {
                  borderColor: "#c4b991 !important",
                },
                "& label": {
                  color: "#c4b991 !important",
                  fontSize: "14px",
                },
                "& .MuiButtonBase-root": {
                  "&:hover": {
                    border: "none !important",
                    backgroundColor: "transparent !important",
                  },
                },
              }}
            />
          </LocalizationProvider>
        </FormControl>
        <Box sx={{ marginTop: "20px", textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ marginLeft: "20px" }}
            onClick={handleClick}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomersDetail;
