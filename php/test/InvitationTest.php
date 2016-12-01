<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Invitation};

// Include the project test parameters
require_once("KiteCryptTest.php");

// Include the class under scrutiny
require_once(dirname(__DIR__) . "/class/autoloader.php");


/**
 * Full PHPUnit test for the Invitation class
 *
 * This is a complete PHPUnit test of the Invitation class. It is complete because *ALL* mySQL/PDO enabled methods
 * are tested for both invalid and valid inputs.
 *
 * @see Invitation
 * @author G. Wells <gwells4@cnm.edu>
 **/
class InvitationTest extends KiteCryptTest {

	/**
	 * Profile that sent the Invitation (the inviter); it is a foreign key
	 * @var Profile inviter
	 **/
	protected $inviter = null;

	/**
	 * Profile that accepted the Invitation (the invitee); it is a foreign key
	 * @var Profile invitee
	 **/
	protected $invitee = null;

	/**
	 * Timestamp of the Invitation; this starts as null and is assigned by MySQL
	 * @var DateTime|null $VALID_INVITATIONTIMESTAMP
	 **/
	protected $VALID_INVITATIONTIMESTAMP = null; // The Timestamp is assigned by MySQL

	/**
	 * Passphrase for the Invitation
	 * @var string $VALID_INVITATIONPASSPHRASE
	 **/
	protected $VALID_INVITATIONPASSPHRASE = "Rindfleischetikettierungsueberwachungsaufgabenuebertragungsgesetz!";


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// Run the default setup() method first
		parent::setUp();

		// Create (and store in the database) a Profile that sent the Invitation of Invitation (the inviter); it is a foreign key
		$this->inviter = new Profile(null, "invitation_test_inviter", "1234", "5678", "rock");
		$this->inviter->insert($this->getPDO());

		// Create (and store in the database) a Profile that sent the Invitation of Invitation (the invitee); it is a foreign key
		$this->invitee = new Profile(null, "invitation_test_invitee", "1234", "5678", "sea");
		$this->invitee->insert($this->getPDO());

		// Create the Timestamp for the Invitation
		// $this->VALID_INVITATIONTIMESTAMP = new \DateTime(); // Commented out because the Timestamp is assigned by MySQL

	}


	/**
	 * Try inserting an valid Invitation and verify that the actual data matches what was inserted
	 **/
	public function testInsertingValidInvitation() {

		// Count the number of rows (before inserting the new Invitation) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Invitation
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create the new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Invitation was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));

		// Use the inviterId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation1 = Invitation::getInvitationByInvitationInviterId($this->getPDO(), $inviter->getProfileId());
		$this->assertEquals($pdoInvitation1->getInvitationInviterId(), $this->inviter->getProfileId());
		//$this->assertEquals($pdoInvitation1->getInvitationTimestamp(), $this->VALID_INVITATIONTIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation1->getInvitationPassphrase(), $this->VALID_INVITATIONPASSPHRASE);

		// Use the inviteeId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviteeId($this->getPDO(), $invitee->getProfileId());
		$this->assertEquals($pdoInvitation2->getInvitationInviteeId(), $this->invitee->getProfileId());
		//$this->assertEquals($pdoInvitation2->getInvitationTimestamp(), $this->VALID_INVITATIONTIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation2->getInvitationPassphrase(), $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try inserting an Invitation with an invalid inviterId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingInvitationWithInvalidInviterId() {

		// Create a Invitation with an invalid inviterId and watch it fail
		$invitation = new Invitation(KiteCryptTest::INVALID_KEY, $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Invitation with an invalid inviteeId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingInvitationWithInvalidInviteeId() {

		// Create a Invitation with an invalid inviteeId and watch it fail
		$invitation = new Invitation($this->inviter->getProfileId(), KiteCryptTest::INVALID_KEY, $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Invitation with an invalid invitationPassphrase
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingInvitationWithInvalidInvitationPassphrase() {

		// Create a Invitation with an invalid invitationPassphrase
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, KiteCryptTest::INVALID_KEY);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Invitation and then deleting it
	 * Verify that the deleted Invitation is not there
	 **/
	public function testDeletingValidInvitation() {

		// Count the number of rows (before inserting the new Invitation) and save it
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create a new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Invitation was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));

		// Delete the Invitation from the database
		$invitation->delete($this->getPDO());

		// Check that the number of rows in the database decreased by one, so that the number of rows
		// is back to what it was before the new Invitation was inserted
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("invitation"));

		// Try to get the deleted Invitation from the database (using the inviterId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation1 = Invitation::getInvitationByInvitationInviterId($this->getPDO(), $inviter->getProfileId());
		$this->assertNull($pdoInvitation1);

		// Try to get the deleted Invitation from the database (using the inviteeId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviteeId($this->getPDO(), $invitee->getProfileId());
		$this->assertNull($pdoInvitation2);

	}


	/**
	 * Try deleting an Invitation that does not exist
	 *
	 * @expectedException PDOException
	 **/
	public function testDeletingNonexistentInvitation() {

		// Create an Invitation and try to delete it without actually inserting it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->delete($this->getPDO());

	}


	/**
	 * Try getting all the Invitations
	 **/
	public function testGettingAllValidInvitations() {
		// Count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create a new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

		// Get the invitations from the database and verify that they match our expectations
		$results = Invitation::getAllInvitations($this->getPDO());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\KiteCrypt\\DataDesign\\Invitation", $results);

		// Validate the results
		$pdoInvitation = $results[0];
		$this->assertEquals($pdoInvitation->getInvitationInviterId(), $this->inviter->getProfileId());
		$this->assertEquals($pdoInvitation->getInvitationInviteeId(), $this->invitee->getProfileId());
		//$this->assertEquals($pdoInvitation->getInvitationTimestamp(), $this->VALID_INVITATIONTIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation->getInvitationPassphrase(), $this->VALID_INVITATIONPASSPHRASE);


	}


}