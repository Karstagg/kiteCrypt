
var username;
var usernameList = [];

var friendName;
var friendList = [];
var chatFriend;

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
	changeUserStatus();

}


function recordFriend() {

	friendName = getN("friendInput").value;

	// Check that a friend's username was entered.
	if (friendName == "") {
		alert("Please enter a friend's username.");
		return;
	}

	// Check the friend's username list, to verify
	// that the friend's username has not already
	// been added.
	var numberOfFriends = friendList.length;
	var i;

	for (i = 0; i < numberOfFriends; i++) {
		if (friendName == friendList[i]) {
			alert("\"" + friendName + "\" has already been recorded.");
			return;
		}
	}

	// If the friend's username has not already been
	// recorded, add it to the list of friends.
	friendList.push(friendName);
	numberOfFriends = friendList.length;

	var friendListHtml = "";

	for (i = 0; i < numberOfFriends; i++) {
		friendListHtml = friendListHtml + "<span class=\"friendPresenceIconContainer\" id=\"friendPresenceIconContainer" + i + "\"></span>";
		friendListHtml = friendListHtml + "<span class=\"friendName\" id=\"friendName" + i + "\">" + friendList[i] + "</span><br>";
	}

	// var friendListHtmlOnPage = getN("friendsList").innerHTML;
	getN("friendList").innerHTML = friendListHtml;

}


function changeUserStatus() {

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

	switch (userStatus) {
		case "available":
			getN("presenceIconContainer").innerHTML = "<img class=\"presenceIcon\" src=\"img/availableIcon.png\">";
			break;
		case "unavailable":
			getN("presenceIconContainer").innerHTML = "<img class=\"presenceIcon\" src=\"img/unavailableIcon.png\">";
			break;
		case "donotdisturb":
			getN("presenceIconContainer").innerHTML = "<img class=\"presenceIcon\" src=\"img/donotdisturbIcon.png\">";
			break;
	}

	// Send out user's status for their presence icon.
	sendStatus();

}


// Send out user's status for their presence icon once evey minute.
setInterval( sendStatus(), 60000);

function sendStatus() {

	getN("statusFrame").contentWindow.postMessage(username + "-status-" + userStatus, "https://bootcamp-coders.cnm.edu");

}


// Handle messages
//window.onmessage = messageHandler(event);
window.addEventListener("message", messageHandler, true);

function messageHandler(event) {

	if (event.origin == "https://bootcamp-coders.cnm.edu") {

		var messageData = event.data;
		var messageDataArray = messageData.split("-");
		var messageUsername = messageDataArray[0];
		var messageType = messageDataArray[1];
		var messageContent = messageDataArray[2];

		// Handle status messages.
		if (messageUsername != username && messageType == "status") {

			// Check the friend's list for the username.
			var numberOfFriends = friendList.length;
			var i;

			for (i = 0; i < numberOfFriends; i++) {

				if (messageUsername == friendList[i]) {

					// If they are a friend, then update their status,
					// otherwise, ignore the message.

					switch (messageContent) {
						case "available":
							getN("friendPresenceIconContainer" + i).innerHTML = "<img class=\"presenceIcon\" src=\"img/availableIcon.png\">";
							break;
						case "unavailable":
							getN("friendPresenceIconContainer" + i).innerHTML = "<img class=\"presenceIcon\" src=\"img/unavailableIcon.png\">";
							break;
						case "donotdisturb":
							getN("friendPresenceIconContainer" + i).innerHTML = "<img class=\"presenceIcon\" src=\"img/donotdisturbIcon.png\">";
							break;
					}


				}
			}

		}

		// Handle ________________.

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


