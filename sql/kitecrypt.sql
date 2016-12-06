DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS invitation;
DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS profile;

CREATE TABLE profile (
profileId INT UNSIGNED AUTO_INCREMENT NOT NULL,
profileUserName VARCHAR(20) NOT NULL,
profilePublicKeyX VARCHAR(256) NOT NULL,
profilePublicKeyY VARCHAR(256) NOT NULL,
profilePasswordSalt VARCHAR(256) NOT NULL,
UNIQUE(profileUserName, profilePublicKeyX,profilePublicKeyY),
PRIMARY KEY(profileId)
);

CREATE TABLE invitation (
invitationInviterId INT UNSIGNED NOT NULL,
invitationInviteeId INT UNSIGNED NOT NULL,
invitationTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
invitationPassphrase VARCHAR(64) NOT NULL,
UNIQUE(invitationPassphrase),
FOREIGN KEY(invitationInviterId) REFERENCES profile(profileId),
FOREIGN KEY(invitationInviteeId) REFERENCES profile(profileId),
PRIMARY KEY (invitationInviterId, invitationInviteeId)
);

CREATE TABLE friendship (
friendshipInviterId INT UNSIGNED NOT NULL,
friendshipInviteeId INT UNSIGNED NOT NULL,
FOREIGN KEY(friendshipInviterId) REFERENCES profile(profileId),
FOREIGN KEY(friendshipInviteeId) REFERENCES profile(profileId),
PRIMARY KEY (friendshipInviterId, friendshipInviteeId)
);

CREATE TABLE message (
messageId INT UNSIGNED AUTO_INCREMENT NOT NULL,
messageTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
messageSenderId INT UNSIGNED NOT NULL,
messageReceiverId INT UNSIGNED NOT NULL,
messageText VARCHAR(32768),
INDEX(messageTimestamp),
INDEX(messageSenderId),
INDEX(messageReceiverId),
FOREIGN KEY(messageSenderId) REFERENCES profile(profileId),
FOREIGN KEY(messageReceiverId) REFERENCES profile(profileId),
PRIMARY KEY(messageId)
);