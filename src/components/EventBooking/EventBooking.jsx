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
import { useFormik } from "formik";
import * as Yup from "yup";
import { eventBooking } from "../../services/booking";
import { toast } from "react-toastify";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { useNavigate } from "react-router-dom";
import "./EventBooking.css";

const initialValues = {
  name: "",
  email: "",
  mobile: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(40, "Too Long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
});

const EventBooking = () => {
  const [bookingStartDate, setBookingStartDate] = useState(null);
  const [bookingEndDate, setBookingEndDate] = useState(null);
  const [dateErrors, setDateErrors] = useState({ start: "", end: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  async function handleSubmit(finalOfflineBookingDetailsObj) {
    const response = await eventBooking(finalOfflineBookingDetailsObj);
    if (response.status === 201 || response.statusText === "OK") {
      toast.success(
        "Booking done successfully. You will get the booking details shortly."
      );
      navigate("/customer");
    } else {
      toast.error(
        response?.error ||
          response?.message ||
          "Something went wrong. Please try again later."
      );
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!bookingStartDate || !bookingEndDate) {
        setDateErrors({
          start: !bookingStartDate ? "Start date is required" : "",
          end: !bookingEndDate ? "End date is required" : "",
        });
        return;
      }

      setDateErrors({ start: "", end: "" });

      const updatedCheckInDate = dayjs(bookingStartDate).format("DD-MM-YYYY");
      const updatedCheckOutDate = dayjs(bookingEndDate).format("DD-MM-YYYY");

      const finalOfflineBookingDetailsObj = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        hotelId: 1,
        checkInDate: updatedCheckInDate,
        checkOutDate: updatedCheckOutDate,
      };

      handleSubmit(finalOfflineBookingDetailsObj);
      resetForm();
      setBookingStartDate(null);
      setBookingEndDate(null);
    },
  });

  return (
    <Box sx={{ width: "500px", margin: "20px auto 0" }}>
      <Typography
        sx={{ color: "var(--sage)", fontSize: "25px", fontWeight: "bolder" }}
      >
        Add New Event
      </Typography>

      <Paper
        sx={{
          width: "500px",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
            <TextField
              type="text"
              name="name"
              label="Full Name *"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={TextFieldStyle}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
            <TextField
              type="email"
              name="email"
              label="Email *"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={TextFieldStyle}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "100%", ml: 0 }}>
            <TextField
              type="number"
              name="mobile"
              label="Mobile Number *"
              variant="outlined"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              sx={TextFieldStyle}
            />
          </FormControl>

          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Booking Start Date"
                value={bookingStartDate}
                onChange={setBookingStartDate}
                disablePast={true}
                maxDate={bookingEndDate}
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
                disablePast={true}
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

          <Button
            type="submit"
            sx={CustomButtonStyle}
            fullWidth
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EventBooking;
