<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Message,Profile};

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
	 **/
	protected $validMessageId = null;

	/**
	 * Timestamp of the Message; this starts as null and is assigned by MySQL
	 * @var DateTime|null $validMessageTimestamp
	 **/
	protected $validMessageTimestamp = null; // The Timestamp is assigned by MySQL

	/**
	 * Profile that sent the Message (the sender); it is a foreign key
	 * @var Profile sender
	 **/
	protected $validMessageSenderId = null;

	/**
	 * Profile that received the Message (the receiver); it is a foreign key
	 * @var Profile receiver
	 **/
	protected $validMessageReceiverId = null;

	/**
	 * content of the Message
	 * @var string validMessageText
	 **/
	protected $validMessageText = "Then it's time to get your beak wet tonight playa! Its a device Morty, that when you put it in your ear, you can enter people's dreams Morty. Its just like that movie that you keep crowing about. This isn't Game of Thrones, Morty.";

	public $profile = null;


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// run the default setup() method first
		parent::setUp();

		// Create a Timestamp for the Message
		//$this->validMessageText = new \DateTime(); // Commented out because the Timestamp is assigned by MySQL

		// Create (and store in the database) a Profile that sent the Message (the sender); it is a foreign key
		$this->validMessageSenderId = new Profile(null, "UserSender", "1234", "5678", "rock");
		$this->validMessageSenderId->insert($this->getPDO());

		// Create (and store in the database) a Profile that received the Message (the receiver); it is a foreign key
		$this->validMessageReceiverId = new Profile(null, "UserReceiver", "54446", "5454", "salt");
		$this->validMessageReceiverId->insert($this->getPDO());

	}


	/**
	 * Try inserting an valid Message and verify that the actual data matches what was inserted
	 **/
	public function testInsertingValidMessage() {

		// Count the number of rows (before inserting the new Message) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Message
		$numRows = $this->getConnection()->getRowCount("message");

		// Create the new Message and insert it into the database
		$message = new Message($this->validMessageId, $this->validMessageTimestamp, $this->profile->getProfileId(), $this->profile->getProfileId([1]),$this->validMessageText);
		$message->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Message was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("message"));

		// Use the senderId to get the Message just created and check that it matches what should have been put in.
		$pdoMessage1 = Message::getMessageByMessageSenderId($this->getPDO(), $this->validMessageSenderId->getProfileId());
		$this->assertEquals($pdoMessage1->getMessageSenderId(), $this->validMessageSenderId->getProfileId());
		//$this->assertEquals($pdoMessage1->getMessageTimestamp(), $this->VALID_MESSAGETIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoMessage1->getMessageText(), $this->validMessageText);

		// Use the receiverId to get the Message just created and check that it matches what should have been put in.
		$pdoMessage2 = Message::getMessageByMessageReceiverId($this->getPDO(), $this->validMessageReceiverId->getProfileId());
		$this->assertEquals($pdoMessage2->getMessageReceiverId(), $this->validMessageReceiverId->getProfileId());
		//$this->assertEquals($pdoMessage2->getMessageTimestamp(), $this->validMessageTimestamp); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoMessage2->getMessageText(), $this->validMessageText);

	}


	/**
	 * Try inserting an Message with an invalid senderId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingMessageWithInvalidSenderId() {

		// Create a Message with a non null tweet id and watch it fail
		$message = new Message($this->validMessageId, KiteCryptTest::INVALID_KEY, $this->validMessageReceiverId->getProfileId(), $this->VALID_MESSAGETIMESTAMP, $this->validMessageText);
		$message->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message with an invalid receiverId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingMessageWithInvalidReceiverId() {

		// Create a Message with a non null senderId and watch it fail
		$message = new Message($this->validMessageId, $this->validMessageSenderId->getProfileId(), KiteCryptTest::INVALID_KEY, $this->VALID_MESSAGETIMESTAMP, $this->validMessageText);
		$message->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message with an invalid messageText
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingMessageWithInvalidText() {

		// Create a Message with a non null tweet id and watch it fail
		$message = new Message($this->validMessageId, $this->VALID_MESSAGETIMESTAMP, $this->validMessageSenderId->getProfileId(), $this->validMessageReceiverId->getProfileId(), KiteCryptTest::INVALID_KEY);
		$message->insert($this->getPDO());

	}


	/**
	 * Try inserting an Message and then deleting it
	 * Verify that the deleted Message is not there
	 **/
	public function testDeletingValidMessage() {
// setup test for Profile
		$this->setUp();

		// Count the number of rows (before inserting the new Message) and save it
		$numRows = $this->getConnection()->getRowCount("message");

		// Create a new Message and insert it into the database
		$message = new Message(null, null, $this->validMessageSenderId->getProfileId([0]), $this->validMessageReceiverId->getProfileId([1]), $this->validMessageText);
		$message->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Message was inserted
		$this->assertEquals($numRows , $this->getConnection()->getRowCount("message"));

//		// Delete the Message from the database
//		$this->assertEquals($numRows, $this->getConnection()->getRowCount("message"));
//		$message->delete($this->getPDO());

		// Check that the number of rows in the database decreased by one, so that the number of rows
		// is back to what it was before the new Message was inserted
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("message"));

		// Try to get the deleted Message from the database (using the senderId)
		// and verify that it does not exist (that is a null is returned)
		$pdoMessage1 = Message::getMessageByMessageSenderId($this->getPDO(), $this->profile->getProfileId());
		$this->assertNull($pdoMessage1);

//		// Try to get the deleted Message from the database (using the receiverId)
//		// and verify that it does not exist (that is a null is returned)
//		$pdoMessage2 = Message::getMessageByMessageReceiverId($this->getPDO(), $this->profile->getProfileId());
//		$this->assertNull($pdoMessage2);

	}


	/**
	 * Try deleting an Message that does not exist
	 *
	 * @expectedException PDOException
	 **/
	public function testDeletingNonexistentMessage() {

		// create a Message and try to delete it without actually inserting it
		$message = new Message($this->validMessageId, $this->validMessageTimestamp, $this->validMessageSenderId->getProfileId(), $this->validMessageReceiverId->getProfileId(), $this->validMessageText);
		$message->delete($this->getPDO());

	}


	/**
	 * Try getting all the Messages
	 **/
	public function testGettingAllValidMessages() {
		// count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("message");

		// Create a new Message and insert it into the database
		$message = new Message($this->validMessageId, $this->validMessageTimestamp, $this->validMessageSenderId->getProfileId(), $this->validMessageReceiverId->getProfileId(), $this->validMessageText);
		$message->insert($this->getPDO());

		// Get the messages from the database and verify that they match our expectations
		$results = Message::getAllMessages($this->getPDO());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("message"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\KiteCrypt\\DataDesign\\Message", $results);

		// Validate the results
		$pdoMessage = $results[0];
		$this->assertEquals($pdoMessage->getMessageSenderId(), $this->validMessageSenderId->getProfileId());
		$this->assertEquals($pdoMessage->getMessageReceiverId(), $this->validMessageReceiverId->getProfileId());
		//$this->assertEquals($pdoMessage->getMessageTimestamp(), $this->validMessageTimestamp); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoMessage->getMessageText(), $this->validMessageText);


	}


}