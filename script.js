const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");


// elements to change the temprature unit.
const choiceContainer = document.querySelector('.choice-container');
const barBtn = document.querySelector('.bar-btn-js');
const iconBar = document.querySelector('.icon-js');
const celsiusBtn = document.querySelector('.to-c');
const fahrenheitBtn = document.querySelector('.to-f');
const kelvinBtn = document.querySelector('.to-k');

const apiKey = "45355a7242fbd0d62ac57fb9cb26a712";
let tempratureValue = 0 //variable to store temprature
let hasError = false;

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    console.log('yess')
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
            hasError = true;

        }
    }
    else{
        displayError("Please enter a city");
    }
});

// cityInput.addEventListener('keydown', (e)=>{
//     console.log(e.key)
// })



async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function changeUnitCelsius(temp){
    return `${(temp - 273.15).toFixed(1)}°<span style="font-size: 4rem;">${'C'}</span>`
}

function changeUnitFahrenheit(temp){
    return `${(((temp - 273.15)*(1.8))+32).toFixed(1)}°<span style="font-size: 4rem;">${'F'}</span>`
}

function changeUnitKelvin(temp){
    return `${temp}<span style="font-size: 4rem;">&nbsp;${'K'}</span>`
}

function displayWeatherInfo(data){

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const dayName = daysOfWeek[today];


    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today1 = new Date();
    const monthName = monthsOfYear[today1.getMonth()];
    const dateValue = today1.getDate();


    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";
    tempratureValue =temp;

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    const time =  document.createElement("p");
    const day = document.createElement('span');
    const _month = document.createElement('span')
    const _dataContainer = document.createElement('div');
    const humudity = document.createElement('span')
    const humidityValue = document.createElement('span')
    const humidityContainer = document.createElement('div')
    const humidityIcon = document.createElement('span')

    humidityIcon.innerHTML = `<i class="fa-solid fa-droplet "></i>`;

    day.innerHTML = `${dayName},&nbsp;`;
    _month.innerHTML = `${monthName}&nbsp;${dateValue}`;
    humudity.innerHTML = `Humidity`
    humudity.classList.add('humidityName')
    humidityValue.innerHTML = `${humidity}%`
    humidityValue.classList.add('percent')
    time.appendChild(day)
    time.appendChild(_month)

    humidityContainer.appendChild(humidityIcon)
    humidityContainer.appendChild(humudity)
    humidityContainer.appendChild(humidityValue)


    _dataContainer.appendChild(humidityContainer)
    _dataContainer.appendChild(descDisplay)

    time.classList.add('time');
    cityDisplay.textContent = `${city} City`;
    tempDisplay.innerHTML = changeUnitCelsius(temp);
    // humidityDisplay.textContent = `${humidity}%`;
    descDisplay.textContent = description;
    

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    tempDisplay.classList.add("temp-js");
    // humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    _dataContainer.classList.add('dataContainer');
    // _dataContainer.classList.add('data-white');
    humidityContainer.classList.add('humidityContainer');
    time.classList.add('time-display');
    

    
    card.appendChild(weatherEmoji);
    card.appendChild(time)
    card.appendChild(tempDisplay);
    card.appendChild(cityDisplay);
    card.appendChild(_dataContainer);
    // card.appendChild(humidityDisplay);
    // card.appendChild(descDisplay);
    weatherEmoji.innerHTML = getWeatherEmoji(id);
}

displayWeatherInfo({
    name: 'dubai', 
    main:{ temp: 350,  humidity: 87},
    weather: [{ description: 'clear sky', id : 804}]
});

const body = document.body;
const dataCon = document.querySelector('.dataContainer')
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            document.body.className = ''
            document.body.classList.add('thunder')
            document.body.classList.add('bg-image-style')
          // document.querySelector('.dataContainer').classList.add('data-white');
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
        case (weatherId === 800): // clouds
            document.body.className = ''
            document.body.classList.add('sky')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-regular fa-sun" style="color: #FFD43B;"></i>` //☀;
        case (weatherId >= 801 && weatherId < 810):
            document.body.className = ''
            document.body.classList.add('cloud')
            document.body.classList.add('bg-image-style')
            return `<i class="fa-solid fa-cloud" style="color:white;"></i>`; // unknown
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

// const choiceContainer = document.querySelector('.choice-container');
// const barBtn = document.querySelector('.bar-btn-js');
// const iconBar = document.querySelector('.icon-js');
// const celsiusBtn = document.querySelector('.to-c');
// const fahrenheitBtn = document.querySelector('.to-f');
// const kelvinBtn = document.querySelector('.to-k');
const tempDispalyElement = document.querySelector('.temp-js');


barMenu()
function barMenu(){
    if(hasError) return
    barBtn.addEventListener('click', ()=>{
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    celsiusBtn.addEventListener('click', ()=>{
        tempDispalyElement.innerHTML = changeUnitCelsius(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    fahrenheitBtn.addEventListener('click', ()=>{
        tempDispalyElement.innerHTML = changeUnitFahrenheit(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
    
    kelvinBtn.addEventListener('click', ()=>{
        tempDispalyElement.innerHTML = changeUnitKelvin(tempratureValue)
        choiceContainer.classList.toggle('active')
        iconBar.classList.toggle('fa-x')
    })
}





