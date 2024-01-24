/**
 * Автор Jamalskiy
 */
export function renderCityWeatherInfos({ weather, main, sys, wind, dt, name }) {
    const { description, icon } = weather[0];
    const { temp, feels_like, humidity } = main;
    const { speed } = wind;
    const { sunrise, sunset } = sys;

    //Header info
    document.querySelector(".header__current-date").textContent = Intl.DateTimeFormat("ru-RU", {
        weekday: "short",
        month: "long",
        day: "2-digit",
    }).format(new Date(dt * 1000));
    document.querySelector(".header__city-name").textContent = name;

    //Current temperature info
    document.querySelector(".current-temperature__weather-icon").src = `./src/assets/${icon}.svg`;
    document.querySelector(".current-temperature__description").textContent = description;
    document.querySelector(".current-temperature__value").textContent = `${Math.round(temp)}°C`;

    //Bottom container info
    document.getElementById("feels-like").textContent = `${Math.round(feels_like)}°C`;
    document.getElementById("wind").textContent = `${Math.round(speed)} м/с`; // Изменили единицы измерения на м/с
    document.getElementById("humidity").textContent = `${Math.round(humidity)}%`;
    document.getElementById("sunrise").textContent = `${Intl.DateTimeFormat("ru-RU", { timeStyle: "short" }).format(new Date(sunrise * 1000))}`;
    document.getElementById("sunset").textContent = `${Intl.DateTimeFormat("ru-RU", { timeStyle: "short" }).format(new Date(sunset * 1000))}`;
}
