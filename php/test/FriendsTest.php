<?php
namespace Edu\Cnm\kiteCrypt\Test;

require_once("Autoloader.php");


/**
 * kiteCrypt friends
 *
 * In kiteCrypt, users (profiles) can invite other users (friends) to be their friends
 *
 * @author G. Wells <gwells4@cnm.edu>
 * @version 1.0.0
 **/
class Friend implements \JsonSerializable {
	/**
	 * id for the user (the profile) inviting the friend in this friendship; it is a foreign key
	 * @var int $friendsProfileId
	 **/
	private $friendsProfileId;
	/**
	 * id for the user (the friend) being invited in this friendship; it is a foreign key
	 * @var int $friendsFriendId
	 **/
	private $friendsFriendId;


	/**
	 * constructor for this Friend
	 *
	 * @param int $newFriendsProfileId id for the user (the profile) inviting the friend in this friendship; it is a foreign key
	 * @param int $newFriendsFriendId id for the user (the friend) being invited in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if data types violate type hints
	 * @throws \RangeException if data values are out of bounds (for example: negative integers)
	 **/
	public function __construct(int $newFriendsProfileId , int $newFriendsFriendId) {
		try {
			$this->setFriendsProfileId($newFriendsProfileId);
			$this->setFriendsFriendId($newFriendsFriendId);
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
	 * accessor method for friendsProfileId
	 *
	 * @return int value of friendsProfileId
	 **/
	public function getFriendsProfileId() {
		return($this->friendsProfileId);
	}


	/**
	 * mutator method for friendsProfileId
	 *
	 * @param int $newFriendsProfileId id for the user (the profile) inviting the friend in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newFriendsProfileId is not an integer
	 * @throws \RangeException if $newFriendsProfileId is not positive
	 *
	 **/
	public function setFriendsProfileId(int $newFriendsProfileId) {

		// Verify the $newFriendsProfileId is safe
		$newFriendsProfileId = filter_var($newFriendsProfileId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newFriendsProfileId) === true) {
			throw(new \InvalidArgumentException("newFriendsProfileId is empty or insecure"));
		}
		// Verify that the $newFriendsProfileId is an integer.
		$newFriendsProfileId = filter_var($newFriendsProfileId, FILTER_VALIDATE_INT);
		if(empty($newFriendsProfileId) === true) {
			// If the $newFriendsProfileId is not an integer, throw a TypeError.
			throw(new \TypeError("newFriendsProfileId is not an integer."));
		}
		// Verify the $newFriendsProfileId is positive
		if($newFriendsProfileId <= 0) {
			throw(new \RangeException("newFriendsProfileId is not positive."));
		}

		// convert and store the $newFriendsProfileId
		$this->friendsProfileId = $newFriendsProfileId;
	}


	/**
	 * accessor method for friendsFriendId
	 *
	 * @return int value of friendsFriendId
	 **/
	public function getFriendsFriendId() {
		return($this->friendsFriendId);
	}


	/**
	 * mutator method for friendsFriendId
	 *
	 * @param int $newFriendsFriendId id for the user (the friend) being invited in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newFriendsFriendId is not an integer
	 * @throws \RangeException if $newFriendsFriendId is not positive
	 *
	 **/
	public function setFriendsFriendId(int $newFriendsFriendId) {

		// Verify the $newFriendsFriendId is safe
		$newFriendsFriendId = filter_var($newFriendsFriendId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($newFriendsFriendId) === true) {
			throw(new \InvalidArgumentException("newFriendsFriendId is empty or insecure"));
		}
		// Verify that the $newFriendsFriendId is an integer.
		$newFriendsFriendId = filter_var($newFriendsFriendId, FILTER_VALIDATE_INT);
		if(empty($newFriendsFriendId) === true) {
			// If the $newFriendsFriendId is not an integer, throw a TypeError.
			throw(new \TypeError("newFriendsFriendId is not an integer."));
		}
		// Verify the $newFriendsFriendId is positive
		if($newFriendsFriendId <= 0) {
			throw(new \RangeException("newFriendsFriendId is not positive."));
		}

		// convert and store the $newFriendsFriendId
		$this->friendsFriendId = $newFriendsFriendId;
	}


	/**
	 * inserts these Friends into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {

		// create query template
		$query = "INSERT INTO friends(friendsProfileId, friendsFriendId) VALUES(:friendsProfileId, :friendsFriendId)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["friendsProfileId" => $this->friendsProfileId, "friendsFriendId" => $this->friendsFriendId];
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
		$query = "DELETE FROM friends WHERE friendsProfileId = :friendsProfileId AND friendsFriendId = :friendsFriendId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["friendsProfileId" => $this->friendsProfileId, "friendsFriendId" => $this->friendsFriendId];
		$statement->execute($parameters);
	}


	/**
	 * gets the Friend by friendsProfileId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $friendsProfileId friendsProfileId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Friends found
	 *
	 * @throws \InvalidArgumentException if $friendsProfileId is not safe
	 * @throws \TypeError if $friendsProfileId is not an integer
	 * @throws \RangeException if $friendsProfileId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getFriendByFriendsProfileId(\PDO $pdo, int $friendsProfileId) {

		// Verify the $friendsProfileId is safe
		$friendsProfileId = filter_var($friendsProfileId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($friendsProfileId) === true) {
			throw(new \InvalidArgumentException("friendsProfileId is empty or insecure"));
		}
		// Verify that the $friendsProfileId is an integer.
		$friendsProfileId = filter_var($friendsProfileId, FILTER_VALIDATE_INT);
		if(empty($friendsProfileId) === true) {
			// If the $friendsProfileId is not an integer, throw a TypeError.
			throw(new \TypeError("friendsProfileId is not an integer."));
		}
		// Verify the $friendsProfileId is positive
		if($friendsProfileId <= 0) {
			throw(new \RangeException("friendsProfileId is not positive."));
		}

		// create query template
		$query = "SELECT friendsProfileId, friendsFriendId FROM friends WHERE friendsProfileId = :friendsProfileId";
		$statement = $pdo->prepare($query);

		// bind the friendsProfileId to the place holder in the template
		$parameters = ["friendsProfileId" => $friendsProfileId];
		$statement->execute($parameters);

		// build an array of friends
		$friends = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friend = new Friend($row["friendsProfileId"], $row["friendsFriendId"]);
				$friends[$friends->key()] = $friend;
				$friends->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friends);
	}


	/**
	 * gets the Friend by friendsFriendId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $friendsFriendId friendsFriendId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Friends found
	 *
	 * @throws \InvalidArgumentException if $friendsFriendId is not safe
	 * @throws \TypeError if $friendsFriendId is not an integer
	 * @throws \RangeException if $friendsFriendId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getFriendByFriendsFriendId(\PDO $pdo, int $friendsFriendId) {

		// Verify the $friendsFriendId is safe
		$friendsFriendId = filter_var($friendsFriendId, FILTER_SANITIZE_NUMBER_INT);
		if(empty($friendsFriendId) === true) {
			throw(new \InvalidArgumentException("friendsFriendId is empty or insecure"));
		}
		// Verify that the $friendsFriendId is an integer.
		$friendsFriendId = filter_var($friendsFriendId, FILTER_VALIDATE_INT);
		if(empty($friendsFriendId) === true) {
			// If the $friendsFriendId is not an integer, throw a TypeError.
			throw(new \TypeError("friendsFriendId is not an integer."));
		}
		// Verify the $friendsFriendId is positive
		if($friendsFriendId <= 0) {
			throw(new \RangeException("friendsFriendId is not positive."));
		}

		// create query template
		$query = "SELECT friendsProfileId, friendsFriendId FROM friends WHERE friendsFriendId = :friendsFriendId";
		$statement = $pdo->prepare($query);

		// bind the friendsFriendId to the place holder in the template
		$parameters = ["friendsFriendId" => $friendsFriendId];
		$statement->execute($parameters);

		// build an array of friends
		$friends = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friend = new Friend($row["friendsProfileId"], $row["friendsFriendId"]);
				$friends[$friends->key()] = $friend;
				$friends->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friends);
	}


	/**
	 * gets all Friendships
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @return \SplFixedArray SplFixedArray of Tweets found or null if not found
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getAllFriends(\PDO $pdo) {
		// create query template
		$query = "SELECT friendsProfileId, friendsFriendId FROM friends";
		$statement = $pdo->prepare($query);
		$statement->execute();

		// build an array of friends
		$friends = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friend = new Friend($row["friendsProfileId"], $row["friendsFriendId"]);
				$friends[$friends->key()] = $friend;
				$friends->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friends);
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