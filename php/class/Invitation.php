<?php
namespace Edu\Cnm\KiteCrypt;

use Edu\Cnm\Dmcdonald21\DataDesign\ValidateDate;

require_once("autoloader.php");


/**
 * kiteCrypt invitations
 *
 * In kiteCrypt, users (profiles) can invite other users (friends) to be their friends
 *
 * @author G. Wells <gwells4@cnm.edu>
 * @version 1.0.0
 **/
class Invitation implements \JsonSerializable {
	use ValidateDate;

	/**
	 * id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 * @var int $invitationInviterId
	 **/
	private $invitationInviterId;

	/**
	 * id for the user (the invitee) being invited in this friendship; it is a foreign key
	 * @var int $invitationInviteeId
	 **/
	private $invitationInviteeId;

	/**
	 * timestamp of the invitation
	 * @var int|null $invitationTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 **/
	private $invitationTimestamp;

	/**
	 * passphrase used by the invitee to make the friendship, it must be sent by the inviter to the invitee outside of kiteCrypt
	 * @var string $invitationPassphrase
	 **/
	private $invitationPassphrase;



	/**
	 * constructor for this Invitation
	 *
	 * @param int $newInvitationInviterId id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 * @param int $newInvitationInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign key
	 * @param int|null $newInvitationTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 * @param string $newInvitationPassphrase passphrase used by the invitee to make the friendship, it must be sent by the inviter to the invitee outside of kiteCrypt
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if data types violate type hints
	 * @throws \RangeException if data values are out of bounds (for example: negative integers)
	 **/
	public function __construct(int $newInvitationInviterId , int $newInvitationInviteeId, int $newInvitationTimestamp = null, string $newInvitationPassphrase) {
		try {
			$this->setInvitationInviterId($newInvitationInviterId);
			$this->setInvitationInviteeId($newInvitationInviteeId);
			$this->setInvitationTimestamp($newInvitationTimestamp);
			$this->setInvitationPassphrase($newInvitationPassphrase);
		} catch(\InvalidArgumentException $invalidArgument) {
			// rethrow the InvalidArgumentException to the caller
			throw(new \InvalidArgumentException($invalidArgument->getMessage(), 0, $invalidArgument));
		} catch(\TypeError $typeError) {
			// rethrow the TypeError to the caller
			throw(new \TypeError($typeError->getMessage(), 0, $typeError));
		} catch(\RangeException $range) {
			// rethrow the RangeException to the caller
			throw(new \RangeException($range->getMessage(), 0, $range));
		}
	}


	/**
	 * accessor method for invitationInviterId
	 *
	 * @return int value of invitationInviterId
	 **/
	public function getInvitationInviterId() {
		return($this->invitationInviterId);
	}


	/**
	 * mutator method for invitationInviterId
	 *
	 * @param int $newInvitationInviterId id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInvitationInviterId is not an integer
	 * @throws \RangeException if $newInvitationInviterId is not positive
	 *
	 **/
	public function setInvitationInviterId(int $newInvitationInviterId) {

		// Verify the $newInvitationInviterId is safe
		$newInvitationInviterId = filter_var($newInvitationInviterId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newInvitationInviterId) === true) {
			throw(new \TypeError("newInvitationInviterId is not an integer, is empty, or is insecure."));
		}
		// Verify the $newInvitationInviterId is positive
		if($newInvitationInviterId <= 0) {
			throw(new \RangeException("newInvitationInviterId is not positive."));
		}

		// store the $newInvitationInviterId
		$this->invitationInviterId = $newInvitationInviterId;
	}


	/**
	 * accessor method for invitationInviteeId
	 *
	 * @return int value of invitationInviteeId
	 **/
	public function getInvitationInviteeId() {
		return($this->invitationInviteeId);
	}


	/**
	 * mutator method for invitationInviteeId
	 *
	 * @param int $newInvitationInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInvitationInviteeId is not an integer
	 * @throws \RangeException if $newInvitationInviteeId is not positive
	 **/
	public function setInvitationInviteeId(int $newInvitationInviteeId) {

		// Verify the $newInvitationInviteeId is safe
		$newInvitationInviteeId = filter_var($newInvitationInviteeId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newInvitationInviteeId) === true) {
			throw(new \TypeError("newInvitationInviteeId is not an integer, is empty, or is insecure."));
		}
		// Verify the $newInvitationInviteeId is positive
		if($newInvitationInviteeId <= 0) {
			throw(new \RangeException("newInvitationInviteeId is not positive."));
		}

		// store the $newInvitationInviteeId
		$this->invitationInviteeId = $newInvitationInviteeId;
	}


	/**
	 * accessor method for invitationTimestamp
	 *
	 * @return int|null timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 **/
	public function getInvitationTimestamp() {
		return($this->invitationTimestamp);
	}


	/**
	 * mutator method for invitationTimestamp
	 *
	 * @param int|null $newInvitationTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInvitationTimestamp is not a date
	 * @throws \RangeException if $newInvitationTimestamp is not from the recent past
	 **/
	public function setInvitationTimestamp(int $newInvitationTimestamp = null) {

		// base case: if the timestamp is null, then it will be assigned by MySQL when it's stored in the database
		if($newInvitationTimestamp === null) {
			$this->invitationTimestamp = new \DateTime();
			return;
		}

		// store the invitation date
		try {
			$newInvitationTimestamp = self::validateDateTime($newInvitationTimestamp);
		} catch(\InvalidArgumentException $invalidArgument) {
			throw(new \InvalidArgumentException($invalidArgument->getMessage(), 0, $invalidArgument));
		} catch(\RangeException $range) {
			throw(new \RangeException($range->getMessage(), 0, $range));
		}
		$this->invitationTimestamp = $newInvitationTimestamp;
	}


	/**
	 * accessor method for invitationPassphrase
	 *
	 * @return string passphrase for accepting this Invitation
	 **/
	public function getInvitationPassphrase() {
		return($this->invitationPassphrase);
	}


	/**
	 * mutator method for invitationPassphrase
	 *
	 * @param string $newInvitationPassphrase passphrase for accepting this Invitation
	 *
	 * @throws \InvalidArgumentException if the argument is not safe (or empty)
	 **/
	public function setInvitationPassphrase(string $newInvitationPassphrase) {

		// Verify the $newInvitationPassphrase is safe (and not empty)
		$newInvitationPassphrase = filter_var($newInvitationPassphrase, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($newInvitationPassphrase) === true) {
			throw(new \InvalidArgumentException("newInvitationPassphrase is empty or insecure"));
		}

		// store the $newInvitationPassphrase
		$this->invitationPassphrase = $newInvitationPassphrase;
	}


	/**
	 * inserts this Invitation into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {

		// create query template
		$query = "INSERT INTO invitation(invitationInviterId, invitationInviteeId, invitationTimestamp, invitationPassphrase) VALUES(:invitationInviterId, :invitationInviteeId, :invitationTimestamp, :invitationPassphrase)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["invitationInviterId" => $this->invitationInviterId, "invitationInviteeId" => $this->invitationInviteeId, "invitationTimestamp" => $this->invitationTimestamp, "invitationPassphrase" => $this->invitationPassphrase];
		$statement->execute($parameters);

	}


	/**
	 * deletes this Invitation from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function delete(\PDO $pdo) {

		// create query template
		$query = "DELETE FROM invitation WHERE invitationInviterId = :invitationInviterId AND invitationInviteeId = :invitationInviteeId AND invitationTimestamp = :invitationTimestamp AND invitationPassphrase = :invitationPassphrase";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["invitationInviterId" => $this->invitationInviterId, "invitationInviteeId" => $this->invitationInviteeId, "invitationTimestamp" => $this->invitationTimestamp, "invitationPassphrase" => $this->invitationPassphrase];
		$statement->execute($parameters);
	}


	/**
	 * gets the Invitation by invitationInviterId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $invitationInviterId invitationInviterId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Invitations found
	 *
	 * @throws \InvalidArgumentException if $invitationInviterId is not safe
	 * @throws \TypeError if $invitationInviterId is not an integer
	 * @throws \RangeException if $invitationInviterId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getInvitationByInvitationInviterId(\PDO $pdo, int $invitationInviterId) {

		// Verify the $invitationInviterId is safe
		$invitationInviterId = filter_var($invitationInviterId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($invitationInviterId) === true) {
			throw(new \InvalidArgumentException("invitationInviterId is empty or insecure"));
		}
		// Verify that the $invitationInviterId in an integer.
		$invitationInviterId = filter_var($invitationInviterId, FILTER_VALIDATE_INT);
		if(empty($invitationInviterId) === true) {
			// If the $invitationInviterId is not an integer, throw a TypeError.
			throw(new \TypeError("invitationInviterId is not an integer."));
		}
		// Verify the $invitationInviterId is positive
		if($invitationInviterId <= 0) {
			throw(new \RangeException("invitationInviterId is not positive."));
		}

		// create query template
		$query = "SELECT invitationInviterId, invitationInviteeId, invitationTimestamp, invitationPassphrase FROM invitation WHERE invitationInviterId = :invitationInviterId";
		$statement = $pdo->prepare($query);

		// bind the invitationInviterId to the place holder in the template
		$parameters = ["invitationInviterId" => $invitationInviterId];
		$statement->execute($parameters);

		// build an array of invitations
		$invitations = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invitation = new Invitation($row["invitationInviterId"], $row["invitationInviteeId"], $row["invitationTimestamp"], $row["invitationPassphrase"]);
				var_dump($invitation);
				$invitations[$invitations->key()] = $invitation;
				$invitations->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invitations);
	}


	/**
	 * gets the Invitation by invitationInviteeId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $invitationInviteeId invitationInviteeId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Invitations found
	 *
	 * @throws \InvalidArgumentException if $invitationInviteeId is not safe
	 * @throws \TypeError if $invitationInviteeId is not an integer
	 * @throws \RangeException if $invitationInviteeId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getInvitationByInvitationInviteeId(\PDO $pdo, int $invitationInviteeId) {

		// Verify the $invitationInviteeId is safe
		$invitationInviteeId = filter_var($invitationInviteeId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($invitationInviteeId) === true) {
			throw(new \InvalidArgumentException("invitationInviteeId is empty or insecure"));
		}
		// Verify that the $invitationInviteeId in an integer.
		$invitationInviteeId = filter_var($invitationInviteeId, FILTER_VALIDATE_INT);
		if(empty($invitationInviteeId) === true) {
			// If the $invitationInviteeId is not an integer, throw a TypeError.
			throw(new \TypeError("invitationInviteeId is not an integer."));
		}
		// Verify the $invitationInviteeId is positive
		if($invitationInviteeId <= 0) {
			throw(new \RangeException("invitationInviteeId is not positive."));
		}

		// create query template
		$query = "SELECT invitationInviterId, invitationInviteeId, invitationTimestamp, invitationPassphrase FROM invitation WHERE invitationInviteeId = :invitationInviteeId";
		$statement = $pdo->prepare($query);

		// bind the invitationInviteeId to the place holder in the template
		$parameters = ["invitationInviteeId" => $invitationInviteeId];
		$statement->execute($parameters);

		// build an array of invitations
		$invitations = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invitation = new Invitation($row["invitationInviterId"], $row["invitationInviteeId"], $row["invitationTimestamp"], $row["invitationPassphrase"]);
				$invitations[$invitations->key()] = $invitation;
				$invitations->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invitations);
	}


	/**
	 * gets all Invitations
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @return \SplFixedArray SplFixedArray of Invitations found or null if not found
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getAllInvitations(\PDO $pdo) {
		// create query template
		$query = "SELECT invitationInviterId, invitationInviteeId, invitationTimestamp, invitationPassphrase FROM invitation";
		$statement = $pdo->prepare($query);
		$statement->execute();

		// build an array of invitations
		$invitations = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
//var_dump($statement);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invitation = new Invitation($row["invitationInviterId"], $row["invitationInviteeId"], $row["invitationTimestamp"], $row["invitationPassphrase"]);
				$invitations[$invitations->key()] = $invitation;
				$invitations->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invitations);
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