import axios from 'axios';
import { WheatherModel } from '../models/weatherModel';

export default class WeatherApi{
    private BASE_URL = 'http://api.weatherapi.com/v1';
    private API_KEY = '9afe1e3c09844b33b5334544241702';

    private apiService = axios.create({
        baseURL: this.BASE_URL
    });

    public async getWeather(city: string): Promise<WheatherModel>{
        try{
            const response = await this.apiService.get(`/current.json?key=${this.API_KEY}&q=${city}&lang="pt"`);

            const data = response.data;
            const weather = new WheatherModel(data.location.name, data.location.country, data.location.region, data.location.lat, data.location.lon, data.current.temp_c, data.current.temp_f, data.current.humidity, data.current.is_day, data.current.feelslike_c, data.current.feelslike_f, {icon: data.current.condition.icon.replace("//", "https://"), text: data.current.condition.text});
            return weather;
        }catch(err){
            console.log("ERROR@WeatherApi.getWeather: ", err);
            throw err;
        }
    }
}