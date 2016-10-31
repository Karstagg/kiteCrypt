/**
 * Created for kiteCrypt
 */

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('851db8e6f3fad558a9be', {
	encrypted: true
});

var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
	alert('An event was triggered with message: ' + data.message);
});

function sendMessage() {
	alert("This is your message...it's not sent from Pusher, though.");
}
