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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weekDays" id="dayOne">
        <h3>${formatDay(forecastDay.time)}</h3>
     
        <h4><img
          src="${forecastDay.condition.icon_url}"
          alt="${forecastDay.condition.icon}"
          id="icon"
          width = 80px;
          /></h4>
        <h5><span id="temp-max">${Math.round(
          forecastDay.temperature.maximum
        )}</span><span id="celsiusC">℃</span><span id="temp-min-all"><span id="temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}</span><span id="celsiusC">℃</span></span></h5>
      </div>`;
    }
  });

  forecastEl.innerHTML = forecastHTML;
}
function getForecast(city) {
  console.log(city);
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  windEl.innerHTML = Math.round(response.data.wind.speed);
  let dateEl = document.querySelector("li.date");
  dateEl.innerHTML = formatDate(response.data.time * 1000);
  let iconEl = document.querySelector("#icon");
  iconEl.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconEl.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.city);
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

function checkOutBoston(boston) {
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Boston&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let bostonLink = document.querySelector("#boston");
bostonLink.addEventListener("click", checkOutBoston);

function checkOutSanFrancisco(sanFrancisco) {
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=San%20Francisco&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let sanFranciscoLink = document.querySelector("#sanFrancisco");
sanFranciscoLink.addEventListener("click", checkOutSanFrancisco);

function checkOutChicago(chicago) {
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Chicago&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let chicagoLink = document.querySelector("#chicago");
chicagoLink.addEventListener("click", checkOutChicago);

function checkOutHouston(houston) {
  let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Houston&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
let houstonLink = document.querySelector("#houston");
houstonLink.addEventListener("click", checkOutHouston);
