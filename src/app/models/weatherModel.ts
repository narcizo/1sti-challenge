export class IWheatherModel {
    location: ILocation;
    temp_c: number;
    forecast: IForecast[];
    temp_f: number;
    humidity: number;
    is_day: boolean;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
        icon: string;
        text: string;
    };

    constructor(
        location: ILocation,
        forecast: IForecast[],
        temp_c: number,
        temp_f: number,
        humidity: number,
        is_day: boolean,
        feelslike_c: number,
        feelslike_f: number,
        condition: { icon: string; text: string },
    ) {
        this.location = location;
        this.forecast = forecast;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.humidity = humidity;
        this.is_day = is_day;
        this.feelslike_c = feelslike_c;
        this.feelslike_f = feelslike_f;
        this.condition = condition || { icon: '', text: '' };
    }
}

export class ILocation {
    id: string;
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;

    constructor(id:string, name: string, country: string, region: string, lat: number, lon: number) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.region = region;
        this.lat = lat;
        this.lon = lon;
    }
}

export class IForecast {
    date: string;
    maxTemp_c: number;
    maxTemp_f: number;
    minTemp_c: number;
    minTemp_f: number;
    humidity: number;
    condition: {
        icon: string;
        text: string;
    };
    chance_of_rain: number;
    precipitation_mm: number;
    precipitation_in: number;
    uv: number;
    hour: IHour[];

    constructor(
        date: string,
        maxTemp_c: number,
        maxTemp_f: number,
        minTemp_c: number,
        minTemp_f: number,
        humidity: number,
        condition: { icon: string; text: string },
        chance_of_rain: number,
        precipitation_mm: number,
        precipitation_in: number,
        uv: number,
        hour: IHour[],
    ) {
        this.date = date;
        this.maxTemp_c = maxTemp_c;
        this.maxTemp_f = maxTemp_f;
        this.minTemp_c = minTemp_c;
        this.minTemp_f = minTemp_f;
        this.humidity = humidity;
        this.condition = condition;
        this.chance_of_rain = chance_of_rain;
        this.precipitation_mm = precipitation_mm;
        this.precipitation_in = precipitation_in;
        this.uv = uv;
        this.hour = hour;
    }
}

export class IHour {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
        icon: string;
        text: string;
    };
    chance_of_rain: number;
    precipitation_mm: number;
    precipitation_in: number;
    uv: number;

    constructor(
        time: string,
        temp_c: number,
        temp_f: number,
        condition: { icon: string; text: string },
        chance_of_rain: number,
        precipitation_mm: number,
        precipitation_in: number,
        uv: number,
    ) {
        this.time = time;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.condition = condition;
        this.chance_of_rain = chance_of_rain;
        this.precipitation_mm = precipitation_mm;
        this.precipitation_in = precipitation_in;
        this.uv = uv;
    }
}

