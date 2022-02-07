import React, { useEffect, useState } from "react";
import { Header, List, Map, Footer } from "./components";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./utils/api/fetchData";
import { getWeatherData } from "./utils/api/fetchWeather";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const [placesData, setPlacesData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [mapBounds, setMapBounds] = useState({});
  const [mapChildClicked, setMapChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([] || 0);
  const [weatherData, setWeatherData] = useState([]);

  //* get users location
  //? run on initial render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //? run on TYPE COORDINATES MAPBOUNDS
  useEffect(() => {
    if (mapBounds.sw && mapBounds.ne) {
      setIsLoading(true);

      (async () => {
        const data = await getWeatherData(coordinates.lat, coordinates.lng);
        setWeatherData(data);
      })();
      (async () => {
        const data = await getPlacesData(type, mapBounds.sw, mapBounds.ne);
        setPlacesData(
          data?.filter((place) => place.name && place.num_reviews > 0)
        );
      })();
      setFilteredPlaces([]);
      setIsLoading(false);
    }
  }, [type, mapBounds]);

  //? RUN ON RATING
  useEffect(() => {
    //? return place if rating is larger than current rating in state
    const fp = placesData.filter((place) => place.rating > rating);

    setFilteredPlaces(fp);
  }, [rating]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid
        container
        spacing={3}
        style={{ width: "100%" }}
        className={classes.mainCnt}
      >
        <Grid item xs={12} md={4}>
          <List
            placesData={filteredPlaces.length ? filteredPlaces : placesData}
            mapChildClicked={mapChildClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setMapBounds={setMapBounds}
            coordinates={coordinates}
            placesData={filteredPlaces.length ? filteredPlaces : placesData}
            setMapChildClicked={setMapChildClicked}
            weatherData={weatherData}
          />
        </Grid>
        <Footer />
      </Grid>
    </>
  );
};

export default App;
