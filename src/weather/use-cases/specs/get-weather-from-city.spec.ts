import { NotFoundException } from '@nestjs/common';
import { getWeatherFromCity } from '../get-weather-from-city';
import { vancouverFakeData } from './fake-data/vancouver';

describe('getWeatherFromCity', () => {

    const apiResponse = jest.fn();
    const httpService = {
        get: jest.fn().mockReturnValue({ toPromise: apiResponse })
    };

    jest.spyOn(global.console, 'error').mockImplementation();

    it('should getWeatherFromCity return a formated weater object', async () => {

        const input = 'Vancouver';
        const expected = {
            cityName: 'Vancouver',
            country: 'CA',
            tempFahrenheit: '43.3',
            tempCelsius: '6.3',
            windSpeedKph: 18.503999999999998,
            weatherDescription: 'overcast clouds'
        };

        apiResponse.mockResolvedValue({ data: vancouverFakeData });

        await expect(getWeatherFromCity(input, httpService as any)).resolves.toEqual(expected);

        expect(httpService.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather', {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            params: { q: 'vancouver', appid: 'SOME-KEY' }
        });
    });

    it('should getWeatherFromCity throws NotFoundException by dont having data into response', async () => {

        const input = 'NotACity';
        const expected = NotFoundException;

        apiResponse.mockResolvedValue({ data: undefined });

        await expect(getWeatherFromCity(input, httpService as any)).rejects.toThrow(expected);

        expect(httpService.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather', {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            params: { q: 'notacity', appid: 'SOME-KEY' }
        });
    });

    it('should getWeatherFromCity throws NotFoundException by reject the api calls', async () => {

        const input = 'NotACity';
        const expected = NotFoundException;

        apiResponse.mockRejectedValue({ data: { cod: '404', message: 'city not found' } });

        await expect(getWeatherFromCity(input, httpService as any)).rejects.toThrow(expected);

        expect(httpService.get).toHaveBeenCalledWith('http://api.openweathermap.org/data/2.5/weather', {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            params: { q: 'notacity', appid: 'SOME-KEY' }
        });
        expect(console.error).toHaveBeenCalledWith({ cod: '404', message: 'city not found' });
    });
});
