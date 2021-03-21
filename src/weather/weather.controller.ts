import { Controller, Get, HttpService, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { getWeatherFromCity } from './use-cases/get-weather-from-city';

@Controller('/weather')
export class WeatherController {

    /* https://gist.github.com/chuckreynolds/caa560429cf0825cf57792740b7402fd */

    constructor(private readonly httpService: HttpService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    public getWeatherFromCity(@Query('city') city: string) {

        return getWeatherFromCity(city, this.httpService);
    }
}
