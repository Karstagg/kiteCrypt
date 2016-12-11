<?php
//Take in the username on the post. Get the user's profile by username. If it exists, send the salt back in the reply with status 200. If it doesn't exist, send error message status 401.
require_once dirname(__DIR__, 3) . "/php/class/autoloader.php";
require_once dirname(__DIR__, 3) . "/php/lib/xsrf.php";
require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\KiteCrypt\Profile;


/**
 * api for the Salt class
 *
 * @author Jonathan Guzman jguzman41@cnm.edu
 **/

//verify the session, start if not active
if(session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
}

//prepare an empty reply
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;


$exceptionMessage = "Forever alone :'(";
$exceptionCode = 401;

try {
	//grab the mySQL connection
	$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/kitecrypt.ini");

	//determine which HTTP method was used
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];


	// handle GET request//
	if($method === "GET") {
		//set XSRF cookie
		setXsrfCookie("/");

	} else if($method === "POST") {

		verifyXsrf();
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);
		if(empty($requestObject->username) === true) {
			throw(new \InvalidArgumentException ($exceptionMessage, $exceptionCode));
		}
		else {
			//$newFriends = new Profile($profileUserName);
		}

	} else if($method === "DELETE") {
		verifyXsrf();
	} else {
		throw (new InvalidArgumentException($exceptionMessage, $exceptionCode));
	}

	// update reply with exception information
} catch(Exception $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
	$reply->trace = $exception->getTrace();
} catch(TypeError $typeError) {
	$reply->status = $typeError->getCode();
	$reply->message = $typeError->getMessage();
}

header("Content-type: application/json");
if($reply->data === null) {
	unset($reply->data);
}

// encode and return reply to front end caller
echo json_encode($reply);