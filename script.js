var hour = moment().format("H");
var hourInt = parseInt(hour);

// Hours deemed nighttime
const nightHours = [1, 2, 3, 4, 20, 21, 22, 23, 24];

// If the hour of the day is in nightHours, return true, else return false
function isNight() {
  if (nightHours.includes(hourInt)) {
    return true;
  } else {
    return false;
  }
}
isNight();

// Darkmode fires at 8pm, and runs until 5am
function darkMode() {
  if (isNight()) {
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
      getUVindex(data.coord.lat, data.coord.lon);
      printMainData(
        data.name,
        data.main.temp,
        data.main.humidity,
        data.wind.speed
      );
      isNightGif(data.weather[0].id);
      populateSearches(city);
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
      printDay2(
        data.list[4].main.temp,
        data.list[4].main.humidity,
        data.list[4].wind.speed
      );
      printDay3(
        data.list[12].main.temp,
        data.list[12].main.humidity,
        data.list[12].wind.speed
      );
      printDay4(
        data.list[20].main.temp,
        data.list[20].main.humidity,
        data.list[20].wind.speed
      );
      printDay5(
        data.list[28].main.temp,
        data.list[28].main.humidity,
        data.list[28].wind.speed
      );
      printDay6(
        data.list[36].main.temp,
        data.list[36].main.humidity,
        data.list[36].wind.speed
      );
      isNightGif2(data.list[4].weather[0].id);
      isNightGif3(data.list[12].weather[0].id);
      isNightGif4(data.list[20].weather[0].id);
      isNightGif5(data.list[28].weather[0].id);
      isNightGif6(data.list[36].weather[0].id);
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

var citiesArray = [];

function populateSearches(city) {
  citiesArray = JSON.parse(localStorage.getItem("cities"));
  if (!citiesArray) {
    citiesArray = [];
  }
  if (city && !citiesArray.includes(city)) {
    citiesArray.unshift(city);
  }
  while (citiesArray.length > 5) {
    citiesArray.pop();
  }
  localStorage.setItem("cities", JSON.stringify(citiesArray));
  for (var i = 0; i < citiesArray.length; i++) {
    $("#results-header").attr("style", "display:flex");
    $("#result" + [i]).attr("style", "display:inline");
    $("#result" + [i]).text(citiesArray[i]);
  }
}

// Close button clears local storage, hides results and header
$("#closeBtn").on("click", clearStorage);
function clearStorage() {
  for (var i = 0; i < citiesArray.length; i++) {
    $("#results-header").attr("style", "display:none");
    $("#result" + [i]).attr("style", "display:none");
    localStorage.clear();
  }
}

// Targets results buttons for click event to launch newSearch
$("#result0").on("click", newSearch);
$("#result1").on("click", newSearch);
$("#result2").on("click", newSearch);
$("#result3").on("click", newSearch);
$("#result4").on("click", newSearch);

// Summarized weather scenarios & ids
var thunder = 200;
var thunderstorm = [201, 202, 230, 231, 232, 233];
var heavyRain = [302, 500, 502, 511, 521, 522];
var lightRain = [501, 520, 300, 301];
var snow = [601, 602, 610, 611, 612, 622];
var lightSnow = [623, 600, 621];
var mist = [700, 711, 721, 731, 741, 751, 900];
var clearSky = 800;
var partlyCloudy = [801, 802, 803];
var overcast = 804;

// DAY 1 - If isNight, display only night-gifs with matching id
function isNightGif(id) {
  if (isNight()) {
    if (thunder === id) {
      $("#day1icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (thunderstorm.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (heavyRain.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (lightRain.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (snow.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (lightSnow.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (mist.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (clearSky == id) {
      $("#day1icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (partlyCloudy.includes(id)) {
      $("#day1icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (overcast == id) {
      $("#day1icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif(id);
  }
}
function isDayGif(id) {
  if (thunder == id) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day1icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

// DAY 2 set Gif
function isNightGif2(id) {
  if (isNight()) {
    if (isNight() && thunder === id) {
      $("#day2icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (isNight() && thunderstorm.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (isNight() && heavyRain.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && lightRain.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && snow.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (isNight() && lightSnow.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (isNight() && mist.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (isNight() && clearSky == id) {
      $("#day2icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (isNight() && partlyCloudy.includes(id)) {
      $("#day2icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (isNight() && overcast == id) {
      $("#day2icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif2(id);
  }
}
function isDayGif2(id) {
  if (thunder == id) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day2icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

// DAY 3 set Gif
function isNightGif3(id) {
  if (isNight()) {
    if (isNight() && thunder === id) {
      $("#day3icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (isNight() && thunderstorm.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (isNight() && heavyRain.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && lightRain.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && snow.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (isNight() && lightSnow.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (isNight() && mist.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (isNight() && clearSky == id) {
      $("#day3icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (isNight() && partlyCloudy.includes(id)) {
      $("#day3icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (isNight() && overcast == id) {
      $("#day3icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif3(id);
  }
}
function isDayGif3(id) {
  if (thunder == id) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day3icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

// DAY 4 set Gif
function isNightGif4(id) {
  if (isNight()) {
    if (isNight() && thunder === id) {
      $("#day4icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (isNight() && thunderstorm.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (isNight() && heavyRain.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && lightRain.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && snow.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (isNight() && lightSnow.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (isNight() && mist.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (isNight() && clearSky == id) {
      $("#day4icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (isNight() && partlyCloudy.includes(id)) {
      $("#day4icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (isNight() && overcast == id) {
      $("#day4icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif4(id);
  }
}
function isDayGif4(id) {
  if (thunder == id) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day4icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

// DAY 5 set Gif
function isNightGif5(id) {
  if (isNight()) {
    if (isNight() && thunder === id) {
      $("#day5icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (isNight() && thunderstorm.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (isNight() && heavyRain.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && lightRain.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && snow.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (isNight() && lightSnow.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (isNight() && mist.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (isNight() && clearSky == id) {
      $("#day5icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (isNight() && partlyCloudy.includes(id)) {
      $("#day5icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (isNight() && overcast == id) {
      $("#day5icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif5(id);
  }
}
function isDayGif5(id) {
  if (thunder == id) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day5icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

// DAY 6 set Gif
function isNightGif6(id) {
  if (isNight()) {
    if (isNight() && thunder === id) {
      $("#day6icon").attr("src", "./assets/night-gifs/thunder-night.gif");
    } else if (isNight() && thunderstorm.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/storm-night.gif");
    } else if (isNight() && heavyRain.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && lightRain.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/partly-shower-night.gif");
    } else if (isNight() && snow.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/snow-night.gif");
    } else if (isNight() && lightSnow.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/partly-snow-night.gif");
    } else if (isNight() && mist.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/mist-night.gif");
    } else if (isNight() && clearSky == id) {
      $("#day6icon").attr("src", "./assets/night-gifs/clear-night.gif");
    } else if (isNight() && partlyCloudy.includes(id)) {
      $("#day6icon").attr("src", "./assets/night-gifs/partly-cloudy-night.gif");
    } else if (isNight() && overcast == id) {
      $("#day6icon").attr("src", "./assets/night-gifs/windy-night.gif");
    }
  } else {
    isDayGif6(id);
  }
}
function isDayGif6(id) {
  if (thunder == id) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-thunder.gif");
  } else if (thunderstorm.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-storm.gif");
  } else if (heavyRain.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/storm-showers-day.gif");
  } else if (lightRain.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-partly-shower.gif");
  } else if (snow.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-snow-sunny.gif");
  } else if (lightSnow.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-snow.gif");
  } else if (mist.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-mist.gif");
  } else if (clearSky == id) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-sunny.gif");
  } else if (partlyCloudy.includes(id)) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-partly-cloudy.gif");
  } else if (overcast == id) {
    $("#day6icon").attr("src", "./assets/day-gifs/weather-windy.gif");
  }
}

populateSearches();
