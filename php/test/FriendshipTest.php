<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Friendship};

// Include the project test parameters
require_once("KiteCryptTest.php");

// Include the class under scrutiny
require_once("../class/autoloader.php");


/**
 * Full PHPUnit test for the Friendship class
 *
 * This is a complete PHPUnit test of the Friendship class. It is complete because *ALL* mySQL/PDO enabled methods
 * are tested for both invalid and valid inputs.
 *
 * @see Friendship
 * @author G. Wells <gwells4@cnm.edu>
 **/
class FriendshipTest extends KiteCryptTest {
	/**
	 * Profile that sent the Invitation of Friendship (the inviter); it is a foreign key
	 * @var Friendship inviter
	 **/
	protected $inviter = null;

	/**
	 * Profile that accepted the Invitation of Friendship (the invitee); it is a foreign key
	 * @var Friendship invitee
	 **/
	protected $invitee = null;


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// run the default setup() method first
		parent::setUp();

		// create and insert a Profile that sent the Invitation of Friendship (the inviter); it is a foreign key
		$this->inviter = new Profile(null, "friendship_test_inviter", "1234", "5678", "rock");
		$this->inviter->insert($this->getPDO());

		// create and insert a Profile that sent the Invitation of Friendship (the inviter); it is a foreign key
		$this->invitee = new Profile(null, "friendship_test_invitee", "1234", "5678", "sea");
		$this->invitee->insert($this->getPDO());

	}


	/**
	 * Test inserting a valid Friendship and verify that the actual mySQL data matches
	 **/
	public function testInsertValidFriendship() {

		// Count the number of rows (before inserting the new Friendship) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Friendship
		$numRows = $this->getConnection()->getRowCount("friendship");

		// Create the new Friendship and insert it into the database
		$friendship = new Friendship($this->inviter->getProfileId(), $this->invitee->getProfileId());
		$friendship->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new friendship was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("friendship"));

		// Use the inviterId to get the Friendship just created and check that it matches what should have been put in.
		$pdoFriendship1 = Friendship::getFriendshipByFriendshipInviterId($this->getPDO(), $inviter->getProfileId());
		$this->assertEquals($pdoFriendship1->getFriendshipInviterId(), $this->inviter->getProfileId());

		// Use the inviteeId to get the Friendship just created and check that it matches what should have been put in.
		$pdoFriendship2 = Friendship::getFriendshipByFriendshipInviteeId($this->getPDO(), $invitee->getProfileId());
		$this->assertEquals($pdoFriendship2->getFriendshipInviteeId(), $this->invitee->getProfileId());

	}


	/**
	 * Test inserting a Friendship with an invalid inviterId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertFriendshipWIthInvalidInviterId() {

		// Create a Friendship with a non null tweet id and watch it fail
		$friendship = new Friendship(DataDesignTest::INVALID_KEY, $this->invitee->getProfileId());
		$friendship->insert($this->getPDO());

	}


	/**
	 * Test inserting a Friendship with an invalid inviteeId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertFriendshipWIthInvalidInviteeId() {

		// Create a Friendship with a non null tweet id and watch it fail
		$friendship = new Friendship($this->inviter->getProfileId(), DataDesignTest::INVALID_KEY);
		$friendship->insert($this->getPDO());

	}


	/**
	 * Test inserting a Friendship and then deleting it
	 **/
	public function testDeleteValidFriendship() {

		// Count the number of rows (before inserting the new Friendship) and save it
		$numRows = $this->getConnection()->getRowCount("friendship");

		// Create a new Friendship and insert it into the database
		$friendship = new Friendship($this->inviter->getProfileId(), $this->invitee->getProfileId());
		$friendship->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Friendship was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("friendship"));

		// Delete the Friendship from the database
		$friendship->delete($this->getPDO());

		// Check that the number of rows in the database decreased by one, so that the number of rows
		// is back to what it was before the new Friendship was inserted
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("friendship"));

		// Try to get the deleted Friendship from the database (using the inviterId)
		// and verify that it does not exist (that is a null is returned)
		$pdoFriendship1 = Friendship::getFriendshipByFriendshipInviterId($this->getPDO(), $inviter->getProfileId());
		$this->assertNull($pdoFriendship1);

		// Try to get the deleted Friendship from the database (using the inviteeId)
		// and verify that it does not exist (that is a null is returned)
		$pdoFriendship2 = Friendship::getFriendshipByFriendshipInviteeId($this->getPDO(), $invitee->getProfileId());
		$this->assertNull($pdoFriendship2);

	}

	/**
	 * test deleting a Tweet that does not exist
	 *
	 * @expectedException PDOException
	 **/
	public function testDeleteInvalidTweet() {
		// create a Tweet and try to delete it without actually inserting it
		$tweet = new Tweet(null, $this->profile->getProfileId(), $this->VALID_TWEETCONTENT, $this->VALID_TWEETDATE);
		$tweet->delete($this->getPDO());
	}

	/**
	 * test grabbing a Tweet by tweet content
	 **/
	public function testGetValidTweetByTweetContent() {
		// count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("tweet");

		// create a new Tweet and insert to into mySQL
		$tweet = new Tweet(null, $this->profile->getProfileId(), $this->VALID_TWEETCONTENT, $this->VALID_TWEETDATE);
		$tweet->insert($this->getPDO());

		// grab the data from mySQL and enforce the fields match our expectations
		$results = Tweet::getTweetByTweetContent($this->getPDO(), $tweet->getTweetContent());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("tweet"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\Dmcdonald21\\DataDesign\\Tweet", $results);

		// grab the result from the array and validate it
		$pdoTweet = $results[0];
		$this->assertEquals($pdoTweet->getProfileId(), $this->profile->getProfileId());
		$this->assertEquals($pdoTweet->getTweetContent(), $this->VALID_TWEETCONTENT);
		$this->assertEquals($pdoTweet->getTweetDate(), $this->VALID_TWEETDATE);
	}

	/**
	 * test grabbing a Tweet by content that does not exist
	 **/
	public function testGetInvalidTweetByTweetContent() {
		// grab a tweet by searching for content that does not exist
		$tweet = Tweet::getTweetByTweetContent($this->getPDO(), "you will find nothing");
		$this->assertCount(0, $tweet);
	}

	/**
	 * test grabbing all Tweets
	 **/
	public function testGetAllValidTweets() {
		// count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("tweet");

		// create a new Tweet and insert to into mySQL
		$tweet = new Tweet(null, $this->profile->getProfileId(), $this->VALID_TWEETCONTENT, $this->VALID_TWEETDATE);
		$tweet->insert($this->getPDO());

		// grab the data from mySQL and enforce the fields match our expectations
		$results = Tweet::getAllTweets($this->getPDO());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("tweet"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\Dmcdonald21\\DataDesign\\Tweet", $results);

		// grab the result from the array and validate it
		$pdoTweet = $results[0];
		$this->assertEquals($pdoTweet->getProfileId(), $this->profile->getProfileId());
		$this->assertEquals($pdoTweet->getTweetContent(), $this->VALID_TWEETCONTENT);
		$this->assertEquals($pdoTweet->getTweetDate(), $this->VALID_TWEETDATE);
	}

}



