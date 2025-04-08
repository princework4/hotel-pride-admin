import axios from "axios";

export async function getAllRoomTypes() {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms-types`
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

// Pending
export async function addRoomType(
  typeName,
  capacityAdult,
  capacityChild,
  pricePerNight,
  description,
  roomSizeInSquareFeet
) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/hotel/${hotelId}`,
      {
        roomNumber,
        roomAvailable,
        hotelId,
        roomTypeId,
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

// Pending
export async function updateRoomType(id, formData) {
  try {
    const response = await axios.put(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/${id}`,
      { formData }
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
