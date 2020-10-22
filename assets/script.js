// $("button").on("click", function() {
    
    // var city = $(this).attr("data-person");
    var city ="Orlando";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=cd9a0bbdc14e65849d8ca690b227df87";
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
    
// })