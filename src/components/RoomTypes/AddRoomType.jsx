import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { useNavigate } from "react-router-dom";
import { addRoomType, updateRoomTypeAssets } from "../../services/roomTypes";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";
import { useDispatch } from "react-redux";

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

const AddRoomType = () => {
  const [roomTypeDetail, setRoomTypeDetail] = useState({
    typeName: "",
    capacityAdult: "",
    capacityChild: "",
    pricePerNight: "",
    description: "",
    roomSizeInSquareFeet: "",
    amenities: null,
  });
  const [newAssets, setNewAssets] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLocation(window.location.pathname));
  }, []);

  function handleChange(e, isAssets) {
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

  function handleAssets(e) {
    const files = e.target.files;
    console.log("files :- ", files);
    setNewAssets(files);
  }

  async function handleClick() {
    const response = await addRoomType();
    if (response?.status === 200) {
      toast.success("New Room Type added successfully");
    } else {
      toast.error(
        response?.data?.error || response?.message || response?.error
      );
    }
  }

  async function handleAssetClick() {
    const formData = new FormData();
    for (let i = 0; i < newAssets?.length; i++) {
      formData.append("newAssets", newAssets[i]);
    }

    const response = await updateRoomTypeAssets(formData);
    console.log(response);
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
        Add New Room Type
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
            textAlign: "right",
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ backgroundColor: "var(--sage)" }}
          >
            Upload Assets
            <VisuallyHiddenInput
              name="assets"
              type="file"
              accept="image/*"
              onChange={handleAssets}
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
            color="secondary"
            sx={{ marginLeft: "20px" }}
            onClick={handleAssetClick}
          >
            Add Assets
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

export default AddRoomType;
