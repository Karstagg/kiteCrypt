
var username;
var usernameList = [];

var userStatus = "available";


function assignUsername() {

	username = getN("usernameInput").value;

	// Check that a username was entered.
	if (username == "") {
		alert("Please enter a username.");
		return;
	}

	// Check the username list, to verify
	// that the username is available.
	var numberOfUsers = usernameList.length;
	var i;

	for (i = 0; i < numberOfUsers; i++) {
		if (username == usernameList[i]) {
			alert("\"" + username + "\" is already taken.");
			return;
		}
	}

	// If the username is available, then
	// assign it to the user.
	getN("username").innerHTML = username;
	changeStatus();

}


function changeStatus() {

	userStatus = getN("userStatus").value;

	switch (userStatus) {
		case "available":
			getN("presenceIcon").innerHTML = "<img id=\"presenceIcon\" src=\"availableIcon.png\">";
			break;
		case "unavailable":
			getN("presenceIcon").innerHTML = "<img id=\"presenceIcon\" src=\"unavailableIcon.png\">";
			break;
		case "donotdisturb":
			getN("presenceIcon").innerHTML = "<img id=\"presenceIcon\" src=\"donotdisturbIcon.png\">";
			break;
	}

	// Send out user's status for their presence icon.
	sendStatus();

}


// Send out user's status for their presence icon once evey minute.
setInterval( sendStatus(), 60000);

function sendStatus() {

	getN("statusFrame").contentWindow.postMessage(username + "-status-" + userStatus, "http://bootcamp-coders.cnm.edu");

}


// Handle messages
window.onmessage = messageHandler(event);

function messageHandler(event) {

	if (event.origin == "http://bootcamp-coders.cnm.edu") {

		var messageData = event.data;

		// Handle status messages.
		if (messageData.search("-status-") ) {

		}

		// Handle

	}

}




/*
 ----------------------------------------------------------------------------
 Other Functions
 ----------------------------------------------------------------------------
 */


function getN(n) {

	return typeof n == 'object' ? n : document.getElementById(n);

}


