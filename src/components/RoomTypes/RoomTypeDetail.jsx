import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TextFieldStyle } from "../../MUIStyle/TextField";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRoomTypeById,
  updateRoomType,
  updateRoomTypeAssets,
} from "../../services/roomTypes";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Asset from "../Asset/Asset";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateLocation } from "../../features/nonFunctional/nonFunctionalSlice";

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

const itemData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const RoomTypeDetail = () => {
  const [roomTypeDetail, setRoomTypeDetail] = useState({
    id: "",
    typeName: "",
    capacityAdult: "",
    capacityChild: "",
    pricePerNight: "",
    description: "",
    roomSizeInSquareFeet: "",
  });
  const [assets, setAssets] = useState([]);
  const [newAssets, setNewAssets] = useState([]);
  const [allImages, setAllImages] = useState(itemData);
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchRoomTypeDetail() {
    const response = await getRoomTypeById(id);
    if (response.status === 200) {
      setRoomTypeDetail({
        id: response.data?.id,
        typeName: response.data?.typeName,
        capacityAdult: response.data?.capacityAdult,
        capacityChild: response.data?.capacityChild,
        pricePerNight: response.data?.pricePerNight,
        description: response.data?.description,
        roomSizeInSquareFeet: response.data?.roomSizeInSquareFeet ?? "",
      });
      setAssets(response.data?.assets);
    }
  }

  useEffect(() => {
    fetchRoomTypeDetail();
    dispatch(updateLocation(window.location.pathname));
  }, []);

  function handleChange(e) {
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
    setNewAssets(files);
  }

  async function handleClick() {
    // const formData = new FormData();
    // formData.append("id", roomTypeDetail.id);
    // formData.append("typeName", roomTypeDetail.typeName);
    // formData.append("capacityAdult", roomTypeDetail.capacityAdult);
    // formData.append("capacityChild", roomTypeDetail.capacityChild);
    // formData.append("pricePerNight", roomTypeDetail.pricePerNight);
    // formData.append("description", roomTypeDetail.description);
    // formData.append(
    //   "roomSizeInSquareFeet",
    //   roomTypeDetail.roomSizeInSquareFeet
    // );
    // for (let i = 0; i < newAssets?.length; i++) {
    //   formData.append("newAssets", newAssets[i]);
    // }

    const response = await updateRoomType(roomTypeDetail);
    if (response.status === 200) {
      toast.success("Room Type Details Updated Successfully.");
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
        <FormControl sx={{ mt: "10px", minWidth: 120 }} fullWidth>
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
            // onClick={handleAssetClick}
          >
            Update Assets
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
      {checked && <Asset allImages={assets} setAllImages={setAssets} />}
    </Box>
  );
};

export default RoomTypeDetail;
