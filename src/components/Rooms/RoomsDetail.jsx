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
import React, { useEffect, useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../services/rooms";

const RoomsDetail = () => {
  const [roomDetails, setRoomDetails] = useState({
    id: null,
    roomNumber: null,
    roomType: null,
  });
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchRoomDetail() {
    const response = await getRoomById(id);
    setRoomDetails({
      id: response?.data?.id,
      roomNumber: response?.data?.roomNumber,
      roomType: response?.data?.roomType,
    });
  }

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  function handleChange() {
    const { name, value } = e.target;

    setRoomDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  async function handleClick() {
    const response = await updateRoom(
      roomDetails.id,
      roomDetails.roomNumber,
      checked,
      1,
      roomDetails.roomType
    );

    if (response?.status === 200) {
      toast.success("Updated Room details successfully");
    } else {
      toast.error(response?.message || response?.error);
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
          color: "var(--terra-cotta)",
          fontSize: "25px",
          fontWeight: "bolder",
        }}
      >
        Update Room Details
      </Typography>
      <Box
        sx={{
          width: "500px",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
        }}
      >
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="roomNumber"
            label="Room Number"
            variant="outlined"
            //   value={values.guest}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl
          sx={{
            mt: "10px",
            minWidth: 120,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          fullWidth
        >
          <Typography>Is Room Available</Typography>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{
              "& .Mui-checked": {
                color: "#b85042 !important",
              },
              "& .Mui-checked+.MuiSwitch-track": {
                backgroundColor: "#b85042 !important",
              },
            }}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <InputLabel
            className="test"
            sx={{
              fontSize: "14px",
              "&.Mui-focused": {
                color: "#b85042 !important",
              },
            }}
          >
            Room Type
          </InputLabel>
          <Select
            name="roomType"
            label="Room Type"
            labelId="simple-select-label"
            inputProps={{ "aria-label": "Without label" }}
            onChange={handleChange}
            sx={{
              borderRadius: "30px",
              fontSize: "14px",
              "&:hover fieldset": {
                borderColor: "#b85042 !important",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#b85042 !important",
              },
            }}
          >
            <MenuItem key={1} value={1}>
              Non - AC
            </MenuItem>
            <MenuItem key={2} value={2}>
              Deluxe
            </MenuItem>
            <MenuItem key={3} value={3}>
              Superior
            </MenuItem>
          </Select>
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

export default RoomsDetail;
