import axios from "axios";

export async function addOffers(fromTime, toTime, nonAc, deluxe, executive) {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/addOffers`,
      {
        fromTime,
        toTime,
        nonAc,
        deluxe,
        executive,
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
