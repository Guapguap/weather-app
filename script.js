
let weather = {

apiKey: '4541b3868e8909ef309a6e0a539cf01f',

fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => console.log(data));
    
},

displayWeather: function(data){
    
    for(i=0; i < data.list.length; i++) {

    let {name} = data.list[i];
    let {icon, description} = data.list[i].weather;
    let {temp, humidity} = data.list[i].main;
    let {speed} = data.list[i].wind;
    console.log(name,icon,description,temp,humidity,speed);
    document.querySelector('.city').innerText = "Weather in " + name;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + "°F";
    document.querySelector('.humid').innerText = "Humidity: " + humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + speed + "mph";
    
}

},

search: function (){
    this.fetchWeather(document.querySelector('.search-bar').value);
}
};


document.querySelector('.search button').addEventListener('click', function (){
weather.search();
})