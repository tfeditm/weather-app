/*IMPORTANT: This code not works on https only works on http because of the free accounts of Openweathermap.
ACCES LIMITATION: "Do not send requests more than 1 time per 10 MINUTS from one device/one API key." "If account exceeds the limits, then a notification about limits exceeding is sent. If it repeats again, then the account is blocked for an hour. Therefore, the lock period is increased by one hour until 4 hours block sets. When blocking repeats the fifth time, then the lock period lasts 24 hours. This rule is cycled. Please be carefull with the number of API calls you complete." (https://openweathermap.org/appid)*/

function weatherApp() {

  var api = "http://api.openweathermap.org/data/2.5/weather?q=";
  var appid = "&APPID=2fb5580a5127f09718a44cb8e877d7bb";
  var units = "&units=metric";
  var deg = " °C";

  $.get("https://ipinfo.io/geo", function(response) {
    var mycity = response.city;
    var mycountry = response.country;
    $('#local').html(mycity + ", " + mycountry);
    getCurrentWeather(mycity, mycountry);
  }, "jsonp");

  function getCurrentWeather(city, country) {
    var url = api + city + "," + country + units + appid;
    $.get(url, function(weatherData) {
      
      //render temperature and switch between °C and °F
      $('#tempValue').html(" " + weatherData.main.temp);
      $('#tempUnit').html(deg);
      
      $('#tempUnit').on('click', function() {
        if(deg === " °C") {
          deg = " °F";
          $('#tempValue').html(" " + Math.round(weatherData.main.temp  * 9 / 5 + 32));
        }
        else if(deg === " °F") {
          deg = " °C";
        $('#tempValue').html(" " + weatherData.main.temp);
        }
        $('#tempUnit').html(deg);
      });
      
      //render weather with words
      $('#weather').html(weatherData.weather[0].main);
      
      //render weather with icon
      $('#' + weatherData.weather[0].icon).removeClass('hide');
    }, "jsonp");
  }

}

weatherApp();