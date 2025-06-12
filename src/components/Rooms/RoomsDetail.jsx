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
import { toast } from "react-toastify";
import { getAllRoomTypes } from "../../services/roomTypes";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { useDispatch, useSelector } from "react-redux";

const RoomsDetail = () => {
  const roomRedux = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const [roomDetails, setRoomDetails] = useState({
    id: 0,
    roomNumber: 0,
    roomType: "",
  });
  const [roomAvailable, setRoomAvailable] = useState(true);
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchRoomDetail() {
    const response = await getRoomById(id);
    if (response.status === 200) {
      setRoomDetails({
        id: response.data.id,
        roomNumber: response.data.roomNumber,
        roomType: response.data.roomType.id,
      });
      setRoomAvailable(response.data.available);
    }
  }

  async function fetchAllRoomTypes() {
    const response = await getAllRoomTypes();
    if (response.status === 200) {
      setAllRoomTypes(response.data);
    }
  }

  useEffect(() => {
    fetchRoomDetail();
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
    const response = await updateRoom(
      roomDetails.id,
      roomDetails.roomNumber,
      roomAvailable,
      1,
      roomDetails.roomType
    );

    if (response.status === 200) {
      toast.success("Updated Room details successfully");
      navigate("/rooms");
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
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
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
