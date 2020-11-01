var APIkey = "cd9a0bbdc14e65849d8ca690b227df87"
var savedCities = [];
// console.log(savedCities);
// savedCities.reverse();
//function to grab previous cities
function loadOld() {
  savedCities = JSON.parse(localStorage.getItem("history")) || [];
  // console.log(savedCities);
  if (savedCities == ""){
    
  } else {
      callCurrent(savedCities[savedCities.length-1]);
  };
};
  loadOld();
  
//function to save new city to storage
function saveNew() {
  localStorage.setItem("history", JSON.stringify(savedCities));
};  

//function to display history
function populateHistory() {
  $(".history").html("");
  $.each(savedCities, function(){
    var previous = $("<div>").html(this);
    previous.addClass("col click");
    // console.log(this);
    previous.attr('id', this);
    // console.log(previous);
    $(".history").prepend(previous);
  });
    /// click event for old city
    $(".click").click(function(){
      var id = $(this).attr("id");
      var city = id;
      // console.log(city);
      $(".clock").remove();
      callCurrent(city);
    })
};

populateHistory();


//function to load UV information
function callUV(lat, lon) {
  var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon + "&cnt=1";
  $.ajax({ 
    url: uvIndexURL,
    method: "GET"
   }).then(function (res) {
    // console.log(res[0].value)
    $(".uv").text("UV-index : " + res[0].value);
    var rating = res[0].value;
    
    // console.log(rating);
    if (rating >= 11) {
        $(".uv").css('color', "purple");
    } else if (rating >= 8) {
        $(".uv").css('color', "red");
    } else if (rating >= 6) {
      $(".uv").css('color', "orange");
    } else if (rating >= 3){
      $(".uv").css('color', "yellow"); 
    } else {
      $(".uv").css('color', "green");
    }
  });
}

// function to load 5 day forecast
function forecast(city) {
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey + "&units=imperial";

  // ajax call to forecast api
  $.ajax({
    url: forecastURL,
    method: "GET"
  }).then(function (res) {
    // catches 5 different days at 3:00 instead of every 3 hours
    var filteredList = res.list.filter(function(item){
      return item.dt_txt.indexOf("15:00:00") > -1;
    });
    // console.log(res);
    var mainIconID = res.list[0].weather[0].icon
    var mainIconUrl = "https://openweathermap.org/img/wn/" + mainIconID + "@2x.png";
    var mainIcon = $("<img>");
    mainIcon.attr("src", mainIconUrl).attr("style", "width: 200px;");
    $(".mainIcon").append(mainIcon);
    
    $(".forecast").html("");
    for ( i = 0; i < filteredList.length; i++) {
      var temp = filteredList[i].main.temp;
      var iconId = filteredList[i].weather[0].icon;
      var humidity = filteredList[i].main.humidity;
      var date = new Date(filteredList[i].dt_txt);

      var day = date.getDate();
      // console.log(day);
      // var month = date.getMonth();
      // var year = date.getFullYear();

      // var formatedDate = `${month + 1}/${day}/${year}`;
      // Creating and storing a div tag
      var card = $("<div>").attr("class", "overall col card mb-3").attr("style","max-width: auto;");
      var cardHeader = $("<div>").attr("class", "card-header day").attr("id", "display");
      var cardBody = $("<div>").attr("class","card-body"); 
      var cardTitle = $("<h5>").attr("class", "card-title icon");
      var cardTextT = $("<p>").attr("class", "card-text temp");
      var cardTextH = $("<p>").attr("class", "card-text humid");
      
      cardHeader.append(cardBody);
      card.append(cardHeader);

      // Creating a paragraph tag with the response item
      // var day = $("<p>").text(formatedDate);

      switch (date.getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
           day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      // console.log(day);
      // Creating and storing an image tag

      var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
      // var iconUrl = "./assets/"

      var icon = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      icon.attr("src", iconUrl);
      $(".mainIcon").append(icon);
      cardTitle.prepend(icon);
      cardBody.append(cardTitle);
      cardBody.append(cardTextT);
      cardBody.append(cardTextH);
      cardHeader.append(day);  
      cardTextT.text("Temp: " + temp + "°F");
      cardTextH.text("Humidity: " + humidity + "%");

      $(".forecast").append(card);
    };
  });
}
//search button function
$('.btn').click(function(e){
  e.preventDefault();
  var city=$("#input").val().trim().toUpperCase();
  if  (city == null || city == "") {
    alert("Please Enter Name of City");
  } else { 
    $("#display").empty();
    // console.log(city);
    if(!savedCities.includes(city)){
      savedCities.push(city);
      saveNew();
    }
    populateHistory();
    $(".clock").remove();
    callCurrent(city);

  }  
});
// ajax call current function
function callCurrent(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIkey + "&units=imperial&q=" + city;
  $(".current-info").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(res) {
      // console.log(res);
      var getSpeed= (res.list[0].wind.speed);
      var wind = $("<div>").html("Wind Speed: "+ getSpeed + " mph");
      var getHumidity= (res.list[0].main.humidity);
      var humid = $("<div>").html("Humidity:  " + getHumidity + " %");
      var getTemp = (res.list[0].main.temp_max);
      var temp = $("<div>").html("Today's Hi Temp:  " + getTemp + "°F");
      var cityName = $("<h1>").html(city + ", "+(res.city.country));
      var uv = $("<div>");
      var getDate = new Date();
      var icon = $("<div>");

      var date = $("<div>").html(getDate);     
      setInterval(function(){
        var date = new Date();
        $('.clock').text(date);
    }, 1000);

      icon.addClass("mainIcon");
      $(".current-info").prepend(icon);
      cityName.addClass("cityName");
      $(".current-info").append(cityName);
      date.addClass("clock")
      $(".display").append(date);
      temp.addClass("temp");
      $(".current-info").append(temp);
      humid.addClass("humid");
      $(".current-info").append(humid);
      wind.addClass("wind");
      $(".current-info").append(wind);
      uv.addClass("uv");
      $(".current-info").append(uv);
      callUV(res.city.coord.lat, res.city.coord.lon);
      forecast(city);


    });
    $('#input').val("");
};

