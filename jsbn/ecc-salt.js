

/*
 ----------------------------------------------------------------------------
 Elliptic Curve Parameters
 ----------------------------------------------------------------------------
 */


exports.rng = undefined;

exports.eccP = undefined;
exports.eccA = undefined;
exports.eccB = undefined;
exports.eccGx = undefined;
exports.eccGy = undefined;
exports.eccN = undefined;

exports.sendersPassword = undefined;
exports.sendersSalt = undefined;
exports.sendersPrivateMultiplier = undefined;
exports.sendersMultipliedX = undefined;
exports.sendersMultipliedY = undefined;
exports.sendersCommonSecretKeyX = undefined;
exports.sendersCommonSecretKeyY = undefined;

exports.receiversPassword = undefined;
exports.receiversSalt = undefined;
exports.receiversPrivateMultiplier = undefined;
exports.receiversMultipliedX = undefined;
exports.receiversMultipliedY = undefined;
exports.receiversCommonSecretKeyX = undefined;
exports.receiversCommonSecretKeyY = undefined;

exports.messagePlainText = undefined;
exports.messageCipherText = undefined;
exports.decryptedMessage = undefined;


exports.initializeEllipticCurveParameters = function() {

	rng = new SecureRandom();

};


exports.set_ec_params = function (name) {
	var c = getSECCurveByName(name);

	eccP = c.getCurve().getQ().toString(16);
	eccA = c.getCurve().getA().toBigInteger().toString(16);
	eccB = c.getCurve().getB().toBigInteger().toString(16);
	eccGx = c.getG().getX().toBigInteger().toString(16);
	eccGy = c.getG().getY().toBigInteger().toString(16);
	eccN = c.getN().toString(16);

};


exports.set_secp128r1 = function () {
	set_ec_params("secp128r1");
};

exports.set_secp160k1 = function () {
	set_ec_params("secp160k1");
};

exports.set_secp160r1 = function () {
	set_ec_params("secp160r1");
};

exports.set_secp192k1 = function () {
	set_ec_params("secp192k1");
};

exports.set_secp192r1 = function () {
	set_ec_params("secp192r1");
};

exports.set_secp224r1 = function () {
	set_ec_params("secp224r1");
};

exports.set_secp256r1 = function () {
	set_ec_params("secp256r1");
};

exports.get_curve = function () {
	return new ECCurveFp(new BigInteger(eccP, 16),
		new BigInteger(eccA, 16),
		new BigInteger(eccB, 16));
};

exports.get_G = function (curve) {
	return new ECPointFp(curve,
		curve.fromBigInteger(new BigInteger(eccGx, 16)),
		curve.fromBigInteger(new BigInteger(eccGy, 16)));
};




/*
 ----------------------------------------------------------------------------
 Sender's Parameters
 ----------------------------------------------------------------------------
 */


// exports.generateSendersPassword = function () {
//
// 	// sendersPassword = generateRandomString(10);
//
// 	/*
// 	 ----------------------------------------------------------------------------
// 	 Changing the sender's password implies
// 	 the common secret key and the encrypted message.
// 	 are no longer valid.
// 	 ----------------------------------------------------------------------------
// 	 */
//
//
// };



// exports.generateSendersSalt = function () {
//
//
// 	// sendersSalt = generateRandomString(6);
//
//
// 	/*
// 	 ----------------------------------------------------------------------------
// 	 Changing the sender's salt implies
// 	 the common secret key and the encrypted message.
// 	 are no longer valid.
// 	 ----------------------------------------------------------------------------
// 	 */
//
//
// };



exports.generateSendersPrivateMultiplier = function (sendersPassword, sendersSalt) {

	sendersPrivateMultiplier = convertStringToHex(sendersPassword + sendersSalt);


	/*
	 ----------------------------------------------------------------------------
	 Changing the sender's private multiplier implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};



exports.calculateSendersMultipliedPoint = function () {

	var curve = get_curve();
	var G = get_G(curve);
	var a = new BigInteger(sendersPrivateMultiplier, 16);
	var P = G.multiply(a);

	sendersMultipliedX = P.getX().toBigInteger().toString(16);
	sendersMultipliedY = P.getY().toBigInteger().toString(16);


	/*
	 ----------------------------------------------------------------------------
	 Changing the sender's multiplied point (public key) implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};


exports.calculateSendersCommonSecretKey = function () {

	/*
	 ----------------------------------------------------------------------------
	 Check that 1) the private multipliers and
	 2) the multiplied (x,y)-points
	 are defined for both the sender and the receiver
	 ----------------------------------------------------------------------------
	 */


	/*
	 ----------------------------------------------------------------------------
	 Calculate the new common secret key.
	 ----------------------------------------------------------------------------
	 */

	var curve = get_curve();
	var P = new ECPointFp(curve,
		curve.fromBigInteger(new BigInteger(receiversMultipliedX, 16)),
		curve.fromBigInteger(new BigInteger(receiversMultipliedY, 16)));

	var a = new BigInteger(sendersPrivateMultiplier, 16);
	var S = P.multiply(a);

	sendersCommonSecretKeyX = S.getX().toBigInteger().toString(16);
	sendersCommonSecretKeyY = S.getY().toBigInteger().toString(16);


	/*
	 ----------------------------------------------------------------------------
	 Everything is valid except for the encrypted message.
	 ----------------------------------------------------------------------------
	 */


};




/*
 ----------------------------------------------------------------------------
 Receiver's Parameters
 ----------------------------------------------------------------------------
 */


// exports.generateReceiversPassword = function () {
//
// 	receiversPassword = generateRandomString(10);
//
//
//
// 	/*
// 	 ----------------------------------------------------------------------------
// 	 Changing the receiver's password implies
// 	 the common secret key and the encrypted message.
// 	 are no longer valid.
// 	 ----------------------------------------------------------------------------
// 	 */
//
//
// };



// exports.generateReceiversSalt = function () {
//
//
// 	receiversSalt = generateRandomString(6);
//
//
// 	/*
// 	 ----------------------------------------------------------------------------
// 	 Changing the receiver's salt implies
// 	 the common secret key and the encrypted message.
// 	 are no longer valid.
// 	 ----------------------------------------------------------------------------
// 	 */
//
// };



exports.generateReceiversPrivateMultiplier = function () {

	receiversPrivateMultiplier = convertStringToHex(receiversPassword + receiversSalt);

	/*
	 ----------------------------------------------------------------------------
	 Changing the receiver's private multiplier implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};


exports.calculateReceiversMultipliedPoint = function () {

	var curve = get_curve();
	var G = get_G(curve);
	var a = new BigInteger(receiversPrivateMultiplier, 16);
	var P = G.multiply(a);

	receiversMultipliedX = P.getX().toBigInteger().toString(16);
	receiversMultipliedY = P.getY().toBigInteger().toString(16);

	/*
	 ----------------------------------------------------------------------------
	 Changing the receiver's multiplied point (public key) implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */

};


exports.calculateReceiversCommonSecretKey = function () {

	/*
	 ----------------------------------------------------------------------------
	 Check that 1) the private multipliers and
	 2) the multiplied (x,y)-points
	 are defined for both the sender and the receiver
	 ----------------------------------------------------------------------------
	 */


	/*
	 ----------------------------------------------------------------------------
	 Calculate the new common secret key.
	 ----------------------------------------------------------------------------
	 */

	var curve = get_curve();
	var P = new ECPointFp(curve,
		curve.fromBigInteger(new BigInteger(sendersMultipliedX, 16)),
		curve.fromBigInteger(new BigInteger(sendersMultipliedY, 16)));

	var a = new BigInteger(receiversPrivateMultiplier, 16);
	var S = P.multiply(a);

	receiversCommonSecretKeyX = S.getX().toBigInteger().toString(16);
	receiversCommonSecretKeyY = S.getY().toBigInteger().toString(16);


	/*
	 ----------------------------------------------------------------------------
	 Everything is valid except for the encrypted message.
	 ----------------------------------------------------------------------------
	 */

};




/*
 ----------------------------------------------------------------------------
 Encryption
 ----------------------------------------------------------------------------
 */


exports.encryptMessage = function () {

	messagePlainText = getN("messagePlainText").value; // We have to change this line to get the message from the chat box that's being sent to the friend.
	//var eccP = getN("eccP").value;
	var commonSecretKeyX = receiversCommonSecretKeyX;
	var commonSecretKeyY = receiversCommonSecretKeyY;

	var i;
	//var messageCipherText = messagePlainText.split("").reverse().join("");

	// Convert each plain text character to its unicode hex value.
	// var messageCipherTextUnicodeDecimalArray = [];
	// var messageCipherTextUnicodeHexArray = [];
	// var i;
	// for (i = 0 ; i < messagePlainText.length ; i++) {
	// 	messageCipherTextUnicodeDecimalArray[i] = messagePlainText.charCodeAt(i);
	// 	messageCipherTextUnicodeHexArray[i] = messageCipherTextUnicodeDecimalArray[i].toString(16);
	// }
	// var messageCipherTextHexString = messageCipherTextUnicodeHexArray.join("");
	var messageCipherTextHexString = convertStringToHex(messagePlainText);
	//alert("Message plain text hex: " + messageCipherTextHexString); // Message. = 4d6573736167652e in plain text.

	// Determine the size of the message block by finding the what number of characters
	// is less than the ECC prime.
	var blockSize = 0;
	var messageBlock;
	var eccPBigInteger = new BigInteger(eccP, 16);
	var comparisonValue;

	for (i = 1 ; i < messageCipherTextHexString.length ; i = i + 2) { // Step by two characters to get a complete 8-bit byte (an octet).

		messageBlock = new BigInteger(messageCipherTextHexString.substr(0, i),16);
		comparisonValue = messageBlock.compareTo(eccPBigInteger);

		if (messageBlock.compareTo(eccPBigInteger) >= 0) {
			//blockSize = i - 2;
			blockSize = Math.floor(i / 2) + 2;
			break;
		}

	}

	// Short messages will be small numbers, so blockSize will still be zero
	// after going through the loop, above. In that case, make the block size
	// the message length.
	//
	// After determining the block size, encrypt the message.
	var commonSecretKeyXBigInteger = new BigInteger(commonSecretKeyX, 16);
	var commonSecretKeyYBigInteger = new BigInteger(commonSecretKeyY, 16);
	var cipherTextBlock = new BigInteger("0");
	var messageCipherText = "";

	if (blockSize == 0) {

		blockSize = messageCipherTextHexString.length;

		// Encrypt the message (when the blockSize is the same as the message length).
		messageBlock = new BigInteger(messageCipherTextHexString,16);
		cipherTextBlock = messageBlock.add(commonSecretKeyXBigInteger);
		cipherTextBlock = cipherTextBlock.mod(eccPBigInteger);
		messageCipherText = cipherTextBlock.toString(16);

	} else {

		// Encrypt the message (when the blockSize is less than the message length).
		var numberOfBlocks = Math.floor(messageCipherTextHexString.length / blockSize) + 1;
		var messageCipherTextHexSubstring = "";
		var startOfSubstring = 0;
		var lengthOfSubstring;

		for (i = 1; i <= numberOfBlocks; i++) {

			startOfSubstring = (i-1) * blockSize;

			if (messageCipherTextHexString.length - startOfSubstring >= blockSize) {
				lengthOfSubstring = blockSize;
			} else {
				lengthOfSubstring = messageCipherTextHexString.length - startOfSubstring;
			}

			messageCipherTextHexSubstring = messageCipherTextHexString.substr(startOfSubstring, lengthOfSubstring);
			messageBlock = new BigInteger(messageCipherTextHexSubstring, 16);
			cipherTextBlock = messageBlock.add(commonSecretKeyXBigInteger);
			cipherTextBlock = cipherTextBlock.mod(eccPBigInteger);

			if (messageCipherText == "") {
				messageCipherText = cipherTextBlock.toString(16);
			} else {
				messageCipherText = messageCipherText + "-" + cipherTextBlock.toString(16);
			}

		}

	}


};


exports.decryptMessage = function () {

	messageCipherText = getN("messageCipherText").value; // We have to change this line to get the incoming message ciphertext from the friend

	var eccP = getN("eccP").value;
	var commonSecretKeyX = receiversCommonSecretKeyX;
	var commonSecretKeyY = receiversCommonSecretKeyY;

	var eccPBigInteger = new BigInteger(eccP, 16);
	var commonSecretKeyXBigInteger = new BigInteger(commonSecretKeyX, 16);  // 233977799535295621105177301016782318690314960717
	var commonSecretKeyYBigInteger = new BigInteger(commonSecretKeyY, 16);  // 610964657955290730928475511523514880516430485303



	// The message blocks will be separated by hyphens "-", so split the cipher text
	// at the hyphens. Then, store the number of blocks.
	var messageCipherTextBlockArray = messageCipherText.split("-");
	var numberOfBlocks = messageCipherTextBlockArray.length;

	// Decrypt each of the message blocks.
	var messageCipherTextHexString = "";
	var cipherTextHexBlock;
	var plainTextHexBlock;
	var i;
	var hexCodeOfCharacter;
	var decimalCodeOfCharacter;
	var singleCharacter;
	decryptedMessage = "";
	var j;


	for (i = 0 ; i < numberOfBlocks ; i++) {

		messageCipherTextHexString = messageCipherTextBlockArray[i];

		cipherTextHexBlock = new BigInteger(messageCipherTextHexString,16);

		cipherTextHexBlock = cipherTextHexBlock.subtract(commonSecretKeyXBigInteger);
		cipherTextHexBlock = cipherTextHexBlock.mod(eccPBigInteger);

		plainTextHexBlock = cipherTextHexBlock.toString(16); // Message. = 4d6573736167652e in plain text.

		// Each character is encoded as a hexadecimal value in the plainTextHexBlock,
		// so take the plainTextHexBlock apart 2-characters at a time, and convert
		// them to a character in the message.

		for (j = 0; j < plainTextHexBlock.length; j = j + 2) {

			hexCodeOfCharacter = plainTextHexBlock.substr(j, 2);
			decimalCodeOfCharacter = parseInt(hexCodeOfCharacter, 16);
			singleCharacter = String.fromCharCode(decimalCodeOfCharacter);
			decryptedMessage = decryptedMessage + singleCharacter;

		}

	}


};




/*
 ----------------------------------------------------------------------------
 Other Functions
 ----------------------------------------------------------------------------
 */


exports.pick_rand = function () {

	var n = new BigInteger(eccN, 16);

	var n1 = n.subtract(BigInteger.ONE);

	var r = new BigInteger(n.bitLength(), rng);

	return r.mod(n1).add(BigInteger.ONE);

};


exports.getN = function (n) {

	return typeof n == 'object' ? n : document.getElementById(n);

};


exports.generateRandomString = function (len) {
	var possibleCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`-=[]\\;\',./~!@#$%^&*()_+{}|:\"<>?";
	var randomString = "";
	for (var i = 0; i < len; i++) {
		var randomPosition = Math.floor(Math.random() * possibleCharacters.length);
		randomString = randomString + possibleCharacters.substring(randomPosition, randomPosition + 1);
	}
	return randomString;
};


exports.convertStringToHex = function (originalString) {

	// Convert each plain text character to its unicode hex value.
	var stringUnicodeDecimalArray = [];
	var stringUnicodeHexArray = [];
	var i;
	for (i = 0 ; i < originalString.length ; i++) {
		stringUnicodeDecimalArray[i] = originalString.charCodeAt(i);
		stringUnicodeHexArray[i] = stringUnicodeDecimalArray[i].toString(16);
	}
	var hexadecimalString = stringUnicodeHexArray.join("");

	return hexadecimalString;
};

