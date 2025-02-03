const apiKey = '3ba9f264df5fb71045b44ef19f477638'; // Replace with your OpenWeatherMap API key
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Fetch weather data by city name
async function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

// Fetch weather data by user's location
async function fetchWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location not found');
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

// Display weather data
function displayWeather(data) {
  cityName.textContent = data.name;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  weatherInfo.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  weatherInfo.classList.add('hidden');
}

// Event listeners
searchBtn.addEventListener('click', () => {
  const city = locationInput.value.trim();
  if (city) fetchWeatherByCity(city);
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      () => showError('Unable to retrieve your location')
    );
  } else {
    showError('Geolocation is not supported by your browser');
  }
});