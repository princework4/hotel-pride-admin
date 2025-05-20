import axios from "axios";

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/auth/login`,
      {
        email,
        password,
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

export async function registerUser({ name, email, mobile, password }) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/auth/register`,
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
