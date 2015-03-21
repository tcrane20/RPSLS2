var http = require('http'),
    express = require('express'),
    app = express();

// Loads index.html inside /client folder
app.use(express.static(__dirname + "/client"));
// Start the server
http.createServer(app).listen(3000);
// JSON object
var record = {serverMove: "Rock", outcome: "tie", wins: 0, losses: 0, ties: 0};

// When client clicks a button, it is interpreted in here
app.post("/play/:move", function (req, res) {
	// Get the player's choice from POST
	var move = req.params.move;
	var serverMove = Math.floor(Math.random() * 5);
	switch (serverMove) {
		case 0:
			record.serverMove = "Rock";
			break;
		case 1:
			record.serverMove = "Paper";
			break;
		case 2:
			record.serverMove = "Scissors";
			break;
		case 3:
			record.serverMove = "Lizard";
			break;
		case 4:
			record.serverMove = "Spock";
			break;
	}

	if (move == "rock") {
		if (serverMove === 2 || serverMove === 3) {
			record.wins++;
			record.outcome = "win";
		} else if (serverMove === 1 || serverMove === 4) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
	} else if (move == "paper") {
		if (serverMove === 0 || serverMove === 4) {
			record.wins++;
			record.outcome = "win";
		} else if (serverMove === 2 || serverMove === 3) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
	} else if (move == "scissors") {
		if (serverMove === 1 || serverMove === 3) {
			record.wins++;
			record.outcome = "win";
		} else if (serverMove === 0 || serverMove === 4) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
	} else if (move == "lizard") {
		if (serverMove === 1 || serverMove === 4) {
			record.wins++;
			record.outcome = "win";
		} else if (serverMove === 0 || serverMove === 2) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
	} else if (move == "spock") {
		if (serverMove === 0 || serverMove === 2) {
			record.wins++;
			record.outcome = "win";
		} else if (serverMove === 1 || serverMove === 3) {
			record.losses++;
			record.outcome = "lose";
		} else {
			record.ties++;
			record.outcome = "tie";
		}
	}
	res.json(record);
});

console.log("Server running on port 3000");