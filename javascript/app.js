    var giphys = ["Green Bay Packers", "New England Patriots", "Kansas City Chiefs",
        "San francisco 49ers", "Oakland Raiders", "Los Angeles Rams", "Cleveland Browns", "Seattle Seahawks",
        "Houston Texans"
    ];

    function renderButtons() {
      $("#giphy-view").empty();

        for (let i = 0; i < giphys.length; i++) {

          var button = $("<button>");

          button.addClass("giph");
      
          button.attr("data-sports", giphys[i]);
      
          button.text(giphys[i]);
    
          $("#giphy-view").append(button);
          
        }
    };

    $("#add-giph").on("click", function(event) {

        event.preventDefault();

        var giphy = $("#giphy-input").val().trim();

        giphys.push(giphy);

        renderButtons();
    });

    $(document.body).on("click", ".toggle-giph", function() {

        var state = $(this).attr("data-state");
        
        if (state == "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          state = $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          state = $(this).attr("data-state", "still");
        }
      
      });

    $(document.body).on("click", ".giph", function() {

        var sports = $(this).attr("data-sports");

        event.preventDefault();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=9vTuLskEWKQPmQQvX6cL6ynEuxnBsLEb&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
    
        .then(function(response) {

            console.log(response);
    
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var giphStill = "https://media1.giphy.com/media/" + results[i].id + "/200_s.gif";
                var giphAnimate = "https://media1.giphy.com/media/" + results[i].id + "/200.gif";

                var teamDiv = $("<div>");

                var p = $("<p>");
                p.text("Rating: " + results[i].rating);

                var teamImage = $("<img>");
                teamImage.attr ({
                    src: giphStill,
                    "data-still": giphStill,
                    "data-animate": giphAnimate,
                    "data-state": "still",
                    class: "toggle-giph"
                });

                teamImage.attr("src", results[i].images.fixed_height.url);

                teamDiv.append(p);
                teamDiv.append(teamImage);

               $("#gif-dump").prepend(teamDiv);
            }
         
            }
        });
    });

    renderButtons();