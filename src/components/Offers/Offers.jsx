import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { CustomButtonStyle } from "../../MUIStyle/Button";
import CloseIconCircle from "../CloseIconCircle/CloseIconCircle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./Offers.css";

const Offers = () => {
  const [allOffers, setAllOffers] = useState({
    nonAc: "",
    deluxe: "",
    executive: "",
  });
  const [offerStartDate, setOfferStartDate] = useState(null);
  const [offerEndDate, setOfferEndDate] = useState(null);

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
    const data = await addOffers(
      offerStartDate,
      offerEndDate,
      allOffers.nonAc,
      allOffers.deluxe,
      allOffers.executive
    );

    if (data) {
    } else {
    }

    setAllOffers({
      nonAc: null,
      deluxe: null,
      executive: null,
    });
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
          color: "var(--terra-cotta)",
          fontSize: "25px",
          fontWeight: "bolder",
        }}
      >
        Add Offers
      </Typography>
      {/* <h2>Add Offers</h2> */}
      {/* <CloseIconCircle /> */}

      {/* <Box sx={OfferContainer}> */}
      <Box
        sx={{
          width: "500px",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
        }}
      >
        {/* <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Offer Start Date"
              value={offerStartDate}
              onChange={(newValue) => setOfferStartDate(newValue)}
              disablePast={true}
              format="DD/MM/YYYY"
              sx={{
                "& fieldset": {
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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

          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              type="number"
              name="nonAc"
              label="Non-AC Room"
              variant="outlined"
              value={allOffers.nonAc}
              onChange={handleChange}
              sx={TextFieldStyle}
            />
          </FormControl>
        </div>
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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

          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              type="number"
              name="deluxe"
              label="Deluxe Room"
              variant="outlined"
              value={allOffers.deluxe}
              onChange={handleChange}
              sx={TextFieldStyle}
            />
          </FormControl>
        </div>
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  transform: "translate(14px, 7px)",
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

          <FormControl sx={{ minWidth: 120 }}>
            <TextField
              type="number"
              name="executive"
              label="Executive Room"
              variant="outlined"
              value={allOffers.executive}
              onChange={handleChange}
              sx={TextFieldStyle}
            />
          </FormControl>
        </div> */}

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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  //   transform: "translate(14px, 7px)",
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
                  borderColor: "#b85042 !important",
                },
                "& label": {
                  color: "#b85042 !important",
                  fontSize: "14px",
                  //   transform: "translate(14px, 7px)",
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
        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="nonAc"
            label="Non-AC Room"
            variant="outlined"
            value={allOffers.nonAc}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="deluxe"
            label="Deluxe Room"
            variant="outlined"
            value={allOffers.deluxe}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="executive"
            label="Executive Room"
            variant="outlined"
            value={allOffers.executive}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>

        <Button onClick={handleSubmit} sx={CustomButtonStyle} fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Offers;
