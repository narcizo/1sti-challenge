import { useState, useEffect } from 'react';
import { WheatherModel } from '../models/weatherModel';

import WeatherApi from '../services/weatherApi';

export default function WeatherDetail({ city } : { city: string}) {
    const [cityWeather, setCityWeather] = useState("");

    function fetchData(){
        // const weatherApi = new WeatherApi();
        // weatherApi.getWeather(city).then((value) => {
        //     setCityWeather(value);
        // });
    }

    useEffect(() => {
        setCityWeather(city);
    }, [city]);

    return (
        <>
            <h1>WeatherDetail</h1>
            <p>{cityWeather}</p>
        </>
    );
}