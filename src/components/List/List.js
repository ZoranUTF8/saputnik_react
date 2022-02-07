import React, { useState, useEffect, createRef } from "react";
import { PlaceDetails } from "../index";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";

const List = ({
  placesData,
  mapChildClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(placesData?.length)
      .fill()
      .map((_, indx) => {
        elRefs[indx] || createRef();
      });

    setElRefs(refs);
  }, [placesData]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restorani, hoteli i atrakcije oko vas
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Tip</InputLabel>
            <Select value={type} onChange={(evt) => setType(evt.target.value)}>
              <MenuItem value="restaurants">Restorani</MenuItem>
              <MenuItem value="hotels">Hoteli</MenuItem>
              <MenuItem value="attractions">Atrakcije</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Ocjena</InputLabel>
            <Select
              value={rating}
              onChange={(evt) => setRating(evt.target.value)}
            >
              <MenuItem value={0}>Svi</MenuItem>
              <MenuItem value={3}>Iznad 3.0</MenuItem>
              <MenuItem value={4}>Iznad 4.0</MenuItem>
              <MenuItem value={4.5}>Iznad 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {placesData?.map((place, ind) => {
              return (
                <Grid item key={ind} xs={12}>
                  <PlaceDetails
                    place={place}
                    selected={Number(mapChildClicked) === ind}
                    refProp={elRefs[ind]}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
