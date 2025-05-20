import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "@mui/material";
import CloseIconCircle from "../CloseIconCircle/CloseIconCircle";
import "./Asset.css";
import { deleteRoomTypeImage } from "../../services/roomTypes";

const Asset = ({ allImages, setAllImages }) => {
  async function handleClick(filterId) {
    const response = await deleteRoomTypeImage(filterId);
    console.log(response);
    // const filteredImages = allImages.filter((image) => image.id !== filterId);
    // console.log(filteredImages);
    // setAllImages(filteredImages);
  }

  return (
    <ImageList
      sx={{ width: 500, height: 450, marginTop: "20px" }}
      cols={3}
      rowHeight={164}
      className="assets"
    >
      {allImages?.map((image) => (
        <ImageListItem key={image.id} sx={{ position: "relative" }}>
          <img
            // srcSet={`${image.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${process.env.BASE_URL}${image.assetUrl}?w=164&h=164&fit=crop&auto=format`}
            // alt={image.title}
            loading="lazy"
          />
          {/* <Button sx={{ position: "absolute", top: 0, right: 0 }}>X</Button> */}
          <CloseIconCircle
            style={{ position: "absolute", top: 0, right: 0 }}
            handleClick={() => handleClick(image.id)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Asset;
