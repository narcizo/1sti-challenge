import WeatherApi from '@/app/services/weatherApi';

const weatherApi = new WeatherApi();

describe('WeatherApi', () => {
    it('Should get the weather from Maringá city', async () => {
        const weatherResponse = await weatherApi.getWeather('Maringá');
        expect(weatherResponse).not.toBeNull();
        expect(weatherResponse?.cityName).toBe('Maringá');
        expect(weatherResponse?.lat).toBe(-23.42);
        expect(weatherResponse?.lon).toBe(-51.92);
        expect(weatherResponse?.temp_c).not.toBeNull();
        expect(weatherResponse?.temp_f).not.toBeNull();
        expect(weatherResponse?.humidity).not.toBeNull();
        expect(weatherResponse?.is_day).not.toBeNull();
        expect(weatherResponse?.feelslike_c).not.toBeNull();
        expect(weatherResponse?.feelslike_f).not.toBeNull();
        expect(weatherResponse?.condition.icon).not.toBeNull();
        expect(weatherResponse?.condition.text).not.toBeNull();
    });
});
