let currentContainer = document.getElementById('currentContainer');
let cardContainer = document.getElementById('cardContainer');
let uvIndex = document.getElementById('index');
let searchBoard = document.getElementById('search-history');
let searchBtn = document.getElementById('start-button');


// console.log(cityBtn);

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

    document.querySelector('.city').innerText = "Weather in " + name;
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
    
    // console.log(data.list.slice(1, 5));
    
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

// do i need this search function 
// this function uses the value from the userinput to be used in the fetchweather function 
// function search(){
//     this.mainWeather(document.querySelector('.search-bar').value);
//     this.fetchWeather(document.querySelector('.search-bar').value);
    
    
// };



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;

    
  }

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
