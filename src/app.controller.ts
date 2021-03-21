import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

	@Get()
	public getHealthStatus() {

		return 'WeatherApiServer is Running';
	}
}
