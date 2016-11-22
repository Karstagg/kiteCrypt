<?php

namespace Edu\Cnm\KiteCrypt\Test;

use Edu\Cnm\KiteCrypt\{Invitation};

// Include the project test parameters
require_once("KiteCryptTest.php");

// Include the class under scrutiny
require_once("../class/autoloader.php");


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
	 * Profile that sent the Invitation of Invitation (the inviter); it is a foreign key
	 * @var Invitation inviter
	 **/
	protected $inviter = null;

	/**
	 * Profile that accepted the Invitation of Invitation (the invitee); it is a foreign key
	 * @var Invitation invitee
	 **/
	protected $invitee = null;
	/**
	 * timestamp of the Invitation; this starts as null and is assigned by MySQL
	 * @var DateTime $VALID_INVITATIONDATE
	 **/
	protected $VALID_INVITATIONDATE = null;
	/**
	 * content of the Invitation
	 * @var string $VALID_INVITATIONPASSPHRASE
	 **/
	protected $VALID_INVITATIONPASSPHRASE = "PHPUnit test passing with this valid invitationPassphrase!";


	/**
	 * Create the dependent objects needed before running each test
	 **/
	public final function setUp() {
		// run the default setup() method first
		parent::setUp();

		// create and insert a Profile that sent the Invitation of Invitation (the inviter); it is a foreign key
		$this->inviter = new Profile(null, "invitation_test_inviter", "1234", "5678", "rock");
		$this->inviter->insert($this->getPDO());

		// create and insert a Profile that sent the Invitation of Invitation (the inviter); it is a foreign key
		$this->invitee = new Profile(null, "invitation_test_invitee", "1234", "5678", "sea");
		$this->invitee->insert($this->getPDO());

	}


	/**
	 * Try inserting a valid Invitation and verify that the actual data matches what was inserted
	 **/
	public function testInsertValidInvitation() {

		// Count the number of rows (before inserting the new Invitation) and save it,
		// so, later, we can make sure that a new row was added in the database when we created the new Invitation
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create the new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId());
		$invitation->insert($this->getPDO());

		// Check that the number of rows in the database increased by one, when the new Invitation was inserted
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("invitation"));

		// Use the inviterId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation1 = Invitation::getInvitationByInvitationInviterId($this->getPDO(), $inviter->getProfileId());
		$this->assertEquals($pdoInvitation1->getInvitationInviterId(), $this->inviter->getProfileId());

		// Use the inviteeId to get the Invitation just created and check that it matches what should have been put in.
		$pdoInvitation2 = Invitation::getInvitationByInvitationInviteeId($this->getPDO(), $invitee->getProfileId());
		$this->assertEquals($pdoInvitation2->getInvitationInviteeId(), $this->invitee->getProfileId());

	}


	/**
	 * Try inserting a Invitation with an invalid inviterId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertInvitationWithInvalidInviterId() {

		// Create a Invitation with a non null tweet id and watch it fail
		$invitation = new Invitation(DataDesignTest::INVALID_KEY, $this->invitee->getProfileId());
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting a Invitation with an invalid inviteeId
	 *
	 * @expectedException PDOException
	 **/
	public function testInsertInvitationWithInvalidInviteeId() {

		// Create a Invitation with a non null tweet id and watch it fail
		$invitation = new Invitation($this->inviter->getProfileId(), DataDesignTest::INVALID_KEY);
		$invitation->insert($this->getPDO());

	}


	/**
	 * Try inserting a Invitation and then deleting it
	 * Verify that the deleted Invitation is not there
	 **/
	public function testDeletingValidInvitation() {

		// Count the number of rows (before inserting the new Invitation) and save it
		$numRows = $this->getConnection()->getRowCount("invitation");

		// Create a new Invitation and insert it into the database
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId());
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
	 * Try deleting a Invitation that does not exist
	 *
	 * @expectedException PDOException
	 **/
	public function testDeleteNonexistentInvitation() {

		// create a Invitation and try to delete it without actually inserting it
		$invitation = new Invitation($this->inviter->getProfileId(), $this->invitee->getProfileId());
		$invitation->delete($this->getPDO());

	}


}