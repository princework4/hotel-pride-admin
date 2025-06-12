import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getAllRoomTypes() {
  try {
    const response = await axios.get(`${baseUrl}/${apiVersion}/room-types`);
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
      `${baseUrl}/${apiVersion}/room-types/${id}`
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
    const response = await axios.post(`${baseUrl}/${apiVersion}/room-types`, {
      typeName,
      capacityAdult: Number(capacityAdult),
      capacityChild: Number(capacityChild),
      pricePerNight: Number(pricePerNight),
      description,
      roomSizeInSquareFeet: Number(roomSizeInSquareFeet),
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
      `${baseUrl}/${apiVersion}/room-types/${id}`,
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
      `${baseUrl}/${apiVersion}/room-types/assets/upload`,
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
      `${baseUrl}/${apiVersion}/room-types/${id}`
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
      `${baseUrl}/${apiVersion}/room-types/assets/remove?assetId=${id}`
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
