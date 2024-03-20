import axios from 'axios';
import { IWheatherModel, ILocation } from '../models/weatherModel';

export default class WeatherApi {
    private apiService = axios.create({
        baseURL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
    });

    public async getWeather(city: string): Promise<IWheatherModel> {
        try {
            const response = await this.apiService.get(
                `/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&lang="pt"`,
            );
            
            if (!response || !response.data || typeof response.data !== 'object') {
                throw new Error('Invalid response');
            }

            const data = response.data;
            
            const location = {
                id: data.location.id,
                name: data.location.name,
                country: data.location.country,
                region: data.location.region,
                lat: data.location.lat,
                lon: data.location.lon,
            };
            const weather = new IWheatherModel(
                location,
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

    public async getLocations(query: string): Promise<ILocation[]> {
        if (query.length < 3) return [];

        try {
            const response = await this.apiService.get(
                `/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${query}&lang="pt"`,
            );

            if (!response || !response.data || typeof response.data !== 'object') {
                throw new Error('Invalid API response');
            }

            const data = response.data;

            console.log('location: ', data);
            const locations = data.map((location: any) => {
                return new ILocation(
                    location.id,
                    location.name,
                    location.country,
                    location.region,
                    location.lat,
                    location.lon,
                );
            });

            return locations;
        } catch (err) {
            console.error('ERROR@WeatherApi.getLocationList: ', err);
            return [];
        }
    }
}
