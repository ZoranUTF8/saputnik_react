import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { mapStyles } from "./mapStyles";

const Map = ({
  setCoordinates,
  setMapBounds,
  coordinates,
  placesData,
  setMapChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <>
      <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: mapStyles,
          }}
          onChange={(evt) => {
            setCoordinates({ lat: evt.center.lat, lng: evt.center.lng });
            setMapBounds({
              ne: evt.marginBounds.ne,
              sw: evt.marginBounds.sw,
            });
          }}
          onChildClick={(child) => {
            {
              setMapChildClicked(child);
            }
          }}
        >
          {placesData?.map((place, indx) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={indx}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fx%2Fno-camera-prohibited-banned-forbidden-5230695.jpg&f=1&nofb=1"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
          {weatherData?.list?.length &&
            weatherData.list.map((data, i) => (
              <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  height="70px"
                />
              </div>
            ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default Map;
