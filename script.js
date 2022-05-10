
let weather = {

apiKey: '4541b3868e8909ef309a6e0a539cf01f',

fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + this.apiKey)
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
},


};


