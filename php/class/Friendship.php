<?php
namespace Edu\Cnm\KiteCrypt;

require_once("autoloader.php");


/**
 * kiteCrypt friendships
 *
 * In kiteCrypt, users (profiles) can invite other users (friends) to be their friends
 *
 * @author G. Wells <gwells4@cnm.edu>
 * @version 1.0.0
 **/
class Friendship implements \JsonSerializable {
	/**
	 * id for the user (the inviter) inviting the friend in this friendship; it is a foreign key
	 * @var int $friendshipInviterId
	 **/
	private $friendshipInviterId;

	/**
	 * id for the user (the friend) being invited in this friendship; it is a foreign key
	 * @var int $friendshipInviteeId
	 **/
	private $friendshipInviteeId;

	/**
	 * friendship ID which is created by taking concentrating inviter and invitee id's but start with lower int.
	 * @var int $friendshipInviteeId
	 **/
	private $friendshipId;


	/**
	 * constructor for this Friendship
	 *
	 * @param int $newFriendshipInviterId id for the user (the inviter) inviting the friend in this friendship; it is a foreign key
	 * @param int $newFriendshipInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign
	 * * @param int $newFriendshipId id is a concatenation of InviterId and InviteeId, but lower number first on concatenation.
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if data types violate type hints
	 * @throws \RangeException if data values are out of bounds (for example: negative integers)
	 **/
	public function __construct(int $newFriendshipInviterId , int $newFriendshipInviteeId, int $newFriendshipId) {
		try {
			$this->setFriendshipInviterId($newFriendshipInviterId);
			$this->setFriendshipInviteeId($newFriendshipInviteeId);
			$this->setFriendshipId($newFriendshipId);
		} catch(\TypeError $typeError) {
			// rethrow the TypeError to the caller
			throw(new \TypeError($typeError->getMessage(), 0, $typeError));
		} catch(\RangeException $range) {
			// rethrow the RangeException to the caller
			throw(new \RangeException($range->getMessage(), 0, $range));
		}
	}


	/**
	 * accessor method for friendshipInviterId
	 *
	 * @return int value of friendshipInviterId
	 **/
	public function getFriendshipInviterId() {
		return($this->friendshipInviterId);
	}


	/**
	 * mutator method for friendshipInviterId
	 *
	 * @param int $newFriendshipInviterId id for the user (the inviter) inviting the friend in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newFriendshipInviterId is not an integer
	 * @throws \RangeException if $newFriendshipInviterId is not positive
	 **/
	public function setFriendshipInviterId(int $newFriendshipInviterId) {


		// Verify the $newFriendshipInviterId is positive
		if($newFriendshipInviterId <= 0) {
			throw(new \RangeException("newFriendshipInviterId is not positive."));
		}

		// store the $newFriendshipInviterId
		$this->friendshipInviterId = $newFriendshipInviterId;
	}


	/**
	 * accessor method for friendshipInviteeId
	 *
	 * @return int value of friendshipInviteeId
	 **/
	public function getFriendshipInviteeId() {
		return($this->friendshipInviteeId);
	}


	/**
	 * mutator method for friendshipInviteeId
	 *
	 * @param int $newFriendshipInviteeId id for the user (the invitee) being invited in this friendship; it is a foreign key
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newFriendshipInviteeId is not an integer
	 * @throws \RangeException if $newFriendshipInviteeId is not positive
	 **/
	public function setFriendshipInviteeId(int $newFriendshipInviteeId) {

		// Verify the $newFriendshipInviteeId is positive
		if($newFriendshipInviteeId <= 0) {
			throw(new \RangeException("newFriendshipInviteeId is not positive."));
		}

		// store the $newFriendshipInviteeId
		$this->friendshipInviteeId = $newFriendshipInviteeId;
	}

	/**
	 * accessor method for friendshipId
	 *
	 * @return int value of friendshipId
	 **/
	public function getFriendshipId() {
		return($this->friendshipId);
	}


	/**
	 * mutator method for friendshipId
	 *
	 * @param int $newFriendshipInviteeId  id creating a friendship channel
	 *
	 * @param int $newFriendshipInviterId  id creating a friendship channel
	 *
	 * @throws \InvalidArgumentException if the argument is not safe
	 * @throws \TypeError if $newFriendshipId is not an integer
	 * @throws \RangeException if $newFriendshipId is not positive
	 **/
	public function setFriendshipId(int $newFriendshipInviterId, int $newFriendshipInviteeId) {


		// Verify the $newFriendshipId is positive
		if($newFriendshipInviterId  <= 0) {
			throw(new \RangeException("newFriendshipInviterId is not positive."));
		}
		if($newFriendshipInviteeId <= 0) {
			throw(new \RangeException("newFriendshipInviteeId is not positive."));
		}

		if( $newFriendshipInviterId < $newFriendshipInviteeId) {
			$newFriendshipId = $newFriendshipInviterId . $newFriendshipInviteeId;
		}
		elseif($newFriendshipInviteeId < $newFriendshipInviterId ){
			$newFriendshipId = $newFriendshipInviteeId . $newFriendshipInviterId;
		}
		else {
			throw(new \InvalidArgumentException("Cannot be friends with self"));
		}

		// store the $newFriendshipId
		$this->friendshipId = intval($newFriendshipId);
	}







	/**
	 * inserts this Friendship into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {

		// create query template
		$query = "INSERT INTO friendship(friendshipInviterId, friendshipInviteeId, friendshipId) VALUES(:friendshipInviterId, :friendshipInviteeId, :friendshipId)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["friendshipInviterId" => $this->friendshipInviterId, "friendshipInviteeId" => $this->friendshipInviteeId, "friendshipId" => $this->friendshipId];
		$statement->execute($parameters);

	}


	/**
	 * deletes these Friends from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 *
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \RuntimeException if $pdo is not in the database
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function delete(\PDO $pdo) {

		// create query template
		$query = "DELETE FROM friendship WHERE friendshipInviterId = :friendshipInviterId AND friendshipInviteeId = :friendshipInviteeId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["friendshipInviterId" => $this->friendshipInviterId, "friendshipInviteeId" => $this->friendshipInviteeId, "friendshipId" => $this->friendshipId];
		$statement->execute($parameters);
	}


	/**
	 * gets the Friendship by friendshipInviterId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $friendshipInviterId friendshipInviterId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Friendships found
	 *
	 * @throws \InvalidArgumentException if $friendshipInviterId is not safe
	 * @throws \TypeError if $friendshipInviterId is not an integer
	 * @throws \RangeException if $friendshipInviterId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getFriendshipByFriendshipInviterId(\PDO $pdo, int $friendshipInviterId) {

		// Verify the $friendshipInviterId is positive
		if($friendshipInviterId <= 0) {
			throw(new \RangeException("friendshipInviterId is not positive."));
		}

		// create query template
		$query = "SELECT friendshipInviterId, friendshipInviteeId , friendshipId FROM friendship WHERE friendshipInviterId = :friendshipInviterId";
		$statement = $pdo->prepare($query);

		// bind the friendshipInviterId to the placeholder in the template
		$parameters = ["friendshipInviterId" => $friendshipInviterId];
		$statement->execute($parameters);

		// build an array of friendships
		$friendships = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friendship = new Friendship($row["friendshipInviterId"], $row["friendshipInviteeId"], $row["friendshipId"]);
				$friendships[$friendships->key()] = $friendship;
				$friendships->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friendships);
	}


	/**
	 * gets the Friendship by friendshipInviteeId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $friendshipInviteeId friendshipInviteeId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Friends found
	 *
	 * @throws \InvalidArgumentException if $friendshipInviteeId is not safe
	 * @throws \TypeError if $friendshipInviteeId is not an integer
	 * @throws \RangeException if $friendshipInviteeId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getFriendshipByFriendshipInviteeId(\PDO $pdo, int $friendshipInviteeId) {

		// Verify the $friendshipInviteeId is positive
		if($friendshipInviteeId <= 0) {
			throw(new \RangeException("friendshipInviteeId is not positive."));
		}

		// create query template
		$query = "SELECT friendshipInviterId, friendshipInviteeId, friendshipId FROM friendship WHERE friendshipInviteeId = :friendshipInviteeId";
		$statement = $pdo->prepare($query);

		// bind the friendshipInviteeId to the placeholder in the template
		$parameters = ["friendshipInviteeId" => $friendshipInviteeId];
		$statement->execute($parameters);

		// build an array of friendships
		$friendships = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friendship = new Friendship($row["friendshipInviterId"], $row["friendshipInviteeId"]);
				$friendships[$friendships->key()] = $friendship;
				$friendships->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friendships);
	}

	/**
	 * gets the Friendship by friendshipId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $friendshipId to search for
	 *
	 * @return \SplFixedArray SplFixedArray of Friends found
	 *
	 * @throws \InvalidArgumentException if $friendshipId is not safe
	 * @throws \TypeError if $friendshipId is not an integer
	 * @throws \RangeException if $friendshipId is not positive
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getFriendshipByfriendshipId(\PDO $pdo, int $friendshipId) {

		// Verify the $friendshipId is positive
		if($friendshipId <= 0) {
			throw(new \RangeException("friendId is not positive."));
		}

		// create query template
		$query = "SELECT friendshipInviterId, friendshipInviteeId , friendshipId FROM friendship WHERE friendshipId = :friendshipId";
		$statement = $pdo->prepare($query);

		// bind the friendshipId to the placeholder in the template
		$parameters = ["friendshipId" => $friendshipId];
		$statement->execute($parameters);

		// build an array of friendships
		$friendships = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$friendship = new Friendship($row["friendshipInviterId"], $row["friendshipInviteeId"], $row["friendshipId"]);
				$friendships[$friendships->key()] = $friendship;
				$friendships->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($friendships);
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