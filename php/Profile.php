<?php
	namespace Edu\Cnm\KiteCrypt;
	require_once("autoload.php");

	/**
	 * Profile Class creation
	 *
	 * @author Jon Sheafe <msckj@yahoo.com>
	 * @version 1.0.0
	 */

class Profile implements \JsonSerializable {

	/**
	 * id for profile; this is the primary key
	 * @var int $profileId
	 * **/
	private $profileId;

	/**
	 * User Name for provile;
	 * @var string
	 * **/
	private $profileUserName;

	  /**
		* Public Key for encryption for profile
		*
		* @var string
		*/
	  private $profilePublicKey;

	/**
	 * constructor for this Profile
	 *
	 * @param int|null $newProfileId  id of profile or null if a new profile.
	 * @param string $newProfileUserName string containing user name
	 * @param string $newProfilePublicKey string containing user public key data for encryption.
	 *
	 */
	public function __construct(int $newProfileId = null, string $newProfileUserName, string $newProfilePublicKey) {
		try {
			$this->setProfileId($newProfileId);
			$this->setProfileUserName($newProfileUserName);
			$this->setProfilePublicKey($newProfilePublicKey);
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
		$this->profileId = $newProfileId;
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
	 * accessor method for profile public key
	 *
	 * @return string value of profile public key
	 */
	public function getProfilePublicKey() {
		return($this->profilePublicKey);
	}
	/*
	 * mutator method for profile public key
	 *
	 * @param string $newProfilePublicKey
	 * @throws \InvalidArgumentException if $newProfilePublicKey is not a string or insecure
	 * @throws \RangeException if $newProfilePublicKey is > 1024 characters
	 * @throws \TypeError if $newProfilePublicKEy is not a string
	 */
	public function setProfilePublicKey(string $newProfilePublicKey) {
		// verify the profile public key is secure
		$newProfilePublicKey = trim($newProfilePublicKey);
		$newProfilePublicKey = filter_var($newProfilePublicKey, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
		if(empty(@$newProfilePublicKey) === true) {
			throw(new \InvalidArgumentException("profile public key is empty or insecure"));
		}
		// verify profile public key will fit in database
		if(strlen($newProfilePublicKey) > 1024) {
			throw (new \RangeException("profile public key content is too large"));
		}
		// store the profile public key
		$this->profilePublicKey = $newProfilePublicKey;
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