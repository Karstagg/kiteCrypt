<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Invitation, Profile};

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
	protected $VALID_INVITATIONPASSPHRASE = "Rindfleischetiketti!";


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// Run the default setup() method first
		parent::setUp();

		// Create (and store in the database) a Profile that sent the Invitation of Invitation (the inviter); it is a foreign key
		$this->inviter = new Profile(null, "invitation_inviter", "1234", "5678", "rock");
		$this->inviter->insert($this->getPDO());

		// Create (and store in the database) a Profile that sent the Invitation of Invitation (the invitee); it is a foreign key
		$this->invitee = new Profile(null, "invitation_invitee", "1234", "5678", "sea");
		$this->invitee->insert($this->getPDO());

		// Create the Timestamp for the Invitation
		// $this->VALID_INVITATIONTIMESTAMP = new \DateTime(); // Commented out because the Timestamp is assigned by MySQL

	}


	/**
	 * Test the get methods of the Invitation class
	 **/
	public function testInvitationGetMethods() {

		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

		$testGetInviterId = $invitation->getInvitationInviterId();
		$testGetInviteeId = $invitation->getInvitationInviteeId();
		$testGetTimestamp = $invitation->getInvitationTimestamp();
		$testGetPassphrase = $invitation->getInvitationPassphrase();

	}


	/**
	 * Test the set methods of the Invitation class
	 *
	 * @expectedException TypeError
	 **/
	public function testInvitationSetEmpty() {

		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

		$testSetInviterId = $invitation->setInvitationInviterId();
		$testSetInviteeId = $invitation->setInvitationInviteeId();
		$testSetTimestamp = $invitation->setInvitationTimestamp();
		$testSetPassphrase = $invitation->setInvitationPassphrase();

	}


	/**
	 * Test the set methods of the Invitation class
	 **/
	public function testInvitationSetNewValues() {

		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

		$testSetInviterId = $invitation->setInvitationInviterId(10);
		$testSetInviteeId = $invitation->setInvitationInviteeId(11);
		$testSetTimestamp = $invitation->setInvitationTimestamp();
		$testSetPassphrase = $invitation->setInvitationPassphrase("wubba lubba wub dub");

	}


	/**
	 * Test the set methods of the Invitation class
	 *
	 * @expectedException RangeException
	 * @expectedException InvalidArgumentException
	 * @expectedException TypeError
	 **/
	public function testInvitationSetBadValues() {

		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

		$testSetInviterId = $invitation->setInvitationInviterId(-1);
		$testSetInviteeId = $invitation->setInvitationInviteeId(-1);
		$testSetTimestamp = $invitation->setInvitationTimestamp(-1);
		$testSetPassphrase = $invitation->setInvitationPassphrase("");

	}


	/**
	 * Test the set methods of the Invitation class
	 *
	 * @expectedException TypeError
	 **/
	public function testInvitationSetWrongTypes() {

		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

		$testSetInviterId = $invitation->setInvitationInviterId("a");
		$testSetInviteeId = $invitation->setInvitationInviteeId("b");
		$testSetTimestamp = $invitation->setInvitationTimestamp("c");
		$testSetPassphrase = $invitation->setInvitationPassphrase("");

	}


	/**
	 * Try creating an Invitation with a negative inviterId
	 *
	 * @expectedException RangeException
	 **/
	public function testCreatingInvitationWithNegativeInviterId() {

		$invitation = new Invitation(-1, $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try creating an Invitation with a negative inviteeId
	 *
	 * @expectedException RangeException
	 **/
	public function testCreatingInvitationWithNegativeInviteeId() {

		$invitation = new Invitation($this->inviter->getProfileId(), -1, $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try creating an Invitation with an inviterId that's a string
	 *
	 * @expectedException TypeError
	 **/
	public function testCreatingInvitationWithStringInviterId() {

		$invitation = new Invitation("id", $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try creating an Invitation with an inviteeId that's a string
	 *
	 * @expectedException TypeError
	 **/
	public function testCreatingInvitationWithStringInviteeId() {

		$invitation = new Invitation($this->inviter->getProfileId(), "id", $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try inserting an valid Invitation and verify that the actual data matches what was inserted
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingValidInvitationGetByInviter() {

		// Count the number of rows (before inserting the new Invitation) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Invitation
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create the new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Invitation was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));

		// Use the inviteeId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviterId($this->getPDO(), $this->inviter->getProfileId());
		$this->assertEquals($pdoInvitation2->getInvitationInviterId(), $this->inviter->getProfileId());
		//$this->assertEquals($pdoInvitation2->getInvitationTimestamp(), $this->VALID_INVITATIONTIMESTAMP); // Commented out because the Timestamp is assigned by MySQL
		$this->assertEquals($pdoInvitation2->getInvitationPassphrase(), $this->VALID_INVITATIONPASSPHRASE);

	}


	/**
	 * Try inserting an valid Invitation and verify that the actual data matches what was inserted
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertingValidInvitationGetByInvitee() {

		// Count the number of rows (before inserting the new Invitation) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Invitation
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create the new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, $this->VALID_INVITATIONPASSPHRASE);
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Invitation was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));

		// Use the inviteeId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviteeId($this->getPDO(), $this->invitee->getProfileId());
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
	 * @expectedException InvalidArgumentException
	 **/
	public function testInsertingInvitationWithInvalidInvitationPassphrase() {

		// Create a Invitation with an invalid invitationPassphrase
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, "");
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting an Invitation with a numeric invitationPassphrase
	 *
	 * @expectedException InvalidArgumentException
	 **/
	public function testInsertingInvitationWithNumericInvitationPassphrase() {

		// Create a Invitation with an invalid invitationPassphrase
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId(), $this->VALID_INVITATIONTIMESTAMP, 0);
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
var_dump($numRows);
		// Check that the number of rows in the database decreased by one, so that the number of rows
		// is back to what it was before the new Invitation was inserted
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("invitation"));

		// Try to get the deleted Invitation from the database (using the inviterId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation1 = Invitation::getInvitationByInvitationInviterId($this->getPDO(), $this->inviter->getProfileId());
		$this->assertNull($pdoInvitation1);

		// Try to get the deleted Invitation from the database (using the inviteeId)
		// and verify that it does not exist (that is a null is returned)
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviteeId($this->getPDO(), $this->invitee->getProfileId());
		$this->assertNull($pdoInvitation2);

	}


	/**
	 * Try deleting an Invitation that does not exist
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
var_dump($invitation);
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