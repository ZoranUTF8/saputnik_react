import axios from "axios";

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios(
      "https://community-open-weather-map.p.rapidapi.com/find",
      {
        params: {
          lat: lat,
          lon: lng,
        },
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_WEATHER_API,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("====================================");
    console.log("error getting weather data");
    console.log("====================================");
  }
};
