let searchEl = document.getElementById("search");
let btnEl = document.querySelector(".btn");
let containerEl = document.getElementById("container");
let defaultRoot = `https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=00106a4142467451f98689215258b121`;
let root = "";
let nameList = [];

// FUNCTION TO FETCH DATA FROM API
const fetchData = (url) => {
  fetch(url)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        containerEl.innerHTML = `ERROR PLACE INPUT<br>Try Again`;
        containerEl.style.color = "red";
        throw new Error("Invalid Data Input");
      }
    })
    .then((data) => {
      console.log(data);
      renderData(data);
    })
    .catch((err) => {
      console.log("ERROR", err.message);
    });
};
// DEFAULT SHOW WHILE OPENING
fetchData(defaultRoot);

btnEl.addEventListener("click", () => {
  if (
    searchEl.value.includes(" ") &&
    searchEl.value.toLowerCase() != "new york"
  ) {
    nameList = searchEl.value.split(" "); // [el, paso]
    searchEl.value = nameList.join("-"); // el-paso
  } else if (searchEl.value.toLowerCase() == "new york") {
    searchEl.value = searchEl.value;
  } else {
    searchEl.value = searchEl.value;
  }

  root = `https://api.openweathermap.org/data/2.5/weather?q=${searchEl.value}&appid=00106a4142467451f98689215258b121`;
  console.log(root);
  fetchData(root);
});

// FUNCTION TO RENDER DATA FETCHED FROM API
const renderData = (data) => {
  localStorage.setItem("weather-data", JSON.stringify(data));
  const { weather, main, visibility, wind, clouds, dt, sys, timezone, name } =
    data;
  const date = new Date(dt * 1000).toLocaleDateString("en-US");
  const sunSetTime = new Date(sys.sunset * 1000).toLocaleTimeString("en-US");
  const sunRiseTime = new Date(sys.sunrise * 1000).toLocaleTimeString("en-US");
  if(containerEl.style.color == "red"){
    containerEl.style.color = "";
  }

  containerEl.innerHTML = `
    <h1>${name}</h1>
    <div id = "weather-container">
    <img src="https://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png" alt="icon-img">
    <h2>${weather[0].main}</h2>
    <p>${weather[0].description}</p>
    <p>date: ${date}</p>
    </div>
    
    <div id="temperature-container">
    <img src = "temperature.png" alt = "temperature-pic" class="temperature-img">
    <p>Temperature: ${(main.temp - 273).toFixed(2)}</p>
    <p>Max-Temp: ${(main.temp_max - 273).toFixed(2)}</p>
   <!-- <p>Min-Temp: ${(main.temp_min - 273).toFixed(2)}</p> 
    <p>Feels like: ${(main.feels_like - 273).toFixed(2)}</p> -->
    </div>

    <div id="pressure-container">
    <img class = "pressure-pic" src="pressure.png" alt="pressure-pic">   
    <p>Pressure: ${main.pressure / 1000} Bar</p>
    </div>
    <div id = "humidity-container">
    <img class = "humidity-pic" src="humidity.png" alt="humidity-pic">   
    <p>Humidity: ${main.humidity}</p>
    </div>

    <div id = "sun-container">
    <img src = "sunrise.png" alt = "sun-pic" class="sun-img">
    <p>SunSet: ${sunSetTime}</p>
    <p>SunRise: ${sunRiseTime}</p>
    </div>
    `;
};
