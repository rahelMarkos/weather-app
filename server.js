const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 8008;
let projectData = {};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("website"));
app.use(cors());

// API key from environment variable
const apiKey = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );
    const data = await response.json();
    if (data.cod !== 200) throw new Error(data.message);
    res.send(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/add", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
});

app.get("/all", (req, res) => {
  res.json(projectData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
