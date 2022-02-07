import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios(
      `https://travel-advisor.p.rapidapi.com/${
        type || "restaurants"
      }/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          currency: "BAM",
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_TRAVEL_API,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

// axios way
// export const getPlacesData = async () => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(baseEndpoint, options);
//     // const { data } = await respone.json;
//     console.log("====================================");
//     console.log(data);
//     console.log("====================================");
//   } catch (error) {
//     console.log("====================================");
//     console.log(error);
//     console.log("====================================");
//   }
// };
