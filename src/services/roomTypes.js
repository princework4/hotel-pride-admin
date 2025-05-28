import axios from "axios";

export async function getAllRoomTypes() {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types`
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function getRoomTypeById(id) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/${id}`
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function addRoomType({
  typeName,
  capacityAdult,
  capacityChild,
  pricePerNight,
  description,
  roomSizeInSquareFeet,
}) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types`,
      {
        typeName,
        capacityAdult: Number(capacityAdult),
        capacityChild: Number(capacityChild),
        pricePerNight: Number(pricePerNight),
        description,
        roomSizeInSquareFeet: Number(roomSizeInSquareFeet),
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function updateRoomType({
  id,
  typeName,
  capacityAdult,
  capacityChild,
  pricePerNight,
  description,
  roomSizeInSquareFeet,
}) {
  try {
    const response = await axios.patch(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/${id}`,
      {
        typeName,
        capacityAdult,
        capacityChild,
        pricePerNight,
        description,
        roomSizeInSquareFeet,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function updateRoomTypeAssets(formData) {
  console.log("api assets :- ", formData.getAll("newAssets"));
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/assets/upload`,
      {
        assets: formData.get("newAssets"),
      }
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function deleteRoomType(id) {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/${id}`
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}

export async function deleteRoomTypeImage(id) {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/assets/remove?assetId=${id}`
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response;
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
    // console.log(error.config);
  }
}
