var hour = moment().format("H");
var hourInt = parseInt(hour);

// Hours deemed nighttime
const nightHours = [1, 2, 3, 4, 20, 21, 22, 23, 24];

// If the hour of the day is in nightHours, return true, else return false
function isNight() {
  if (nightHours.includes(hourInt)) {
    return "true";
  } else {
    return "false";
  }
}
console.log(nightHours);

// Darkmode fires at 8pm, and runs until 5am
function darkMode() {
  if (nightHours) {
    $("body").attr("style", "background-color:rgb(21, 21, 21)");
    $("header").attr("style", "background-image: url(./assets/night-sky.png)");
    $("h1").attr("style", "color:rgb(201, 201, 201)");
    $("h2").attr("style", "color:rgb(201, 201, 201)");
    $("h3").attr("style", "color:rgb(201, 201, 201)");
    $("h4").attr("style", "color:rgb(201, 201, 201)");
    $("h5").attr("style", "color:rgb(201, 201, 201)");
    $("h6").attr("style", "color:rgb(201, 201, 201)");
    $("#input").attr(
      "style",
      "color:white; border: 1px solid #333; background-color:#222"
    );
    $("#search").attr("style", "background-color:black");
    $(".results").attr("style", "border-top: 1px solid #333");
    $("#result1").attr("style", "color:white; background-color:#222");
    $("#card").attr(
      "style",
      "background-color:#222; box-shadow: 0px 8px 30px rgb(0, 0, 0)"
    );
    $("#subhead").attr("style", "border-top: 1px solid #333; color:white");
    $(".small-card").attr(
      "style",
      "background-color:#222; box-shadow:0px 8px 30px rgb(0, 0, 0)"
    );
    $("footer").attr("style", "background-color:#111");
    $("#closeBtn").attr(
      "style",
      "background-color:black; border:1px solid transparent; color:white"
    );
    $("a").attr("style", "color: rgb(63, 63, 63)");
  } else {
    return;
  }
}

darkMode();

// Sets all dates
var day1 = moment();
$("#date").text(day1.format("dddd, MMM Do YYYY"));
var day2 = moment().add(1, "d");
$("#day2").text(day2.format("ddd, MMM Do"));
var day3 = moment().add(2, "d");
$("#day3").text(day3.format("ddd, MMM Do"));
var day4 = moment().add(3, "d");
$("#day4").text(day4.format("ddd, MMM Do"));
var day5 = moment().add(4, "d");
$("#day5").text(day5.format("ddd, MMM Do"));
var day6 = moment().add(5, "d");
$("#day6").text(day6.format("ddd, MMM Do"));

var timeOfDay = moment().format("A");
var input = $("#input");

// Search button click or enter key fires newSearch function with city iput
var searchBtn = $("#search").on("click", newSearch);

input.on("keypress", function (event) {
  if (event.keyCode === 13) {
    var city = input.val();
    getCurrentWeather(city);
    getForecast(city);
    input.val("");
  }
});

// New search function takes city input to getCurrentWeather & getForecast
function newSearch(event) {
  event.preventDefault();
  var city = input.val();
  getCurrentWeather(city);
  getForecast(city);
  input.val("");
}

// Gets weather for the current day
function getCurrentWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data); // data holds today's weather object
      getUVindex(data.coord.lat, data.coord.lon);
      printMainData(
        data.name,
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      );
      saveSearch(data.name);
      // printGifs(data.weather[0].id);
      // console.log(data.weather[0].id);
    });
}

// Gets the UV Index for the current day
function getUVindex(lat, lon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data); // data holds object containing UV index
      printUVData(data.current.uvi);
    });
}

// Prints all values to main card
function printMainData(name, temp, humidity, speed) {
  $("#city").text(name);
  $("section").attr("style", "display:inline");
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind").text(wind + "mph");
  $("#humid").text(humidity + "%");
}

function printUVData(uvi) {
  $("#uvi").text(uvi);
  color = "";
  var uviRound = Math.round(uvi);
  switch (true) {
    case uviRound <= 2:
      color = "green";
      break;
    case uviRound === 3 || uviRound === 4:
      color = "yellow";
      break;
    case uviRound === 5 || uviRound === 6:
      color = "orange";
      break;
    default:
      color = "red";
  }
  // Set uvi color based on switch result above
  $("#uvi").attr("style", "background-color:" + color);
}

// Gets the 5 day forecast
function getForecast(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=45ca50dc39eb346ed62587b3b0c97470";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("12:00:00") > 0) {
          console.log(data.list[i]);
          printDay2(
            data.list[0].main.temp,
            data.list[0].main.humidity,
            data.list[0].wind.speed
          );
          printDay3(
            data.list[1].main.temp,
            data.list[1].main.humidity,
            data.list[1].wind.speed
          );
          printDay4(
            data.list[2].main.temp,
            data.list[2].main.humidity,
            data.list[2].wind.speed
          );
          printDay5(
            data.list[3].main.temp,
            data.list[3].main.humidity,
            data.list[3].wind.speed
          );
          printDay6(
            data.list[4].main.temp,
            data.list[4].main.humidity,
            data.list[4].wind.speed
          );
          // printGifs(
          //   data.list[0].weather.id,
          //   data.list[1].weather.id,
          //   data.list[2].weather.id,
          //   data.list[3].weather.id,
          //   data.list[4].weather.id
          // );
        }
      }
    });
}

function printDay2(temp, humidity, speed) {
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp2").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind2").text(wind + "mph");
  $("#humid2").text(humidity + "%");
}

function printDay3(temp, humidity, speed) {
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp3").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind3").text(wind + "mph");
  $("#humid3").text(humidity + "%");
}

function printDay4(temp, humidity, speed) {
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp4").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind4").text(wind + "mph");
  $("#humid4").text(humidity + "%");
}

function printDay5(temp, humidity, speed) {
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp5").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind5").text(wind + "mph");
  $("#humid5").text(humidity + "%");
}

function printDay6(temp, humidity, speed) {
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  $("#temp6").text(tempF + "°");
  var wind = Math.round(speed);
  $("#wind6").text(wind + "mph");
  $("#humid6").text(humidity + "%");
}

// Saving the search to local storage, displaying history under search
function saveSearch(name) {
  localStorage.setItem("Search1", name);
  $("#results-header").attr("style", "display:flex");
  $("#result1").attr("style", "display:inline");
  $("#result1").text(name);
}

// 200 thunderstorms
var thunderDay = "./assets/day-gifs/weather-thunder.gif";
var thunderNight = "./assets/night-gifs/thunder-night.gif";

// 201 thunderstorms rain
// 202 thunderstorms heavy rain
// 230 thunderstorms light rain
// 231 thunderstorms drizzle
// 232 thunderstorms heavy drizzle
// 233 thunderstorms with hail
var stormDay = "./assets/day-gifs/weather-storm.gif";
var stormNight = "./assets/night-gifs/storm-night.gif";

// 302 heavy drizzle
// 500 light rain
// 502 heavy rain
// 511 freezing rain
// 521 shower rain
// 522 heavy shower rain
var heavyRainDay = "./assets/day-gifs/storm-showers-day.gif";
var heavyRainNight = "./assets/night-gifs/partly-shower-night.gif";

// 501 moderate rain
// 520 light shower rain
// 300 light drizzle
// 301 drizzle
var lightRainDay = "./assets/day-gifs/weather-partly-shower.gif";
var lightRainNight = "./assets/night-gifs/partly-shower-night.gif";

// 601 snow
// 602 heavy snow
// 610 mix snow/rain
// 611 sleet
// 612 heavy sleet
// 622 heavy snow shower
var snowDay = "./assets/day-gifs/weather-snow-sunny.gif";
var snowNight = "./assets/night-gifs/partly-snow-night.gif";

// 623 flurries
// 600 light snow
// 621 snow shower
var partlySnowDay = "./assets/day-gifs/weather-snow.gif";
var partlySnowNight = "./assets/night-gifs/snow-night.gif";

// 700 mist
// 711 smoke
// 721 haze
// 731 sand/dust
// 741 fog
// 751 freezing fog
// 900 unknown percipitation
var mistDay = "./assets/day-gifs/weather-mist.gif";
var mistNight = "./assets/night-gifs/mist-night.gif";

// 800 clear sky
var clearDay = "./assets/day-gifs/weather-sunny.gif";
var clearNight = "./assets/night-gifs/clear-night.gif";

// 801 few clouds
// 802 scattered clouds
// 803 broken clouds
var partlyCloudyDay = "./assets/day-gifs/weather-partly-cloudy.gif";
var partlyCloudyNight = "./assets/night-gifs/partly-cloudy-night.gif";

// 804 overcast clouds
var windyDay = "./assets/day-gifs/weather-windy.gif";
var windyNight = "./assets/night-gifs/windy-night.gif";

// function printGifs(id) {
//   switch (true) {
//     case id === 800:
//       $(`<img src="$("./assets/night-gifs/clear-night.gif")">`).appendTo(
//         "#day1icon"
//       );
//       break;
//     case id === 201 || 202 || 230 || 231 || 232 || 233:
//       $(`<img src="$("./assets/night-gifs/storm-night.gif")">`).appendTo(
//         "#day1icon"
//       );
//       break;
//   }
//
