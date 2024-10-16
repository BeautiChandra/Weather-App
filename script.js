// Selectors
const cityInput = document.getElementById("city-input");
const submitBtn = document.getElementById("submit-btn");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

// OpenWeatherMap API Key and URL
const apiKey = "ab6b322497fdbb5991fa82137f56c11c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Event listener for the "Get Weather" button
submitBtn.addEventListener("click", fetchWeather);

// Function to fetch weather data
function fetchWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    displayError("Please enter a valid city name.");
    return;
  }

  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => displayWeather(data))
    .catch((error) => displayError(error.message));
}

// Function to display weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherInfo.innerHTML = `
        <p>Location: ${name}</p>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" />
    `;
  weatherInfo.style.display = "block";
  errorMessage.style.display = "none"; // Hide error message
}

// Function to display error messages
function displayError(message) {
  errorMessage.innerText = message;
  errorMessage.style.display = "block";
  weatherInfo.style.display = "none"; // Hide weather info
}
