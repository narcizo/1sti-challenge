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
            return response.data as WheatherModel;
        }catch(err){
            console.log("ERROR@WeatherApi.getWeather: ", err);
            throw err;
        }
    }
}