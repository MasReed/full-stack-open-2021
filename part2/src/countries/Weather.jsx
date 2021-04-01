import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {

    // Stateful Weather
    const [ weather, setWeather ] = useState({
        current: {
            temperature: null,
            weather_icons: null,
            wind_speed: null,
            wind_dir: null
        }
    });

    // Fetch weather data from weatherstack API
    useEffect( () => {
        const params = {
            query: city,
            units: 'f',
            access_key: process.env.REACT_APP_WEATHER_API_KEY
        }
        axios
            .get('http://api.weatherstack.com/current', {params} )
            .then( response => {
                setWeather(response.data)
            });
    }, [city]);

    // Elements to render
    return (
        <div>
            <h2>Weather in {city}</h2>
            <img src={weather.current.weather_icons} alt='weather icon'/>
            <p><b>Temperature:</b> {weather.current.temperature} F</p>
            <p><b>Wind:</b> {weather.current.wind_speed} {weather.current.wind_dir}</p>
        </div>

    )
}

export default Weather;
