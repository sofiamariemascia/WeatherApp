(function () {
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '3e8fccdfd7f4060a7ab6492d73271ee4';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyCtG8PgzAlIL0AbJvHpilPQV0QiWTaYKdU';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  function getCurrentWeather(coords) {
    // Template string again! I hope you can see how nicer this is :)
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}?units=si&exclude=minutely,hourly,daily,alerts,flags`;

    // THIS IS WHERE MY COMPUTER IS GETTING THE CODE
    return (
      fetch(url)
        .then(response => response.json())
        .then(data => data.currently)
    );
  }

  function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
      fetch(url)
        .then(response => response.json())
        .then(data => data.results[0].geometry.location)
    );
  }

  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');
  var search = new google.maps.places.Autocomplete(cityInput, ["regions"]);

  //create a new variable that represents an HTML element - var cityWeather = document.querySelector('.city-weather')
  var cityWeather = document.querySelector('.city-weather')
  //create a paragraph element that we'll add to our cityWeather div - var para = document.createElement("P");
  var para = document.createElement("P");

  // actually add our paragraph element to our cityWeather div - cityWeather.append(para)
  cityWeather.append(para)

  var skycons = new Skycons({ "color": "black" });

  cityForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the form from submitting

    var city = cityInput.value;

    getCoordinatesForCity(city)
      .then(function (coordinates) {
        para.innerText = "patience..."
        document.querySelector("#icon1").classList.add("hidden");
        return getCurrentWeather(coordinates)
      })

      .then(function (weather) {

        //var skycons = new Skycons({ "color": "black" });
        // on Android, a nasty hack is needed: {"resizeClear": true}

        // you can add a canvas by it's ID...
        if(weather.icon === "rain") {
          skycons.add("icon1", Skycons.RAIN);
        }

        if(weather.icon === "clear-day") {
          skycons.add("icon1", Skycons.CLEAR_DAY);
        }

        if(weather.icon === "clear-night") {
          skycons.add("icon1", Skycons.CLEAR_NIGHT);
        }

        if(weather.icon === "partly-cloudy-day") {
          skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        }
        if(weather.icon === "partly-cloudy-night") {
          skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
        }

        if(weather.icon === "wind") {
          skycons.add("icon1", Skycons.WIND);
        }
        if(weather.icon === "cloudy") {
          skycons.add("icon1", Skycons.CLOUDY);
        }
        if(weather.icon === "fog") {
          skycons.add("icon1", Skycons.FOG);
        }
        if(weather.icon === "sleet") {
          skycons.add("icon1", Skycons.SLEET);
        }
        if(weather.icon === "snow") {
          skycons.add("icon1", Skycons.SNOW);
        }
        if(weather.icon === "fog") {
          skycons.add("icon1", Skycons.FOG);
        }

        // if you're using the Forecast API, you can also supply
        // strings: "partly-cloudy-day" or "rain".

        // start animation!
        skycons.play();
        document.querySelector("#icon1").classList.remove("hidden");


        para.innerText = 'Outside Temperature: ' + weather.temperature + '\n' + 'The Situation Now: ' + weather.icon + '\n' + 'Importance of Suncream? ' + weather.uvIndex;

        console.log({ weather })

        //   //create a new variable that represents an HTML element - var cityWeather = document.querySelector('.city-weather')
        //   var cityWeather = document.querySelector('.city-weather')
        //   //create a paragraph element that we'll add to our cityWeather div - var para = document.createElement("P");
        //  var para = document.createElement("P");
        //   //creating the paragraph element
        //   //var string = 'outside temperature: ' + weather.temperature + ...etc
        //   //  insert string into paragraph tag - para.append(string)
        //   para.append(string)
        //   // actually add our paragraph element to our cityWeather div - cityWeather.append(para)
        //   cityWeather.append(para)
        //cityWeather.innerText = 'Outside Temperature: ' + weather.temperature + '\n' + 'The Situation Now: ' + weather.icon + '\n' + 'Importance of Suncream? ' + weather.uvIndex;

      })


  });




})();

