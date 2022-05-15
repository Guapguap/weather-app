// global variables to link the following ids 

let currentContainer = document.getElementById('currentContainer');
let cardContainer = document.getElementById('cardContainer');
let uvIndex = document.getElementById('index');
let searchBoard = document.getElementById('search-history');
let searchBtn = document.getElementById('start-button');

$('.currentContainer').hide();
$('.card').hide()

// this is the api key for the weather api 
let apiKey = '4541b3868e8909ef309a6e0a539cf01f'

function mainWeather(city) {

  

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => {
  
    let {icon, description} = data.weather[0];
    let {temp, humidity} = data.main;
    let {speed} = data.wind;
    let {lat, lon} = data.coord;

    // creates the date for the current weather 
    var date = new Date(data.dt * 1000).toLocaleDateString('en-US');
    var dailyTitle = (`${city} ${date}`)

    // changes the text of all the current weather 
    document.querySelector('.city').innerText = "Weather in " + dailyTitle;
    document.querySelector('.icon').src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = temp + "°F";
    document.querySelector('.humid').innerText = "Humidity: " + humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + speed + "mph";

    $('.index').empty();

    // invokes the getUv function with the lat lon argument 
    getUv(lat, lon)

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

          //  appends all the elements to the div card 
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

// this function gets the uvIndex 
function getUv(latitude, longitude) {

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey)
    .then((res) => res.json())
    .then((data) =>{
      console.log(data);
        let uvi = data.current.uvi;
        
        //create a separate div card to contain the uvi with the first day
        let pEl = document.createElement('p');
        
        pEl.textContent = 'UV Index: ' + uvi;
      
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
}
    
// empty array to push the userInput 
let searchArray = [];

function renderTodos() {
    // This clears the search history log
    searchBoard.innerHTML = "";
    
    // this for loop will dynamically create li's 
    for (var i = 0; i < searchArray.length; i++) {
      var todo = searchArray[i];
  
      // creates a li 
      var li = document.createElement("li");
      
      // creates attributes to append to the li 
      li.setAttribute("data-index", i);
      li.setAttribute("id", 'cityLi');

      // creates buttons 
      var button = document.createElement("button");

      // set the text of the button to be equal to the setItem 
      button.textContent = todo;
      button.setAttribute("id", 'cityBtn');
  
      // appends the following elements to each other 
      li.appendChild(button);
      searchBoard.appendChild(li);
    }
      
  }


  function init() {
    
    var storedTodos = JSON.parse(localStorage.getItem("todos"));
    
    // sets the array to get the parsed stored items 
    if (storedTodos !== null) {
        searchArray = storedTodos;
    }
    // invokes the following function
    renderTodos();
  }

  // sets the array into a string in localstorage 
  function storeTodos() {
    
    localStorage.setItem("todos", JSON.stringify(searchArray));
  }


  // this button will use the userinput as a value to call the other functions 
  searchBtn.addEventListener("click", function() {

    $('.currentContainer').show();
    $('.card').show()
    var userInput = document.getElementById('citySearch').value;

    // if they enter a blank text field, it will do nothing
    if (userInput === "") {
      return;
    }
   // Pushes the text into the array
   searchArray.push(userInput);

//    clears the input text field 
    citySearch.value = "";
   
   
    // invoking all these functions 
    storeTodos();
    renderTodos();
    getUv();
    fetchWeather(userInput);
    mainWeather(userInput);
  });

  // when the items from the search history is clicked, the following function performs 
  searchBoard.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    let oldCity = document.getElementById('cityBtn').textContent;
    console.log(oldCity);

    // when the condition is met, it removes the search history appended
    if (element.matches("button") === true) {
      event.preventDefault();
      var index = element.parentElement.getAttribute("data-index");
      searchArray.splice(index, 1);

      // invokes the following functions when this condition is met 
      // storeTodos and renderTodos clears the text in the userinput field
      storeTodos();
      renderTodos();

      fetchWeather(element.textContent);
      mainWeather(element.textContent);
      getUv()

    }
});
