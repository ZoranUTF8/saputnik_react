import axios from "axios";

const baseEndpoint =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios(baseEndpoint, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        currency: "BAM",
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "7e131168d4msh54ab90500b6f1bcp15726cjsnc6e46468f422",
      },
    });
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
