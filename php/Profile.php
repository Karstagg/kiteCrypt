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
	private $profile;

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



	}