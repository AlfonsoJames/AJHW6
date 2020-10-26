// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=cd9a0bbdc14e65849d8ca690b227df87&q="+ city

// onclick ajax query button

  $('.btn').click(function(){
    var town=$('#city').val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=cd9a0bbdc14e65849d8ca690b227df87&q="+ town;   
      $(function() {
        console.log(town)
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(res) { 
          if  (typeof town !== null) {
// store search city and generate history div ;
          var history=$("<div>").text(res.city.name);
          if (window.history){
          $(history).addClass("col history");
          $("#sidebar").append(history);
          var allCities = [];
          var key = "History";
          // var value = res.city.name
          var newCity = (res.city.name);
          var prevCities = JSON.parse(localStorage.getItem("History"));
          console.log(prevCities)
          if (prevCities == null) {
          allCities.push(newCity);
          } else { 
            $(prevCities[0]).each(function(){
          allCities.push(prevCities);})
          console.log(allCities);
          };
          localStorage.setItem(key, JSON.stringify(allCities));
          
          $('#city').empty();
// populate main display
          // var temp= ;
          // var humid=;
          // var wind=;
          // var uv=;
          }
        }
        })
      })
  });    


//

// get last searched city info
var storedCities = JSON.parse(localStorage.getItem("cities"));