var currentDay;
var searchEl = document.querySelector('#submit');
var dateDisplayEl = document.querySelector('#date-display');
var cityNameEl = document.querySelector('#city-name');
var searchInputEl = document.querySelector('#searchCity');
var temperatureEL = document.querySelector('#temperature');
var humidityEl = document.querySelector('#humidity')
var windEl = document.querySelector('#wind-speed');
var uvIndexEl = document.querySelector('#uv-index')
var searchButtonsEl = document.querySelector('.search-results-buttons');
var latitude;
var longitude;
var urlName;


function getWeatherFetch(cityNameParam){
   var weatherUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + cityNameParam + "&appid=42a22477232e5d6f0ba0202c57096ead";
   return weatherUrl;
}

function getForecastFetch(cityNameParam){
    var forecastUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=" + cityNameParam + "&appid=42a22477232e5d6f0ba0202c57096ead";
    return forecastUrl;
}

function getUvIndexFetch(latParam, longParam){
    var uvIndexUrl = "https://cors-anywhere.herokuapp.comhttp://api.openweathermap.org/data/2.5/uvi?lat=" + latParam + "&lon=" + longParam + "&appid=42a22477232e5d6f0ba0202c57096ead";
    return uvIndexUrl;
}

function displayDate(){
    currentDay = moment().format('MMM DD, YYYY');
    dateDisplayEl.textContent = '(' + currentDay + ')';
}

function init(){
    displayDate();
}

function displayCurrentWeather(dataParam){
    //Dynamically changes the name to searched city and resets the date
    cityNameEl.textContent = searchInputEl.value + " " + "(" + currentDay + ")";
    longitude = dataParam.coord.lon;
    latitude = dataParam.coord.lat;
    console.log(longitude, latitude);
    uvIndexUrl = getUvIndexFetch(latitude, longitude);

    var tempCels = Math.round(((dataParam.main.temp) - 273.15));
    var tempF = (tempCels * (9/5)) + 32;
    temperatureEL.textContent = tempF;
    humidityEl.textContent = dataParam.main.humidity;
    windEl.textContent = dataParam.wind.speed;
}

function displayUvIndex(dataParamUv){
    //uvIndexEl.textContent = 
}

function makeWeatherFetch(urlNameParam){
    
    fetch(urlNameParam)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayCurrentWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to openweatherapp');
    });
}

function makeUvIndexFetch(urlNameParam){
    
    fetch(urlNameParam)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayUvIndex(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to openweatherapp');
    });
}

function makeCityButton(){
    var newButton = document.createElement('a');
    newButton.classList = 'waves-effect waves-light btn';
    var btnText = document.createElement('span');
    btnText.textContent = searchInputEl.value;
    newButton.appendChild(btnText);
    searchButtonsEl.appendChild(newButton);
}

var handleformsubmit = function(event){
    event.preventDefault();
    
    cityName = searchInputEl.value;
    urlName = getWeatherFetch(cityName);
    uvUrl = getUvIndexFetch(latitude, longitude); 
    forecastUrl = getForecastFetch(cityName);
    makeWeatherFetch(urlName);
    makeUvIndexFetch(uvUrl);
    makeCityButton(cityName);
}

var handleButtonSubmit = function(event){
    // event.preventDefault();
    // var buttonName = event.target.closest('span').value;
    // console.log(buttonName);
    // var newUrlName = getSearchName(buttonName);
    // makeWeatherFetch(newUrlName);
}

init();

//when the search button is pressed
    //generate the api call
    //call the api
    //displate the current weather conditaions
    //display the 5 day forecase
    //add a button to the search card for city searched.
searchEl.addEventListener('click', handleformsubmit);
searchButtonsEl.addEventListener('click', handleButtonSubmit);

//Trying to stop submit from working as inteded
document.addEventListener('keydown', function(event){
    if(event.key==13){
        event.preventDefault();
        document.getElementById('searchCity').click();
    }
}) 