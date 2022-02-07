import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place }) => {
  const classes = useStyles();
  return (
    <>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fx%2Fno-camera-prohibited-banned-forbidden-5230695.jpg&f=1&nofb=1"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Rating value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant="subtitle1">
              od {place.num_reviews} recenzija
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Cijena</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Rangiranje</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>

          <Typography gutterBottom variant="subtitle1">
            Nagrade
          </Typography>
          {place?.awards?.map((award) => (
            <Box
              my={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          ))}

          <Typography variant="subtitle1">Kuhinja</Typography>

          {place?.cuisine?.map(({ name }, ind) => (
            <Chip
              key={ind}
              size="small"
              label={name}
              className={classes.chip}
            />
          ))}

          {place?.address && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOnIcon />
              Lokacija: {place.address}
            </Typography>
          )}

          {place?.phone && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.spacing}
            >
              <PhoneIcon />
              Broj telefona: {place.phone}
            </Typography>
          )}

          <CardActions
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, "_blank")}
            >
              Trip advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, "_blank")}
            >
              Web stranica
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
};

export default PlaceDetails;
