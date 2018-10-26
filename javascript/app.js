    var giphys = ["Green Bay Packers", "New England Patriots", "Kansas City Chiefs",
        "San francisco 49ers", "Oakland Raiders", "Los Angeles Rams", "Cleveland Browns", "Seattle Seahawks",
        "Houston Texans"
    ];

    function renderButtons() {
      $("#giphy-view").empty();

        for (let i = 0; i < giphys.length; i++) {

          var a = $("<button>");

          a.addClass("giph");
      
          a.attr("data-team", giphys[i]);
      
          a.text(giphys[i]);
    
          $("#giphy-view").append(a);
        }
    };

    $("#add-giph").on("click", function(event) {

        event.preventDefault();

        var giphy = $("#giphy-input").val().trim();

        giphys.push(giphy);

        renderButtons();
    });

    $("#giphy-view").on("click", function(event) {

        event.preventDefault();

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9vTuLskEWKQPmQQvX6cL6ynEuxnBsLEb&q=" + giphys +
        "&limit=10&offset=0&rating=PG&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
    
        .then(function(response) {
            console.log(queryURL);

            console.log(response);
    
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var teamDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var teamImage = $("<img>");

                teamImage.attr("src", results[i].images.fixed_height.url);

                teamDiv.append(p);
                teamDiv.append(teamImage);

               $("#gif-dump").prepend(teamDiv);
            }
        });
    });

    renderButtons();