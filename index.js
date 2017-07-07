$(document).ready(function () {

  //Default variables
  var searchQuery, api, data;

  //On Search button click
  $("#search-btn").click(function () {

    $(".search-result").empty(); // clears previous results
    searchQuery = $("#search-query").val();
    api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchQuery + "&format=json&" + "&origin=*";

    $.getJSON(api, function(data) {

      //Storing Wikipedia API data which returns arrays inside array
      var queryTitle = data[1];
      var queryInfo = data[2];
      var queryLink = data[3];

      //Iritating through arrays
      for(var i = 0; i < data[1].length; i++) {
        $(".search-result").append("<li> <a href = " + queryLink[i] + " target='_blank'>" + queryTitle[i] + "</a> <p>" + queryInfo[i] + "</p> </li>");
      }

      //Returns No results
      if (data[1].length === 0 && data[2].length === 0 && data[3].length === 0) {
        $(".search-result").append("<li class='no-result'><p>Oops, no results!</p></li>");
      }
    })

    //Push heading up after clicing Search
    $(".title").animate({"margin-top":"20px","margin-bottom":"20px"});
    //On smaller devices
    var mq = window.matchMedia("(min-width: 575px)");
    if (mq) {
      $(".search-box").animate({"margin-top":"1em","margin-bottom":"1em"});
    }
  });

  //Using Enter key for searching
  $("#search-query").keypress(function (e){
      if (e.which === 13) {
          e.preventDefault();
          $("#search-btn").click();
      };
    })
});

//Random Article button
function randomArticle() {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
};

