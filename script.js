let currentContainer = document.getElementById('currentContainer');
let cardContainer = document.getElementById('cardContainer');
let uvIndex = document.getElementById('index');

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
    console.log(name,icon,description,temp,humidity,speed);
    document.querySelector('.city').innerText = "Weather in " + name;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + "°F";
    document.querySelector('.humid').innerText = "Humidity: " + humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + speed + "mph";
    })
},

// this function fetches and displays the weather
fetchWeather: function (city) {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(city);
    console.log(data.list.slice(1, 5));
    console.log(data.list.length);
    console.log(data.list.length - 34);
    // fix the length to only be 5 and add dates
        for(let i = 0; i < data.list.length - 34; i++) {
            let {name} = data.city;
            let {icon, description} = data.list[i].weather[0];
            let {temp, humidity} = data.list[i].main;
            let {speed} = data.list[i].wind;
            console.log(name,icon,description,temp,humidity,speed);

            // creates a div / card to hold all the p elements 
           let createDiv = document.createElement('div');
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
        
        //create a separate div card to contain the uvi with the first day
        let pEl = document.createElement('p');
       
        pEl.textContent = 'UV Index: ' + uvi;
        
        $(uvIndex).append(pEl);
        
    })
})
    
    
},

// this function uses the value from the userinput to be used in the fetchweather function 
search: function (){
    this.mainWeather(document.querySelector('.search-bar').value);
    this.fetchWeather(document.querySelector('.search-bar').value);
}
    
};

// when the search button is clicked, the search function is invoked 
document.querySelector('.search button').addEventListener('click', function (){
weather.search();
weather.uvIndex();
})