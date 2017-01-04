<?php


/**
 * Inputs are going to be username, publicKeyX, publicKeyY. Logic is to look up profile by *  username, compare keys and make sure both keys match, if there is any discrepancy, throw them out. Profile object (including Keys) are going to be in the session. Need to getProfilePublicKeyx, getProfilePublicKeyY
 */

require_once("../../../php/class/autoloader.php");
require_once("../../../php/lib/xsrf.php");
require_once("/etc/apache2/capstone-mysql/encrypted-config.php");
require_once("../../../vendor/autoload.php");

use Edu\Cnm\KiteCrypt\Message;


/**
 * RESTFUL api for the Messages class
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

$exceptionMessage = "no encrypted message for you";
$exceptionCode = 401;



try {
	$config = readConfig("/etc/apache2/capstone-mysql/kitecrypt.ini");
	$pusherConfig = json_decode($config["pusher"]);
	$pusher = new Pusher($pusherConfig->key, $pusherConfig->secret, $pusherConfig->id, ["encrypted" => true]);


	//determine which HTTP method was used
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];

	$id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
	$messageText = filter_input(INPUT_GET, "messageText", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$messageReceiverId = filter_input(INPUT_GET, "messageReceiverId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$messageSenderId= filter_input(INPUT_GET, "messageSenderId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

	//establish pdo connection
	$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/kitecrypt.ini");


	if(($method === "DELETE") && (empty($id) === true || $id < 0)) {
		throw(new InvalidArgumentException("id cannot be empty or negative", 405));
	}

	if($method === "GET") {
		setXsrfCookie("/");
		if(empty($id) === false) {
			$reply->data = Message::getMessageByMessageId($pdo, $id);
		}


	} else if($method === "POST") {

		//set XSRF cookie
		verifyXsrf();

		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);
		/*-----checking and sanitizing message text--------------*/
		//check that email and password fields are not empty, and sanitize that input



		if(empty($_SESSION["profile"]) === true){
			throw(new \InvalidArgumentException($exceptionMessage . "Error 1", $exceptionCode));
		}

		if(empty($requestObject->messageReceiverId) === true) {
			throw(new \InvalidArgumentException($exceptionMessage . "Error 2", $exceptionCode));
		} else {
			$messageReceiverId = filter_var($requestObject->messageReceiverId, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		}

		if(empty($requestObject->messageText) === true) {
			throw(new \InvalidArgumentException($exceptionMessage . "Error 3", $exceptionCode));
		} else {
			$messageText = filter_var($requestObject->messageText, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		}

		$message = new Message(null, null, $_SESSION["profile"]->getProfileId(), $messageReceiverId, $messageText);
		$message->insert($pdo);
		$pusher->trigger("danielMinusMinus", "newMessage", ["message" => $messageText]);
		$reply->message = "Message sent";


//		If all username, public Key x, and public key Y match, send them to the chat page with friends list


	}
// determins if the request is a DELETE request.
	else if($method === "DELETE") {
		verifyXsrf();

		// retrieve the Message to be deleted
		$Message = Message::getMessageByMessageId($pdo, $id);
		// If the request is DELETE, the requested Message is pulled from the database using the Key in $id and stored in $Message


		// make sure that the requested Message is valid by checking to see if $Message is null.
		if($Message === null) {
			throw(new RuntimeException("Message does not exist", 404));
		}


		// calls the DELETE method on the retrieved Message. This deletes the Message from the database.
		$Message->delete($pdo);


		// stores the "Message deleted OK" message in the $reply->message state variable.
		$reply->message = "Message deleted OK";
	}

	else {
		throw (new InvalidArgumentException("Invalid Method",400));
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