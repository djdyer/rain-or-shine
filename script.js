// location: Toccoa GA
var requestWeather =
  "https://api.openweathermap.org/data/2.5/onecall?lat=34.5773&lon=-83.3324&exclude=alerts&appid=45ca50dc39eb346ed62587b3b0c97470";

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
