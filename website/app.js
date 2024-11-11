const generateButton = document.getElementById("generate");
const countryInput = document.getElementById("country");
const feelingsInput = document.getElementById("feelings");
const cityOutput = document.getElementById("city");
const dateOutput = document.getElementById("date");
const weatherOutput = document.getElementById("weather");
const tempOutput = document.getElementById("temp");
const contentOutput = document.getElementById("content");
const errorMessage = document.getElementById("message");

let currentDate = new Date().toDateString();

generateButton.addEventListener("click", (event) => {
  event.preventDefault();
  fetchWeatherData();
});

const fetchWeatherData = async () => {
  const city = countryInput.value || "Cairo"; // Default to Cairo if no city entered

  try {
    const weatherResponse = await fetch(`/weather?city=${city}`);
    const weatherData = await weatherResponse.json();

    console.log(weatherData);

    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data");
    const tempInCelsius = ((weatherData.main.temp - 32) * 5) / 9;

    // Send the weather data and feelings to the server
    const postData = {
      temperature: tempInCelsius,
      date: currentDate,
      feelings: feelingsInput.value || "No feelings shared.",
    };

    const postResponse = await fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!postResponse.ok) throw new Error("Failed to send data to server");

    const data = await postResponse.json(); // This should return the data saved on the server

    displayWeatherInfo(weatherData, postData);
  } catch (error) {
    errorMessage.textContent = "Could not fetch data. Check your inputs.";
  }
};

const displayWeatherInfo = (weatherData, postData) => {
  cityOutput.textContent = `City: ${weatherData.name || "Unknown location"}`;
  weatherOutput.textContent = `Weather: ${
    weatherData.weather[0].description || "N/A"
  }`;

  const tempInCelsius = ((weatherData.main.temp - 32) * 5) / 9;

  tempOutput.textContent = `Temperature: ${Math.round(tempInCelsius)}°C`; // Convert Kelvin to Celsius
  dateOutput.textContent = `Date: ${currentDate}`;
  contentOutput.textContent = `Feelings: ${postData.feelings}`;

  document.querySelector(".weather-info").style.display = "block";
  errorMessage.textContent = "";
};
