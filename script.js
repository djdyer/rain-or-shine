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
