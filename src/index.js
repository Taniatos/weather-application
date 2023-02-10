function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureEl = document.querySelector("li.temp");
  temperatureEl.innerHTML = Math.round(response.data.temperature.current);

  celsiusTemp = response.data.temperature.current;

  let cityEl = document.querySelector("li.city");
  cityEl.innerHTML = response.data.city;
  let descriptionEl = document.querySelector("li.descr");
  descriptionEl.innerHTML = response.data.condition.description;
  let humidityEl = document.querySelector("strong.humidity");
  humidityEl.innerHTML = response.data.temperature.humidity;
  let windEl = document.querySelector("strong.speed");
  windEl.innerHTML = response.data.wind.speed;
  let dateEl = document.querySelector("li.date");
  dateEl.innerHTML = formatDate(response.data.time * 1000);
  let iconEl = document.querySelector("#icon");
  iconEl.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconEl.setAttribute("alt", response.data.condition.description);
}
function search(city) {
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchSubmit(event) {
  event.preventDefault();
  let cityInputEl = document.querySelector("#cityInput");
  search(cityInputEl.value);
}
function showFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureEl = document.querySelector("li.temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureEl.innerHTML = Math.round(fahrTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureEl = document.querySelector("li.temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureEl.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let form = document.querySelector("#formOne");
form.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", showFahrTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("New York");
