//GIF Reactor scripts

// Rendering GIF topic buttons

    	var reax = ["wink", "nod", "laugh", "cringe", "gasp", "cry", "scream", "smile", "throw up in mouth"];
	      	function renderButtons() {
		        $("#buttons-div").empty();
		        for (var i = 0; i < reax.length; i++) {
		        var a = $("<button>");
		        a.addClass("GIF-button");
		        a.attr("data-button", reax[i]);
		        a.text(reax[i]);
		        $("#buttons-div").append(a); 
	        }
      	}


// Cick functionality to add new GIF topic function

	    $("#add-GIF").on("click", function(event) {
	        event.preventDefault();
	        var GIF = $("#GIF-input").val().trim();
	        reax.push(GIF);
	        renderButtons();
	    });


// Button click functionality w/ Giphy API call to add data to image and append rating as well

	    $(document).on("click", ".GIF-button", function getGIFs(){

	        $("#GIF-div").empty();
	        var queryGIF = $(this).attr("data-button");
	        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryGIF + "&limit=10&api_key=dc6zaTOxFJmzC";
	        $.ajax({
	          url: queryURL,
	          method: "GET"
	        })

	        .done(function(response) {

		        for (var j = 0; j < 10; j++) {
		         	var b = $("<img>");
		         	b.attr("src", response.data[j].images.fixed_height_still.url);
		          	b.addClass("GIF");
		          	b.attr("data-still", response.data[j].images.fixed_height_still.url);
		          	b.attr("data-motion", response.data[j].images.fixed_height.url);
		          	b.attr("data-current", "still");
		          	$("#GIF-div").append(b);
		          	var ratedValue = response.data[j].rating;
			          $("#GIF-div").append("<div> Rated: " + ratedValue + "</div>")
	       		}
		    })
	    });

// Click listener to change image from still to GIF and vice versa depending on current status (still or moving)

		$(document).on("click", ".GIF", function clickGIF(){

			var clickedStatus = $(this).attr("data-current");
			var stillURL = $(this).attr("data-still");
			var motionURL = $(this).attr("data-motion");

			if (clickedStatus === "still") {
				$(this).attr("src", motionURL);
				$(this).attr("data-current", "moving")
			} else if (clickedStatus === "moving") {
				$(this).attr("src", stillURL);
				$(this).attr("data-current", "still");
			}

		});


// Calling the renderButtons function to display the intial buttons

      	renderButtons();