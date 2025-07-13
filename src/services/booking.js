import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function cancelBooking(bookingNumber) {
  try {
    const response = await axios.put(
      `${baseUrl}/${apiVersion}/bookings/${bookingNumber}/cancel`
    );
    // console.log(data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
  }
}

export async function getRefundStatus(bookingNumber) {
  try {
    const response = await axios.get(
      `${baseUrl}/${apiVersion}/payments/booking/refund/${bookingNumber}`
    );
    // console.log(data);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
  }
}
