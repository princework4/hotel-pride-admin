import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { CustomButtonStyle } from "../../MUIStyle/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateOffers } from "../../services/offers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Offers.css";
import { useEffect } from "react";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";

const Offers = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const [allOffers, setAllOffers] = useState({
    1: "",
    2: "",
    3: "",
  });
  const [offerStartDate, setOfferStartDate] = useState(null);
  const [offerEndDate, setOfferEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setAllOffers((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  async function handleSubmit() {
    const transformedOffers = [];
    for (const key in allOffers) {
      transformedOffers.push([key, allOffers[key]]);
    }
    const response = await updateOffers(
      1,
      offerStartDate,
      offerEndDate,
      transformedOffers
    );

    if (response.status === 200) {
      toast.success("Offers updated successfully.");
    } else {
      toast.error(
        response?.data?.error || response?.message || response?.error
      );
    }

    setAllOffers({
      1: "",
      2: "",
      3: "",
    });
    setOfferStartDate(null);
    setOfferEndDate(null);
  }

  const OfferContainer = {
    width: "500px",
    height: "auto",
    padding: "20px",
    border: "none",
    borderRadius: "20px",
    marginTop: "20px",
    bgcolor: "background.paper",
    boxShadow: 24,
    overflow: "auto",
    textAlign: "center",
  };

  const headingContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

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
        Add Offers
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
        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Offer Start Date"
              value={offerStartDate}
              onChange={(newValue) => setOfferStartDate(newValue)}
              disablePast={true}
              format="DD/MM/YYYY"
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Offer End Date"
              value={offerEndDate}
              onChange={(newValue) => setOfferEndDate(newValue)}
              disablePast={true}
              format="DD/MM/YYYY"
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
        </div>

        {roomRedux.allRoomTypes.map((roomType, i) => (
          <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth key={i}>
            <TextField
              type="number"
              name={roomType.id}
              label={roomType.typeName}
              variant="outlined"
              value={allOffers[`${roomType.id}`]}
              onChange={handleChange}
              sx={TextFieldStyle}
            />
          </FormControl>
        ))}

        <Button onClick={handleSubmit} sx={CustomButtonStyle} fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Offers;
