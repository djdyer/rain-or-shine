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
          console.log(data.list[i]); // weather at noon for next 5 days
        }
      }
    });
}

function printMainData(name, temp, humidity, speed) {
  console.log(name);
  var nameEl = $("#city").text(name);
  var populate = $("section").attr("style", "display:inline");
  var tempF = Math.round((temp - 273.15) * 1.8 + 32);
  var tempEl = $("#temp").text(tempF + " °");
  var windEl = $("#wind").text(speed + " MPH");
  var humidityEl = $("#humidity").text(humidity);
}

function printUVData(uvi) {
  var uviEl = $("#uvi").text(uvi);
}

var result1 = $("#result1");

// Day 1
var cityName = $("#city");
var day1icon = $("#day1icon");
var day1temp = $("#temp");
var day1wind = $("#wind");
var day1humid = $("#humid");
var day1uvi = $("#uvi");

function applyDay1() {
  console.log();
}

// Day 2
var day2icon = $("#day1icon");
var day2temp = $("#temp");
var day2wind = $("#wind");
var day2humid = $("#humid");

// Day 3
var day3icon = $("#day1icon");
var day3temp = $("#temp");
var day3wind = $("#wind");
var day3humid = $("#humid");

// Day 4
var day4icon = $("#day1icon");
var day4temp = $("#temp");
var day4wind = $("#wind");
var day4humid = $("#humid");

// Day 5
var day5icon = $("#day1icon");
var day5temp = $("#temp");
var day5wind = $("#wind");
var day5humid = $("#humid");

// Day 6
var day6icon = $("#day1icon");
var day6temp = $("#temp");
var day6wind = $("#wind");
var day6humid = $("#humid");
