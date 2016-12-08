<?php
/*<!--Inputs are going to be username, publicKeyX, publicKeyY. Logic is to look up profile by username, compare keys and make sure both keys match, if there is any discrepancy, throw them out. Profile object (including Keys) are going to be in the session. Need to getProfilePublicKeyx, getProfilePublicKeyY-->*/
require_once dirname(__DIR__, 3) . "/php/class/autoloader.php";
require_once dirname(__DIR__, 3) . "/php/lib/xsrf.php";
require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\KiteCrypt\Profile;


/**
 * RESTFUL api for the Profile class
 *
 * @author Jonathan Guzman <jguzman41@cnm.edu>
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

	if($method === "POST") {

		//set XSRF cookie
//		setXsrfCookie();
//		verifyXsrf();

		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);
		/*-----checking and sanitizing profileUserName, profilePassword--------------*/
		//check that email and password fields are not empty, and sanitize that input

		if(empty($requestObject->username) === true) {
			throw(new \InvalidArgumentException("empty user field", $exceptionCode));
		} else {
			$profileUserName = filter_var($requestObject->profileUserName, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		}

		if(empty($requestObject->profilePublicKeyX) === true) {
			throw(new \InvalidArgumentException("no x key", $exceptionCode));
		} else {
			$profilePublicKeyXFromUser = filter_var($requestObject->profilePublicKeyX, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		}

		if(empty($requestObject->profilePublicKeyY) === true) {
			throw(new \InvalidArgumentException("no y key", $exceptionCode));
		} else {
			$profilePublicKeyYFromUser = filter_var($requestObject->profilePublicKeyY, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		}


		//retrieve the data for profileUserName


		$profileFromDatabase = Profile::getProfileByUserName($pdo, $profileUserName);

		$profileXFromDatabase = $profileFromDatabase->getProfilePublicKeyX();

		$profileYFromDatabase = $profileFromDatabase->getProfilePublicKeyY();

		if($profileXFromDatabase === null || $profileYFromDatabase === null) {
			throw(new \InvalidArgumentException("no profile match", $exceptionCode));
		}

		if($profilePublicKeyXFromUser !== $profileXFromDatabase || $profilePublicKeyYFromUser !== $profileYFromDatabase) {
			throw(new \InvalidArgumentException("no key x match", $exceptionCode));
		}

//		If all username, public Key x, and public key Y match, send them to the chat page with friends list


	} else {
		throw (new InvalidArgumentException("no post", $exceptionCode));
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
