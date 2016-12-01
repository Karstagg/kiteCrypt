<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Message};

// Include the project test parameters
require_once("KiteCryptTest.php");

// Include the class under scrutiny
require_once(dirname(__DIR__) . "/class/autoloader.php");


/**
 * Full PHPUnit test for the Message class
 *
 * This is a complete PHPUnit test of the Message class. It is complete because *ALL* mySQL/PDO enabled methods
 * are tested for both invalid and valid inputs.
 *
 * @see Message
 * @author G. Wells <gwells4@cnm.edu>
 **/
class MessageTest extends KiteCryptTest {

	/**
	 * id for the Message; this is the primary key
	 * @var int|null $messageId
	 * **/
	protected $validMessageId = null;

	/**
	 * Timestamp of the Message; this starts as null and is assigned by MySQL
	 * @var DateTime|null $VALID_MESSAGETIMESTAMP
	 **/
	protected $VALID_MESSAGETIMESTAMP = null; // The Timestamp is assigned by MySQL

	/**
	 * Profile that sent the Message (the sender); it is a foreign key
	 * @var Profile sender
	 **/
	protected $sender = null;

	/**
	 * Profile that received the Message (the receiver); it is a foreign key
	 * @var Profile receiver
	 **/
	protected $receiver = null;

	/**
	 * content of the Message
	 * @var string $VALID_MESSAGETEXT
	 **/
	protected $VALID_MESSAGETEXT = "Then it's time to get your beak wet tonight playa! Its a device Morty, that when you put it in your ear, you can enter people's dreams Morty. Its just like that movie that you keep crowing about. This isn't Game of Thrones, Morty.";


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// run the default setup() method first
		parent::setUp();

		// Create a Timestamp for the Message
		//$this->VALID_MESSAGETIMESTAMP = new \DateTime(); // Commented out because the Timestamp is assigned by MySQL

		// Create (and store in the database) a Profile that sent the Message (the sender); it is a foreign key
		$this->sender = new Profile(null, "message_test_sender", "1234", "5678", "rock");
		$this->sender->insert($this->getPDO());

		// Create (and store in the database) a Profile that received the Message (the receiver); it is a foreign key
		$this->receiver = new Profile(null, "message_test_receiver", "1234", "5678", "sea");
		$this->receiver->insert($this->getPDO());

	}


	/**
	 * Try inserting an valid Message and verify that the actual data matches what was inserted
	 **/
	public function testInsertingValidMessage() {

		// Count the number of rows (before inserting the new Message) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Message
		$numRows = $this->getConnection()->getRowCount("message");

		// Create the new Message and insert it into the database
		$invitation = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->sender->getProfileId(), $this->receiver->getProfileId(), $this->VALID_MESSAGETEXT);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Message was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("message"));

		// Use the inviterId to get the Message just created and check that it matches what should have been put in.
		$pdoInvitation1 = Message::getInvitationByInvitationInviterId($this->getPDO(), $sender->getProfileId());
		$this->assertEquals($pdoInvitation1->getInvitationInviterId(), $this->sender->getProfileId());
		//$this->assertEquals($pdoInvitation1->getInvitationTimestamp(), $this->VALID_MESSAGETIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation1->getInvitationPassphrase(), $this->VALID_MESSAGETEXT);

		// Use the inviteeId to get the Message just created and check that it matches what should have been put in.
		$pdoInvitation2 = Message::getInvitationByInvitationInviteeId($this->getPDO(), $receiver->getProfileId());
		$this->assertEquals($pdoInvitation2->getInvitationInviteeId(), $this->receiver->getProfileId());
		//$this->assertEquals($pdoInvitation2->getInvitationTimestamp(), $this->VALID_MESSAGETIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation2->getInvitationPassphrase(), $this->VALID_MESSAGETEXT);

	}


	/**
	 * Try inserting an Message with an invalid inviterId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingInvitationWithInvalidInviterId() {

		// Create a Message with a non null tweet id and watch it fail
		$invitation = new Message(KiteCryptTest::INVALID_KEY, $this->receiver->getProfileId(), $this->VALID_MESSAGETIMESTAMP, $this->VALID_MESSAGETEXT);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message with an invalid inviteeId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingMessageWithInvalidInviteeId() {

		// Create a Message with a non null inviterId and watch it fail
		$invitation = new Message($this->sender->getProfileId(), KiteCryptTest::INVALID_KEY, $this->VALID_MESSAGETIMESTAMP, $this->VALID_MESSAGETEXT);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message with an invalid messageText
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingMessageWithInvalidText() {

		// Create a Message with a non null tweet id and watch it fail
		$invitation = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->sender->getProfileId(), $this->receiver->getProfileId(), KiteCryptTest::INVALID_KEY);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message and then deleting it
	 * Verify that the deleted Message is not there
	 **/
	public function testDeletingValidMessage() {

		// Count the number of rows (before inserting the new Message) and save it
		$numRows = $this->getConnection()->getRowCount("message");

		// Create a new Message and insert it into the database
		$invitation = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->sender->getProfileId(), $this->receiver->getProfileId(), $this->VALID_MESSAGETEXT);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Message was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("message"));

		// Delete the Message from the database
		$invitation->delete($this->getPDO());

		// Check that the number of rows in the database decreased by one, so that the number of rows
		// is back to what it was before the new Message was inserted
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("message"));

		// Try to get the deleted Message from the database (using the inviterId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation1 = Message::getInvitationByInvitationInviterId($this->getPDO(), $sender->getProfileId());
		$this->assertNull($pdoInvitation1);

		// Try to get the deleted Message from the database (using the inviteeId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation2 = Message::getInvitationByInvitationInviteeId($this->getPDO(), $receiver->getProfileId());
		$this->assertNull($pdoInvitation2);

	}


	/**
	 * Try deleting an Message that does not exist
	 *
	 * @expectedException PDOException
	 **/
	public function testDeletingNonexistentMessage() {

		// create a Message and try to delete it without actually inserting it
		$invitation = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->sender->getProfileId(), $this->receiver->getProfileId(), $this->VALID_MESSAGETEXT);
		$invitation->delete($this->getPDO());

	}


	/**
	 * Try getting all the Invitations
	 **/
	public function testGettingAllValidMessages() {
		// count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("message");

		// Create a new Message and insert it into the database
		$invitation = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->sender->getProfileId(), $this->receiver->getProfileId(), $this->VALID_MESSAGETEXT);
		$invitation->insert($this->getPDO());

		// Get the invitations from the database and verify that they match our expectations
		$results = Message::getAllInvitations($this->getPDO());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("message"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\KiteCrypt\\DataDesign\\Message", $results);

		// Validate the results
		$pdoInvitation = $results[0];
		$this->assertEquals($pdoInvitation->getInvitationInviterId(), $this->sender->getProfileId());
		$this->assertEquals($pdoInvitation->getInvitationInviteeId(), $this->receiver->getProfileId());
		//$this->assertEquals($pdoInvitation->getInvitationTimestamp(), $this->VALID_MESSAGETIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation->getInvitationPassphrase(), $this->VALID_MESSAGETEXT);


	}


}