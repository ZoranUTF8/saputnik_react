import axios from "axios";

const baseEndpoint =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
    currency: "BAM",
  },
  headers: {
    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    "x-rapidapi-key": "7e131168d4msh54ab90500b6f1bcp15726cjsnc6e46468f422",
  },
};

export const getPlacesData = async () => {
  try {
    const {
      data: { data },
    } = await axios(baseEndpoint, options);
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
