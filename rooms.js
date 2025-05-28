import axios from "axios";

export async function getAllRooms(hotelId = 1) {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/available/hotel/${hotelId}`
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
    const response = await axios.get(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/${id}`
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

export async function addRooms(
  roomNumber,
  roomAvailable,
  hotelId = 1,
  roomTypeId
) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/hotel/${hotelId}`,
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
    const response = await axios.patch(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/${id}`,
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

export async function deleteRoom(id) {
  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/rooms/${id}`
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
