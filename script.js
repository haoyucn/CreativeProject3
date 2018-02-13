


$(document).ready(function() {
  var submitButton = $("#weatherSubmit");
  var submitButton2 = $("#searchSubmit");
  // var clickFunction = function(e) {
  //   e.preventDefault();
  //   console.log("You clicked me!");
  // }
  // submitButton.click(clickFunction);
});

$("#searchSubmit").click(function(e) {
  e.preventDefault();
  var value = $("#searchInput").val();
  console.log(value);
  var myurl = "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&intitle=" + value;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      var results = "";
      results += '<h1>Search result for ' + value + ' (total of ' + json.items.length + ' items)</h1>';
      console.log("DDD");
      console.log(json.items.length);
       for (var i = 0; i < json.items.length; i++) {
         results += "<h2><a href=" + json.items[i].link + ">" + json.items[i].title + "</a></h2>";
         results += "<p> Status : ";
         if (json.items[i].is_answered) {
           results += "answered </p>";
         }
         else {
           results += "not answered </p>";
         }
         results += "<p> views : " + json.items[i].view_count + "</p>";
        }
        console.log("vv");
      $("#searchResults").html(results);
      console.log(json);
    }
  })
});


//
$("#weatherSubmit").click(function(e) {
e.preventDefault();
var value = $("#weatherInput").val();
    console.log(value);

    var myurl= "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0cfb678c104d52c4b455ed6370da19a9";
    $.ajax({
        url : myurl,
        dataType : "json",
        success : function(json) {
          var results = "";
          results += '<h2>Weather in ' + json.name + "</h2>";
          for (var i=0; i<json.weather.length; i++) {
              results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
          }
          results += '<h2>' + json.main.temp + " &deg;F</h2>"
          results += "<p>";
          for (var i=0; i<json.weather.length; i++) {
              results += json.weather[i].description
              if (i !== json.weather.length - 1)
            results += ", "
          }
          results += "</p>";
          results += "<h2>Additional Information</h2>";
          results += '<p>Wind speed : ' + json.wind.speed + " knots</p>";
          results += '<p>Pressure : ' + json.main.pressure + "Pa</p>";
          results += '<p>Humidity : ' + json.main.humidity + "%</p>";
          $("#weatherResults").html(results);
          console.log(json);
        }
    });



});
//
