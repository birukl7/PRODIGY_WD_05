// Selecting necessary DOM elements
const weatherForm = document.querySelector(".weatherForm"); // Form element
const cityInput = document.querySelector(".cityInput"); // Input field for city
const card = document.querySelector(".card"); // Card to display weather information

// Elements related to changing temperature unit
const choiceContainer = document.querySelector('.choice-container'); // Container for temperature unit choices
const barBtn = document.querySelector('.bar-btn-js'); // Button to toggle temperature unit choices
const iconBar = document.querySelector('.icon-js'); // Icon for temperature unit toggle
const celsiusBtn = document.querySelector('.to-c'); // Button to change temperature unit to Celsius
const fahrenheitBtn = document.querySelector('.to-f'); // Button to change temperature unit to Fahrenheit
const kelvinBtn = document.querySelector('.to-k'); // Button to change temperature unit to Kelvin

// API key for fetching weather data
const apiKey = "45355a7242fbd0d62ac57fb9cb26a712";
// Variable to store temperature value
let tempratureValue = 0;
// Variable to track if there's an error
let hasError = false;

// Event listener for form submission
weatherForm.addEventListener("submit", async event => {
    event.preventDefault(); // Prevent default form submission behavior
    const city = cityInput.value; // Get the city entered by the user

    if(city) { // If city is provided
        try {
            const weatherData = await getWeatherData(city); // Fetch weather data for the provided city
            displayWeatherInfo(weatherData); // Display weather information
            hasError = false;
        } catch(error) {
            console.error(error); // Log error to console
            displayError(error); // Display error message
            hasError = true; // Set error flag to true
            console.log(hasError)
        }
    } else {
        displayError("Please enter a city"); // Display error message for missing city
    }
   
});

// Function to fetch weather data from API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // API URL for fetching weather data
    const response = await fetch(apiUrl); // Fetch data from API

    if(!response.ok) { // If response is not successful
        throw new Error("Could not fetch weather data or city not found."); // Throw error
    }

    return await response.json(); // Return weather data as JSON
}

// Functions to convert temperature units
function changeUnitCelsius(temp) {
    return `${(temp - 273.15).toFixed(1)}°<span style="font-size: 4rem;">${'C'}</span>`;
}

function changeUnitFahrenheit(temp) {
    return `${(((temp - 273.15) * 1.8) + 32).toFixed(1)}°<span style="font-size: 4rem;">${'F'}</span>`;
}

function changeUnitKelvin(temp) {
    return `${temp}<span style="font-size: 4rem;">&nbsp;${'K'}</span>`;
}

// Function to display weather information
function displayWeatherInfo(data) {
    // Arrays for days and months
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Current day and month
    const today = new Date().getDay();
    const dayName = daysOfWeek[today];
    const today1 = new Date();
    const monthName = monthsOfYear[today1.getMonth()];
    const dateValue = today1.getDate();

    // Destructuring weather data
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    // Clearing previous card content
    card.textContent = "";
    card.style.display = "flex";
    tempratureValue = temp;

    // Creating DOM elements to display weather information
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const time =  document.createElement("p");
    const day = document.createElement('span');
    const _month = document.createElement('span');
    const _dataContainer = document.createElement('div');
    const humidityContainer = document.createElement('div');
    const humidityIcon = document.createElement('span');
    const humudity = document.createElement('span');
    const humidityValue = document.createElement('span');

    // Setting content and classes for elements
    humidityIcon.innerHTML = `<i class="fa-solid fa-droplet "></i>`;
    day.innerHTML = `${dayName},&nbsp;`;
    _month.innerHTML = `${monthName}&nbsp;${dateValue}`;
    humudity.innerHTML = `Humidity`;
    humidityValue.innerHTML = `${humidity}%`;
    time.appendChild(day);
    time.appendChild(_month);

    humidityContainer.appendChild(humidityIcon);
    humidityContainer.appendChild(humudity);
    humidityContainer.appendChild(humidityValue);

    _dataContainer.appendChild(humidityContainer);
    _dataContainer.appendChild(descDisplay);

    time.classList.add('time');
    cityDisplay.textContent = `${city}`;
    tempDisplay.innerHTML = changeUnitCelsius(temp);
    descDisplay.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    tempDisplay.classList.add("temp-js");
    descDisplay.classList.add("descDisplay");
    descDisplay.classList.add("descDisplay-css");
    weatherEmoji.classList.add("weatherEmoji");
    _dataContainer.classList.add('dataContainer');
    humidityContainer.classList.add('humidityContainer');
    time.classList.add('time-display');

    // Appending elements to card
    card.appendChild(weatherEmoji);
    card.appendChild(time);
    card.appendChild(tempDisplay);
    card.appendChild(cityDisplay);
    card.appendChild(_dataContainer);
    weatherEmoji.innerHTML = getWeatherEmoji(id);
    
}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            document.body.className = ''
            document.body.classList.add('thunder')
            document.body.classList.add('bg-image-style')
         
            return `<i class="fa-solid fa-cloud-bolt" style=" color: #546061"></i>`; //thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            document.body.className = ''
            document.body.classList.add('drizzle')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-solid fa-droplet" style=" ;"></i> `; //🌧 drizzle
        case (weatherId >= 500 && weatherId < 600):
            document.body.className = ''
            document.body.classList.add('rain')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-solid fa-cloud-rain"></i>`; //rain
        case (weatherId >= 600 && weatherId < 700):
            document.body.className = ''
            document.body.classList.add('snow')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-regular fa-snowflake"></i>`; // snow
        case (weatherId >= 700 && weatherId < 800):
            document.body.className = ''
            document.body.classList.add('fog')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-solid fa-smog"></i>`; //mist smoke haze, snad, dust, ash
        case (weatherId == 800): //clear sky
            document.body.className = ''
            document.body.classList.add('sky')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-regular fa-sun" style="color: #FFD43B;"></i>` //☀;
        case (weatherId >= 801 && weatherId < 810):
            document.body.className = ''
            document.body.classList.add('cloud')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-solid fa-cloud" style="color:white;"></i>`; // clouds
        default:
            return "❓";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

const tempDispalyElement = document.querySelector('.temp-js');

barMenu()

function barMenu(){
    if(hasError) return
    barBtn.addEventListener('click', ()=>{
        console.log(barBtn)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    celsiusBtn.addEventListener('click', ()=>{
        document.querySelector('.temp-js').innerHTML = changeUnitCelsius(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    fahrenheitBtn.addEventListener('click', ()=>{
        document.querySelector('.temp-js').innerHTML = changeUnitFahrenheit(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    kelvinBtn.addEventListener('click', ()=>{
        document.querySelector('.temp-js').innerHTML = changeUnitKelvin(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
}





