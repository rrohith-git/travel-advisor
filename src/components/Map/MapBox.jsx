import React, { useState, useRef } from 'react';
import MapBoxReact, { Marker, NavigationControl, GeolocateControl, Popup } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const GeoCoder = new MapboxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});


const MapBox = ({ coordinates, setCoordinates, setBounds, places, setChildClicked, weatherData, type, geoCoderRef }) => {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const map = useRef(null);
    const [viewState, setViewState] = useState({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        height: '100vh',
        width: '100vw',
        zoom: 12
    });

    return (
        <div className={classes.mapContainer}>
            <MapBoxReact
                ref={map}
                {...viewState}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // mapStyle="mapbox://styles/rohith17/cl7d5e3ob004l14qz5de4np25"
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onMove={(e) => {
                    setViewState(e.viewState);
                    const bounds = map.current.getBounds();
                    const center = map.current.getCenter();
                    if (center) {
                        setCoordinates({ lat: center?.lat, lng: center?.lng });
                    }
                    if (bounds) {
                        setBounds({ ne: bounds?._ne, sw: bounds?._sw })
                    }
                }}
                onLoad={(e) => {
                    if (map.current) {
                        const bounds = map.current.getBounds();
                        if (bounds) {
                            setBounds({ ne: bounds?._ne, sw: bounds?._sw })
                        };
                        const getMap = map.current.getMap();
                        geoCoderRef.current.appendChild(GeoCoder.onAdd(getMap));
                    }
                }}
            >
                <GeolocateControl />
                <NavigationControl position='bottom-right' visualizePitch={true} />
                {places?.map((place, i) => (
                    <div key={i} className={classes.markerContainer} >
                        <Marker
                            key={i}
                            // style={classes.markerContainer}
                            latitude={Number(place.latitude)}
                            longitude={Number(place.longitude)}
                            onClick={(e) => { setChildClicked(i) }}

                        >
                            {!isDesktop ?
                                (
                                    <>
                                        <LocationOnOutlinedIcon color='primary' fontSize='large' />
                                        <Popup longitude={Number(place.latitude)} latitude={Number(place.longitude)}
                                            anchor="top"
                                            onClose={() => console.log('clicked')}>
                                            {place.name}
                                        </Popup>
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
                        </Marker>
                    </div>
                ))}
                {weatherData?.map((data, i) => (
                    <Marker key={i} latitude={data.lat} longitude={data.lon}>
                        <img height={100} src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt={data.weather.description} />
                    </Marker>
                ))}
            </MapBoxReact>
        </div>
    );
};

export default MapBox;