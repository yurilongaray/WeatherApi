import { HttpModule, Module } from "@nestjs/common";
import { WeatherController } from "./weather.controller";

@Module({
    controllers: [
        WeatherController
    ],
    imports: [
        HttpModule
    ]
})
export class WeatherModule { }