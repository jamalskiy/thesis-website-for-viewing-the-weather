import { API_KEY } from './api-key.js';
import fetchCurrentWeather from './fetchCurrentWeather.js';

/**
 * Автор Jamalskiy
 */
export async function getSearchedCity() {
    try {
        const city = document.querySelector('.header__input').value;
        //Check if the city is empty
        if (!city) return;

        //Get lat and lon of the city from Geocoding API
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        const [{ lat, lon }] = data;

        //Clear search input
        document.querySelector('.header__input').value = '';

        fetchCurrentWeather(lat, lon);
    } catch (error) {
        console.log(error);
    }
}
