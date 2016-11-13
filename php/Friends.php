<?php
namespace Edu\Cnm\kiteCrypt;

require_once("autoloader.php");

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
		// Verify that the $newFriendsProfileId in an integer.
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
		// Verify that the $newFriendsFriendId in an integer.
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
	 * inserts this Tweet into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function insert(\PDO $pdo) {
		// enforce the tweetId is null (i.e., don't insert a tweet that already exists)
		if($this->tweetId !== null) {
			throw(new \PDOException("not a new tweet"));
		}

		// create query template
		$query = "INSERT INTO tweet(tweetProfileId, tweetContent, tweetDate) VALUES(:tweetProfileId, :tweetContent, :tweetDate)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$formattedDate = $this->tweetDate->format("Y-m-d H:i:s");
		$parameters = ["tweetProfileId" => $this->tweetProfileId, "tweetContent" => $this->tweetContent, "tweetDate" => $formattedDate];
		$statement->execute($parameters);

		// update the null tweetId with what mySQL just gave us
		$this->tweetId = intval($pdo->lastInsertId());
	}


	/**
	 * deletes this Tweet from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function delete(\PDO $pdo) {
		// enforce the tweetId is not null (i.e., don't delete a tweet that hasn't been inserted)
		if($this->tweetId === null) {
			throw(new \PDOException("unable to delete a tweet that does not exist"));
		}

		// create query template
		$query = "DELETE FROM tweet WHERE tweetId = :tweetId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["tweetId" => $this->tweetId];
		$statement->execute($parameters);
	}

	/**
	 * updates this Tweet in mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 **/
	public function update(\PDO $pdo) {
		// enforce the tweetId is not null (i.e., don't update a tweet that hasn't been inserted)
		if($this->tweetId === null) {
			throw(new \PDOException("unable to update a tweet that does not exist"));
		}

		// create query template
		$query = "UPDATE tweet SET tweetProfileId = :tweetProfileId, tweetContent = :tweetContent, tweetDate = :tweetDate WHERE tweetId = :tweetId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$formattedDate = $this->tweetDate->format("Y-m-d H:i:s");
		$parameters = ["tweetProfileId" => $this->tweetProfileId, "tweetContent" => $this->tweetContent, "tweetDate" => $formattedDate, "tweetId" => $this->tweetId];
		$statement->execute($parameters);
	}


	/**
	 * gets the Tweet by tweetId
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $tweetId tweet id to search for
	 * @return Tweet|null Tweet found or null if not found
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getTweetByTweetId(\PDO $pdo, int $tweetId) {
		// sanitize the tweetId before searching
		if($tweetId <= 0) {
			throw(new \PDOException("tweet id is not positive"));
		}

		// create query template
		$query = "SELECT tweetId, tweetProfileId, tweetContent, tweetDate FROM tweet WHERE tweetId = :tweetId";
		$statement = $pdo->prepare($query);

		// bind the tweet id to the place holder in the template
		$parameters = ["tweetId" => $tweetId];
		$statement->execute($parameters);

		// grab the tweet from mySQL
		try {
			$tweet = null;
			$statement->setFetchMode(\PDO::FETCH_ASSOC);
			$row = $statement->fetch();
			if($row !== false) {
				$tweet = new Tweet($row["tweetId"], $row["tweetProfileId"], $row["tweetContent"], $row["tweetDate"]);
			}
		} catch(\Exception $exception) {
			// if the row couldn't be converted, rethrow it
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}
		return($tweet);
	}

	/**
	 * gets the Tweet by profile id
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param int $tweetProfileId profile id to search by
	 * @return \SplFixedArray SplFixedArray of Tweets found
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getTweetByTweetProfileId(\PDO $pdo, int $tweetProfileId) {
		// sanitize the profile id before searching
		if($tweetProfileId <= 0) {
			throw(new \RangeException("tweet profile id must be positive"));
		}

		// create query template
		$query = "SELECT tweetId, tweetProfileId, tweetContent, tweetDate FROM tweet WHERE tweetProfileId = :tweetProfileId";
		$statement = $pdo->prepare($query);

		// bind the tweet profile id to the place holder in the template
		$parameters = ["tweetProfileId" => $tweetProfileId];
		$statement->execute($parameters);

		// build an array of tweets
		$tweets = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$tweet = new Tweet($row["tweetId"], $row["tweetProfileId"], $row["tweetContent"], $row["tweetDate"]);
				$tweets[$tweets->key()] = $tweet;
				$tweets->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return($tweets);
	}

	/**
	 * gets all Tweets
	 *
	 * @param \PDO $pdo PDO connection object
	 * @return \SplFixedArray SplFixedArray of Tweets found or null if not found
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError when variables are not the correct data type
	 **/
	public static function getAllTweets(\PDO $pdo) {
		// create query template
		$query = "SELECT tweetId, tweetProfileId, tweetContent, tweetDate FROM tweet";
		$statement = $pdo->prepare($query);
		$statement->execute();

		// build an array of tweets
		$tweets = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$tweet = new Tweet($row["tweetId"], $row["tweetProfileId"], $row["tweetContent"], $row["tweetDate"]);
				$tweets[$tweets->key()] = $tweet;
				$tweets->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return ($tweets);
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