import axios from "axios";
import dayjs from "dayjs";

export async function updateOffers(
  hotelId = 1,
  offerStartDate,
  offerEndDate,
  allOffers
) {
  const updatedOfferStartDate = dayjs(offerStartDate).format("DD-MM-YYYY");
  const updatedOfferEndDate = dayjs(offerEndDate).format("DD-MM-YYYY");

  const nonAcId = allOffers[0][0];
  const nonAcOffer = allOffers[0][1];
  const deluxeId = allOffers[1][0];
  const deluxeOffer = allOffers[1][1];
  const executiveId = allOffers[2][0];
  const executiveOffer = allOffers[2][1];
  console.log(allOffers);
  try {
    const response = await axios.patch(
      `${process.env.BASE_URL}/${process.env.API_VERSION}/room-types/update-offers`,
      {
        hotelId,
        offerStartDate: updatedOfferStartDate,
        offerEndDate: updatedOfferEndDate,
        offerRoomMap: {
          [nonAcId]: Number(nonAcOffer),
          [deluxeId]: Number(deluxeOffer),
          [executiveId]: Number(executiveOffer),
        },
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
