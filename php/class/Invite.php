<?php
namespace Edu\Cnm\kiteCrypt;

require_once("Autoloader.php");


/**
 * kiteCrypt invites
 *
 * In kiteCrypt, users (profiles) can invite other users (friends) to be their friends
 *
 * @author G. Wells <gwells4@cnm.edu>
 * @version 1.0.0
 **/
class Invite implements \JsonSerializable {
	/**
	 * id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 * @var int $friendsProfileId
	 **/
	private $inviteInviterId;
	/**
	 * id for the user (the invitee) being invited in this friendship; it is a foreign key
	 * @var int $friendsFriendId
	 **/
	private $inviteInviteeId;
	/**
	 * timestamp of the invitation
	 * @var int|null $inviteTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 **/
	private $inviteTimestamp;
	/**
	 * passphrase used by the invitee to make the friendship, it must be sent by the inviter to the invitee outside of kiteCrypt
	 * @var string $invitePassphrase
	 **/
	private $invitePassphrase;



	/**
	 * constructor for this Invite
	 *
	 * @param int $newInviteInviterId id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 * @param int $newInviteInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign key
	 * @param int|null $newInviteTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 * @param string $newInvitePassphrase passphrase used by the invitee to make the friendship, it must be sent by the inviter to the invitee outside of kiteCrypt
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if data types violate type hints
	 * @throws \RangeException if data values are out of bounds (for example: negative integers)
	 **/
	public function __construct(int $newInviteInviterId , int $newInviteInviteeId, int $newInviteTimestamp, string $newInvitePassphrase) {
		try {
			$this->setInviteInviterId($newInviteInviterId);
			$this->setInviteInviteeId($newInviteInviteeId);
			$this->setInviteTimestamp($newInviteTimestamp);
			$this->setInvitePassphrase($newInvitePassphrase);
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
	 * accessor method for inviteInviterId
	 *
	 * @return int value of inviteInviterId
	 **/
	public function getInviteInviterId() {
		return($this->inviteInviterId);
	}


	/**
	 * mutator method for inviteInviterId
	 *
	 * @param int $newInviteInviterId id for the user (the inviter) inviting the friend (the invitee) in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInviteInviterId is not an integer
	 * @throws \RangeException if $newInviteInviterId is not positive
	 *
	 **/
	public function setInviteInviterId(int $newInviteInviterId) {

		// Verify the $newInviteInviterId is safe
		$newInviteInviterId = filter_var($newInviteInviterId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newInviteInviterId) === true) {
			throw(new \InvalidArgumentException("newInviteInviterId is empty or insecure"));
		}
		// Verify that the $newInviteInviterId in an integer.
		$newInviteInviterId = filter_var($newInviteInviterId, FILTER_VALIDATE_INT);
		if(empty($newInviteInviterId) === true) {
			// If the $newInviteInviterId is not an integer, throw a TypeError.
			throw(new \TypeError("newInviteInviterId is not an integer."));
		}
		// Verify the $newInviteInviterId is positive
		if($newInviteInviterId <= 0) {
			throw(new \RangeException("newInviteInviterId is not positive."));
		}

		// store the $newFriendsProfileId
		$this->inviteInviterId = $newInviteInviterId;
	}


	/**
	 * accessor method for inviteInviteeId
	 *
	 * @return int value of inviteInviteeId
	 **/
	public function getInviteInviteeId() {
		return($this->inviteInviteeId);
	}


	/**
	 * mutator method for inviteInviteeId
	 *
	 * @param int $newInviteInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInviteInviteeId is not an integer
	 * @throws \RangeException if $newInviteInviteeId is not positive
	 *
	 **/
	public function setInviteInviteeId(int $newInviteInviteeId) {

		// Verify the $newInviteInviteeId is safe
		$newInviteInviteeId = filter_var($newInviteInviteeId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newInviteInviteeId) === true) {
			throw(new \InvalidArgumentException("newInviteInviteeId is empty or insecure"));
		}
		// Verify that the $newInviteInviteeId in an integer.
		$newInviteInviteeId = filter_var($newInviteInviteeId, FILTER_VALIDATE_INT);
		if(empty($newInviteInviteeId) === true) {
			// If the $newInviteInviteeId is not an integer, throw a TypeError.
			throw(new \TypeError("newInviteInviteeId is not an integer."));
		}
		// Verify the $newInviteInviteeId is positive
		if($newInviteInviteeId <= 0) {
			throw(new \RangeException("newInviteInviteeId is not positive."));
		}

		// store the $newInviteInviteeId
		$this->inviteInviteeId = $newInviteInviteeId;
	}


	/**
	 * accessor method for inviteTimestamp
	 *
	 * @return int|null timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 **/
	public function getInviteTimestamp() {
		return($this->inviteTimestamp);
	}


	/**
	 * mutator method for inviteTimestamp
	 *
	 * @param int|null $newInviteTimestamp timestamp of this Invitation (or null if it's a new Invitation, and it will be assigned by MySQL when it's stored in the database)
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newInviteTimestamp is not a date
	 * @throws \RangeException if $newInviteTimestamp is not from the recent past
	 *
	 **/
	public function setInviteTimestamp(int $newInviteTimestamp = null) {

		// base case: if the timestamp is null, it will be assigned by MySQL when it's stored in the database
		if($newInviteTimestamp === null) {
			$this->inviteTimestamp = null;
			return;
		}
		// Verify the $newInviteTimestamp is safe
		$newInviteTimestamp = filter_var($newInviteTimestamp, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newInviteTimestamp) === true) {
			throw(new \InvalidArgumentException("newInviteTimestamp is empty or insecure"));
		}
		// Verify that the $newInviteTimestamp is an integer.
		$newInviteTimestamp = filter_var($newInviteTimestamp, FILTER_VALIDATE_INT);
		if(empty($newInviteTimestamp) === true) {
			// If the $newInviteTimestamp is not an integer, throw a TypeError.
			throw(new \TypeError("newInviteTimestamp is not an integer."));
		}
		// Verify the $newInviteTimestamp is positive and from the recent past
		if($newInviteTimestamp <= 0) {
			throw(new \RangeException("newInviteTimestamp is not positive."));
		} else {
			if ($newInviteTimestamp - time() >= 0) {
				throw(new \RangeException("newInviteTimestamp is in the future."));
			} elseif (time() - $newInviteTimestamp >= 48 * 60 * 60 * 1000) {
				throw(new \RangeException("newInviteTimestamp is more than 48 hours ago, so this invitation should have expired."));
			}
		}

		// store the $newInviteTimestamp
		$this->inviteTimestamp = $newInviteTimestamp;
	}


	/**
	 * accessor method for invitePassphrase
	 *
	 * @return string passphrase for accepting this Invitation
	 **/
	public function getInvitePassphrase() {
		return($this->invitePassphrase);
	}


	/**
	 * mutator method for invitePassphrase
	 *
	 * @param string $newInvitePassphrase passphrase for accepting this Invitation
	 *
	 * @throws \InvalidArgumentException if the argument is not safe (or empty)
	 *
	 **/
	public function setInvitePassphrase(string $newInvitePassphrase) {

		// Verify the $newInvitePassphrase is safe (and not empty)
		$newInvitePassphrase = filter_var($newInvitePassphrase, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($newInvitePassphrase) === true) {
			throw(new \InvalidArgumentException("newInvitePassphrase is empty or insecure"));
		}

		// store the $newInvitePassphrase
		$this->invitePassphrase = $newInvitePassphrase;
	}


	/**
	 * inserts this Invite into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {

		// create query template
		$query = "INSERT INTO invite(inviteInviterId, inviteInviteeId, inviteTimestamp, invitePassphrase) VALUES(:inviteInviterId, :inviteInviteeId, :inviteTimestamp, :invitePassphrase)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["inviteInviterId" => $this->inviteInviterId, "inviteInviteeId" => $this->inviteInviteeId, "inviteTimestamp" => $this->inviteTimestamp, "invitePassphrase" => $this->invitePassphrase];
		$statement->execute($parameters);

	}


	/**
	 * deletes these Friends from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function delete(\PDO $pdo) {

		// create query template
		$query = "DELETE FROM invite WHERE inviteInviterId = :inviteInviterId AND inviteInviteeId = :inviteInviteeId AND inviteTimestamp = :inviteTimestamp AND invitePassphrase = :invitePassphrase";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["inviteInviterId" => $this->inviteInviterId, "inviteInviteeId" => $this->inviteInviteeId, "inviteTimestamp" => $this->inviteTimestamp, "invitePassphrase" => $this->invitePassphrase];
		$statement->execute($parameters);
	}


	/**
	 * gets the Invite by inviteInviterId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $inviteInviterId inviteInviterId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Invites found
	 *
	 * @throws \InvalidArgumentException if $inviteInviterId is not safe
	 * @throws \TypeError if $inviteInviterId is not an integer
	 * @throws \RangeException if $inviteInviterId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getInviteByInviteInviterId(\PDO $pdo, int $inviteInviterId) {

		// Verify the $inviteInviterId is safe
		$inviteInviterId = filter_var($inviteInviterId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($inviteInviterId) === true) {
			throw(new \InvalidArgumentException("inviteInviterId is empty or insecure"));
		}
		// Verify that the $inviteInviterId in an integer.
		$inviteInviterId = filter_var($inviteInviterId, FILTER_VALIDATE_INT);
		if(empty($inviteInviterId) === true) {
			// If the $inviteInviterId is not an integer, throw a TypeError.
			throw(new \TypeError("inviteInviterId is not an integer."));
		}
		// Verify the $inviteInviterId is positive
		if($inviteInviterId <= 0) {
			throw(new \RangeException("inviteInviterId is not positive."));
		}

		// create query template
		$query = "SELECT inviteInviterId FROM invite WHERE inviteInviterId = :inviteInviterId";
		$statement = $pdo->prepare($query);

		// bind the inviteInviterId to the place holder in the template
		$parameters = ["inviteInviterId" => $inviteInviterId];
		$statement->execute($parameters);

		// build an array of invites
		$invites = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invite = new Invite($row["inviteInviterId"], $row["inviteInviterId"]);
				$invites[$invites->key()] = $invite;
				$invites->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invites);
	}


	/**
	 * gets the Invite by inviteInviteeId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $inviteInviteeId inviteInviteeId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Invites found
	 *
	 * @throws \InvalidArgumentException if $inviteInviteeId is not safe
	 * @throws \TypeError if $inviteInviteeId is not an integer
	 * @throws \RangeException if $inviteInviteeId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getInviteByInviteInviteeId(\PDO $pdo, int $inviteInviteeId) {

		// Verify the $inviteInviteeId is safe
		$inviteInviteeId = filter_var($inviteInviteeId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($inviteInviteeId) === true) {
			throw(new \InvalidArgumentException("inviteInviteeId is empty or insecure"));
		}
		// Verify that the $inviteInviteeId in an integer.
		$inviteInviteeId = filter_var($inviteInviteeId, FILTER_VALIDATE_INT);
		if(empty($inviteInviteeId) === true) {
			// If the $inviteInviteeId is not an integer, throw a TypeError.
			throw(new \TypeError("inviteInviteeId is not an integer."));
		}
		// Verify the $inviteInviteeId is positive
		if($inviteInviteeId <= 0) {
			throw(new \RangeException("inviteInviteeId is not positive."));
		}

		// create query template
		$query = "SELECT inviteInviteeId FROM invite WHERE inviteInviteeId = :inviteInviteeId";
		$statement = $pdo->prepare($query);

		// bind the inviteInviteeId to the place holder in the template
		$parameters = ["inviteInviterId" => $inviteInviterId];
		$statement->execute($parameters);

		// build an array of invites
		$invites = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invite = new Invite($row["inviteInviterId"], $row["inviteInviteeId"], $row["inviteTimestamp"], $row["invitePassphrase"]);
				$invites[$invites->key()] = $invite;
				$invites->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invites);
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
	public static function getAllInvites(\PDO $pdo) {
		// create query template
		$query = "SELECT inviteInviterId, inviteInviteeId FROM invite";
		$statement = $pdo->prepare($query);
		$statement->execute();

		// build an array of invites
		$invites = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$invite = new Invite($row["inviteInviterId"], $row["inviteInviteeId"], $row["inviteTimestamp"], $row["invitePassphrase"]);
				$invites[$invites->key()] = $invite;
				$invites->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($invites);
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