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

export async function confirmPostpaidBooking(bookingNumber) {
  try {
    const response = await axios.post(
      `${baseUrl}/${apiVersion}/bookings/${bookingNumber}/payment/update-status/offline`
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

export async function confirmOfflineBooking({
  email,
  mobile,
  name,
  hotelId = 1,
  couponCode,
  noOfAdults,
  noOfChildrens,
  checkInDate,
  checkOutDate,
  totalAmount,
  payableAmount,
  roomBookingList,
}) {
  try {
    const response = await axios.post(
      `${baseUrl}/${apiVersion}/bookings/offline`,
      {
        email,
        phone: mobile,
        fullName: name,
        hotelId,
        couponCode,
        noOfAdults,
        noOfChildrens,
        checkInDate,
        checkOutDate,
        totalAmount,
        payableAmount,
        roomBookingList,
      }
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
