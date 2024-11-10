const generateButton = document.getElementById("generate");
const countryInput = document.getElementById("country");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const cityOutput = document.getElementById("city");
const dateOutput = document.getElementById("date");
const weatherOutput = document.getElementById("weather");
const tempOutput = document.getElementById("temp");
const contentOutput = document.getElementById("content");
const errorMessage = document.getElementById("message");

const apiKey = "e12da190d6b478c3339b848b131f774b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

let currentDate = new Date().toDateString();

generateButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetchWeatherData();
});

const fetchWeatherData = async () => {
  try {
    const response = await fetch(
      `${apiUrl}?q=${countryInput.value}&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    displayWeatherInfo(data);
  } catch (error) {
    errorMessage.textContent = "Could not fetch data. Check your inputs.";
  }
};

const displayWeatherInfo = (data) => {
  cityOutput.textContent = `City: ${data.name || "Unknown location"}`;
  weatherOutput.textContent = `Weather: ${
    data.weather[0].description || "N/A"
  }`;
  tempOutput.textContent = `Temperature: ${Math.round(
    data.main.temp - 273.15
  )}°C`; // Convert Kelvin to Celsius
  dateOutput.textContent = `Date: ${currentDate}`;
  contentOutput.textContent = `Feelings: ${
    feelingsInput.value || "No feelings shared."
  }`;

  document.querySelector(".weather-info").style.display = "block";
  errorMessage.textContent = "";
};
