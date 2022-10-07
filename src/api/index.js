import axios from "axios";


export const getPlacesData = async (type, { ne, sw }) => {
    try {
        const { data: { data } } = await axios.get(process.env.REACT_APP_TRAVEL_ADVISOR_BASE_URL + `/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_TRAVEL_ADVISOR_RAPIDAPI_HOST
            }
        });
        return data;
    } catch (err) {
        console.log({ err })
    }
};

export const getWeatherData = async ({ lat, lng }) => {
    try {
        const { data: { data } } = await axios.get(process.env.REACT_APP_WEATHER_RAPIDAPI_BASEURL, {
            params: { lon: lng, lat: lat },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_WEATHER_RAPIDAPI_HOST
            }
        });
        return data;
    } catch (err) {
        console.log(err);
    }
};


export const getAirBnbData = async ({ ne, sw }) => {
    try {
        console.log('airbnb: ',{ ne, sw })
        const { data: { data } } = await axios.get('https://airbnb19.p.rapidapi.com/api/v1/searchPropertyByGEO', {
            params: {
                neLat: ne.lat,
                neLng: ne.lng,
                swLat: sw.lat,
                swLng: sw.lng,
                // currency: 'INR',
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
            }
        });
        console.log({ data })
        return data;
    } catch (err) {
        console.log(err);
    }
}
