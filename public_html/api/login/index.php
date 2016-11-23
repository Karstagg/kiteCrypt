<!--Inputs are going to be username, publicKeyX, publicKeyY. Logic is to look up profile by username, compare keys and make sure both keys match, if there is any discrepency, throw them out. Profile object (including Keys) are going to be in the session. Need to getProfilePublicKeyx, getProfilePublicKeyY-->

<?php

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

try {
	//grab the mySQL connection
	$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/kitecrypt.ini");

	//determine which HTTP method was used
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];

	if($method === "POST") {
//		todo why a post? because its a temporary?
		//set XSRF cookie
//		setXsrfCookie(); //TODO do i set this here?
//		verifyXsrf();

		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);
		/*-----checking and sanitizing profileUserName, profilePassword--------------*/
		//check that email and password fields are not empty, and sanitize that input

		if(empty($requestObject->profileUserName) === true) {
			throw(new \InvalidArgumentException("Please enter your Username", 405));
		} else {
			$profileUserName = filter_var($requestObject->profileUserName, FILTER_SANITIZE_EMAIL);
		}

		//checking the password field for user input

		if(empty($requestObject->profilePassword) === true) {

			//TODO profile password, do i also have confirm profile password?//

			throw(new \InvalidArgumentException("Please enter your password", 405));
		} else {
			$password = filter_input(INPUT_POST, $requestObject->profilePassword, FILTER_SANITIZE_STRING);
		}


		//retrieve the data for profileUserName

		$profile = Profile::getProfileByProfileUserName($pdo, $profileUserName);
			$profile->getProfilePasswordSalt;

		$salt=$profile->getProfilePasswordSalt;


//		randomized salt needs to be sent to the front end. Password that is entered by user is salted and converted into two public keys (x, y). Public keys will be stored in the session. Password salt needs to be stored in the session as well.
		//use profile salt to hash password

		$confirmHash = hash_pbkdf2("sha512", $requestObject->profilePassword, $salt, 262144);

		//TODO is this the correct requestObject to be put in here?
		//todo is this how i check for profile activation token? on the test i get this error, but thats because in the database no PAT have been set to null

		$profile->getProfileActivationToken();
		if($profile->getProfileActivationToken() !== null){
			throw(new InvalidArgumentException("your account has not been activated yet", 404));
		}

		//matches hashes
		//put profile into session

		if($confirmPublicKey === $profile->getPublicKey()) {
			$_SESSION["profile"] = $profile;

			$reply->status = 200;
			$reply->message = "Successfully logged in";
		} else {
			throw(new InvalidArgumentException("email or password is invalid", 401));
		}
	} else {
		throw(new InvalidArgumentException("Invalid HTTP method request"));
	}
	//catch(Exception $exception){
}catch(Exception $exception){
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
	$reply->trace = $exception->getTraceAsString();
}catch(TypeError $typeError){
	$reply->status = $typeError->getCode();
	$reply->message = $typeError->getMessage();
}
header("Content-type: application/json");
if($reply->data === null){
	unset($reply->data);
}
//encode and return reply to front end caller
echo json_encode($reply);
