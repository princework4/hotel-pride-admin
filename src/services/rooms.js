import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getAllRooms(hotelId = 1) {
  try {
    const response = await axios.get(
      `${baseUrl}/${apiVersion}/rooms/hotel/${hotelId}`
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

export async function getRoomById(id) {
  try {
    const response = await axios.get(`${baseUrl}/${apiVersion}/rooms/${id}`);
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

export async function addRooms(
  roomNumber,
  roomAvailable,
  hotelId = 1,
  roomTypeId
) {
  try {
    const response = await axios.post(
      `${baseUrl}/${apiVersion}/rooms/hotel/${hotelId}`,
      {
        roomNumber,
        roomAvailable,
        hotelId,
        roomTypeId: Number(roomTypeId),
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

export async function updateRoom(
  id,
  roomNumber,
  roomAvailable,
  hotelId = 1,
  roomTypeId
) {
  try {
    const response = await axios.patch(`${baseUrl}/${apiVersion}/rooms/${id}`, {
      roomNumber: roomNumber,
      roomAvailable: roomAvailable,
      hotelId: hotelId,
      roomTypeId: roomTypeId,
    });
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

export async function deleteRoom(id) {
  try {
    const response = await axios.delete(`${baseUrl}/${apiVersion}/rooms/${id}`);
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
