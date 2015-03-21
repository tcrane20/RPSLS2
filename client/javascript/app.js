var main = function () {
    "use strict";
    // Create the 5 choices as buttons
    var $buttons_ary = [$("<button>").text("Rock"),
						$("<button>").text("Paper"),
						$("<button>").text("Scissors"),
						$("<button>").text("Lizard"),
						$("<button>").text("Spock")];

	// Evaluate each button, appending them to the DOM tree and
	// assigning a HTTP POST message when clicked
	$buttons_ary.forEach( function(element, index, array){
		$("div.buttons").append(element);

		element.on("click", function(){
			$.post("/play/" + element.text().toLowerCase(), function(response){
				var $clientMove = $("<p>").html("You played <b>" + element.text() + "</b>!");
				var $serverMove = $("<p>").html("Server plays <b>" + response.serverMove + "</b>!");
				var $results1 = $("<p>").html("You <b>" + response.outcome + "</b>!");
				var $results2 = $("<div.win>").text("Wins: " + response.wins);
				var $results3 = $("<div.tie>").text("Ties: " + response.ties);
				var $results4 = $("<div.lose>").text("Losses: " + response.losses);

				// This will remove the HTML tags from the DOM tree
				$("div.win").remove();
				$("div.tie").remove();
				$("div.lose").remove();

				$("div.clientMove").empty();
				$("div.serverMove").empty();
				$("div.results").empty();

				$("div.clientMove").append($clientMove);
				$("div.serverMove").append($serverMove);
				$("div.results").append($results1, $results2, $results3, $results4);
			});
		});
	});

	

};

$(document).ready(main);