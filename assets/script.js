var APIkey = "cd9a0bbdc14e65849d8ca690b227df87"
var savedCities = [];

//function to grab previous cities
function loadOld() {
  savedCities = JSON.parse(localStorage.getItem("history")) || [];
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
    previous.attr('id', this);
    $(".history").prepend(previous);
  });
    /// click event for old city in history
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
    $(".uv").text("UV-index : " + res[0].value);
    var rating = res[0].value;
    // change rating color
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
    var filteredList = res.list.filter(function(item){
      return item.dt_txt.indexOf("15:00:00") > -1;
    });
    populateHistory();
    $('h4').html("5 Day Forecast:")
    var mainIconID = res.list[0].weather[0].icon
    var mainIconUrl = "https://openweathermap.org/img/wn/" + mainIconID + "@2x.png";
    var mainIcon = $("<img>");
    mainIcon.attr("src", mainIconUrl).attr("style", "width: 200px;");
    $(".mainIcon").append(mainIcon);
    // console.log(mainIconID);
    var backGM = $("main")
    var backGB = $("body")
    var backGH = $("header")
    var clearD = './assets/sunshine.jpg';
    var clearN ='./assets/clearnight.jpg';
    var scattered = './assets/scat.jpg';
    var partlyC = './assets/prtcloud.jpg';
    var overcast = './assets/overcast.jpg'
    var rainD = './assets/rainy.jpg';
    var rainN = './assets/rainy-night.jpg';
    var thunder = './assets/thunder.jpg';
    var snow = './assets/snow.jpg';
    var fog = './assets/fog.jpeg';
    var spectrum = './assets/spectrum.jpg';
    switch (mainIconID) {
      case "01d":
        backGM.css('background-image', 'url(' + clearD + ')');
        backGB.css('background-image', 'url(' + clearD + ')');
        backGH.css('background-image', 'url(' + clearD + ')');
        break;
      case "01n":
        backGM.css('background-image', 'url(' + clearN + ')');
        backGB.css('background-image', 'url(' + clearN + ')');
        backGH.css('background-image', 'url(' + clearN + ')');
        break;
      case "02d":
        backGM.css('background-image', 'url(' + scattered + ')');
        backGB.css('background-image', 'url(' + scattered + ')');
        backGH.css('background-image', 'url(' + scattered + ')');
        break;
      case "02n":
        backGM.css('background-image', 'url(' + scattered + ')');
        backGB.css('background-image', 'url(' + scattered + ')');
        backGH.css('background-image', 'url(' + scattered + ')');
        break;  
      case "03d":
        backGM.css('background-image', 'url(' + partlyC + ')');
        backGB.css('background-image', 'url(' + partlyC + ')');
        backGH.css('background-image', 'url(' + partlyC + ')');
        break;
      case "03n":
        backGM.css('background-image', 'url(' + partlyC + ')');
        backGB.css('background-image', 'url(' + partlyC + ')');
        backGH.css('background-image', 'url(' + partlyC + ')');
        break;
      case "04d":
        backGM.css('background-image', 'url(' + overcast + ')');
        backGB.css('background-image', 'url(' + overcast + ')');
        backGH.css('background-image', 'url(' + overcast + ')');
        break;
      case "04n":
        backGM.css('background-image', 'url(' + overcast + ')');
        backGB.css('background-image', 'url(' + overcast + ')');
        backGH.css('background-image', 'url(' + overcast + ')');
        break;
      case "09d":
        backGM.css('background-image', 'url(' + rainD + ')');
        backGB.css('background-image', 'url(' + rainD + ')');
        backGH.css('background-image', 'url(' + rainD + ')');
        break;
      case "09n":
        backGM.css('background-image', 'url(' + rainN + ')');
        backGB.css('background-image', 'url(' + rainN + ')');
        backGH.css('background-image', 'url(' + rainN + ')');
      case "10d":
        backGM.css('background-image', 'url(' + rainD + ')');
        backGB.css('background-image', 'url(' + rainD + ')');
        backGH.css('background-image', 'url(' + rainD + ')');
        break;
      case "10n":
        backGM.css('background-image', 'url(' + rainN + ')');
        backGB.css('background-image', 'url(' + rainN + ')');
        backGH.css('background-image', 'url(' + rainN + ')');
        break;  
      case "11d":
        backGM.css('background-image', 'url(' + thunder + ')');
        backGB.css('background-image', 'url(' + thunder + ')');
        backGH.css('background-image', 'url(' + thunder + ')');
        break;
      case "11n":
        backGM.css('background-image', 'url(' + thunder + ')');
        backGB.css('background-image', 'url(' + thunder + ')');
        backGH.css('background-image', 'url(' + thunder + ')');
        break;  
      case "13d":
        backGM.css('background-image', 'url(' + snow + ')');
        backGB.css('background-image', 'url(' + snow + ')');
        backGH.css('background-image', 'url(' + snow + ')');
        break;  
      case "13n":
        backGM.css('background-image', 'url(' + snow + ')');
        backGB.css('background-image', 'url(' + snow + ')');
        backGH.css('background-image', 'url(' + snow + ')');
        break;  
      case "50d":
        backGM.css('background-image', 'url(' + fog + ')');
        backGB.css('background-image', 'url(' + fog + ')');
        backGH.css('background-image', 'url(' + fog + ')');
        break;
      case "50n":
        backGM.css('background-image', 'url(' + fog + ')');
        backGB.css('background-image', 'url(' + fog + ')');
        backGH.css('background-image', 'url(' + fog + ')');
        break;    
        default:
        backGM.css('background-image', 'url(' + spectrum + ')')
        backGB.css('background-image', 'url(' + spectrum + ')');
        backGH.css('background-image', 'url(' + spectrum + ')');  
    }
    
    $(".forecast").html("");
    for ( i = 0; i < filteredList.length; i++) {
      var temp = filteredList[i].main.temp;
      var iconId = filteredList[i].weather[0].icon;
      var humidity = filteredList[i].main.humidity;
      var date = new Date(filteredList[i].dt_txt);
      var day = date.getDate();
      var card = $("<div>").attr("class", "overall col card mb-3").attr("style","max-width: auto;");
      var cardHeader = $("<div>").attr("class", "card-header day").attr("id", "display");
      var cardBody = $("<div>").attr("class","card-body"); 
      var cardTitle = $("<h5>").attr("class", "card-title icon");
      var cardTextT = $("<p>").attr("class", "card-text temp");
      var cardTextH = $("<p>").attr("class", "card-text humid");
      
      cardHeader.append(cardBody);
      card.append(cardHeader);

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

      var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
      var icon = $("<img>");

      icon.attr("src", iconUrl);
      $(".mainIcon").append(icon);
      cardTitle.prepend(icon);
      cardBody.append(cardTitle);
      cardBody.append(cardTextT);
      cardBody.append(cardTextH);
      cardHeader.append(day);  
      cardTextT.text("Temp: " + Math.round(temp) + "°F");
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
    
    $(".clock").remove();
    callCurrent(city);

  }  
});
// ajax call function
function callCurrent(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + APIkey + "&units=imperial&q=" + city;
  $(".current-info").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(res) {
      // console.log(res);
      var getSpeed= (res.list[0].wind.speed);
      var wind = $("<div>").html("Wind Speed: "+ Math.round(getSpeed) + " mph");
      var getHumidity= (res.list[0].main.humidity);
      var humid = $("<div>").html("Humidity:  " + getHumidity + " %");
      var getTemp = (res.list[0].main.temp_max);
      var temp = $("<div>").html("Today's Hi Temp:  " + Math.round(getTemp) + "°F");
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
      if(!savedCities.includes(city)){
        savedCities.push(city);
        saveNew();
      // } else {
      //   var previous = $("<div>").html(city);
      //   $('.history').remove(previous)
      //   previous.addClass("col click");
      //   previous.attr('id', this);
      //   $(".history").prepend(previous);
      }


    });
    $('#input').val("");
};

