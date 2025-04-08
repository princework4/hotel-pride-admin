import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomTypeById, updateRoomType } from "../../services/roomTypes";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const RoomTypeDetail = () => {
  const [roomTypeDetail, setRoomTypeDetail] = useState({
    id: "",
    typeName: "",
    capacityAdult: "",
    capacityChild: "",
    pricePerNight: "",
    description: "",
    roomSizeInSquareFeet: "",
    amenities: null,
    assets: null,
    replaceAssets: false,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchRoomTypeDetail() {
    const response = await getRoomTypeById(id);
    setRoomTypeDetail({
      id: response?.data?.id,
      typeName: response?.data?.typeName,
      capacityAdult: response?.data?.capacityAdult,
      capacityChild: response?.data?.capacityChild,
      pricePerNight: response?.data?.pricePerNight,
      description: response?.data?.description,
      roomSizeInSquareFeet: response?.data?.roomSizeInSquareFeet,
      amenities: response?.data?.amenities,
      assets: response?.data?.assets,
    });
  }

  useEffect(() => {
    fetchRoomTypeDetail();
  }, []);

  function handleChange(e, isCheckbox = false, isAssets = false) {
    if (isCheckbox) {
      const { name, checked } = e.target;
      setRoomTypeDetail((preval) => {
        return {
          ...preval,
          [name]: checked,
        };
      });
    }
    if (isAssets) {
      const { name, files } = e.target;
      const reader = new FileReader();
      const allAssets = [];

      for (let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          allAssets.push(reader.result);
        };
      }

      setRoomTypeDetail((preval) => {
        return {
          ...preval,
          [name]: allAssets,
        };
      });
    }

    const { name, value } = e.target;
    setRoomTypeDetail((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  async function handleClick() {
    // await updateRoomType(roomTypeDetail.assets);
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
        Update Room Type Details
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
            type="text"
            name="typeName"
            label="Type Name"
            variant="outlined"
            value={roomTypeDetail.typeName}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="capacityAdult"
            label="Adult Capacity"
            variant="outlined"
            value={roomTypeDetail.capacityAdult}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="capacityChild"
            label="Child Capacity"
            variant="outlined"
            value={roomTypeDetail.capacityChild}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="pricePerNight"
            label="Price Per Night"
            variant="outlined"
            value={roomTypeDetail.pricePerNight}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
          <TextField
            type="text"
            name="description"
            label="Description"
            variant="outlined"
            value={roomTypeDetail.description}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth>
          <TextField
            type="number"
            name="roomSizeInSquareFeet"
            label="Room Size In Square Feet"
            variant="outlined"
            value={roomTypeDetail.roomSizeInSquareFeet}
            onChange={handleChange}
            sx={TextFieldStyle}
          />
        </FormControl>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="replaceAssets"
                value={roomTypeDetail.replaceAssets}
                sx={{ "& svg": { color: "var(--terra-cotta)" } }}
                onChange={(e) => handleChange(e, true)}
              />
            }
            label="Replace All Assets"
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ backgroundColor: "var(--terra-cotta)" }}
          >
            Upload Assets
            <VisuallyHiddenInput
              name="assets"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, false, true)}
              multiple
            />
          </Button>
        </Box>
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

export default RoomTypeDetail;
