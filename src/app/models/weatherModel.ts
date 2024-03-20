export class IWheatherModel {
    location: ILocation;
    temp_c: number;
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
        temp_c: number,
        temp_f: number,
        humidity: number,
        is_day: boolean,
        feelslike_c: number,
        feelslike_f: number,
        condition: { icon: string; text: string },
    ) {
        this.location = location;
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
