<?php
require('Pusher.php');

$options = array(
	'encrypted' => true
);
$pusher = new Pusher(
	'YOUR APP KEY',
        'YOUR APP SECRET',
        'YOUR APP ID',
	$options
);

$data['message'] = 'hello world';
$pusher->trigger('test_channel', 'my_event', $data);
?>
