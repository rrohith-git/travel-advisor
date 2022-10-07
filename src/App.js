import React, { useState, useEffect, useRef } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData, getAirBnbData } from './api'
import Header from './components/Header';
import List from './components/List';
// import Map from './components/Map';
import MapBox from './components/Map/MapBox';
import JsonData from './data';
import './App.css';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
    const geoCoderRef = useRef();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        });
    }, []);

    useEffect(() => {
        const filteredPlaces = type === 'airbnb' ? places.filter(place => Number(place.avgRating) > rating) : places.filter(place => Number(place.rating) > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating, places, type]);

    useEffect(() => {
        if (bounds?.sw && bounds?.ne) {
            setIsLoading(true);
            getWeatherData(coordinates)
                .then((data) => setWeatherData(data));
            if (type === 'airbnb') {
                getAirBnbData(bounds)
                    .then((data) => {
                        if (data) {
                            setPlaces(data?.filter(place => place.listingName && place.avgRating > 0));
                            setFilteredPlaces([]);
                            setIsLoading(false);
                        }
                    })
            } else {
                const data = JsonData.data;
                console.log({data})
                setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
                // getPlacesData(type, bounds)
                //     .then((data) => {
                //         if (data) {
                //             console.log({data})
                //             setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
                //             setFilteredPlaces([]);
                //             setIsLoading(false);
                //         }
                //     });
            }
        }
    }, [bounds, type, coordinates]);

    return (
        <>
            <CssBaseline />
            <Header geoCoderRef={geoCoderRef}/>
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {/* <Map
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                        type={type}
                    /> */}
                    {coordinates?.lat && <MapBox
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                        type={type}
                        geoCoderRef={geoCoderRef}
                    />}
                </Grid>
            </Grid>
        </>
    );
};

export default App;