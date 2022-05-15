let currentContainer = document.getElementById('currentContainer');
let cardContainer = document.getElementById('cardContainer');
let uvIndex = document.getElementById('index');
let searchBoard = document.getElementById('search-history');
let searchBtn = document.getElementById('start-button');


// this is the api key for the weather api 
let apiKey = '4541b3868e8909ef309a6e0a539cf01f'

function mainWeather(city) {

  

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => {
    let {name} = data;
    let {icon, description} = data.weather[0];
    let {temp, humidity} = data.main;
    let {speed} = data.wind;

    var date = new Date(data.dt * 1000).toLocaleDateString('en-US');
    var dailyTitle = (`${city} ${date}`)

    document.querySelector('.city').innerText = "Weather in " + dailyTitle;
    document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + "°F";
    document.querySelector('.humid').innerText = "Humidity: " + humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + speed + "mph";

    $('.index').empty();

    })
};

// this function fetches and displays the weather
function fetchWeather(city) {

    $('.weather').remove();

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
    // console.log(data.list.slice(1, 5));
    
    // fix the length to only be 5 and add dates
        for(let i = 7; i < 42; i+=7) {
            let {name} = data.city;
            let {icon, description} = data.list[i].weather[0];
            let {temp, humidity} = data.list[i].main;
            let {speed} = data.list[i].wind;
            // console.log(name,icon,description,temp,humidity,speed);
console.log(data.list[i].dt);
            var date = new Date(data.list[i].dt * 1000).toLocaleDateString('en-US');
            var dailyTitle = (`${city} ${date}`)
            // creates a div / card to hold all the p elements 
           let createDiv = document.createElement('div');
           createDiv.setAttribute('id', 'weather-card')
           createDiv.setAttribute('class', 'weather')

        //    creating multiple p elements to display all the values separately 
           let createP = document.createElement('p');
           let createImg = document.createElement('img');
           createImg.setAttribute('src', "")
           let createP3 = document.createElement('p');
           let createP4 = document.createElement('p');
           let createP5 = document.createElement('p');
           let createP6 = document.createElement('p');

        //    assigning all the variables values to display as text content 
           createP.textContent = dailyTitle;
           createImg.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
           createP3.textContent = description;
           createP4.textContent = 'Temperature: ' + temp;
           createP5.textContent = 'Humidity: ' + humidity;
           createP6.textContent = 'Wind Speed: ' + speed;

           createDiv.appendChild(createP);
           createDiv.appendChild(createImg);
           createDiv.appendChild(createP3);
           createDiv.appendChild(createP4);
           createDiv.appendChild(createP5);
           createDiv.appendChild(createP6);

        //    currentContainer.appendChild(createP)
           cardContainer.appendChild(createDiv);
        }
    })
};

function getUv() {

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
        

        // if statement to change the index color 
        if(uvi < 3) {

          $(uvIndex).css("color", "green")

        } else if (uvi > 3 || uvi < 8 ){

          $(uvIndex).css("color", "yellow");
          
        } else if (uvi > 8) {

          $(uvIndex).css("color", "red")

        };

    })
})
    
    
};


// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;

    
//   }

//   console.log(timeConverter(0));


let searchArray = [];

function renderTodos() {
    // This clears the search history log
    searchBoard.innerHTML = "";
    
    // this for loop will dynamically create li's 
    for (var i = 0; i < searchArray.length; i++) {
      var todo = searchArray[i];
  
      var li = document.createElement("li");
      // li.textContent = todo;
      li.setAttribute("data-index", i);
      li.setAttribute("id", 'cityLi');

      var button = document.createElement("button");
      button.textContent = todo;
      button.setAttribute("id", 'cityBtn');
  
      li.appendChild(button);
      searchBoard.appendChild(li);
    }
      
  }

  function init() {
    // TODO: What is the purpose of the following line of code?
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    // TODO: Describe the functionality of the following `if` statement.
    if (storedTodos !== null) {
        searchArray = storedTodos;
    }
    // TODO: Describe the purpose of the following line of code.
    renderTodos();
  }

  function storeTodos() {
    // TODO: Describe the purpose of the following line of code.
    localStorage.setItem("todos", JSON.stringify(searchArray));
  }


  // this button will use the userinput as a value to call the other functions 
  searchBtn.addEventListener("click", function() {

    //   see if i need this line of code when clicked button 
   

    var userInput = document.getElementById('citySearch').value;
console.log(userInput);
    // if they enter a blank text field, it will do nothing
    if (userInput === "") {
      return;
    }
   // Pushes the text into the array
   searchArray.push(userInput);

//    clears the input text field 
    citySearch.value = "";
   
   
    // TODO: What will happen when the following functions are called?
    storeTodos();
    renderTodos();

    // search();
    getUv();
    // the parameter is the key to this error issue 
    fetchWeather(userInput);
    mainWeather(userInput);
  });

  searchBoard.addEventListener("click", function(event) {
    var element = event.target;
    let oldCity = document.getElementById('cityBtn').textContent;
    console.log(oldCity);

    // when the condition is met, it removes the search history appended
    if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      searchArray.splice(index, 1);

      // invokes the following functions when this condition is met 
      storeTodos();
      renderTodos();

      fetchWeather(oldCity);
      mainWeather(oldCity);
      getUv()

    }
});
