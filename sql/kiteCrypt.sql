DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS invites;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
profileId INT UNSIGNED AUTO_INCREMENT NOT NULL,
profileUserName VARCHAR(20) NOT NULL,
profilePublicKey VARCHAR(1024) NOT NULL,
UNIQUE(profileUserName, profilePublicKey),
PRIMARY KEY(profileId)
);

CREATE TABLE invite (
inviteInviterId INT UNSIGNED NOT NULL,
inviteInvitedId INT UNSIGNED NOT NULL,
inviteTimestamp DATETIME NOT NULL,
invitePassphrase VARCHAR(32) NOT NULL,
UNIQUE(invitePassphrase),
FOREIGN KEY(inviteInviterId) REFERENCES profiles(profileId),
FOREIGN KEY(inviteInvitedId) REFERENCES profiles(profileId),
);

CREATE TABLE friends (
friendsProfileId INT UNSIGNED NOT NULL,
friendsFriendId INT UNSIGNED NOT NULL,
FOREIGN KEY(friendProfileId) REFERENCES profiles(profileId),
FOREIGN KEY(friendFriendId) REFERENCES profiles(profileId)
);

CREATE TABLE messages (
messageId INT UNSIGNED AUTO_INCREMENT NOT NULL,
messageTimestamp TIMESTAMP NOT NULL,
messageSenderId INT UNSIGNED NOT NULL,
messageReceiverId INT UNSIGNED NOT NULL,
messageText VARCHAR(65485),
INDEX(messagetIimestamp),
INDEX(messageSenderId),
INDEX(messageReceiverId),
FOREIGN KEY(messageSenderId) REFERENCES profile(profileId),
FOREIGN KEY(messageReceiverId) REFERENCES profile(profileId),
PRIMARY KEY(messageId)
);