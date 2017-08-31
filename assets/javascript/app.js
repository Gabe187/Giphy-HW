// Giphy API Key "e4de09e72e0a41bcaa9f9ff663fde797"



// GLOBAL VARIABLES

var topics = ["soccer", "football", "basketball", "cricket"];
var animatedGifURL = [];
var stillGifURL = [];




// FUNCTIONS

// Show the buttons

function renderButtons() {

// Deleting the buttons so they don't endlessly repeat
	$("#sport-buttons").empty();

	// Loop through the array of sports
	for (var i = 0; i < topics.length; i++) {

		// Creates a button
		var a = $("<button>");
		// Adding a class of movie to our button
		a.addClass("sport");
		// Adding a data-attribute
		a.attr("data-name", topics[i]);
		// Providing the initial button text
		a.text(topics[i]);
		// Adding the button to the buttons-view div
		$("#sport-buttons").append(a);
	}
};


// depending on the button that is pushed, go get the gif info for this sport.
function showGifs () {

	// Emptying the previous gifs so they don't endlessly repeat
	$("#gifs-go-here").empty();

	// Emptying the animated & still arrays so they don't get mixed up
	var animatedGifURL = [];
	var stillGifURL = [];

	var sport = $(this).attr("data-name");

	// Build the Giphy URL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=e4de09e72e0a41bcaa9f9ff663fde797&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	
	.done(function(response) {

		// Storing an array of GIF results in the results variable
		var results = response.data;
		console.log (results);

		// Looping over every result item
		for (var i = 0; i < results.length; i++) {

			// Only taking action if the photo has an appropriate rating
			// if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

			// Creating a div with the class "item"
			var gifDiv = $("<div class='item'>");

			// Storing the result item's rating
			var rating = results[i].rating;
			// console.log(rating)

			// Creating a paragraph tag with the result item's rating
			var p = $("<p>").text("Rating: " + rating);

			// Creating an image tag
			var gifImage = $("<img>");

			// Adding the class "gif" so we can click on the still image when we want to start/stop animation
			gifImage.addClass("gif");

			// Giving the image tag an src attribute of a proprty pulled off the
			// result item
			gifImage.attr("src", results[i].images.fixed_height_still.url);
			
			// Setting the attribute of the image to "still" so we can track whether the animation is stopped or started
			gifImage.attr("data-state", "still");

			// Setting the array-count attribute of the image to "i" so we can track what URL in the animatedGifURL to use (or stillGifURL)
			gifImage.attr("array-count", i);


			// This process is used to start & stop the gif animation
			gifImage.on("click", function() {

				// Capture whether the image is "animated" or "still" in the variable state.  We'll use this in the if statement below)
				var state = $(this).attr("data-state");
				var index = $(this).attr("array-count")
				console.log(index)

				// If the clicked image's state is still, update its src attribute to what its data-animate value is.
				// Then, set the image's data-state to animate
				// Else set src to the data-still value
				if (state === "still") {
					$(this).attr("src", animatedGifURL[index]);
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", stillGifURL[index]);
					$(this).attr("data-state", "still");
				}
			});

			// Appending the paragraph and personImage we created to the "gifDiv" div we created
			gifDiv.append(p);
			gifDiv.append(gifImage);

			// Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
			$("#gifs-go-here").append(gifDiv);

			stillGifURL.push(results[i].images.fixed_height_still.url);
			animatedGifURL.push(results[i].images.fixed_height.url);
			
		}

		// for (var i = 0; i < results.length; i++) {
		console.log(animatedGifURL);
		console.log(stillGifURL);
		// }

	});
};


// PROCESSES

// This process will add a new sport button for the user to select after the enter their preference in the input form
$("#add-sport").on("click", function(event) {
	event.preventDefault();

	// This captures & trims the input value from the textbox into the variable "sport"
	var sport = $("#sport-input").val().trim();

	// Adding the new sport into the array of "topics"
	topics.push(sport);
	console.log(topics)

	// Updates the buttons to include the newly entered button
	renderButtons();
});


// This process uses $(document).on since we'll have dynamically generated elements when the user adds their own buttons.  On click, this looks for the ".sport" class that we attributed to the button so that we know which sport to display.
$(document).on("click", ".sport", showGifs);


// // This process is used to start & stop the gif animation
// $(".gif").on("click", function() {

// 	// Capture whether the image is "animated" or "still" in the variable state.  We'll use this in the if statement below)
// 	var state = $(this).attr("data-state");
// 	var index = $(this).attr("array-count")
// 	console.log(index)

// 	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// 	// Then, set the image's data-state to animate
// 	// Else set src to the data-still value
// 	if (state === "still") {
// 		$(this).attr("src", animatedGifURL[index]);
// 		$(this).attr("data-state", "animate");
// 	} else {
// 		$(this).attr("src", stillGifURL[index]);
// 		$(this).attr("data-state", "still");
// 	}
// });


// Displays the original set of button options
renderButtons();











