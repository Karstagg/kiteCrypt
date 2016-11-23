<!--Take in the username on the post. Get the user's profile by username. If it exists, send the salt back in the reply with status 200. If it doesn't exist, send error message status 401. -->
<?php

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

$exceptionMessage = "Username or Password invalid";
$exceptionCode = 401;

try {
	//grab the mySQL connection
	$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/kitecrypt.ini");

	//determine which HTTP method was used
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];


	// handle GET request//
	if($method === "GET") {
		//set XSRF cookie
		setXsrfCookie();
		throw(new \BadMethodCallException($exceptionMessage, $exceptionCode));

	} else if($method === "POST") {

		verifyXsrf();
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);

		if(newUser === true) {
			$salt = bin2hex(random_bytes(16));
		} else {

			//make sure tweet content is available (required field)
			if(empty($requestObject->username) === true) {
				throw(new \InvalidArgumentException ($exceptionMessage, $exceptionCode));
			}


			//perform the actual post - POST only, GET requests put username in the URL. POST requests are not shareable//

			$profile = Profile::getProfileByUserName($pdo, $requestObject->username);
			if($profile === null) {
				throw (new \InvalidArgumentException($exceptionMessage, $exceptionCode));
			}
			$reply->data = $profile->getProfilePasswordSalt();
		}

	} else {
		throw (new InvalidArgumentException($exceptionMessage, $exceptionCode));
	}

	// update reply with exception information
} catch(Exception $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
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