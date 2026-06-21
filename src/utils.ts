// src/utils.ts

import axios from 'axios';
import { LocationResponse, Location, WeatherResponse } from "./types";



export function getLocation(locationName: string): Promise<LocationResponse> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1`;
    return axios.get(url).then((response) => response.data);
}



export async function getCurrentWeather(location: Location): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&models=icon_global`;
    return axios.get(url).then((response) => response.data);
};



export function displayLocation(location: Location) {
    const locationName = document.getElementById("location-name") as HTMLElement;
    const country = document.getElementById("country") as HTMLElement;
    locationName.innerText = `(${location.name})`;
    country.innerText = `(${location.country})`;
}



export function displayWeatherData(weather: WeatherResponse) {
    const temperature = document.getElementById("temperature") as HTMLElement;
    temperature.innerText = `(${weather.current_weather.temperature} ${weather.current_weather_units.temperature})`;

    const windspeed = document.getElementById("windspeed") as HTMLElement;
    windspeed.innerText = `(${weather.current_weather.windspeed} ${weather.current_weather_units.windspeed})`;

    const windDirection = document.getElementById("winddirection") as HTMLElement;
    windDirection.innerText = `(${weather.current_weather.winddirection} ${weather.current_weather_units.winddirection})`;
}

export function updateBackground(weatherCode: number, isDay: number) {

    const code = weatherCode.toString().charAt(0);

    switch(code){
        case "0":
        case "1":
            if(isDay === 0) {
                document.body.className = "sunny-night";
            } else {
                document.body.className = "sunny";
            }
            break;
        case "2":
            if(isDay === 0) {
                document.body.className = "partly-cloudy-night";
            } else {
                document.body.className = "partly-cloudy";
            }
            break;
        case "3":
            document.body.className = "cloudy";
            break;
        case "4":
            document.body.className = "foggy";
            break;
        case "5":
            document.body.className = "drizzle";
            break;
        case "6":
            document.body.className = "rain";
            break;
        case "7":
            document.body.className = "snow";
            break;
        case "8":
            document.body.className = "showers";
            break;
        case "9":
            document.body.className = "thunderstorm";
            break;
    }
}