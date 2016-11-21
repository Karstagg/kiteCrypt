<?php
	namespace Edu\Cnm\KiteCrypt;
	require_once("autoloader.php");

	/**
	 * Profile Class creation
	 *
	 * @author Jon Sheafe <msckj@yahoo.com>
	 * @version 1.0.0
	 */

class Profile implements \JsonSerializable {

	/**
	 * id for profile; this is the primary key
	 * @var int|null $profileId
	 * **/
	private $profileId;

	/**
	 * User Name for profile;
	 * @var string
	 * **/
	private $profileUserName;

	  /**
		* Public Key X for encryption for profile
		*
		* @var string
		*/
	private $profilePublicKeyX;

	/**
	 * Public Key Y for encryption for profile
	 *
	 * @var string
	 */
	private $profilePublicKeyY;

	/**
	 * Password Salt
	 */
	private $profilePasswordSalt;


	/**
	 * constructor for this Profile
	 *
	 * @param int|null $newProfileId id of profile or null if a new profile.
	 * @param string $newProfileUserName string containing user name
	 * @param string $newProfilePublicKeyX string containing user public key data for encryption.
	 * @param string $newProfilePublicKeyY
	 * @param string $newProfilePasswordSalt
	 * @throws \Exception
	 * @throws \TypeError
	 */
	public function __construct(int $newProfileId = null, string $newProfileUserName, string $newProfilePublicKeyX, string $newProfilePublicKeyY, string $newProfilePasswordSalt) {
		try {
			$this->setProfileId($newProfileId);
			$this->setProfileUserName($newProfileUserName);
			$this->setProfilePublicKeyX($newProfilePublicKeyX);
			$this->setProfilePublicKeyY($newProfilePublicKeyY);
			$this->setProfilePasswordSalt($newProfilePasswordSalt);
		}
		catch(\InvalidArgumentException $invalidArgument) {
			// rethrow the exception to caller
			throw(new \InvalidArgumentException($invalidArgument->getMessage(), 0, $invalidArgument));
		}
		catch(\RangeException $range ) {
			// rethrow the exception to the caller
			throw(new \RangeException($range->getMessage(), 0, $range));
		}
		catch(\TypeError $typeError) {
			// rethrow the exception to the caller
			throw(new \TypeError($typeError->getMessage(), 0, $typeError));
		}
		catch(\Exception $exception) {
			// rethrow the exception to caller
			throw(new \Exception($exception->getMessage(), 0, $exception));
		}

	}
/*
 * accessor method for profile id
 *
 * @return int|null value of user id
 */
	/**
	 * @return int
	 */
	public function getProfileId() {
		return ($this->profileId);
	}

	/*
	 * mutator method for profile id
	 *
	 * @param int|null $newProfileId new value of profile id
	 * @throws \RangeException if $newProfileId is not positive
	 * @throws \TypeError if $newProfileId is not an integer
	 */
	public function setProfileId(int $newProfileId = null) {
		// base case: if th eprofile id is null, this new profile without a mySQL assigned id (yet)
		if($newProfileId === null) {
			$this->profileId = null;
			return;
		}
		// verify the profile id is positive
		if($newProfileId <= 0) {
			throw(new \RangeException("profile id is not positive"));
		}
		// convert and store the profile id
			$this-> profileId = $newProfileId;
	}

	/*
	 * accessor method for profile user name
	 *
	 * @return string value of profile user name
	 */
	public function getProfileUserName() {
		return($this->profileUserName);
	}

	/*
	 * mutator for profile user name
	 *
	 * @param string $newProfileUserName new value of user name
	 * @throws \InvalidArgumentException if $newProfileUserName is not a string or insecure
	 * @throws \RangeException if $newProfileUserName is >20 characters
	 * @throws \TypeError if $newProfileUserName is not a string
	 */
	public function setProfileUserName(string $newProfileUserName) {
		// verify the user name is secure
		$newProfileUserName = trim($newProfileUserName);
		$newProfileUserName = filter_var($newProfileUserName, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($newProfileUserName) === true) {
			throw(new \InvalidArgumentException("profile user name is empty or insecure"));
		}

		// verify the profile user name will fit in the database
		if(strlen($newProfileUserName) > 20) {
			throw(new \RangeException("profile user name too large"));
		}
		$this->profileUserName = $newProfileUserName;
	}


	/*
	 * accessor method for profile public key X
	 *
	 * @return string value of profile public key X
	 */
	public function getProfilePublicKeyX() {
		return($this->profilePublicKeyX);
	}
	/*
	 * mutator method for profile public key X
	 *
	 * @param string $newProfilePublicKeyX
	 * @throws \InvalidArgumentException if $newProfilePublicKeyX is not a string or insecure
	 * @throws \RangeException if $newProfilePublicKeyX is > 256 characters
	 * @throws \TypeError if $newProfilePublicKeyX is not a string
	 */
	public function setProfilePublicKeyX(string $newProfilePublicKeyX) {
		// verify the profile public key X is secure
		$newProfilePublicKeyX = trim($newProfilePublicKeyX);
		$newProfilePublicKeyX = filter_var($newProfilePublicKeyX, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty(@$newProfilePublicKeyX) === true) {
			throw(new \InvalidArgumentException("profile public key X is empty or insecure"));
		}
		// verify profile public key will fit in database
		if(strlen($newProfilePublicKeyX) > 256) {
			throw (new \RangeException("profile public key X content is too large"));
		}
		// store the profile public keyX
		$this->profilePublicKeyX = $newProfilePublicKeyX;
	}


	/*
	 * accessor method for profile public key Y
	 *
	 * @return string value of profile public key Y is secure
	 */
	public function getProfilePublicKeyY() {
		return ($this->profilePublicKeyY);
	}
		/*
		 * mutator method for profile public key Y
		 *
		 * @param string $newProfilePublicKeyY
		 * @throws \InvalidArgumentException if $newProfilePublicKeyY is not a string or insecure
		 * @throw RangeException if $newProfilePublicKeyY is > 256 characters
		 * @throws \TypeError if $newProfilePublicKey Y is not a string
		 */
	public function setProfilePublicKeyY(string $newProfilePublicKeyY) {
		// verify the profile public key Y is secure
		$newProfilePublicKeyY = trim($newProfilePublicKeyY);
		$newProfilePublicKeyY = filter_var($newProfilePublicKeyY, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty(@$newProfilePublicKeyY) === true) {
			throw(new \RangeException("profile public key Y content is empty"));
		}
		// verify profile public key Y will fit in database
		if(strlen($newProfilePublicKeyY) > 256){
			throw (new \RangeException("profile public key Y content is too large"));
		}
		// store the profile public key Y
			$this->profilePublicKeyY = $newProfilePublicKeyY;
		}


		/*
		 * accessor method for profile password salt
		 *   @return string value of password salt
		 */
	public function getProfilePasswordSalt() {
			return ($this->profilePasswordSalt);
		}

		/*
		 * mutator method for profile password key
		 *
		 * @param string $newProfilePasswordSalt
		 * @throws \InvalidArgumentException if $newProfilePasswordSalt is not a string or insecure
		 * @throw RangeException is $newProfilePasswordSalt is > 256 characters
		 * @throw \TypeError is $newProfilePasswordSalt
		 */
	public function setProfilePasswordSalt(string $newProfilePasswordSalt) {
		// verify profile password salt is secure
		$newProfilePasswordSalt = trim($newProfilePasswordSalt);
		$newProfilePasswordSalt = filter_var($newProfilePasswordSalt, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty(@$newProfilePasswordSalt) === true) {
			throw(new \RangeException("profile password salt is empty"));
			}
		// verity profile password salt fit database
		if(strlen($newProfilePasswordSalt) >256) {
			throw(new \RangeException("password salt is too large"));
			}
		// store the password salt
		$this->profilePasswordSalt = $newProfilePasswordSalt;
		}




	/*
	 * inserts this profile into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOExeception when my SQL related errors occur
	 * @throws |TypeError if $pdo is not a PDO connection object
	 */
	public function insert(\PDO $pdo) {
		// enforce the profileId is null (i,e, dont insert a profile that already exists)
		if($this->profileId !== null) {
			throw(new \PDOException("not a new profile"));
		}

		// create a query template
		$query = "INSERT INTO profile(profileUserName, profilePublicKeyX, profilePublicKeyY, profilePasswordSalt) VALUES(:profileUserName, :profilePublicKeyX, :profilePublicKeyY, :profilePasswordSalt)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the palce holders in the template
		$parameters = ["profileUserName" => $this->profileUserName, "profilePublicKeyX" => $this->profilePublicKeyX, "profilePublicKeyY" => $this->profilePublicKeyY, "profilePasswordSalt" => $this->profilePasswordSalt];
		$statement->execute($parameters);

		// update the null profileId with what mySQL just gave us
		$this->profileId =intval($pdo->lastInsertId());
}

	/*
	 * deletes this Profile from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySqL related erros occur
	 * @throw \TypeError if $pdo is not a PDO connection object
	 *
	 */
	public function delete(\PDO $pdo) {
		// enforce the profile ID is not null (i.e., dont delete a profile that hasn't been inserted)
		if($this->profileId === null) {
			throw(new \PDOException("unable to delete a profile that does not exist"));
		}
		// create query template
		$query = "DELETE FROM profile WHERE  profileId = :profileId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holder in the template
		$parameters = ["profileId" => $this->profileId];
		$statement->execute($parameters);
	}

	/*
	 * updates this profile in mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 * @throws \TypeError if $pdo is not a PDO connection object
	 */
	public function update(\PDO $pdo) {
		// enfore the profileId is not null (i.e., don't update a profile that hasn't been inserted)
		if($this->profileId === null) {
			throw(new \PDOException("unable to update a profile that does not exist"));
		}

		// create query template
		$query = "UPDATE profile SET profileUserName = :profileUserName, profilePublicKeyX = :profilePublicKeyX, profilePublicKeyY = :profilePublicKeyY, profilePasswordSalt = :profilePasswordSalt";
		$statement = $pdo->prepare($query);

		// bind member variables to the pace hoders in the template
		$parameters = ["profileUserName" => $this->profileUserName, "profilePublicKeyX" => $this->profilePublicKeyX, "profilePublicKeyY" => $this->profilePublicKeyY, "profilePasswordSalt" => $this->profilePasswordSalt];
		$statement->execute($parameters);
	}

	/*
	 * gets the profile by Id
	 *
	 * @param \PDO $pdo connection object
	 * @param int $profileId profile id to search for
	 * @return Profile|null profile found or null if not found
	 * @throow \PDOException when mySAL related errors occur
	 * @throw \TypeError when variables are not the correct data type
	 */

	public static	function getProfileById(\PDO $pdo, int $profileId) {
		// sanitive teh description before searching
		if($profileId <= 0) {
			throw(new \PDOException("profile id is not positive"));
	}
	// create query template
		$query = "SELECT profileId,  profileUserName, profilePublicKeyX, profilePublicKeyY, profilePasswordSalt FROM profile WHERE profileId = :profileId";
		$statement = $pdo->prepare($query);

		// bind the profile id to the place holder in the template
		$parameters = ["profileId" => $profileId];
		$statement->execute($parameters);

		// grab the profile from mySQL
		try {
			$profile = null;
			$statement->setFetchMode(\PDO::FETCH_ASSOC);
			$row = $statement->fetch();
			if($row !== false) {
				$profile = new Profile($row["profileId"], $row["profileUserName"], $row["profilePublicKeyX"], $row["profilePublicKeyY"], $row["profilePasswordSalt"]);
			}
		}catch(\Exception $exception)  {
				// if the row could't be converted, rethrow it
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}
		return($profile);
}
 	public static function getProfileByUserName(\PDO $pdo, string $profileUserName) {
		 // sanitive the description before searching
	 	$profileUserName = trim($profileUserName);
	 	$profileUserName = filter_var($profileUserName, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	 	if(empty($profileUserName) === true) {
		 throw(new \PDOException("profile User Name is invalid"));
	 }
	 // create query template
	 	$query = "SELECT profileId, profileUserName, profilePublicKeyX, profilePublicKeyY, profilePasswordSalt FROM profile WHERE profileUserName LIKE ':profileUserName'";
	 	$statement = $pdo->prepare($query);

	 	// bind teh profile user name to the place holder in the template
	 	$profileUserName = "%$profileUserName%";
	 	$parameters = ["profileUserName" => $profileUserName];
		 $statement->execute($parameters);

		 // build an array of profiles
	 	$profiles = new \SplFixedArray($statement->rowCount());
		 $statement->setFetchMode(\PDO::FETCH_ASSOC);
	 	while(($row = $statement->fetch()) !== false) {
		 try {
			 $profile = new Profile($row["profileId"], $row["profileUserName"], $row["profilePublicKeyX"], $row["profilePublicKeyY"], $row["profilePasswordSalt"]);
			 $profiles[$profiles->key()] = $profile;
			 $profiles->next();
			 } catch(\Exception $exception) {
			 // if the row couldn't be converted, rethrow it
			 throw(new \PDOException($exception->getMessage(), 0, $exception));
		 }
	 }
	 	return($profiles);
 }




/*
 * get public key X by public key
 *
 * @param \PDO $pdo PDO connection object
 * @param string $profilePublicKey to search
 * @return \SplFixArray SplFixedArray of public key found
 * @throw \PDOException when mySQL related errors occur
 * @throw \TypeError when variable are not the correct data type
 */
 	public static function getProfileByProfilePublicKeyX(\PDO $pdo, string $profilePublicKeyX) {
		// sanitize the description before searching
		$profilePublicKeyX= trim($profilePublicKeyX);
		$profilePublicKeyX = filter_var($profilePublicKeyX, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($profilePublicKey) === true) {
		throw(new \PDOException("Public Key X is invalid"));
	}

	//create query template
	$query = "SELECT profileId, profileUserName, profilePublicKeyX, profilePublicKeyY, profilePasswordSalt FROM profile WHERE profilePubicKeyX LIKE :profilePublicKeyX";
	$statement = $pdo->prepare($query);

	// bind the public key to the place holder in the template
	$profilePublicKeyX = "%$profilePublicKeyX%";
	$parameters = ["profilePublicKeyX" => $profilePublicKeyX];
	$statement->execute($parameters);

	// build an array of public keys
	$profiles = new \SplFixedArray($statement->rowCount());
	$statement->setFetchMode(\PDO::FETCH_ASSOC);
	while(($row = $statement->fetch()) !== false) {
		try {
			$profile = new Profile($row["profileId"], $row["profileUserName"], $row["profilePublicKeyX"], $row["profilePublicKeyY"], $row["profilePasswordSalt"]);
			$profiles[$profiles->key()] = $profile;
			$profiles->next();
		} catch(\Exception $exception) {
			// if the row couldn't be converted, rethrow it
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}
	}
		return($profiles);
}


	public static function getProfileByProfilePublicKeyY(\PDO $pdo, string $profilePublicKeyY) {
		// sanitize the description before searching
		$profilePublicKeyY = trim($profilePublicKeyY);
		$profilePublicKeyY = filter_var($profilePublicKeyY, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($profilePublicKey) === true) {
			throw(new \PDOException("Public Key Y is invalid"));
		}

		//create query template
		$query = "SELECT profileId, profileUserName, profilePublicKeyY, profilePublicKeyY, profilePasswordSalt FROM profile WHERE profilePubicKeyY LIKE :profilePublicKeyY";
		$statement = $pdo->prepare($query);

		// bind the public key to the place holder in the template
		$profilePublicKeyY = "%$profilePublicKeyY%";
		$parameters = ["profilePublicKeyY" => $profilePublicKeyY];
		$statement->execute($parameters);

		// build an array of public keys
		$profiles = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$profile = new Profile($row["profileId"], $row["profileUserName"], $row["profilePublicKeyY"], $row["profilePublicKeyY"], $row["profilePasswordSalt"]);
				$profiles[$profiles->key()] = $profile;
				$profiles->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return ($profiles);

	}

	public static function getProfileByProfilePasswordSalt(\PDO $pdo, string $profilePasswordSalt) {
		// sanitize the description before searching
		$profilePasswordSalt = trim($profilePasswordSalt);
		$profilePasswordSalt = filter_var($$profilePasswordSalt, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty($profilePublicKey) === true) {
			throw(new \PDOException("Public Key is invalid"));
		}

		//create query template
		$query = "SELECT profileId, profileUserName, profilePublicKeyX, profilePublicKeyY, profilePasswordSalt FROM profile WHERE profilePasswordSalt LIKE :profilePasswordSalt";
		$statement = $pdo->prepare($query);

		// bind the public key to the place holder in the template
		$profilePasswordSalt = "%$profilePasswordSalt%";
		$parameters = ["profilePasswordSalt" => $profilePasswordSalt];
		$statement->execute($parameters);

		// build an array of public keys
		$profiles = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$profile = new Profile($row["profileId"], $row["profileUserName"], $row["profilePublicKeyX"], $row["profilePublicKeyY"], $row["profilePasswordSalt"]);
				$profiles[$profiles->key()] = $profile;
				$profiles->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return ($profiles);

	}

















	/*
	 * formats the state variables for JSON serialization
	 *
	 * @return array results state variables to seialize
	 */
	public function jsonSerialize(){
		$fields = get_object_vars($this);
		return($fields);
	}








}