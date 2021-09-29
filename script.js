// location: Toccoa GA
// var requestWeather =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=34.5773&lon=-83.3324&exclude=alerts&appid={}";

// function getApi(requestWeather) {
//   fetch(requestWeather)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
//   return data;
// }

// var responseDetail = getApi(requestWeather);

// var date = responseDetail.current.dt;
// console.log(responseDetail);

var day1 = moment();
$("#date").text(day1.format("dddd, MMM Do YYYY"));

console.log(day1);

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

// https://www.w3schools.com/html/html5_geolocation.asp

// var x = document.getElementById("demo");
//       function getLocation() {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(showPosition);
//         } else {
//           x.innerHTML = "Geolocation is not supported by this browser.";
//         }
//       }

//       function showPosition(position) {
//         x.innerHTML = "Latitude: " + position.coords.latitude +
//         "<br>Longitude: " + position.coords.longitude;
//       }
