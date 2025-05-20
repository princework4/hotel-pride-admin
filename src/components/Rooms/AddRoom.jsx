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
import { useNavigate } from "react-router-dom";
import { addRooms } from "../../services/rooms";
import { toast } from "react-toastify";
import { getAllRoomTypes } from "../../services/roomTypes";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";

const AddRoom = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const [roomDetails, setRoomDetails] = useState({
    roomNumber: "",
    roomType: "",
  });
  const [roomAvailable, setRoomAvailable] = React.useState(true);
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const navigate = useNavigate();

  async function fetchAllRoomTypes() {
    const response = await getAllRoomTypes();
    if (response.status === 200) {
      setAllRoomTypes(response.data);
    }
  }

  useEffect(() => {
    // fetchAllRoomTypes();
    setAllRoomTypes(roomRedux.allRoomTypes);
    dispatch(updateLocation(window.location.pathname));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setRoomDetails((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  async function handleClick() {
    const response = await addRooms(
      roomDetails.roomNumber,
      roomAvailable,
      1,
      roomDetails.roomType
    );

    if (response.status === 200) {
      toast.success("New Room added successfully");
    } else {
      toast.error(
        response?.data?.error || response?.message || response?.error
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
        Add New Room
      </Typography>
      <Box
        sx={{
          width: "500px",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "20px",
          backgroundColor: "background.paper",
          textAlign: "right",
        }}
      >
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="roomNumber"
            label="Room Number"
            variant="outlined"
            value={roomDetails.roomNumber}
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
            checked={roomAvailable}
            onChange={(e) => setRoomAvailable(e.target.checked)}
            sx={{
              "& .Mui-checked": {
                color: "#c4b991 !important",
              },
              "& .Mui-checked+.MuiSwitch-track": {
                backgroundColor: "#c4b991 !important",
              },
            }}
          />
        </FormControl>
        <FormControl
          sx={{ mt: "10px", minWidth: 120, textAlign: "left" }}
          fullWidth
        >
          <InputLabel
            className="test"
            sx={{
              fontSize: "14px",
              "&.Mui-focused": {
                color: "#c4b991 !important",
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
            value={roomDetails.roomType}
            onChange={handleChange}
            sx={{
              borderRadius: "30px",
              fontSize: "14px",
              "&:hover fieldset": {
                borderColor: "#c4b991 !important",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#c4b991 !important",
              },
            }}
          >
            {allRoomTypes?.map((allRoomType) => {
              return (
                <MenuItem key={allRoomType.id} value={allRoomType.id}>
                  {allRoomType.typeName}
                </MenuItem>
              );
            })}
            {/* <MenuItem key={1} value={1}>
              Non - AC
            </MenuItem>
            <MenuItem key={2} value={2}>
              Deluxe
            </MenuItem>
            <MenuItem key={3} value={3}>
              Superior
            </MenuItem> */}
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
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddRoom;
