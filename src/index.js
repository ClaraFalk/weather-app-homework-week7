function updateWeather(response) {
  let degreeDisplay = document.querySelector("#degree");
  let temperature = Math.round(response.data.temperature.current);
  let cityHeading = document.querySelector("#city-heading");
  let weatherCondition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  cityHeading.innerHTML = response.data.city;
  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  degreeDisplay.innerHTML = temperature;
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

searchCity("Stockholm");
