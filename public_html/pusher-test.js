/**
 * Created for kiteCrypt
 */

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('YOUR APP KEY', {
	encrypted: true
});

var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
	alert('An event was triggered with message: ' + data.message);
});

function sendMessage() {
	alert("This is your message.");
}
