import { HttpService, NotFoundException } from "@nestjs/common";

const URL = 'http://api.openweathermap.org/data/2.5/weather';

export async function getWeatherFromCity(city: string, httpService: HttpService) {

    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    const params = { q: city.toLowerCase(), appid: 'f7cd349684c50225d18c803421fcd564' };
    const config = { headers, params };

    const response = await httpService.get(URL, config).toPromise().catch(error => {

        console.error(error.data);

        throw new NotFoundException();
    });;

    if (!response.data) {

        throw new NotFoundException();
    }

    const data = response.data;
    const tempKelvin = data.main && data.main.temp ? data.main.temp : 0;
    const country = data.sys && data.sys.country ? data.sys.country : '';
    const weatherDescription = data.weather && data.weather.length ? data.weather[0].description : '';
    const windSpeed = data.wind && data.wind.speed ? data.wind.speed : 0;

    return {
        cityName: data.name,
        country,
        tempFahrenheit: ((tempKelvin * 9) / 5 - 459.67).toFixed(1),
        tempCelsius: (tempKelvin - 273.15).toFixed(1),
        windSpeedKph: windSpeed * 3.6,
        weatherDescription
    };
}