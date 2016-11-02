<?php
require('Pusher.php');

$options = array(
	'encrypted' => true
);
$pusher = new Pusher(
	'851db8e6f3fad558a9be',
	'7db06581169b419c5ae5',
	'265177',
	$options
);





$text = $_POST['message'];
$data['message'] = $text;
$pusher->trigger('notifications', 'new_notification', $data);




?>
