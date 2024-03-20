import axios from 'axios';
import { IWheatherModel, ILocation, IHour, IForecast } from '../models/weatherModel';

export default class WeatherApi {
    private apiService = axios.create({
        baseURL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
    });

    public async getWeather(city: string): Promise<IWheatherModel> {
        try {
            const response = await this.apiService.get(
                `/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=3&lang="pt"`,
            );
            
            this.checkResponse(response);

            const data = response.data;
            console.log('weather: ', data);

            const location = {
                id: data.location.id,
                name: data.location.name,
                country: data.location.country,
                region: data.location.region,
                lat: data.location.lat,
                lon: data.location.lon,
            };

            const hourForecast = data.forecast.forecastday[0].hour.map((hour: any) => {
                return new IHour
                (
                    hour.time,
                    hour.temp_c,
                    hour.temp_f,
                    {
                        icon: hour.condition.icon.replace('//', 'https://'),
                        text: hour.condition.text,
                    },
                    hour.chance_of_rain,
                    hour.precip_mm,
                    hour.precip_in,
                    hour.uv,
                );
            });

            const forecast = data.forecast.forecastday.map((forecast: any) => {
                return new IForecast(
                    forecast.date,
                    forecast.day.maxtemp_c,
                    forecast.day.maxtemp_f,
                    forecast.day.mintemp_c,
                    forecast.day.mintemp_f,
                    forecast.day.avghumidity,
                    {
                        icon: forecast.day.condition.icon.replace('//', 'https://'),
                        text: forecast.day.condition.text,
                    },
                    forecast.day.daily_chance_of_rain,
                    forecast.day.totalprecip_mm,
                    forecast.day.totalprecip_in,
                    forecast.day.uv,
                    hourForecast
                );
            });

            const weather = new IWheatherModel(
                location,
                forecast,
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
            
            this.checkResponse(response);

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

    private checkResponse(response: any) {
        if (!response || !response.data || typeof response.data !== 'object') {
            throw new Error('Invalid API response');
        }
    }
}
