


$(document).ready(function() {
  var submitButton2 = $("#searchSubmit");
});

$("#searchSubmit").click(function(e) {
  e.preventDefault();
  var value = $("#searchInput").val();
  console.log(value);
  var myurl = "https://itunes.apple.com/search?term=" + value;
  $.ajax({
    url : myurl,
    dataType : "json",
    success : function(json) {
      console.log(json);
      var results = "";
      results += '<h1>Search results for ' + value + ' (total of ' + json.resultCount + ' items)</h1><br>';
      console.log("DDD");
      results += "<div class=\"container\"><div class=\"row\">";
       for (var i = 0; i < json.results.length; i++) {

        var imageurl = json.results[i].artworkUrl100;

          results += "<div class=\"col-md-4\"><div class=\"colcontainer\">";

          results += "<div class=\"text-center\">";
          results += "<img class=\"rounded\" src="+ imageurl + "></div>";

          results += "<table class=\"table table-striped\">";

          var trackname = json.results[i].trackName;
          if (trackname.length > 25) {
            trackname = trackname.substring(0, 25);
            trackname += "...";
          }
          results += "<tbody><tr><td class=\"boldtd\">Title</td>";
          results += "<td>" + trackname + "</td></tr></tbody>";

         //
          results += "<tbody><tr><td class=\"boldtd\">Artist</td>";
          var artistname = json.results[i].artistName;
          if (artistname.length > 25) {
            artistname = artistname.substring(0, 25);
            artistname += "...";
          }
          results += "<td>" + artistname + "</td></tr></tbody>";



          results += "<tbody><tr><td class=\"boldtd\">Genre</td>";
          results += "<td>" + json.results[i].primaryGenreName + "</td></tr></tbody>";

          results += "<tbody><tr><td class=\"boldtd\">Release Date</td>";
          var releasdate = json.results[i].releaseDate;
          releasdate = releasdate.substring(0,10);
          results += "<td>" + releasdate + "</td></tr></tbody>";
          results += "</table>";

          results += "<h4 class=\"text-center\"><a href=" + json.results[i].trackViewUrl + " target=\"_blank\">visit itunes</a></h4>";

          results += "<p class=\"text-center\">Preview</p>";
          results += "<div class=\"text-center\">";
          results += "<audio controls>";
          results += "<source src=\"" + json.results[i].previewUrl + "\" type=\"audio/mpeg\" />";
          results += "<source src=\"" + json.results[i].previewUrl + "\" type=\"audio/ogg\" /></audio>";


          results += "</div></div></div>";
        }
        console.log(results);
        results += "</div></div>";
      $("#searchResults").html(results);
      console.log(json);
    }
  })
});
