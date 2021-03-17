var currentDay;
var searchEl = document.querySelector('#submit');
var dateDisplayEl = document.querySelector('#date-display');
var iconDisplayEl = document.querySelector('#icon-display');
var cityNameEl = document.querySelector('#city-name');
var searchInputEl = document.querySelector('#searchCity');
var temperatureEL = document.querySelector('#temperature');
var humidityEl = document.querySelector('#humidity')
var windEl = document.querySelector('#wind-speed');
var uvIndexEl = document.querySelector('#uv-index');
var forecastIconEl1 = document.querySelector('#forecastIcon1');
var forecastTempEl1 = document.querySelector('#forecastTemp1');
var forecastHumidEl1 = document.querySelector('#forecastHumid1');
var forecastIconEl2 = document.querySelector('#forecastIcon2');
var forecastTempEl2 = document.querySelector('#forecastTemp2');
var forecastHumidEl2 = document.querySelector('#forecastHumid2');
var forecastIconEl3 = document.querySelector('#forecastIcon3');
var forecastTempEl3 = document.querySelector('#forecastTemp3');
var forecastHumidEl3 = document.querySelector('#forecastHumid3');
var forecastIconEl4 = document.querySelector('#forecastIcon4');
var forecastTempEl4 = document.querySelector('#forecastTemp4');
var forecastHumidEl4 = document.querySelector('#forecastHumid4');
var forecastIconEl5 = document.querySelector('#forecastIcon5');
var forecastTempEl5 = document.querySelector('#forecastTemp5');
var forecastHumidEl5 = document.querySelector('#forecastHumid5');
var searchButtonsEl = document.querySelector('.search-results-buttons');
var forecastDateEl1 = document.querySelector('#forecastDate1');
var forecastDateEl2 = document.querySelector('#forecastDate2');
var forecastDateEl3 = document.querySelector('#forecastDate3');
var forecastDateEl4 = document.querySelector('#forecastDate4');
var forecastDateEl5 = document.querySelector('#forecastDate5');
var latitude;
var longitude;
var urlName;
var forecastDateArray = [forecastDateEl1, forecastDateEl2, forecastDateEl3, forecastDateEl4, forecastDateEl5];
var forecastIconArray = [forecastIconEl1, forecastIconEl2, forecastIconEl3,  forecastIconEl4,  forecastIconEl5];
var forecastTempArray = [forecastTempEl1, forecastTempEl2,  forecastTempEl3,forecastTempEl4, forecastTempEl5];
var forecastHumidArray =[forecastHumidEl1, forecastHumidEl2, forecastHumidEl3, forecastHumidEl4, forecastHumidEl5];


function getWeatherFetch(cityNameParam){
   var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityNameParam + "&units=imperial&appid=42a22477232e5d6f0ba0202c57096ead";
   return weatherUrl;
}

function getForecastFetch(cityNameParam){
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityNameParam + "&units=imperial&appid=42a22477232e5d6f0ba0202c57096ead";
    return forecastUrl;
}

function getUvIndexFetch(latParam, longParam){
    var uvIndexUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latParam + "&lon=" + longParam + "&appid=42a22477232e5d6f0ba0202c57096ead";
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
    var currentConditions = dataParam.weather;
    var weatherIcon;
    if(currentConditions[0].main === "Clouds"){
     // weatherIcon = ;
    }


    cityNameEl.textContent = searchInputEl.value + " " + "(" + currentDay + ")"// + " " + weatherIcon;
    console.log(currentConditions[0].main)


    temperatureEL.textContent = dataParam.main.temp;
    humidityEl.textContent = dataParam.main.humidity;
    windEl.textContent = dataParam.wind.speed;
}

function displayUvIndex(dataParamUv){
    uvIndexEl.textContent = dataParamUv.value;
}

function makeWeatherFetch(urlNameParam){    
    fetch(urlNameParam)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCurrentWeather(data);
          longitude = data.coord.lon;
          latitude = data.coord.lat;
          uvUrl = getUvIndexFetch(latitude, longitude);
          makeUvIndexFetch(uvUrl);
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

//set up to run this with a loop then the nesting didn't work right so we have this :/
function displayForecast(forecastDataParam){
  var tempConditions = forecastDataParam.list;
  forecastDateArray[0].textContent = tempConditions[0].dt_txt;
  forecastTempArray[0].textContent = tempConditions[0].main.temp;
  forecastHumidArray[0].textContent = tempConditions[0].main.humidity;
  forecastDateArray[1].textContent = tempConditions[8].dt_txt;
  forecastTempArray[1].textContent = tempConditions[8].main.temp;
  forecastHumidArray[1].textContent = tempConditions[8].main.humidity;
  forecastDateArray[2].textContent = tempConditions[16].dt_txt;
  forecastTempArray[2].textContent = tempConditions[16].main.temp;
  forecastHumidArray[2].textContent = tempConditions[16].main.humidity;
  forecastDateArray[3].textContent = tempConditions[24].dt_txt;
  forecastTempArray[3].textContent = tempConditions[24].main.temp;
  forecastHumidArray[3].textContent = tempConditions[24].main.humidity;
  forecastDateArray[4].textContent = tempConditions[32].dt_txt;
  forecastTempArray[4].textContent = tempConditions[32].main.temp;
  forecastHumidArray[4].textContent = tempConditions[32].main.humidity;
}

function makeForecastFetch(forecastUrlParam){
  fetch(forecastUrlParam)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayForecast(data);
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
    makeForecastFetch(forecastUrl);
    makeCityButton(cityName);
}

var handleButtonSubmit = function(event){
    event.preventDefault();
    var buttonName = event.target.closest('span').innerText;
    buttonName.split().join('+');
    var newUrlName = getWeatherFetch(buttonName);
    var newForecastURL = getForecastFetch(buttonName);
    makeWeatherFetch(newUrlName);
    makeForecastFetch(newForecastURL);
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