<?php
require('Pusher.php');

$options = array(
	'encrypted' => true
);
$pusher = new Pusher(
	'56185da42a6c0488ff26',
	'74c183dcbcd5c95c33f2',
	'265174',
	$options
);
$data['message'] = 'hello world';

$pusher->trigger('notifications', 'new_notification', $data);

?>
