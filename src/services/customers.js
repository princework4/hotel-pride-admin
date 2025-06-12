import axios from "axios";
import dayjs from "dayjs";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function getAllCustomersByCheckoutDate(checkOutDate) {
  try {
    const response = await axios.get(
      `${baseUrl}/${apiVersion}/bookings/user-checkouts?checkoutDate=${checkOutDate}`
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

export async function getAllCustomers() {
  try {
    const response = await axios.get(
      `${baseUrl}/${apiVersion}/bookings/upcoming?hotelId=1`
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

export async function updateCustomerCheckoutDate(bookingId, checkOutDate) {
  const updatedCheckOutDate = dayjs(checkOutDate).format("DD-MM-YYYY");
  try {
    const response = await axios.patch(
      `${baseUrl}/${apiVersion}/bookings/${bookingId}/update-checkout?newCheckoutDate=${updatedCheckOutDate}`
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
