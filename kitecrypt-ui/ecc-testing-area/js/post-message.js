
var username;
var usernameList = [];

var userStatus = "available";

/*
$('#assignUsername').on('click', function(event) {
	//event.preventDefault(); // To prevent following the link (optional)

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

});
*/


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

	// If the username is available,
	// then assign it to the user.
	getN("username").innerHTML = username;
	changeStatus();

}



function changeStatus() {

	var userStatusRadios = document.getElementsByName("userStatus");

	var i;
	var checkedRadio;

	for (i = 0; i < userStatusRadios.length; i++) {
		if (userStatusRadios[i].checked) {
			checkedRadio = i;
			break;
		}
	}


	userStatus = userStatusRadios[checkedRadio].value;

	// userStatus = userStatusRadios.value;

	switch (userStatus) {
		case "available":
			getN("presenceIconContainer").innerHTML = "<img id=\"presenceIcon\" src=\"img/availableIcon.png\">";
			break;
		case "unavailable":
			getN("presenceIconContainer").innerHTML = "<img id=\"presenceIcon\" src=\"img/unavailableIcon.png\">";
			break;
		case "donotdisturb":
			getN("presenceIconContainer").innerHTML = "<img id=\"presenceIcon\" src=\"img/donotdisturbIcon.png\">";
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
		var messageDataArray = messageData.split("-");
		var messageUser = messageDataArray[0];
		var messageType = messageDataArray[1];
		var messageContent = messageDataArray[2];

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


