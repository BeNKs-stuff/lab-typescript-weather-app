// src/main.ts

import { displayLocation, displayWeatherData, getCurrentWeather, getLocation, updateBackground } from "./utils";

const form = document.getElementById("weather-form") as HTMLFormElement;

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.getElementById("location") as HTMLInputElement;
    const locName = input.value;

    getLocation(locName).then(result => {

        if (result.results){
            const location = result.results[0];

            displayLocation(location);

            return getCurrentWeather(location);
        } else {
            throw new Error("Location not found");
        }
    }).then((weatherData) => {
        displayWeatherData(weatherData);
        updateBackground(weatherData.current_weather.weathercode,weatherData.current_weather.is_day);
    }).catch((error) => {
        console.log("Error getting weather data");
        console.log(error);
    });

    input.value = "";
});
