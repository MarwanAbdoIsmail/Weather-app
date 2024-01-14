let today = document.querySelector(".today");
let show = document.getElementById("row");
let search = document.querySelector(".search");

async function forecaster(location) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=34d4e732f58c4499a57183111233112&q=${location}&days=3`;
  let res = await fetch(url);
  if (res.ok && 400 != res.status) {
    let data = await res.json();
    displayCurrentWeather(data);
    displayComingWeather(data.forecast.forecastday);
  }
}

search.addEventListener("keyup", (event) => {
  forecaster(event.target.value);
});

function displayCurrentWeather(data) {
  let currentDate = new Date();

  today.innerHTML = `
       <div class="forcast-head d-flex justify-content-between p-2">
                <span class="day">${currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                })}</span>
                <span class="date">${currentDate.toLocaleDateString("en-US", {
                  day: "numeric",
                })}  <span class="date">${currentDate.toLocaleDateString(
    "en-US",
    { month: "long" }
  )}</span></span>
              </div>
              <div class="forcast-body p-4">
                <p class="location">${data.location.name}</p>
                <div class="temp text-white"> ${data.current.temp_c}°C </div>
                <div class="temp-icon">
                  <img
                    src="https:${data.current.condition.icon}"
                    alt="Cloudy-image"
                  />
                </div>
              </div>
              <div class="weatherCondtion">
                <p class="weather-Condition px-4">${
                  data.current.condition.text
                }</p>
              </div>
              <div class="weather-icons p-4 d-flex gap-3">
                <span>
                  <img src="images/icon-umberella.png" alt="icon-umberella" />
                  ${data.current.humidity}%</span
                >
                <span
                  ><img src="images/icon-wind.png" alt="icon-wind" /> ${
                    data.current.wind_kph
                  }km/h</span
                >
                <span>
                  <img src="images/icon-compass.png" alt="icon-compass" />
                  ${data.current.wind_dir}</span
                >
              </div>
             `;
}
function displayComingWeather(data) {
  let box = "";
  for (let i = 1; i < data.length; i++) {
    let comingDate = new Date(data[i].date);
    box += ` <div class="col-lg-6 forcast-Card">
            <div class="forcast-head  p-2">
              <span class="day">${comingDate.toLocaleDateString("en-US", {
                weekday: "long",
              })}</span>
            </div>
            <div class="forcast-body p-4">
               <div class="temp-icon mb-3">
                <img
                  src="https:${data[i].day.condition.icon}"
                  alt="Cloudy-image"
                />
              </div>
              <div class="temp text-white"> ${data[i].day.maxtemp_c}°C </div>
               <div class="temp-min text-white"> ${
                 data[i].day.mintemp_c
               }° </div>

            </div>
            <div class="weatherCondtion">
              <p class="weather-Condition px-4">${
                data[i].day.condition.text
              }</p>
            </div>
          </div>`;
    show.innerHTML = box;
  }
}

forecaster("cairo");
