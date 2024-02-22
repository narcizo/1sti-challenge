export class WheatherModel {
    cityName: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
    temp_c: number;
    temp_f: number;
    humidity: number;
    is_day: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
        icon: string;
        text: string;
    };

    constructor(cityName: string, country: string, region: string, lat: number, lon: number, temp_c: number, temp_f: number, humidity: number, is_day: number, feelslike_c: number, feelslike_f: number, condition: { icon: string; text: string; }) {
        this.cityName = cityName;
        this.country = country;
        this.region = region;
        this.lat = lat;
        this.lon = lon;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.humidity = humidity;
        this.is_day = is_day;
        this.feelslike_c = feelslike_c;
        this.feelslike_f = feelslike_f;
        this.condition = condition || { icon: '', text: '' };
    }
}