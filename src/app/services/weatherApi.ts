import axios from 'axios';
import { WheatherModel } from '../models/weatherModel';

export default class WeatherApi {
    private apiService = axios.create({
        baseURL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
    });

    public async getWeather(city: string): Promise<WheatherModel> {
        console.log('api url: ', process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL);
        console.log('api key: ', process.env.NEXT_PUBLIC_WEATHER_API_KEY);
        try {
            const response = await this.apiService.get(
                `/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&lang="pt"`,
            );

            const data = response.data;
            const weather = new WheatherModel(
                data.location.name,
                data.location.country,
                data.location.region,
                data.location.lat,
                data.location.lon,
                data.current.temp_c,
                data.current.temp_f,
                data.current.humidity,
                data.current.is_day,
                data.current.feelslike_c,
                data.current.feelslike_f,
                {
                    icon: data.current.condition.icon.replace('//', 'https://'),
                    text: data.current.condition.text,
                },
            );
            return weather;
        } catch (err) {
            console.error('ERROR@WeatherApi.getWeather: ', err);
            throw err;
        }
    }
}
