import React, { useEffect, useState } from "react";
import { Header, List, Map, PlaceDetails } from "./components";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./utils/api/fetchData";

const App = () => {
  const [placesData, setPlacesData] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [mapBounds, setMapBounds] = useState(null);

  //* get users location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getPlacesData();
      setPlacesData(data);
    })();
  }, [coordinates, mapBounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setMapBounds={setMapBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
