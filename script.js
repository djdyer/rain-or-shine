// location: Toccoa GA
var requestWeather =
  "https://api.openweathermap.org/data/2.5/onecall?lat=34.5773&lon=-83.3324&exclude=alerts&appid={}";

function getApi(requestWeather) {
  fetch(requestWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  return data;
}

var responseDetail = getApi(requestWeather);

// var date = responseDetail.current.dt;
console.log(responseDetail);

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
