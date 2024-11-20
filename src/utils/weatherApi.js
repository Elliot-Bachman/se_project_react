const getWeather = ({ latitude, longitude }, APIkey) => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}"
  );
};
