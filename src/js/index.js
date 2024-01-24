// Добавьте определение функций getCookie и setCookie
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}
/**
 * Автор Jamalskiy
 */
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
}

// Получение элемента body
const body = document.querySelector("body");

// Проверка сохраненной темы при загрузке страницы
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.toggle("dark-mode", savedTheme === "dark");
}

// Импорт функций из других файлов
import fetchCurrentWeather from "./fetchCurrentWeather.js";
import { getSearchedCity } from "./getSearchedCity.js";

// Получение элементов DOM
const darkLightButton = document.querySelector(".menu__button");

// Обработчик события для переключения темы
darkLightButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Сохранение выбранной темы в Local Storage
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Проверка поддержки геолокации
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetchCurrentWeather(latitude, longitude);
    });
}

// Обработчик кнопки поиска
document.querySelector(".header__button").addEventListener("click", getSearchedCity);

// Обработчик нажатия Enter в поле ввода
document.querySelector(".header__input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") getSearchedCity();
});

// Проверяем, был ли куки принят ранее
document.addEventListener('DOMContentLoaded', () => {
    const cookieAccepted = getCookie('cookie_accepted');
    const notification = document.getElementById('cookie_notification');

    if (cookieAccepted) {
        hideCookieNotification();
    } else {
        // Покажем уведомление, если куки не принимались ранее
        if (notification) {
            notification.style.display = 'flex';
        }
    }
});

// Добавьте определение функции hideCookieNotification
function hideCookieNotification() {
    const notification = document.getElementById('cookie_notification');
    if (notification) {
        notification.style.display = 'none';
    }
}

// Обработчик события для кнопки принятия куки
document.querySelector('.cookie_accept').addEventListener('click', () => {
    setCookie('cookie_accepted', 'true', 365); // Устанавливаем куки на год
    hideCookieNotification();
});
