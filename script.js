let currentContainer = document.getElementById('currentContainer');
let cardContainer = document.getElementById('cardContainer');
let uvIndex = document.getElementById('index');
let searchHistory = document.getElementById('search-history')

// variable to collect the localStorage 
let allSearches = localStorage.getItem("allSearches");

let weather = {

// this is the api key for the weather api 
apiKey: '4541b3868e8909ef309a6e0a539cf01f',

mainWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => {
    let {name} = data;
    let {icon, description} = data.weather[0];
    let {temp, humidity} = data.main;
    let {speed} = data.wind;
    
    document.querySelector('.city').innerText = "Weather in " + name;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + "°F";
    document.querySelector('.humid').innerText = "Humidity: " + humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + speed + "mph";

    $('.index').empty();
    })
},

// this function fetches and displays the weather
fetchWeather: function (city) {

    $('.weather').remove();

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => {
    //     console.log(data);
    //     console.log(city);
    // console.log(data.list.slice(1, 5));
    // console.log(data.list.length);
    // console.log(data.list.length - 34);
    // fix the length to only be 5 and add dates
        for(let i = 0; i < data.list.length - 35; i++) {
            let {name} = data.city;
            let {icon, description} = data.list[i].weather[0];
            let {temp, humidity} = data.list[i].main;
            let {speed} = data.list[i].wind;
            // console.log(name,icon,description,temp,humidity,speed);

            // creates a div / card to hold all the p elements 
           let createDiv = document.createElement('div');
           createDiv.setAttribute('id', 'weather-card')
           createDiv.setAttribute('class', 'weather')

        //    creating multiple p elements to display all the values separately 
           let createP = document.createElement('p');
           let createP2 = document.createElement('p');
           let createP3 = document.createElement('p');
           let createP4 = document.createElement('p');
           let createP5 = document.createElement('p');
           let createP6 = document.createElement('p');

        //    assigning all the variables values to display as text content 
           createP.textContent = name;
           createP2.textContent = icon;
           createP3.textContent = description;
           createP4.textContent = 'Temperature: ' + temp;
           createP5.textContent = 'Humidity: ' + humidity;
           createP6.textContent = 'Wind Speed: ' + speed;

           createDiv.appendChild(createP);
           createDiv.appendChild(createP2);
           createDiv.appendChild(createP3);
           createDiv.appendChild(createP4);
           createDiv.appendChild(createP5);
           createDiv.appendChild(createP6);

        //    currentContainer.appendChild(createP)
           cardContainer.appendChild(createDiv);
        }
    })
},

uvIndex: function (){

    

    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);
        let {latitude, longitude} = success.coords;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=4541b3868e8909ef309a6e0a539cf01f`)
    .then((res) => res.json())
    .then((data) =>{
        let {uvi} = data.current;
        console.log(data);
        console.log(data.current);
        
        //create a separate div card to contain the uvi with the first day
        let pEl = document.createElement('p');
        console.log(uvi);
        pEl.textContent = 'UV Index: ' + uvi;
        console.log(uvi);
        $(uvIndex).append(pEl);
        
    })

    // pEl.textContent.remove();
})
    
    
},

// this function uses the value from the userinput to be used in the fetchweather function 
search: function (){
    this.mainWeather(document.querySelector('.search-bar').value);
    this.fetchWeather(document.querySelector('.search-bar').value);
    
    
}
    
};

// when the search button is clicked, the search and uvIndex function are invoked 
// The userInput is stored locally and displayed on the screen below the search bar
document.querySelector('.search button').addEventListener('click', function (){
weather.search();
weather.uvIndex();



let citySearch = $('#citySearch').val();
console.log(citySearch);
let finalSearch = {
    city: citySearch
}

if (!allSearches) {
    allSearches = []; 
} else {
    allSearches = JSON.parse(allSearches);
}
allSearches.push(finalSearch);
let newScore = JSON.stringify(allSearches);
localStorage.setItem("allSearches", newScore);

let historyLog = localStorage.getItem("allSearches");
// console.log(historyLog);

// reassigning the variable to that it takes the values stored in the json string
historyLog = JSON.parse(historyLog);
// console.log(historyLog);

// created an conditional statement when the score is retrieved  to perform the for loop 
if (historyLog) {

    // same concept as the searchHistory in the start game function 
    // let createLi = $('<li>');
    // historyLog.forEach(function(historyLog){
    //     createLi.textContent = historyLog
    //     $('.searchHistory').append(createLi.textContent);
    //     });
    
    // this for loop goes through the local storage and displays it through the newly created li 
    for (let i = 0; i < historyLog.length; i++) {

        let createLi = $('<li>');
        createLi.textContent = historyLog[i].city;
        // console.log(createLi.textContent);
        // appends it to the board to be displayed 
        searchHistory.append(createLi.textContent);
        // console.log(searchHistory);
    }
}
})