<?php

require_once "/Users/Jonathan/Desktop/Bootcamp/Git/kiteCrypt/php/class/autoloader.php";
require_once "/lib/xsrf.php";
require_once("/etc/apache2/capstone-mysql/kitecrypt.ini");

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

	//sanitize input
	$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
	$profileId = filter_input(INPUT_GET, "profileId", FILTER_VALIDATE_INT);
	$username = filter_input(INPUT_GET, "username", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

	//make sure the id is valid for methods that require it
	if(($method === "DELETE" || $method === "PUT") && (empty($id) === true || $id < 0)) {
		throw(new InvalidArgumentException("id cannot be empty or negative", 405));
	}


	// handle GET request - if id is present, that profile is returned, otherwise all profiles are returned
	if($method === "GET") {
		//set XSRF cookie
		setXsrfCookie();

		//get a specific profile or all profiles and update reply
		if(empty($id) === false) {
			$profile = Profile::getProfileByProfileId($pdo, $id);
			if($profile !== null) {
				$reply->data = $profile;
			}
		} else if(empty($profileId) === false) {
			$profiles = Profile::getProfileByProfileProfileId($pdo, $profileId);
			if($profiles !== null) {
				$reply->data = $profiles;
			}
		} else if(empty($username) === false) {
			$profiles = Profile::getProfileByProfileUsername($pdo, $username);
			if($profiles !== null) {
				$reply->data = $profiles;
			}
		} else {
			$profiles = Profile::getAllProfiles($pdo);
			if($profiles !== null) {
				$reply->data = $profiles;
			}
		}
	} else if($method === "PUT" || $method === "POST") {

		verifyXsrf();
		$requestUsername = file_get_username("php://input");
		$requestObject = json_decode($requestUsername);

		//make sure profile username is available (required field)
		if(empty($requestObject->profileUsername) === true) {
			throw(new \InvalidArgumentException ("Username or Password is incorrect", 405));
		}
		

		//  make sure profileId is available
		if(empty($requestObject->profileId) === true) {
			throw(new \InvalidArgumentException ("Username or Password is incorrect", 405));
		}

		//perform the actual put or post
		if($method === "PUT") {

			// retrieve the profile to update
			$profile = Profile::getProfileByProfileId($pdo, $id);
			if($profile === null) {
				throw(new RuntimeException("Username or Password is incorrect", 404));
			}

			// update all attributes
			$profile->setProfileUsername($requestObject->profileUsername);
			$profile->update($pdo);

			// update reply
			$reply->message = "Profile updated OK";

		} else if($method === "POST") {

			// create new profile and insert into the database
			$profile = new Profile(null, $requestObject->profileId, $requestObject->profileUsername, null);
			$profile->insert($pdo);

			// update reply
			$reply->message = "Profile created OK";
		}

	} else if($method === "DELETE") {
		verifyXsrf();

		// retrieve the Profile to be deleted
		$profile = Profile::getProfileByProfileId($pdo, $id);
		if($profile === null) {
			throw(new RuntimeException("Username or Password is incorrect", 404));
		}

		// delete profile
		$profile->delete($pdo);

		// update reply
		$reply->message = "Profile deleted OK";
	} else {
		throw (new InvalidArgumentException("Invalid HTTP method request"));
	}

	// update reply with exception information
} catch(Exception $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
} catch(TypeError $typeError) {
	$reply->status = $typeError->getCode();
	$reply->message = $typeError->getMessage();
}

header("Username-type: application/json");
if($reply->data === null) {
	unset($reply->data);
}

// encode and return reply to front end caller
echo json_encode($reply);