function updateWeather(response) {
  let degreeDisplay = document.querySelector("#degree");
  let temperature = Math.round(response.data.temperature.current);
  let cityHeading = document.querySelector("#city-heading");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `  <img
                src="${response.data.condition.icon_url}"
                alt=""
                class="degree-icon"
              />`;

  cityHeading.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  degreeDisplay.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a322b493at35dccbe0dcdcob6a7532f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-bar-input");

  searchCity(searchInput.value);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);

function getForecast(city) {
  let apiKey = "a322b493at35dccbe0dcdcob6a7532f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metrics`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-weekday">
    <div class="weather-forecast-day">${day}</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <strong>19°C</strong>
      </div>
      <div class="weather-forecast-temperature">11°C</div>
    </div>
  </div>
`;
  });
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Melbourne");
