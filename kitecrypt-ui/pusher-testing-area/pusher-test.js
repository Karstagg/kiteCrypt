/**
 * Created for kiteCrypt
 */

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('56185da42a6c0488ff26', {
	encrypted: true
});

var notificationsChannel = pusher.subscribe('notifications');

notificationsChannel.bind('new_notification', function(notification) {
	var message = notification.message;
	$('div.notification').text(message);
});

function sendMessage(input) {
	alert(input);
}

var notificationsChannel = pusher.subscribe('notifications');

notificationsChannel.bind('new_notification', function(notification) {
	var message = notification.message;
	$('div.notification').text(message);
});

function sendNotification() {

}


