import { Controller, Get, HttpService, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('/weather')
export class WeatherController {

    constructor(private readonly httpService: HttpService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    public async getWeather(@Query('city') city: string) {

        /* https://gist.github.com/chuckreynolds/caa560429cf0825cf57792740b7402fd */

        let value;

        try {

            value = await this.httpService.get('http://api.openweathermap.org/data/2.5/weather', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    q: city.toLowerCase(),
                    appid: 'f7cd349684c50225d18c803421fcd564'
                }
            }).toPromise();
        } catch (error) {

            console.error('error', error);
        }

        if (value) return value.data

        return value;
    }
}
