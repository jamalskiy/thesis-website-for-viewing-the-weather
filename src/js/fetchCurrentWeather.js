import { renderCityWeatherInfos } from './renderCityWeatherInfos.js';
import { API_KEY } from './api-key.js';
/**
 * Автор Jamalskiy
 */
export default async function fetchCurrentWeather(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`
        );
        const data = await response.json();
        renderCityWeatherInfos(data);
    } catch (error) {
        console.log(error);
    }
}
