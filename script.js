// Select elements from the document

const cityInput = document.querySelector('.cityInput'); 
const searchButton = document.querySelector('button'); 
const cityHeader = document.querySelector('h1'); 
const dateHeader = document.querySelector('h4'); 
const weatherBox = document.querySelector('.weather-box'); 
const temperatureElement = document.querySelector('.tempreture span'); 
const descriptionElement = document.querySelector('.description'); 
const humidityElement = document.querySelector('.info-humidity span'); 
const windElement = document.querySelector('.info-wind span'); 
const image = document.querySelector('.weather img'); 

// API key

const API_KEY = 'ca29be9ce2ca9ebef10e75c2a8a020a3';

// Add event listener to the search button

searchButton.addEventListener('click', async () => {
  // Get the city input value and trim it

  const city = cityInput.value.trim();
  // If the input is empty, do nothing

  if (city === '')
  return; 

  try {
    // Fetch the weather data from OpenWeatherMap API

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    // Update the city header and date header

    updateHeaders(city, data);

    // Update the weather data

    temperatureElement.textContent = `${data.main.temp}°C`; 
    descriptionElement.textContent = `${data.weather[0].description}`; 
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} km/h`; 

    // Update the weather icons

    switch (data.weather[0].main) {
      case 'Clear':
        image.src = "images/clear.png";
        break;
      case 'Rain':
        image.src = "images/rain.png";
        break;
      case 'Clouds':
        image.src = "images/cloud.png";
        break;
      case 'Snow':
        image.src = "images/snow.png";
        break;
      case 'Mist':
        image.src = "images/mist.png";
        break;

      default:
        image.src = "images/cloud.png";
    }

    // Show the weather box

    weatherBox.style.display = 'block';
  } 
  // Any errors to the console

  catch (error) {
    console.error(error); 
  }
});

function updateHeaders(city, data) {
  cityHeader.textContent = city.toUpperCase();
  dateHeader.textContent = `Weather in ${city} - ${new Date().toLocaleDateString()}`;
}