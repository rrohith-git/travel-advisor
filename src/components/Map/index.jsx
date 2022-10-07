import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData, type }) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                // defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.bounds.ne, sw: e.bounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child) }
            >
                {places?.map((place, i) => (
                    <div className={classes.markerContainer} lat={Number(place.latitude)} lng={Number(place.longitude)} key={i}>
                        {!isDesktop ?
                            (
                                <>
                                    <LocationOnOutlinedIcon color='primary' fontSize='large' />
                                    {/* <Typography variant='subtitle2' gutterBottom>
                                        {place.name}
                                    </Typography> */}
                                </>
                            ) :
                            type === 'airbnb' ?
                                (<Paper elevation={3} className={classes.paper}>
                                    <Typography variant='subtitle2' className={classes.typography} gutterBottom>
                                        {place.listingName}
                                    </Typography>
                                    <img className={classes.pointer} src={place?.images?.[0] ? place.images[0] : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.listingName} />
                                    <Rating name="read-only" value={Number(place.avgRating)} readOnly />
                                </Paper>) :
                                (<Paper elevation={3} className={classes.paper}>
                                    <Typography variant='subtitle2' className={classes.typography} gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name} />
                                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                                </Paper>)}
                    </div>
                ))}
                {weatherData?.map((data, i) => (
                    <div key={i} lat={data.lat} lng={data.lon}>
                        <img height={100} src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt={data.weather.description} />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
};

export default Map;