<?php
namespace Edu\Cnm\KiteCrypt;

require_once("autoloader.php");


/**
 * kiteCrypt messages
 *
 * In kiteCrypt, users (senders) can message other users (receivers)
 *
 * @author G. Wells <gwells4@cnm.edu>
 * @version 1.0.0
 **/
class Message implements \JsonSerializable {
	use ValidateDate;

	/**
	 * id for message (null if it's a new message, and it will be assigned by MySQL when it's stored in the database); this is the primary key
	 * @var int|null $profileId
	 **/
	private $messageId;

	/**
	 * timestamp of the message
	 * @var int|null $messageTimestamp timestamp of this Message (or null if it's a new Message, and it will be assigned by MySQL when it's stored in the database)
	 **/
	private $messageTimestamp;

	/**
	 * id for the sender of the message; it is a foreign key
	 * @var int $messageSenderId
	 **/
	private $messageSenderId;

	/**
	 * id for the receiver of the message; it is a foreign key
	 * @var int $messageReceiverId
	 **/
	private $messageReceiverId;

	/**
	 * the text of the message
	 * @var string $messageText
	 **/
	private $messageText;



	/**
	 * constructor for this Message
	 *
	 * @param int|null $newMessageId id of this message (or null if it's a new message, and it will be assigned by MySQL when it's stored in the database)
	 * @param int|null $newMessageTimestamp timestamp of this message (or null if it's a new message, and it will be assigned by MySQL when it's stored in the database)
	 * @param int $newMessageSenderId id for the sender of the message; it is a foreign key
	 * @param int $newMessageReceiverId id for the receiver of the message; it is a foreign key
	 * @param string $newMessageText the text of the message
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if data types violate type hints
	 * @throws \RangeException if data values are out of bounds (for example: negative integers)
	 **/
	public function __construct(int $newMessageId = null, $newMessageTimestamp = null, int $newMessageSenderId , int $newMessageReceiverId, string $newMessageText) {
		try {
			$this->setMessageId($newMessageId);
			$this->setMessageTimestamp($newMessageTimestamp);
			$this->setMessageSenderId($newMessageSenderId);
			$this->setMessageReceiverId($newMessageReceiverId);
			$this->setMessageText($newMessageText);
		} catch(\InvalidArgumentException $invalidArgument) {
			// rethrow the InvalidArgumentException to the caller
			throw(new \InvalidArgumentException($invalidArgument->getMessage(), 0, $invalidArgument));
		}catch(\TypeError $typeError) {
			// rethrow the TypeError to the caller
			throw(new \TypeError($typeError->getMessage(), 0, $typeError));
		} catch(\RangeException $range) {
			// rethrow the RangeException to the caller
			throw(new \RangeException($range->getMessage(), 0, $range));
		}
	}


	/**
	 * accessor method for messageId
	 *
	 * @return int id for message (null if it's a new message, and it will be assigned by MySQL when it's stored in the database); this is the primary key
	 **/
	public function getMessageId() {
		return($this->messageId);
	}


	/**
	 * mutator method for messageId
	 *
	 * @param int|null $newMessageId id for message (null if it's a new message, and it will be assigned by MySQL when it's stored in the database); this is the primary key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newMessageId is not an integer
	 * @throws \RangeException if $newMessageId is not positive
	 **/
	public function setMessageId(int $newMessageId = null) {

		// base case: if the message id is null, then it will be assigned by MySQL when it's stored in the database
		if($newMessageId === null) {
			$this->messageId = null;
			return;
		}
		// Verify the $newMessageId is safe
		$newMessageId = filter_var($newMessageId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newMessageId) === true) {
			throw(new \InvalidArgumentException("newMessageId is empty or insecure"));
		}
		// Verify that the $newMessageId in an integer.
		$newMessageId = filter_var($newMessageId, FILTER_VALIDATE_INT);
		if(empty($newMessageId) === true) {
			// If the $newMessageId is not an integer, throw a TypeError.
			throw(new \TypeError("newMessageId is not an integer."));
		}
		// Verify the $newMessageId is positive
		if($newMessageId <= 0) {
			throw(new \RangeException("newMessageId is not positive."));
		}

		// store the $newMessageId
		$this->messageId = $newMessageId;
	}


	/**
	 * accessor method for messageTimestamp
	 *
	 * @return int|null timestamp of this Message (or null if it's a new Message, and it will be assigned by MySQL when it's stored in the database)
	 **/
	public function getMessageTimestamp() {
		return($this->messageTimestamp);
	}


	/**
	 * mutator method for messageTimestamp
	 *
	 * @param int|null $newMessageTimestamp timestamp of this Message (or null if it's a new Message, and it will be assigned by MySQL when it's stored in the database)
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newMessageTimestamp is not a date
	 * @throws \RangeException if $newMessageTimestamp is not from the recent past
	 **/
	public function setMessageTimestamp($newMessageTimestamp = null) {

		// base case: if the timestamp is null, it will be assigned by MySQL when it's stored in the database
		if($newMessageTimestamp === null) {

			return($this->messageTimestamp);
		}
		else {
			throw(new \TypeError("TimeStamp must be null"));
		}

//
//		$newMessageTimestamp = filter_var($newMessageTimestamp, FILTER_VALIDATE_);
//		if(empty($newMessageTimestamp) === true) {
//			throw(new \InvalidArgumentException("newMessageTimestamp is empty or insecure"));
//		}
//		// Verify that the $newMessageTimestamp is an integer.
//		$newMessageTimestamp = filter_var($newMessageTimestamp, FILTER_VALIDATE_INT);
//		if(empty($newMessageTimestamp) === true) {
//			// If the $newMessageTimestamp is not an integer, throw a TypeError.
//			throw(new \TypeError("newMessageTimestamp is not an integer."));
//		}
//		// Verify the $newMessageTimestamp is positive and from the recent past
//		if($newMessageTimestamp <= 0) {
//			throw(new \RangeException("newMessageTimestamp is not positive."));
//		}

		// store the $newMessageTimestamp
		$this->messageTimestamp = $newMessageTimestamp;
	}


	/**
	 * accessor method for messageSenderId
	 *
	 * @return int id for the sender of the message; it is a foreign key
	 **/
	public function getMessageSenderId() {
		return($this->messageSenderId);
	}


	/**
	 * mutator method for messageSenderId
	 *
	 * @param int $newMessageSenderId id for the sender of the message; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newMessageSenderId is not an integer
	 * @throws \RangeException if $newMessageSenderId is not positive
	 **/
	public function setMessageSenderId(int $newMessageSenderId) {

		// Verify the $newMessageSenderId is safe
		$newMessageSenderId = filter_var($newMessageSenderId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newMessageSenderId) === true) {
			throw(new \InvalidArgumentException("newMessageSenderId is empty or insecure"));
		}
		// Verify that the $newMessageSenderId in an integer.
		$newMessageSenderId = filter_var($newMessageSenderId, FILTER_VALIDATE_INT);
		if(empty($newMessageSenderId) === true) {
			// If the $newMessageSenderId is not an integer, throw a TypeError.
			throw(new \TypeError("newMessageSenderId is not an integer."));
		}
		// Verify the $newMessageSenderId is positive
		if($newMessageSenderId <= 0) {
			throw(new \RangeException("newMessageSenderId is not positive."));
		}

		// store the $newMessageSenderId
		$this->messageSenderId = $newMessageSenderId;
	}


	/**
	 * accessor method for messageReceiverId
	 *
	 * @return int id for the receiver of the message; it is a foreign key
	 **/
	public function getMessageReceiverId() {
		return($this->messageReceiverId);
	}


	/**
	 * mutator method for messageReceiverId
	 *
	 * @param int $newMessageReceiverId id for the receiver of the message; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newMessageReceiverId is not an integer
	 * @throws \RangeException if $newMessageReceiverId is not positive
	 **/
	public function setMessageReceiverId(int $newMessageReceiverId) {

		// Verify the $newMessageReceiverId is safe
		$newMessageReceiverId = filter_var($newMessageReceiverId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newMessageReceiverId) === true) {
			throw(new \InvalidArgumentException("newMessageReceiverId is empty or insecure"));
		}
		// Verify that the $newMessageReceiverId in an integer.
		$newMessageReceiverId = filter_var($newMessageReceiverId, FILTER_VALIDATE_INT);
		if(empty($newMessageReceiverId) === true) {
			// If the $newMessageReceiverId is not an integer, throw a TypeError.
			throw(new \TypeError("newMessageReceiverId is not an integer."));
		}
		// Verify the $newMessageReceiverId is positive
		if($newMessageReceiverId <= 0) {
			throw(new \RangeException("newMessageReceiverId is not positive."));
		}

		// store the $newMessageReceiverId
		$this->messageReceiverId = $newMessageReceiverId;
	}


	/**
	 * accessor method for messageText
	 *
	 * @return string the text of the message
	 **/
	public function getMessageText() {
		return($this->messageText);
	}


	/**
	 * mutator method for messageText
	 *
	 * @param string $newMessageText the text of the message
	 *
	 * @throws \InvalidArgumentException if the argument is not safe (or empty)
	 **/
	public function setMessageText(string $newMessageText) {

		// Verify the $newMessageText is safe (and not empty)
		$newMessageText = filter_var($newMessageText, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($newMessageText) === true) {
			throw(new \InvalidArgumentException("newMessageText is empty or insecure"));
		}

		// store the $newMessageText
		$this->messageText = $newMessageText;
	}


	/**
	 * inserts this Message into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {

		// create query template
		$query = "INSERT INTO message(messageId, messageTimestamp, messageSenderId, messageReceiverId, messageText) VALUES(:messageId, :messageTimestamp, :messageSenderId, :messageReceiverId, :messageText)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["messageId" => $this->messageId, "messageTimestamp" => $this->messageTimestamp, "messageSenderId" => $this->messageSenderId, "messageReceiverId" => $this->messageReceiverId, "messageText" => $this->messageText];
		$statement->execute($parameters);

	}


	/**
	 * deletes this Message from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function delete(\PDO $pdo) {

		// create query template
		$query = "DELETE FROM message WHERE messageId = :messageId AND messageTimestamp = :messageTimestamp AND messageSenderId = :messageSenderId AND messageReceiverId = :messageReceiverId AND messageText = :messageText";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["messageId" => $this->messageId, "messageTimestamp" => $this->messageTimestamp, "messageSenderId" => $this->messageSenderId, "messageReceiverId" => $this->messageReceiverId, "messageText" => $this->messageText];
		$statement->execute($parameters);
	}


	/**
	 * gets the Message by messageSenderId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $messageSenderId messageSenderId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Messages found
	 *
	 * @throws \InvalidArgumentException if $messageSenderId is not safe
	 * @throws \TypeError if $messageSenderId is not an integer
	 * @throws \RangeException if $messageSenderId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getMessageByMessageSenderId(\PDO $pdo, int $messageSenderId) {

		// Verify the $messageSenderId is safe
		$messageSenderId = filter_var($messageSenderId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($messageSenderId) === true) {
			throw(new \InvalidArgumentException("messageSenderId is empty or insecure"));
		}
		// Verify that the $messageSenderId in an integer.
		$messageSenderId = filter_var($messageSenderId, FILTER_VALIDATE_INT);
		if(empty($messageSenderId) === true) {
			// If the $messageSenderId is not an integer, throw a TypeError.
			throw(new \TypeError("messageSenderId is not an integer."));
		}
		// Verify the $messageSenderId is positive
		if($messageSenderId <= 0) {
			throw(new \RangeException("messageSenderId is not positive."));
		}

		// create query template
		$query = "SELECT messageId, messageTimestamp, messageSenderId, messageReceiverId, messageText FROM message WHERE messageSenderId = :messageSenderId";
		$statement = $pdo->prepare($query);

		// bind the messageSenderId to the place holder in the template
		$parameters = ["messageSenderId" => $messageSenderId];
		$statement->execute($parameters);

		// build an array of messages
		$messages = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$message = new Message($row["messageId"], $row["messageTimestamp"], $row["messageSenderId"], $row["messageReceiverId"], $row["messageText"]);
				$messages[$messages->key()] = $message;
				$messages->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($messages);
	}


	/**
	 * gets the Message by messageReceiverId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $messageReceiverId messageReceiverId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Messages found
	 *
	 * @throws \InvalidArgumentException if $messageReceiverId is not safe
	 * @throws \TypeError if $messageReceiverId is not an integer
	 * @throws \RangeException if $messageReceiverId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getMessageByMessageReceiverId(\PDO $pdo, int $messageReceiverId) {

		// Verify the $messageReceiverId is safe
		$messageReceiverId = filter_var($messageReceiverId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($messageReceiverId) === true) {
			throw(new \InvalidArgumentException("messageReceiverId is empty or insecure"));
		}
		// Verify that the $messageReceiverId in an integer.
		$messageReceiverId = filter_var($messageReceiverId, FILTER_VALIDATE_INT);
		if(empty($messageReceiverId) === true) {
			// If the $messageReceiverId is not an integer, throw a TypeError.
			throw(new \TypeError("messageReceiverId is not an integer."));
		}
		// Verify the $messageReceiverId is positive
		if($messageReceiverId <= 0) {
			throw(new \RangeException("messageReceiverId is not positive."));
		}

		// create query template
		$query = "SELECT messageId, messageTimestamp, messageSenderId, messageReceiverId, messageText FROM message WHERE messageReceiverId = :messageReceiverId";
		$statement = $pdo->prepare($query);

		// bind the messageReceiverId to the place holder in the template
		$parameters = ["messageReceiverId" => $messageReceiverId];
		$statement->execute($parameters);

		// build an array of messages
		$messages = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$message = new Message($row["messageId"], $row["messageTimestamp"], $row["messageSenderId"], $row["messageReceiverId"], $row["messageText"]);
				$messages[$messages->key()] = $message;
				$messages->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($messages);
	}


	/**
	 * gets all Messages
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @return \SplFixedArray SplFixedArray of Messages found or null if not found
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getAllMessages(\PDO $pdo) {
		// create query template
		$query = "SELECT messageId, messageTimestamp, messageSenderId, messageReceiverId, messageText FROM message";
		$statement = $pdo->prepare($query);
		$statement->execute();

		// build an array of messages
		$messages = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$message = new Message($row["messageId"], $row["messageTimestamp"], $row["messageSenderId"], $row["messageReceiverId"], $row["messageText"]);
				$messages[$messages->key()] = $message;
				$messages->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($messages);
	}


	/**
	 * formats the state variables for JSON serialization
	 *
	 * @return array resulting state variables to serialize
	 **/
	public function jsonSerialize() {
		$fields = get_object_vars($this);
		return($fields);
	}
}