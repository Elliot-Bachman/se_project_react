import { checkRes } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkRes); // Use the imported checkRes function
};

export const filterWeatherData = (data) => {
  const result = {};
  // City name
  result.city = data.name;
  // Temperature in Fahrenheit and Celsius
  const tempF = data.main.temp;
  const tempC = Math.round((tempF - 32) * (5 / 9)); // Convert to Celsius
  result.temp = { F: tempF, C: tempC };
  // Weather type and condition
  result.type = getWeatherType(tempF); // Use Fahrenheit for weather type logic
  result.condition = data.weather[0].main.toLowerCase();
  // Check if it's day or night
  result.isDay = isDay(data.sys);
  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now(); // Get current timestamp in milliseconds
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

//weather.temperature.F = data.main.temp;
//weather.temperature.C = Math.round((data.main.temp - 32) * 5/9);
