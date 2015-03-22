var main = function () {
    "use strict";
    // Create the 5 choices as buttons
    var $buttons_ary = [$("<input class='btn btn-success' type='submit' style='margin:20px' value='Rock'>"),
						$("<input class='btn btn-success' type='submit' style='margin:20px' value='Paper'>"),
						$("<input class='btn btn-success' type='submit' style='margin:20px' value='Scissors'>"),
						$("<input class='btn btn-success' type='submit' style='margin:20px' value='Lizard'>"),
						$("<input class='btn btn-success' type='submit' style='margin:20px' value='Spock'>")
	];

	// Evaluate each button, appending them to the DOM tree and
	// assigning a HTTP POST message when clicked
	$buttons_ary.forEach( function(element, index, array){
		$("div.buttons").append(element);
		// When user clicks one of the buttons
		element.on("click", function(){
			// Send message to server
			$.post("/play/" + element.val().toLowerCase(), function(response){
				// Determine what color the alert message should be
				var alertType;
				if (response.outcome === "win")
					alertType = 'alert alert-success';
				else if (response.outcome === "tie")
					alertType = 'alert alert-warning';
				else
					alertType = 'alert alert-danger';
				// Setting up the DOM elements
				var $clientMove = $("<p>").html("You played <b>" + element.val() + "</b>!");
				var $serverMove = $("<p>").html("Server plays <b>" + response.serverMove + "</b>!");
				var result = "You <b>" + response.outcome + "</b>!";
				var $alert = $("<p>").html("<div class='" + alertType + "' role='alert'>" + result);
				var $record = $("<p>").html("<div class='col-md-4'>Wins: " + response.wins + "</div>" +
											"<div class='col-md-4'>Ties: " + response.ties + "</div>" +
											"<div class='col-md-4'>Losses: " + response.losses + "</div>");

				// Clear previous DOM elements
				$("div.alert").empty();
				$("div.clientMove").empty();
				$("div.serverMove").empty();
				$("div.row").empty();
				// Append new DOM elements
				$("div.clientMove").append($clientMove);
				$("div.serverMove").append($serverMove);
				$("div.alert").append($alert);
				$("div.row").append($record);
				// Define CSS for bootstrap's grid system
				$("div.col-md-4").css({
					"background-color": "#d3d3d3",
					"border": "5px solid grey"
				});
			});
		});
	});
};
// Reduce alert's width so that it does not span the entire page
$("div.alert").css("width", "300px");

$(document).ready(main);