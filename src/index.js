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
}
let apiKey = "0d8a45bc34b38f19a974t8f13fco40ba";
let city = "Boston";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
