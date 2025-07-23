import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(`${baseUrl}/${apiVersion}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
  }
}

export async function registerUser({ name, email, mobile, password }) {
  try {
    const response = await axios.post(
      `${baseUrl}/${apiVersion}/auth/register`,
      {
        name,
        email,
        contactNumber: mobile,
        password,
        role: "USER",
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
  }
}

export async function validateOTP(otp) {
  try {
    const response = await axios.post(
      `${baseUrl}/${apiVersion}/auth/validate/otp`,
      {
        otp,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      console.log("Error", error.message);
      return error.message;
    }
  }
}
