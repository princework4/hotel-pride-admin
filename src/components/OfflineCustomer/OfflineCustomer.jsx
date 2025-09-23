import React, { useState, useEffect, useMemo } from "react";
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
import "./OfflineCustomer.css";
import { confirmOfflineBooking } from "../../services/booking";
import { toast } from "react-toastify";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { Calculate } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  mobile: "",
  adult: "",
  child: "",
  rooms: {},
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
  adult: Yup.number()
    .typeError("Must be a number")
    .positive("Must be greater than 0")
    .required("Required"),
  child: Yup.number()
    .typeError("Must be a number")
    .min(0, "Cannot be negative")
    .required("Required"),
  rooms: Yup.object().test(
    "room-counts",
    "Room counts must be non-negative",
    (value) => Object.values(value).every((count) => Number(count) >= 0)
  ),
});

const OfflineCustomer = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const authRedux = useSelector((state) => state.authReducer);
  const [bookingStartDate, setBookingStartDate] = useState(null);
  const [bookingEndDate, setBookingEndDate] = useState(null);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [dateErrors, setDateErrors] = useState({ start: "", end: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  async function handleSubmit(finalOfflineBookingDetailsObj) {
    const response = await confirmOfflineBooking(finalOfflineBookingDetailsObj);
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

      const roomBookingList = Object.entries(values.rooms)
        .filter(([_, count]) => Number(count) > 0)
        .map(([roomTypeId, count]) => ({
          roomTypeId: Number(roomTypeId),
          noOfRooms: Number(count),
        }));

      const finalOfflineBookingDetailsObj = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        userId: authRedux?.loggedInUser?.id,
        hotelId: 1,
        couponCode: "",
        noOfAdults: values.adult,
        noOfChildrens: values.child,
        checkInDate: updatedCheckInDate,
        checkOutDate: updatedCheckOutDate,
        totalAmount: Number(totalPayableAmount),
        payableAmount: Number(totalPayableAmount),
        roomBookingList,
      };

      handleSubmit(finalOfflineBookingDetailsObj);
      resetForm();
      setBookingStartDate(null);
      setBookingEndDate(null);
      setTotalPayableAmount(0);
    },
  });

  function calculateTotalAmount() {
    setTotalPayableAmount(0);
    if (bookingStartDate && bookingEndDate) {
      const d1 = dayjs(bookingStartDate);
      const d2 = dayjs(bookingEndDate);
      const noOfDaysForStay = d2.diff(d1, "day");

      const totalAmount =
        Object.entries(formik.values.rooms).reduce((acc, [roomId, count]) => {
          const roomType = roomRedux.allRoomTypesWithKeyAsId[roomId];
          return (
            acc + (roomType ? roomType.pricePerNight * Number(count || 0) : 0)
          );
        }, 0) * noOfDaysForStay;

      const tax = (totalAmount * roomRedux.taxPercent) / 100;
      setTotalPayableAmount(totalAmount + Number(tax.toFixed(2)));
    }
  }

  const roomFields = useMemo(() => {
    return roomRedux.allRoomTypes.map((roomType) => (
      <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth key={roomType.id}>
        <TextField
          type="number"
          name={`rooms.${roomType.id}`}
          label={`${roomType.typeName} Count`}
          variant="outlined"
          value={formik.values.rooms[roomType.id] || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.rooms?.[roomType.id] &&
            Boolean(formik.errors.rooms?.[roomType.id])
          }
          helperText={
            formik.touched.rooms?.[roomType.id] &&
            formik.errors.rooms?.[roomType.id]
          }
          sx={TextFieldStyle}
          inputProps={{ min: 1 }}
        />
      </FormControl>
    ));
  }, [
    roomRedux.allRoomTypes,
    formik.values.rooms,
    formik.errors.rooms,
    formik.touched.rooms,
  ]);

  return (
    <Box sx={{ width: "500px", margin: "20px auto 0" }}>
      <Typography
        sx={{ color: "var(--sage)", fontSize: "25px", fontWeight: "bolder" }}
      >
        Add Offline Customer
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

          <div className="form-group2">
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                type="number"
                name="adult"
                label="No. of Adult"
                variant="outlined"
                value={formik.values.adult}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.adult && Boolean(formik.errors.adult)}
                helperText={formik.touched.adult && formik.errors.adult}
                sx={TextFieldStyle}
                inputProps={{ min: 0 }}
              />
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                type="number"
                name="child"
                label="No. of Child"
                variant="outlined"
                value={formik.values.child}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.child && Boolean(formik.errors.child)}
                helperText={formik.touched.child && formik.errors.child}
                sx={TextFieldStyle}
                inputProps={{ min: 0 }}
              />
            </FormControl>
          </div>

          {roomFields}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                marginTop: "10px",
                color: "var(--sage)",
                fontWeight: "bold",
              }}
            >
              Total amount :-{" "}
              {isNaN(totalPayableAmount) ? "0.0" : totalPayableAmount}
            </Typography>
            <Button sx={CustomButtonStyle} onClick={calculateTotalAmount}>
              Calculate Amount
            </Button>
          </Box>

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

export default OfflineCustomer;
