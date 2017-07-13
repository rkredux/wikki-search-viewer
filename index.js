$(document).ready(function () {
  
  
  console.log("The document has loaded"); 

  let searchQuery, api, data;


  $("#search-btn").click(function () {
    console.log("search button was clicked"); 
    $(".search-result").empty(); // clears previous results
    searchQuery = $("#search-query").val();
    api = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchQuery + "&format=json&" + "&origin=*";

    $.getJSON(api, function(data) {

     
      const queryTitle = data[1], 
            queryInfo = data[2], 
            queryLink = data[3];


      for(var i = 0; i < data[1].length; i++) {
        $(".search-result").append("<li> <a href = " + queryLink[i] + " target='_blank'>" + queryTitle[i] + "</a> <p>" + queryInfo[i] + "</p> </li>");
      }


      if (data[1].length === 0 && data[2].length === 0 && data[3].length === 0) {
        $(".search-result").append("<li class='no-result'><p>Oops, no results!</p></li>");
      }
    })

 
    $(".title").animate({"margin-top":"20px","margin-bottom":"20px"});

    var mq = window.matchMedia("(min-width: 575px)");
    if (mq) {
      $(".search-box").animate({"margin-top":"1em","margin-bottom":"1em"});
    }
  });


  $("#search-query").keypress(function (e){
      if (e.which === 13) {
          e.preventDefault();
          $("#search-btn").click();
      };
    })
});


function randomArticle() {
  console.log("random article button was clicked"); 
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
};

