//==============================================================================================================================
// ecc-salt.js
//==============================================================================================================================


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

	exports.set_secp256r1();
	exports.rng = new exports.SecureRandom();

	return (exports.rng);
};


exports.set_ec_params = function(name) {
	exports.c = exports.getSECCurveByName(name);

	exports.eccP = exports.c.getCurve().getQ().toString(16);
	exports.eccA = exports.c.getCurve().getA().toBigInteger().toString(16);
	exports.eccB = exports.c.getCurve().getB().toBigInteger().toString(16);
	exports.eccGx = exports.c.getG().getX().toBigInteger().toString(16);
	exports.eccGy = exports.c.getG().getY().toBigInteger().toString(16);
	exports.eccN = exports.c.getN().toString(16);

};


exports.set_secp128r1 = function() {
	exports.set_ec_params("secp128r1");
};

exports.set_secp160k1 = function() {
	exports.set_ec_params("secp160k1");
};

exports.set_secp160r1 = function() {
	exports.set_ec_params("secp160r1");
};

exports.set_secp192k1 = function() {
	exports.set_ec_params("secp192k1");
};

exports.set_secp192r1 = function() {
	exports.set_ec_params("secp192r1");
};

exports.set_secp224r1 = function() {
	exports.set_ec_params("secp224r1");
};

exports.set_secp256r1 = function() {
	exports.set_ec_params("secp256r1");
};

exports.get_curve = function() {
	return new exports.ECCurveFp(new exports.BigInteger(exports.eccP, 16),
		new exports.BigInteger(exports.eccA, 16),
		new exports.BigInteger(exports.eccB, 16));
};
// jsbnBn1
exports.get_G = function(curve) {
	console.log(curve);
	return new exports.ECPointFp(curve,
		curve.fromBigInteger(new exports.BigInteger(exports.eccGx, 16)),
		curve.fromBigInteger(new exports.BigInteger(exports.eccGy, 16)));
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


exports.generateSendersPrivateMultiplier = function(sendersPassword, sendersSalt) {

	exports.sendersPrivateMultiplier = exports.convertStringToHex(sendersPassword + sendersSalt);

	return (exports.sendersPrivateMultiplier);

	//


	/*
	 ----------------------------------------------------------------------------
	 Changing the sender's private multiplier implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};


exports.calculateSendersMultipliedPoint = function(sendersPrivateMultiplier) {

	exports.curve = exports.get_curve();
	var G = exports.get_G(exports.curve);
	var a = new exports.BigInteger(exports.sendersPrivateMultiplier, 16);
	var P = G.multiply(a);

	exports.sendersMultipliedX = P.getX().toBigInteger().toString(16);
	exports.sendersMultipliedY = P.getY().toBigInteger().toString(16);

	exports.keys = [exports.sendersMultipliedX, exports.sendersMultipliedY];

	return (exports.keys);


	/*
	 ----------------------------------------------------------------------------
	 Changing the sender's multiplied point (public key) implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};


exports.calculateSendersCommonSecretKey = function() {

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

	var curve = exports.get_curve();
	var P = new exports.ECPointFp(curve,
		curve.fromBigInteger(new exports.BigInteger(exports.receiversMultipliedX, 16)),
		curve.fromBigInteger(new exports.BigInteger(exports.receiversMultipliedY, 16)));

	var a = new exports.BigInteger(exports.sendersPrivateMultiplier, 16);
	var S = P.multiply(a);

	exports.sendersCommonSecretKeyX = S.getX().toBigInteger().toString(16);
	exports.sendersCommonSecretKeyY = S.getY().toBigInteger().toString(16);


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


exports.generateReceiversPrivateMultiplier = function() {

	exports.receiversPrivateMultiplier = exports.convertStringToHex(exports.receiversPassword + exports.receiversSalt);

	/*
	 ----------------------------------------------------------------------------
	 Changing the receiver's private multiplier implies
	 the common secret key and the encrypted message.
	 are no longer valid.
	 ----------------------------------------------------------------------------
	 */


};


exports.calculateReceiversMultipliedPoint = function() {

	var curve = exports.get_curve();
	var G = exports.get_G(curve);
	var a = new exports.BigInteger(exports.receiversPrivateMultiplier, 16);
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


exports.calculateReceiversCommonSecretKey = function() {

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

	var curve = exports.get_curve();
	var P = new exports.ECPointFp(curve,
		curve.fromBigInteger(new exports.BigInteger(exports.sendersMultipliedX, 16)),
		curve.fromBigInteger(new exports.BigInteger(exports.sendersMultipliedY, 16)));

	var a = new exports.BigInteger(exports.receiversPrivateMultiplier, 16);
	var S = P.multiply(a);

	exports.receiversCommonSecretKeyX = S.getX().toBigInteger().toString(16);
	exports.receiversCommonSecretKeyY = S.getY().toBigInteger().toString(16);


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


exports.encryptMessage = function(messagePlainText) {

	//messagePlainText = getN("messagePlainText").value; // We have to change this line to get the message from the chat box that's being sent to the friend.
	//var eccP = getN("eccP").value;
	var commonSecretKeyX = exports.receiversCommonSecretKeyX;
	var commonSecretKeyY = exports.receiversCommonSecretKeyY;

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
	var messageCipherTextHexString = exports.convertStringToHex(messagePlainText);
	//alert("Message plain text hex: " + messageCipherTextHexString); // Message. = 4d6573736167652e in plain text.

	// Determine the size of the message block by finding the what number of characters
	// is less than the ECC prime.
	var blockSize = 0;
	var messageBlock;
	var eccPBigInteger = new exports.BigInteger(exports.eccP, 16);
	var comparisonValue;

	for(i = 1; i < messageCipherTextHexString.length; i = i + 2) { // Step by two characters to get a complete 8-bit byte (an octet).

		exports.messageBlock = new exports.BigInteger(messageCipherTextHexString.substr(0, i), 16);
		exports.comparisonValue = exports.messageBlock.compareTo(eccPBigInteger);

		if(messageBlock.compareTo(eccPBigInteger) >= 0) {
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
	var commonSecretKeyXBigInteger = new exports.BigInteger(commonSecretKeyX, 16);
	var commonSecretKeyYBigInteger = new exports.BigInteger(commonSecretKeyY, 16);
	var cipherTextBlock = new exports.BigInteger.ZERO;
	var messageCipherText = "";

	if(blockSize == 0) {

		blockSize = messageCipherTextHexString.length;

		// Encrypt the message (when the blockSize is the same as the message length).
		exports.messageBlock = new exports.BigInteger(messageCipherTextHexString, 16);
		exports.cipherTextBlock = messageBlock.add(commonSecretKeyXBigInteger);
		exports.cipherTextBlock = cipherTextBlock.mod(eccPBigInteger);
		messageCipherText = cipherTextBlock.toString(16);

	} else {

		// Encrypt the message (when the blockSize is less than the message length).
		var numberOfBlocks = Math.floor(messageCipherTextHexString.length / blockSize) + 1;
		var messageCipherTextHexSubstring = "";
		var startOfSubstring = 0;
		var lengthOfSubstring;

		for(i = 1; i <= numberOfBlocks; i++) {

			startOfSubstring = (i - 1) * blockSize;

			if(messageCipherTextHexString.length - startOfSubstring >= blockSize) {
				lengthOfSubstring = blockSize;
			} else {
				lengthOfSubstring = messageCipherTextHexString.length - startOfSubstring;
			}

			messageCipherTextHexSubstring = messageCipherTextHexString.substr(startOfSubstring, lengthOfSubstring);
			exports.messageBlock = new exports.BigInteger(messageCipherTextHexSubstring, 16);
			exports.cipherTextBlock = messageBlock.add(commonSecretKeyXBigInteger);
			exports.cipherTextBlock = cipherTextBlock.mod(eccPBigInteger);

			if(messageCipherText == "") {
				messageCipherText = cipherTextBlock.toString(16);
			} else {
				messageCipherText = messageCipherText + "-" + cipherTextBlock.toString(16);
			}

		}

	}


};


exports.decryptMessage = function(messageCipherText) {

	//messageCipherText = getN("messageCipherText").value; // We have to change this line to get the incoming message ciphertext from the friend

	//var eccP = getN("eccP").value;
	var commonSecretKeyX = receiversCommonSecretKeyX;
	var commonSecretKeyY = receiversCommonSecretKeyY;

	var eccPBigInteger = new exports.BigInteger(eccP, 16);
	var commonSecretKeyXBigInteger = new exports.BigInteger(commonSecretKeyX, 16);  // 233977799535295621105177301016782318690314960717
	var commonSecretKeyYBigInteger = new exports.BigInteger(commonSecretKeyY, 16);  // 610964657955290730928475511523514880516430485303


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


	for(i = 0; i < numberOfBlocks; i++) {

		messageCipherTextHexString = messageCipherTextBlockArray[i];

		cipherTextHexBlock = new exports.BigInteger(messageCipherTextHexString, 16);

		cipherTextHexBlock = cipherTextHexBlock.subtract(commonSecretKeyXBigInteger);
		cipherTextHexBlock = cipherTextHexBlock.mod(eccPBigInteger);

		plainTextHexBlock = cipherTextHexBlock.toString(16); // Message. = 4d6573736167652e in plain text.

		// Each character is encoded as a hexadecimal value in the plainTextHexBlock,
		// so take the plainTextHexBlock apart 2-characters at a time, and convert
		// them to a character in the message.

		for(j = 0; j < plainTextHexBlock.length; j = j + 2) {

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


exports.pick_rand = function() {

	var n = new exports.BigInteger(eccN, 16);

	var n1 = n.subtract(exports.BigInteger.ONE);

	var r = new exports.BigInteger(n.bitLength(), rng);

	return r.mod(n1).add(exports.BigInteger.ONE);

};


exports.getN = function(n) {

	return typeof n == 'object' ? n : exports.document.getElementById(n);

};


exports.generateRandomString = function(len) {
	var possibleCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`-=[]\\;\',./~!@#$%^&*()_+{}|:\"<>?";
	var randomString = "";
	for(var i = 0; i < len; i++) {
		var randomPosition = Math.floor(Math.random() * possibleCharacters.length);
		randomString = randomString + possibleCharacters.substring(randomPosition, randomPosition + 1);
	}
	return randomString;
};


exports.convertStringToHex = function(originalString) {

	// Convert each plain text character to its unicode hex value.
	var stringUnicodeDecimalArray = [];
	var stringUnicodeHexArray = [];
	var i;
	for(i = 0; i < originalString.length; i++) {
		stringUnicodeDecimalArray[i] = originalString.charCodeAt(i);
		stringUnicodeHexArray[i] = stringUnicodeDecimalArray[i].toString(16);
	}
	var hexadecimalString = stringUnicodeHexArray.join("");

	return hexadecimalString;
};


//==============================================================================================================================
// jsbn-ecc.js
//==============================================================================================================================

// Basic Javascript Elliptic Curve implementation
// Ported loosely from BouncyCastle's Java EC code
// Only Fp curves implemented for now

// Requires jsbn.js and jsbn2.js

// ----------------
// ECFieldElementFp

// constructor
exports.ECFieldElementFp = function(q, x) {
	this.x = x;
	this.q = q;
};

exports.feFpEquals = function(other) {
	if(other == this) return true;
	return (this.q.equals(other.q) && this.x.equals(other.x));
};

exports.feFpToBigInteger = function() {
	return this.x;
};

exports.feFpNegate = function() {
	return new exports.ECFieldElementFp(this.q, this.x.negate().mod(this.q));
};

exports.feFpAdd = function(b) {
	return new exports.ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
};

exports.feFpSubtract = function(b) {
	return new exports.ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
};

exports.feFpMultiply = function(b) {
	return new exports.ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
};

exports.feFpSquare = function() {
	return new exports.ECFieldElementFp(this.q, this.x.square().mod(this.q));
};

exports.feFpDivide = function(b) {
	return new exports.ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
};

exports.ECFieldElementFp.prototype.equals = exports.feFpEquals;
exports.ECFieldElementFp.prototype.toBigInteger = exports.feFpToBigInteger;
exports.ECFieldElementFp.prototype.negate = exports.feFpNegate;
exports.ECFieldElementFp.prototype.add = exports.feFpAdd;
exports.ECFieldElementFp.prototype.subtract = exports.feFpSubtract;
exports.ECFieldElementFp.prototype.multiply = exports.feFpMultiply;
exports.ECFieldElementFp.prototype.square = exports.feFpSquare;
exports.ECFieldElementFp.prototype.divide = exports.feFpDivide;

// ----------------
// ECPointFp

// constructor
exports.ECPointFp = function(curve, x, y, z) {
	this.curve = curve;
	this.x = x;
	this.y = y;
	// Projective coordinates: either zinv == null or z * zinv == 1
	// z and zinv are just BigIntegers, not fieldElements
	if(z == null) {
		this.z = exports.BigInteger.ONE;
	}
	else {
		this.z = z;
	}
	this.zinv = null;
};

exports.pointFpGetX = function() {
	if(this.zinv == null) {
		this.zinv = this.z.modInverse(this.curve.q);
	}
	var r = this.x.toBigInteger().multiply(this.zinv);
	this.curve.reduce(r);
	return this.curve.fromBigInteger(r);
};

exports.pointFpGetY = function() {
	if(this.zinv == null) {
		this.zinv = this.z.modInverse(this.curve.q);
	}
	var r = this.y.toBigInteger().multiply(this.zinv);
	this.curve.reduce(r);
	return this.curve.fromBigInteger(r);
};

exports.pointFpEquals = function(other) {
	if(other == this) return true;
	if(this.isInfinity()) return other.isInfinity();
	if(other.isInfinity()) return this.isInfinity();
	var u, v;
	// u = Y2 * Z1 - Y1 * Z2
	u = other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q);
	if(!u.equals(exports.BigInteger.ZERO)) return false;
	// v = X2 * Z1 - X1 * Z2
	v = other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q);
	return v.equals(exports.BigInteger.ZERO);
};

exports.pointFpIsInfinity = function() {
	if((this.x == null) && (this.y == null)) return true;
	return this.z.equals(exports.BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
};

exports.pointFpNegate = function() {
	return new exports.ECPointFp(this.curve, this.x, this.y.negate(), this.z);
};

exports.pointFpAdd = function(b) {
	if(this.isInfinity()) return b;
	if(b.isInfinity()) return this;

	// u = Y2 * Z1 - Y1 * Z2
	var u = b.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(b.z)).mod(this.curve.q);
	// v = X2 * Z1 - X1 * Z2
	var v = b.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(b.z)).mod(this.curve.q);

	if(exports.BigInteger.ZERO.equals(v)) {
		if(exports.BigInteger.ZERO.equals(u)) {
			return this.twice(); // this == b, so double
		}
		return this.curve.getInfinity(); // this = -b, so infinity
	}

	var THREE = new exports.BigInteger("3");
	var x1 = this.x.toBigInteger();
	var y1 = this.y.toBigInteger();
	var x2 = b.x.toBigInteger();
	var y2 = b.y.toBigInteger();

	var v2 = v.square();
	var v3 = v2.multiply(v);
	var x1v2 = x1.multiply(v2);
	var zu2 = u.square().multiply(this.z);

	// x3 = v * (z2 * (z1 * u^2 - 2 * x1 * v^2) - v^3)
	var x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q);
	// y3 = z2 * (3 * x1 * u * v^2 - y1 * v^3 - z1 * u^3) + u * v^3
	var y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.q);
	// z3 = v^3 * z1 * z2
	var z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.q);

	return new exports.ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
};

exports.pointFpTwice = function() {
	if(this.isInfinity()) return this;
	if(this.y.toBigInteger().signum() == 0) return this.curve.getInfinity();

	var THREE = new exports.BigInteger("3");
	var x1 = this.x.toBigInteger();
	var y1 = this.y.toBigInteger();

	var y1z1 = y1.multiply(this.z);
	var y1sqz1 = y1z1.multiply(y1).mod(this.curve.q);
	var a = this.curve.a.toBigInteger();

	// w = 3 * x1^2 + a * z1^2
	var w = x1.square().multiply(THREE);
	if(!(exports.BigInteger.ZERO.equals(a))) {
		w = w.add(this.z.square().multiply(a));
	}
	w = w.mod(this.curve.q);
	//this.curve.reduce(w);
	// x3 = 2 * y1 * z1 * (w^2 - 8 * x1 * y1^2 * z1)
	var x3 = w.square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q);
	// y3 = 4 * y1^2 * z1 * (3 * w * x1 - 2 * y1^2 * z1) - w^3
	var y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.square().multiply(w)).mod(this.curve.q);
	// z3 = 8 * (y1 * z1)^3
	var z3 = y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q);

	return new exports.ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
};

// Simple NAF (Non-Adjacent Form) multiplication algorithm
exports.pointFpMultiply = function(k) {
	if(this.isInfinity()) return this;
	if(k.signum() == 0) return this.curve.getInfinity();

	var e = k;
	var h = e.multiply(new exports.BigInteger("3"));

	var neg = this.negate();
	var R = this;

	var i;
	for(i = h.bitLength() - 2; i > 0; --i) {
		R = R.twice();

		var hBit = h.testBit(i);
		var eBit = e.testBit(i);

		if(hBit != eBit) {
			R = R.add(hBit ? this : neg);
		}
	}

	return R;
};

// Compute this*j + x*k (simultaneous multiplication)
exports.pointFpMultiplyTwo = function(j, x, k) {
	var i;
	if(j.bitLength() > k.bitLength())
		i = j.bitLength() - 1;
	else
		i = k.bitLength() - 1;

	var R = this.curve.getInfinity();
	var both = this.add(x);
	while(i >= 0) {
		R = R.twice();
		if(j.testBit(i)) {
			if(k.testBit(i)) {
				R = R.add(both);
			}
			else {
				R = R.add(this);
			}
		}
		else {
			if(k.testBit(i)) {
				R = R.add(x);
			}
		}
		--i;
	}

	return R;
};

exports.ECPointFp.prototype.getX = exports.pointFpGetX;
exports.ECPointFp.prototype.getY = exports.pointFpGetY;
exports.ECPointFp.prototype.equals = exports.pointFpEquals;
exports.ECPointFp.prototype.isInfinity = exports.pointFpIsInfinity;
exports.ECPointFp.prototype.negate = exports.pointFpNegate;
exports.ECPointFp.prototype.add = exports.pointFpAdd;
exports.ECPointFp.prototype.twice = exports.pointFpTwice;
exports.ECPointFp.prototype.multiply = exports.pointFpMultiply;
exports.ECPointFp.prototype.multiplyTwo = exports.pointFpMultiplyTwo;

// ----------------
// ECCurveFp

// constructor
exports.ECCurveFp = function(q, a, b) {
	this.q = q;
	this.a = this.fromBigInteger(a);
	this.b = this.fromBigInteger(b);
	this.infinity = new exports.ECPointFp(this, null, null);
	this.reducer = new exports.Barrett(this.q);

	return (exports.ECCurveFp);
};

exports.curveFpGetQ = function() {
	return this.q;
};

exports.curveFpGetA = function() {
	return this.a;
};

exports.curveFpGetB = function() {
	return this.b;
};

exports.curveFpEquals = function(other) {
	if(other == this) return true;
	return (this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b));
};

exports.curveFpGetInfinity = function() {
	return this.infinity;
};

exports.curveFpFromBigInteger = function(x) {
	return new exports.ECFieldElementFp(this.q, x);
};

exports.curveReduce = function(x) {
	this.reducer.reduce(x);
};

// for now, work with hex strings because they're easier in JS
exports.curveFpDecodePointHex = function(s) {
	switch(parseInt(s.substr(0, 2), 16)) { // first byte
		case 0:
			return this.infinity;
		case 2:
		case 3:
			// point compression not supported yet
			return null;
		case 4:
		case 6:
		case 7:
			var len = (s.length - 2) / 2;
			var xHex = s.substr(2, len);
			var yHex = s.substr(len + 2, len);

			return new exports.ECPointFp(this,
				this.fromBigInteger(new exports.BigInteger(xHex, 16)),
				this.fromBigInteger(new exports.BigInteger(yHex, 16)));

		default: // unsupported
			return null;
	}
};

exports.curveFpEncodePointHex = function(p) {
	if(p.isInfinity()) return "00";
	var xHex = p.getX().toBigInteger().toString(16);
	var yHex = p.getY().toBigInteger().toString(16);
	var oLen = this.getQ().toString(16).length;
	if((oLen % 2) != 0) oLen++;
	while(xHex.length < oLen) {
		xHex = "0" + xHex;
	}
	while(yHex.length < oLen) {
		yHex = "0" + yHex;
	}
	return "04" + xHex + yHex;
};

exports.ECCurveFp.prototype.getQ = exports.curveFpGetQ;
exports.ECCurveFp.prototype.getA = exports.curveFpGetA;
exports.ECCurveFp.prototype.getB = exports.curveFpGetB;
exports.ECCurveFp.prototype.equals = exports.curveFpEquals;
exports.ECCurveFp.prototype.getInfinity = exports.curveFpGetInfinity;
exports.ECCurveFp.prototype.fromBigInteger = exports.curveFpFromBigInteger;
exports.ECCurveFp.prototype.reduce = exports.curveReduce;
exports.ECCurveFp.prototype.decodePointHex = exports.curveFpDecodePointHex;
exports.ECCurveFp.prototype.encodePointHex = exports.curveFpEncodePointHex;


//==============================================================================================================================
// jsbn-jsbn1.js
//==============================================================================================================================


// exports.dbits = undefined;


exports.canary = 0xdeadbeefcafe;
exports.j_lm = ((exports.canary & 0xffffff) == 0xefcafe);

// (public) Constructor
exports.BigInteger = function(a, b, c) {
	console.log(this);
	if(a != null)
		if("number" == typeof a) this.fromNumber(a, b, c);
		else if(b == null && "string" != typeof a) this.fromString(a, 256);
		else this.fromString(a, b);
};

// return new, unset BigInteger
exports.nbi = function() {
	return new exports.BigInteger(null);
};

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
exports.am1 = function(i, x, w, j, c, n) {
	while(--n >= 0) {
		var v = x * this[i++] + w[j] + c;
		c = Math.floor(v / 0x4000000);
		w[j++] = v & 0x3ffffff;
	}
	return c;
};
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
exports.am2 = function(i, x, w, j, c, n) {
	var xl = x & 0x7fff, xh = x >> 15;
	while(--n >= 0) {
		var l = this[i] & 0x7fff;
		var h = this[i++] >> 15;
		var m = xh * l + h * xl;
		l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
		c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
		w[j++] = l & 0x3fffffff;
	}
	return c;
};
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
exports.am3 = function(i, x, w, j, c, n) {
	var xl = x & 0x3fff, xh = x >> 14;
	while(--n >= 0) {
		var l = this[i] & 0x3fff;
		var h = this[i++] >> 14;
		var m = xh * l + h * xl;
		l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
		c = (l >> 28) + (m >> 14) + xh * h;
		w[j++] = l & 0xfffffff;
	}
	return c;
};
// if(exports.j_lm && (exports.navigator.appName == "Microsoft Internet Explorer")) {
//   exports.BigInteger.exports.prototype.am = am2;
//   exports.dbits = 30;
// }
// else if(exports.j_lm && (exports.navigator.appName != "Netscape")) {
exports.BigInteger.prototype.am = exports.am1;
exports.dbits = 26;
// }
// else { // Mozilla/Netscape seems to prefer am3
//   exports.BigInteger.exports.prototype.am = am3;
//   exports.dbits = 28;
// }

exports.BigInteger.prototype.DB = exports.dbits;
exports.BigInteger.prototype.DM = ((1 << exports.dbits) - 1);
exports.BigInteger.prototype.DV = (1 << exports.dbits);

exports.BI_FP = 52;
exports.BigInteger.prototype.FV = Math.pow(2, exports.BI_FP);
exports.BigInteger.prototype.F1 = exports.BI_FP - exports.dbits;
exports.BigInteger.prototype.F2 = 2 * exports.dbits - exports.BI_FP;

// Digit conversions
exports.BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
exports.BI_RC = new Array();
exports.rr = undefined;
exports.vv = undefined;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) exports.BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) exports.BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) exports.BI_RC[rr++] = vv;

exports.int2char = function(n) {
	return BI_RM.charAt(n);
};
exports.intAt = function(s, i) {
	var c = exports.BI_RC[s.charCodeAt(i)];
	return (c == null) ? -1 : c;
};

// (protected) copy this to r
exports.bnpCopyTo = function(r) {
	for(var i = this.t - 1; i >= 0; --i) r[i] = this[i];
	r.t = this.t;
	r.s = this.s;
};

// (protected) set from integer value x, -DV <= x < DV
exports.bnpFromInt = function(x) {
	this.t = 1;
	this.s = (x < 0) ? -1 : 0;
	if(x > 0) this[0] = x;
	else if(x < -1) this[0] = x + this.DV;
	else this.t = 0;
};

// return bigint initialized to value
exports.nbv = function(i) {
	var r = exports.nbi();
	r.fromInt(i);
	return r;
	// return new exports.BigInteger(i);
};

// (protected) set from string and radix
exports.bnpFromString = function(s, b) {
	var k;
	if(b == 16) k = 4;
	else if(b == 8) k = 3;
	else if(b == 256) k = 8; // byte array
	else if(b == 2) k = 1;
	else if(b == 32) k = 5;
	else if(b == 4) k = 2;
	else {
		this.fromRadix(s, b);
		return;
	}
	this.t = 0;
	this.s = 0;
	var i = s.length, mi = false, sh = 0;
	while(--i >= 0) {
		var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
		if(x < 0) {
			if(s.charAt(i) == "-") mi = true;
			continue;
		}
		mi = false;
		if(sh == 0)
			this[this.t++] = x;
		else if(sh + k > this.DB) {
			this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
			this[this.t++] = (x >> (this.DB - sh));
		}
		else
			this[this.t - 1] |= x << sh;
		sh += k;
		if(sh >= this.DB) sh -= this.DB;
	}
	if(k == 8 && (s[0] & 0x80) != 0) {
		this.s = -1;
		if(sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
	}
	this.clamp();
	if(mi) exports.BigInteger.ZERO.subTo(this, this);
};

// (protected) clamp off excess high words
exports.bnpClamp = function() {
	var c = this.s & this.DM;
	while(this.t > 0 && this[this.t - 1] == c) --this.t;
};

// (public) return string representation in given radix
exports.bnToString = function(b) {
	console.log(this);
	if(this.s < 0) return "-" + this.negate().toString(b);
	var k;
	if(b == 16) k = 4;
	else if(b == 8) k = 3;
	else if(b == 2) k = 1;
	else if(b == 32) k = 5;
	else if(b == 4) k = 2;
	else return this.toRadix(b);
	var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
	var p = this.DB - (i * this.DB) % k;
	if(i-- > 0) {
		if(p < this.DB && (d = this[i] >> p) > 0) {
			m = true;
			r = int2char(d);
		}
		while(i >= 0) {
			if(p < k) {
				d = (this[i] & ((1 << p) - 1)) << (k - p);
				d |= this[--i] >> (p += this.DB - k);
			}
			else {
				d = (this[i] >> (p -= k)) & km;
				if(p <= 0) {
					p += this.DB;
					--i;
				}
			}
			if(d > 0) m = true;
			if(m) r += int2char(d);
		}
	}
	return m ? r : "0";
};

// (public) -this
exports.bnNegate = function() {
	var r = exports.nbi();
	exports.BigInteger.ZERO.subTo(this, r);
	return r;
};

// (public) |this|
exports.bnAbs = function() {
	return (this.s < 0) ? this.negate() : this;
};

// (public) return + if this > a, - if this < a, 0 if equal
exports.bnCompareTo = function(a) {
	var r = this.s - a.s;
	if(r != 0) return r;
	var i = this.t;
	r = i - a.t;
	if(r != 0) return (this.s < 0) ? -r : r;
	while(--i >= 0) if((r = this[i] - a[i]) != 0) return r;
	return 0;
};

// returns bit length of the integer x
exports.nbits = function(x) {
	var r = 1, t;
	if((t = x >>> 16) != 0) {
		x = t;
		r += 16;
	}
	if((t = x >> 8) != 0) {
		x = t;
		r += 8;
	}
	if((t = x >> 4) != 0) {
		x = t;
		r += 4;
	}
	if((t = x >> 2) != 0) {
		x = t;
		r += 2;
	}
	if((t = x >> 1) != 0) {
		x = t;
		r += 1;
	}
	return r;
};

// (public) return the number of bits in "this"
exports.bnBitLength = function() {
	if(this.t <= 0) return 0;
	return this.DB * (this.t - 1) + exports.nbits(this[this.t - 1] ^ (this.s & this.DM));
};

// (protected) r = this << n*DB
exports.bnpDLShiftTo = function(n, r) {
	var i;
	for(i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
	for(i = n - 1; i >= 0; --i) r[i] = 0;
	r.t = this.t + n;
	r.s = this.s;
};

// (protected) r = this >> n*DB
exports.bnpDRShiftTo = function(n, r) {
	for(var i = n; i < this.t; ++i) r[i - n] = this[i];
	r.t = Math.max(this.t - n, 0);
	r.s = this.s;
};

// (protected) r = this << n
exports.bnpLShiftTo = function(n, r) {
	var bs = n % this.DB;
	var cbs = this.DB - bs;
	var bm = (1 << cbs) - 1;
	var ds = Math.floor(n / this.DB), c = (this.s << bs) & this.DM, i;
	for(i = this.t - 1; i >= 0; --i) {
		r[i + ds + 1] = (this[i] >> cbs) | c;
		c = (this[i] & bm) << bs;
	}
	for(i = ds - 1; i >= 0; --i) r[i] = 0;
	r[ds] = c;
	r.t = this.t + ds + 1;
	r.s = this.s;
	r.clamp();
};

// (protected) r = this >> n
exports.bnpRShiftTo = function(n, r) {
	r.s = this.s;
	var ds = Math.floor(n / this.DB);
	if(ds >= this.t) {
		r.t = 0;
		return;
	}
	var bs = n % this.DB;
	var cbs = this.DB - bs;
	var bm = (1 << bs) - 1;
	r[0] = this[ds] >> bs;
	for(var i = ds + 1; i < this.t; ++i) {
		r[i - ds - 1] |= (this[i] & bm) << cbs;
		r[i - ds] = this[i] >> bs;
	}
	if(bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
	r.t = this.t - ds;
	r.clamp();
};

// (protected) r = this - a
exports.bnpSubTo = function(a, r) {
	var i = 0, c = 0, m = Math.min(a.t, this.t);
	while(i < m) {
		c += this[i] - a[i];
		r[i++] = c & this.DM;
		c >>= this.DB;
	}
	if(a.t < this.t) {
		c -= a.s;
		while(i < this.t) {
			c += this[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		c += this.s;
	}
	else {
		c += this.s;
		while(i < a.t) {
			c -= a[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		c -= a.s;
	}
	r.s = (c < 0) ? -1 : 0;
	if(c < -1) r[i++] = this.DV + c;
	else if(c > 0) r[i++] = c;
	r.t = i;
	r.clamp();
};

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
exports.bnpMultiplyTo = function(a, r) {
	var x = this.abs(), y = a.abs();
	var i = x.t;
	r.t = i + y.t;
	while(--i >= 0) r[i] = 0;
	for(i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
	r.s = 0;
	r.clamp();
	if(this.s != a.s) exports.BigInteger.ZERO.subTo(r, r);
};

// (protected) r = this^2, r != this (HAC 14.16)
exports.bnpSquareTo = function(r) {
	var x = this.abs();
	var i = r.t = 2 * x.t;
	while(--i >= 0) r[i] = 0;
	for(i = 0; i < x.t - 1; ++i) {
		var c = x.am(i, x[i], r, 2 * i, 0, 1);
		if((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
			r[i + x.t] -= x.DV;
			r[i + x.t + 1] = 1;
		}
	}
	if(r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
	r.s = 0;
	r.clamp();
};

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
exports.bnpDivRemTo = function(m, q, r) {
	var pm = m.abs();
	if(pm.t <= 0) return;
	var pt = this.abs();
	if(pt.t < pm.t) {
		if(q != null) q.fromInt(0);
		if(r != null) this.copyTo(r);
		return;
	}
	if(r == null) r = exports.nbi();
	var y = exports.nbi(), ts = this.s, ms = m.s;
	var nsh = this.DB - exports.nbits(pm[pm.t - 1]);	// normalize modulus
	if(nsh > 0) {
		pm.lShiftTo(nsh, y);
		pt.lShiftTo(nsh, r);
	}
	else {
		pm.copyTo(y);
		pt.copyTo(r);
	}
	var ys = y.t;
	var y0 = y[ys - 1];
	if(y0 == 0) return;
	var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
	var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
	var i = r.t, j = i - ys, t = (q == null) ? exports.nbi() : q;
	y.dlShiftTo(j, t);
	if(r.compareTo(t) >= 0) {
		r[r.t++] = 1;
		r.subTo(t, r);
	}
	exports.BigInteger.ONE.dlShiftTo(ys, t);
	t.subTo(y, y);	// "negative" y so we can replace sub with am later
	while(y.t < ys) y[y.t++] = 0;
	while(--j >= 0) {
		// Estimate quotient digit
		var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
		if((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {	// Try it out
			y.dlShiftTo(j, t);
			r.subTo(t, r);
			while(r[i] < --qd) r.subTo(t, r);
		}
	}
	if(q != null) {
		r.drShiftTo(ys, q);
		if(ts != ms) exports.BigInteger.ZERO.subTo(q, q);
	}
	r.t = ys;
	r.clamp();
	if(nsh > 0) r.rShiftTo(nsh, r);	// Denormalize remainder
	if(ts < 0) exports.BigInteger.ZERO.subTo(r, r);
};

// (public) this mod a
exports.bnMod = function(a) {
	var r = exports.nbi();
	this.abs().divRemTo(a, null, r);
	if(this.s < 0 && r.compareTo(exports.BigInteger.ZERO) > 0) a.subTo(r, r);
	return r;
};

// Modular reduction using "classic" algorithm
exports.Classic = function(m) {
	this.m = m;
};
exports.cConvert = function(x) {
	if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	else return x;
};
exports.cRevert = function(x) {
	return x;
};
exports.cReduce = function(x) {
	x.divRemTo(this.m, null, x);
};
exports.cMulTo = function(x, y, r) {
	x.multiplyTo(y, r);
	this.reduce(r);
};
exports.cSqrTo = function(x, r) {
	x.squareTo(r);
	this.reduce(r);
};

exports.Classic.prototype.convert = exports.cConvert;
exports.Classic.prototype.revert = exports.cRevert;
exports.Classic.prototype.reduce = exports.cReduce;
exports.Classic.prototype.mulTo = exports.cMulTo;
exports.Classic.prototype.sqrTo = exports.cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
exports.bnpInvDigit = function() {
	if(this.t < 1) return 0;
	var x = this[0];
	if((x & 1) == 0) return 0;
	var y = x & 3;		// y == 1/x mod 2^2
	y = (y * (2 - (x & 0xf) * y)) & 0xf;	// y == 1/x mod 2^4
	y = (y * (2 - (x & 0xff) * y)) & 0xff;	// y == 1/x mod 2^8
	y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff;	// y == 1/x mod 2^16
	// last step - calculate inverse mod DV directly;
	// assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
	y = (y * (2 - x * y % this.DV)) % this.DV;		// y == 1/x mod 2^dbits
	// we really want the negative inverse, and -DV < y < DV
	return (y > 0) ? this.DV - y : -y;
};

// Montgomery reduction
exports.Montgomery = function(m) {
	this.m = m;
	this.mp = m.invDigit();
	this.mpl = this.mp & 0x7fff;
	this.mph = this.mp >> 15;
	this.um = (1 << (m.DB - 15)) - 1;
	this.mt2 = 2 * m.t;
};

// xR mod m
exports.montConvert = function(x) {
	var r = exports.nbi();
	x.abs().dlShiftTo(this.m.t, r);
	r.divRemTo(this.m, null, r);
	if(x.s < 0 && r.compareTo(exports.BigInteger.ZERO) > 0) this.m.subTo(r, r);
	return r;
};

// x/R mod m
exports.montRevert = function(x) {
	var r = exports.nbi();
	x.copyTo(r);
	this.reduce(r);
	return r;
};

// x = x/R mod m (HAC 14.32)
exports.montReduce = function(x) {
	while(x.t <= this.mt2)	// pad x so am has enough room later
		x[x.t++] = 0;
	for(var i = 0; i < this.m.t; ++i) {
		// faster way of calculating u0 = x[i]*mp mod DV
		var j = x[i] & 0x7fff;
		var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
		// use am to combine the multiply-shift-add into one call
		j = i + this.m.t;
		x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
		// propagate carry
		while(x[j] >= x.DV) {
			x[j] -= x.DV;
			x[++j]++;
		}
	}
	x.clamp();
	x.drShiftTo(this.m.t, x);
	if(x.compareTo(this.m) >= 0) x.subTo(this.m, x);
};

// r = "x^2/R mod m"; x != r
exports.montSqrTo = function(x, r) {
	x.squareTo(r);
	this.reduce(r);
};

// r = "xy/R mod m"; x,y != r
exports.montMulTo = function(x, y, r) {
	x.multiplyTo(y, r);
	this.reduce(r);
};

exports.Montgomery.prototype.convert = exports.montConvert;
exports.Montgomery.prototype.revert = exports.montRevert;
exports.Montgomery.prototype.reduce = exports.montReduce;
exports.Montgomery.prototype.mulTo = exports.montMulTo;
exports.Montgomery.prototype.sqrTo = exports.montSqrTo;

// (protected) true iff this is even
exports.bnpIsEven = function() {
	return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
};

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
exports.bnpExp = function(e, z) {
	if(e > 0xffffffff || e < 1) return exports.BigInteger.ONE;
	var r = exports.nbi(), r2 = exports.nbi(), g = z.convert(this), i = nbits(e) - 1;
	g.copyTo(r);
	while(--i >= 0) {
		z.sqrTo(r, r2);
		if((e & (1 << i)) > 0) z.mulTo(r2, g, r);
		else {
			var t = r;
			r = r2;
			r2 = t;
		}
	}
	return z.revert(r);
};

// (public) this^e % m, 0 <= e < 2^32
exports.bnModPowInt = function(e, m) {
	var z;
	if(e < 256 || m.isEven()) z = new exports.Classic(m); else z = new exports.Montgomery(m);
	return this.exp(e, z);
};

// protected
// exports.BigInteger = function() {
// 	this.bnpDLShiftTo = exports.bnpDLShiftTo;
// };

// exports.nbv().dlShiftTo = exports.bnpDLShiftTo;
//==============================================================================================================================
// jsbn-jsbn2.js
//==============================================================================================================================

// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
exports.bnClone = function() {
	var r = nbi();
	this.copyTo(r);
	return r;
};

// (public) return value as integer
exports.bnIntValue = function() {
	if(this.s < 0) {
		if(this.t == 1) return this[0] - this.DV;
		else if(this.t == 0) return -1;
	}
	else if(this.t == 1) return this[0];
	else if(this.t == 0) return 0;
	// assumes 16 < DB < 32
	return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
};

// (public) return value as byte
exports.bnByteValue = function() {
	return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
};

// (public) return value as short (assumes DB>=16)
exports.bnShortValue = function() {
	return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
};

// (protected) return x s.t. r^x < DV
exports.bnpChunkSize = function(r) {
	return Math.floor(Math.LN2 * this.DB / Math.log(r));
};

// (public) 0 if this == 0, 1 if this > 0
exports.bnSigNum = function() {
	if(this.s < 0) return -1;
	else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
	else return 1;
};

// (protected) convert to radix string
exports.bnpToRadix = function(b) {
	if(b == null) b = 10;
	if(this.signum() == 0 || b < 2 || b > 36) return "0";
	var cs = this.chunkSize(b);
	var a = Math.pow(b, cs);
	var d = exports.nbv(a), y = exports.nbi(), z = exports.nbi(), r = "";
	this.divRemTo(d, y, z);
	while(y.signum() > 0) {
		r = (a + z.intValue()).toString(b).substr(1) + r;
		y.divRemTo(d, y, z);
	}
	return z.intValue().toString(b) + r;
};

// (protected) convert from radix string
exports.bnpFromRadix = function(s, b) {
	this.bnpFromInt(0);
	if(b == null) b = 10;
	var cs = this.bnpChunkSize(b);
	var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
	for(var i = 0; i < s.length; ++i) {
		var x = intAt(s, i);
		if(x < 0) {
			if(s.charAt(i) == "-" && this.bnSigNum() == 0) mi = true;
			continue;
		}
		w = b * w + x;
		if(++j >= cs) {
			this.dMultiply(d);
			this.dAddOffset(w, 0);
			j = 0;
			w = 0;
		}
	}
	if(j > 0) {
		this.dMultiply(Math.pow(b, j));
		this.dAddOffset(w, 0);
	}
	if(mi) exports.BigInteger.ZERO.subTo(this, this);
};

// (protected) alternate constructor
exports.bnpFromNumber = function(a, b, c) {
	if("number" == typeof b) {
		// new BigInteger(int,int,RNG)
		if(a < 2) this.fromInt(1);
		else {
			this.fromNumber(a, c);
			if(!this.testBit(a - 1))	// force MSB set
				this.bitwiseTo(exports.BigInteger.ONE.shiftLeft(a - 1), op_or, this);
			if(this.isEven()) this.dAddOffset(1, 0); // force odd
			while(!this.isProbablePrime(b)) {
				this.dAddOffset(2, 0);
				if(this.bitLength() > a) this.subTo(exports.BigInteger.ONE.shiftLeft(a - 1), this);
			}
		}
	}
	else {
		// new BigInteger(int,RNG)
		var x = new Array(), t = a & 7;
		x.length = (a >> 3) + 1;
		b.nextBytes(x);
		if(t > 0) x[0] &= ((1 << t) - 1); else x[0] = 0;
		this.fromString(x, 256);
	}
};

// (public) convert to bigendian byte array
exports.bnToByteArray = function() {
	var i = this.t, r = new Array();
	r[0] = this.s;
	var p = this.DB - (i * this.DB) % 8, d, k = 0;
	if(i-- > 0) {
		if(p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
			r[k++] = d | (this.s << (this.DB - p));
		while(i >= 0) {
			if(p < 8) {
				d = (this[i] & ((1 << p) - 1)) << (8 - p);
				d |= this[--i] >> (p += this.DB - 8);
			}
			else {
				d = (this[i] >> (p -= 8)) & 0xff;
				if(p <= 0) {
					p += this.DB;
					--i;
				}
			}
			if((d & 0x80) != 0) d |= -256;
			if(k == 0 && (this.s & 0x80) != (d & 0x80)) ++k;
			if(k > 0 || d != this.s) r[k++] = d;
		}
	}
	return r;
};

exports.bnEquals = function(a) {
	return (this.compareTo(a) == 0);
};
exports.bnMin = function(a) {
	return (this.compareTo(a) < 0) ? this : a;
};
exports.bnMax = function(a) {
	return (this.compareTo(a) > 0) ? this : a;
};

// (protected) r = this op a (bitwise)
exports.bnpBitwiseTo = function(a, op, r) {
	var i, f, m = Math.min(a.t, this.t);
	for(i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
	if(a.t < this.t) {
		f = a.s & this.DM;
		for(i = m; i < this.t; ++i) r[i] = op(this[i], f);
		r.t = this.t;
	}
	else {
		f = this.s & this.DM;
		for(i = m; i < a.t; ++i) r[i] = op(f, a[i]);
		r.t = a.t;
	}
	r.s = op(this.s, a.s);
	r.clamp();
};

// (public) this & a
exports.op_and = function(x, y) {
	return x & y;
};
exports.bnAnd = function(a) {
	var r = nbi();
	this.bitwiseTo(a, op_and, r);
	return r;
};

// (public) this | a
exports.op_or = function(x, y) {
	return x | y;
};
exports.bnOr = function(a) {
	var r = nbi();
	this.bitwiseTo(a, op_or, r);
	return r;
};

// (public) this ^ a
exports.op_xor = function(x, y) {
	return x ^ y;
};
exports.bnXor = function(a) {
	var r = nbi();
	this.bitwiseTo(a, op_xor, r);
	return r;
};

// (public) this & ~a
exports.op_andnot = function(x, y) {
	return x & ~y;
};
exports.bnAndNot = function(a) {
	var r = nbi();
	this.bitwiseTo(a, op_andnot, r);
	return r;
};

// (public) ~this
exports.bnNot = function() {
	var r = nbi();
	for(var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
	r.t = this.t;
	r.s = ~this.s;
	return r;
};

// (public) this << n
exports.bnShiftLeft = function(n) {
	var r = nbi();
	if(n < 0) this.rShiftTo(-n, r); else this.lShiftTo(n, r);
	return r;
};

// (public) this >> n
exports.bnShiftRight = function(n) {
	var r = nbi();
	if(n < 0) this.lShiftTo(-n, r); else this.rShiftTo(n, r);
	return r;
};

// return index of lowest 1-bit in x, x < 2^31
exports.lbit = function(x) {
	if(x == 0) return -1;
	var r = 0;
	if((x & 0xffff) == 0) {
		x >>= 16;
		r += 16;
	}
	if((x & 0xff) == 0) {
		x >>= 8;
		r += 8;
	}
	if((x & 0xf) == 0) {
		x >>= 4;
		r += 4;
	}
	if((x & 3) == 0) {
		x >>= 2;
		r += 2;
	}
	if((x & 1) == 0) ++r;
	return r;
};

// (public) returns index of lowest 1-bit (or -1 if none)
exports.bnGetLowestSetBit = function() {
	for(var i = 0; i < this.t; ++i)
		if(this[i] != 0) return i * this.DB + lbit(this[i]);
	if(this.s < 0) return this.t * this.DB;
	return -1;
};

// return number of 1 bits in x
exports.cbit = function(x) {
	var r = 0;
	while(x != 0) {
		x &= x - 1;
		++r;
	}
	return r;
};

// (public) return number of set bits
exports.bnBitCount = function() {
	var r = 0, x = this.s & this.DM;
	for(var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
	return r;
};

// (public) true iff nth bit is set
exports.bnTestBit = function(n) {
	var j = Math.floor(n / this.DB);
	if(j >= this.t) return (this.s != 0);
	return ((this[j] & (1 << (n % this.DB))) != 0);
};

// (protected) this op (1<<n)
exports.bnpChangeBit = function(n, op) {
	var r = exports.BigInteger.ONE.shiftLeft(n);
	this.bitwiseTo(r, op, r);
	return r;
};

// (public) this | (1<<n)
exports.bnSetBit = function(n) {
	return this.changeBit(n, op_or);
};

// (public) this & ~(1<<n)
exports.bnClearBit = function(n) {
	return this.changeBit(n, op_andnot);
};

// (public) this ^ (1<<n)
exports.bnFlipBit = function(n) {
	return this.changeBit(n, op_xor);
};

// (protected) r = this + a
exports.bnpAddTo = function(a, r) {
	var i = 0, c = 0, m = Math.min(a.t, this.t);
	while(i < m) {
		c += this[i] + a[i];
		r[i++] = c & this.DM;
		c >>= this.DB;
	}
	if(a.t < this.t) {
		c += a.s;
		while(i < this.t) {
			c += this[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		c += this.s;
	}
	else {
		c += this.s;
		while(i < a.t) {
			c += a[i];
			r[i++] = c & this.DM;
			c >>= this.DB;
		}
		c += a.s;
	}
	r.s = (c < 0) ? -1 : 0;
	if(c > 0) r[i++] = c;
	else if(c < -1) r[i++] = this.DV + c;
	r.t = i;
	r.clamp();
};

// (public) this + a
exports.bnAdd = function(a) {
	var r = nbi();
	this.addTo(a, r);
	return r;
};

// (public) this - a
exports.bnSubtract = function(a) {
	var r = nbi();
	this.subTo(a, r);
	return r;
};

// (public) this * a
exports.bnMultiply = function(a) {
	var r = nbi();
	this.multiplyTo(a, r);
	return r;
};

// (public) this^2
exports.bnSquare = function() {
	var r = nbi();
	this.squareTo(r);
	return r;
};

// (public) this / a
exports.bnDivide = function(a) {
	var r = exports.nbi();
	this.divRemTo(a, r, null);
	return r;
};

// (public) this % a
exports.bnRemainder = function(a) {
	var r = nbi();
	this.divRemTo(a, null, r);
	return r;
};

// (public) [this/a,this%a]
exports.bnDivideAndRemainder = function(a) {
	var q = nbi(), r = nbi();
	this.divRemTo(a, q, r);
	return new Array(q, r);
};

// (protected) this *= n, this >= 0, 1 < n < DV
exports.bnpDMultiply = function(n) {
	this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
	++this.t;
	this.clamp();
};

// (protected) this += n << w words, this >= 0
exports.bnpDAddOffset = function(n, w) {
	if(n == 0) return;
	while(this.t <= w) this[this.t++] = 0;
	this[w] += n;
	while(this[w] >= this.DV) {
		this[w] -= this.DV;
		if(++w >= this.t) this[this.t++] = 0;
		++this[w];
	}
};

// A "null" reducer
exports.NullExp = function() {
};
exports.nNop = function(x) {
	return x;
};
exports.nMulTo = function(x, y, r) {
	x.multiplyTo(y, r);
};
exports.nSqrTo = function(x, r) {
	x.squareTo(r);
};

exports.NullExp.prototype.convert = exports.nNop;
exports.NullExp.prototype.revert = exports.nNop;
exports.NullExp.prototype.mulTo = exports.nMulTo;
exports.NullExp.prototype.sqrTo = exports.nSqrTo;

// (public) this^e
exports.bnPow = function(e) {
	return this.exp(e, new NullExp());
};

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
exports.bnpMultiplyLowerTo = function(a, n, r) {
	var i = Math.min(this.t + a.t, n);
	exports.r.s = 0; // assumes a,this >= 0
	exports.r.t = i;
	while(i > 0) r[--i] = 0;
	var j;
	for(j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
	for(j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
	exports.r.clamp();
};

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
exports.bnpMultiplyUpperTo = function(a, n, r) {
	--exports.n;
	var i = exports.r.t = this.t + exports.a.t - exports.n;
	exports.r.s = 0; // assumes a,this >= 0
	while(--i >= 0) exports.r[i] = 0;
	for(i = Math.max(exports.n - this.t, 0); i < exports.a.t; ++i)
		exports.r[this.t + i - exports.n] = this.am(exports.n - i, exports.a[i], exports.r, 0, 0, this.t + i - exports.n);
	exports.r.clamp();
	exports.r.drShiftTo(1, exports.r);
};

// Barrett modular reduction
exports.Barrett = function(m) {
	// setup Barrett
	this.r2 = exports.nbi();
	this.q3 = exports.nbi();
	exports.BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
	this.mu = this.r2.divide(m);
	this.m = m;
};

exports.barrettConvert = function(x) {
	if(x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
	else if(x.compareTo(this.m) < 0) return x;
	else {
		var r = nbi();
		x.copyTo(r);
		this.reduce(r);
		return r;
	}
};

exports.barrettRevert = function(x) {
	return x;
};

// x = x mod m (HAC 14.42)
exports.barrettReduce = function(x) {
	x.drShiftTo(this.m.t - 1, this.r2);
	if(x.t > this.m.t + 1) {
		x.t = this.m.t + 1;
		x.clamp();
	}
	this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
	this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
	while(x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
	x.subTo(this.r2, x);
	while(x.compareTo(this.m) >= 0) x.subTo(this.m, x);
};

// r = x^2 mod m; x != r
exports.barrettSqrTo = function(x, r) {
	x.squareTo(r);
	this.reduce(r);
};

// r = x*y mod m; x,y != r
exports.barrettMulTo = function(x, y, r) {
	x.multiplyTo(y, r);
	this.reduce(r);
};

exports.Barrett.prototype.convert = exports.barrettConvert;
exports.Barrett.prototype.revert = exports.barrettRevert;
exports.Barrett.prototype.reduce = exports.barrettReduce;
exports.Barrett.prototype.mulTo = exports.barrettMulTo;
exports.Barrett.prototype.sqrTo = exports.barrettSqrTo;

// (public) this^e % m (HAC 14.85)
exports.bnModPow = function(e, m) {
	var i = e.bitLength(), k, r = nbv(1), z;
	if(i <= 0) return r;
	else if(i < 18) k = 1;
	else if(i < 48) k = 3;
	else if(i < 144) k = 4;
	else if(i < 768) k = 5;
	else k = 6;
	if(i < 8)
		z = new Classic(m);
	else if(m.isEven())
		z = new Barrett(m);
	else
		z = new Montgomery(m);

	// precomputation
	var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
	g[1] = z.convert(this);
	if(k > 1) {
		var g2 = nbi();
		z.sqrTo(g[1], g2);
		while(n <= km) {
			g[n] = nbi();
			z.mulTo(g2, g[n - 2], g[n]);
			n += 2;
		}
	}

	var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
	i = nbits(e[j]) - 1;
	while(j >= 0) {
		if(i >= k1) w = (e[j] >> (i - k1)) & km;
		else {
			w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
			if(j > 0) w |= e[j - 1] >> (this.DB + i - k1);
		}

		n = k;
		while((w & 1) == 0) {
			w >>= 1;
			--n;
		}
		if((i -= n) < 0) {
			i += this.DB;
			--j;
		}
		if(is1) {	// ret == 1, don't bother squaring or multiplying it
			g[w].copyTo(r);
			is1 = false;
		}
		else {
			while(n > 1) {
				z.sqrTo(r, r2);
				z.sqrTo(r2, r);
				n -= 2;
			}
			if(n > 0) z.sqrTo(r, r2); else {
				t = r;
				r = r2;
				r2 = t;
			}
			z.mulTo(r2, g[w], r);
		}

		while(j >= 0 && (e[j] & (1 << i)) == 0) {
			z.sqrTo(r, r2);
			t = r;
			r = r2;
			r2 = t;
			if(--i < 0) {
				i = this.DB - 1;
				--j;
			}
		}
	}
	return z.revert(r);
};

// (public) gcd(this,a) (HAC 14.54)
exports.bnGCD = function(a) {
	var x = (this.s < 0) ? this.negate() : this.clone();
	var y = (a.s < 0) ? a.negate() : a.clone();
	if(x.compareTo(y) < 0) {
		var t = x;
		x = y;
		y = t;
	}
	var i = x.getLowestSetBit(), g = y.getLowestSetBit();
	if(g < 0) return x;
	if(i < g) g = i;
	if(g > 0) {
		x.rShiftTo(g, x);
		y.rShiftTo(g, y);
	}
	while(x.signum() > 0) {
		if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
		if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
		if(x.compareTo(y) >= 0) {
			x.subTo(y, x);
			x.rShiftTo(1, x);
		}
		else {
			y.subTo(x, y);
			y.rShiftTo(1, y);
		}
	}
	if(g > 0) y.lShiftTo(g, y);
	return y;
};

// (protected) this % n, n < 2^26
exports.bnpModInt = function(n) {
	if(n <= 0) return 0;
	var d = this.DV % n, r = (this.s < 0) ? n - 1 : 0;
	if(this.t > 0)
		if(d == 0) r = this[0] % n;
		else for(var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
	return r;
};

// (public) 1/this % m (HAC 14.61)
exports.bnModInverse = function(m) {
	var ac = m.isEven();
	if((this.isEven() && ac) || m.signum() == 0) return exports.BigInteger.ZERO;
	var u = m.clone(), v = this.clone();
	var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
	while(u.signum() != 0) {
		while(u.isEven()) {
			u.rShiftTo(1, u);
			if(ac) {
				if(!a.isEven() || !b.isEven()) {
					a.addTo(this, a);
					b.subTo(m, b);
				}
				a.rShiftTo(1, a);
			}
			else if(!b.isEven()) b.subTo(m, b);
			b.rShiftTo(1, b);
		}
		while(v.isEven()) {
			v.rShiftTo(1, v);
			if(ac) {
				if(!c.isEven() || !d.isEven()) {
					c.addTo(this, c);
					d.subTo(m, d);
				}
				c.rShiftTo(1, c);
			}
			else if(!d.isEven()) d.subTo(m, d);
			d.rShiftTo(1, d);
		}
		if(u.compareTo(v) >= 0) {
			u.subTo(v, u);
			if(ac) a.subTo(c, a);
			b.subTo(d, b);
		}
		else {
			v.subTo(u, v);
			if(ac) c.subTo(a, c);
			d.subTo(b, d);
		}
	}
	if(v.compareTo(exports.BigInteger.ONE) != 0) return exports.BigInteger.ZERO;
	if(d.compareTo(m) >= 0) return exports.d.subtract(m);
	if(d.signum() < 0) d.addTo(m, d); else return exports.d;
	if(d.signum() < 0) return exports.d.add(m); else return exports.d;
};

exports.lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
exports.lplim = (1 << 26) / exports.lowprimes[exports.lowprimes.length - 1];

// (public) test primality with certainty >= 1-.5^t
exports.bnIsProbablePrime = function(t) {
	var i, x = this.abs();
	if(x.t == 1 && x[0] <= exports.lowprimes[exports.lowprimes.length - 1]) {
		for(i = 0; i < exports.lowprimes.length; ++i)
			if(x[0] == exports.lowprimes[i]) return true;
		return false;
	}
	if(x.isEven()) return false;
	i = 1;
	while(i < exports.lowprimes.length) {
		var m = exports.lowprimes[i], j = i + 1;
		while(j < exports.lowprimes.length && m < lplim) m *= exports.lowprimes[j++];
		m = x.modInt(m);
		while(i < j) if(m % exports.lowprimes[i++] == 0) return false;
	}
	return x.millerRabin(t);
};

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
exports.bnpMillerRabin = function(t) {
	var n1 = this.subtract(exports.BigInteger.ONE);
	var k = n1.getLowestSetBit();
	if(k <= 0) return false;
	var r = n1.shiftRight(k);
	t = (t + 1) >> 1;
	if(t > exports.lowprimes.length) t = exports.lowprimes.length;
	var a = nbi();
	for(var i = 0; i < t; ++i) {
		//Pick bases at random, instead of starting at 2
		a.fromInt(exports.lowprimes[Math.floor(Math.random() * exports.lowprimes.length)]);
		var y = a.modPow(r, this);
		if(y.compareTo(exports.BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
			var j = 1;
			while(j++ < k && y.compareTo(n1) != 0) {
				y = y.modPowInt(2, this);
				if(y.compareTo(exports.BigInteger.ONE) == 0) return false;
			}
			if(y.compareTo(n1) != 0) return false;
		}
	}
	return true;
};

// protected
// exports.BigInteger.prototype.chunkSize = exports.bnpChunkSize;
// exports.BigInteger.prototype.toRadix = exports.bnpToRadix;
// exports.BigInteger.prototype.fromRadix = exports.bnpFromRadix;
// exports.BigInteger.prototype.fromNumber = exports.bnpFromNumber;
// exports.BigInteger.prototype.bitwiseTo = exports.bnpBitwiseTo;
// exports.BigInteger.prototype.changeBit = exports.bnpChangeBit;
// exports.BigInteger.prototype.addTo = exports.bnpAddTo;
// exports.BigInteger.prototype.dMultiply = exports.bnpDMultiply;
// exports.BigInteger.prototype.dAddOffset = exports.bnpDAddOffset;
// exports.BigInteger.prototype.multiplyLowerTo = exports.bnpMultiplyLowerTo;
// exports.BigInteger.prototype.multiplyUpperTo = exports.bnpMultiplyUpperTo;
// exports.BigInteger.prototype.modInt = exports.bnpModInt;
// exports.BigInteger.prototype.millerRabin = exports.bnpMillerRabin;
//
// // public
// exports.BigInteger.prototype.clone = exports.bnClone;
// exports.BigInteger.prototype.intValue = exports.bnIntValue;
// exports.BigInteger.prototype.byteValue = exports.bnByteValue;
// exports.BigInteger.prototype.shortValue = exports.bnShortValue;
// exports.BigInteger.prototype.signum = exports.bnSigNum;
// exports.BigInteger.prototype.toByteArray = exports.bnToByteArray;
// exports.BigInteger.prototype.equals = exports.bnEquals;
// exports.BigInteger.prototype.min = exports.bnMin;
// exports.BigInteger.prototype.max = exports.bnMax;
// exports.BigInteger.prototype.and = exports.bnAnd;
// exports.BigInteger.prototype.or = exports.bnOr;
// exports.BigInteger.prototype.xor = exports.bnXor;
// exports.BigInteger.prototype.andNot = exports.bnAndNot;
// exports.BigInteger.prototype.not = exports.bnNot;
// exports.BigInteger.prototype.shiftLeft = exports.bnShiftLeft;
// exports.BigInteger.prototype.shiftRight = exports.bnShiftRight;
// exports.BigInteger.prototype.getLowestSetBit = exports.bnGetLowestSetBit;
// exports.BigInteger.prototype.bitCount = exports.bnBitCount;
// exports.BigInteger.prototype.testBit = exports.bnTestBit;
// exports.BigInteger.prototype.setBit = exports.bnSetBit;
// exports.BigInteger.prototype.clearBit = exports.bnClearBit;
// exports.BigInteger.prototype.flipBit = exports.bnFlipBit;
// exports.BigInteger.prototype.add = exports.bnAdd;
// exports.BigInteger.prototype.subtract = exports.bnSubtract;
// exports.BigInteger.prototype.multiply = exports.bnMultiply;
// exports.BigInteger.prototype.divide = exports.bnDivide;
// exports.BigInteger.prototype.remainder = exports.bnRemainder;
// exports.BigInteger.prototype.divideAndRemainder = exports.bnDivideAndRemainder;
// exports.BigInteger.prototype.modPow = exports.bnModPow;
// exports.BigInteger.prototype.modInverse = exports.bnModInverse;
// exports.BigInteger.prototype.pow = exports.bnPow;
// exports.BigInteger.prototype.gcd = exports.bnGCD;
// exports.BigInteger.prototype.isProbablePrime = exports.bnIsProbablePrime;
//
// // JSBN-specific extension
// exports.BigInteger.prototype.square = exports.bnSquare;

// exports.BigInteger = function() {
// 	this.bnpChunkSize = exports.bnpChunkSize;
// }


// BigInteger(int signum, byte[] magnitude)
// double doubleValue()
// float floatValue()
// int hashCode()
// long longValue()
// static BigInteger valueOf(long val)

exports.BigInteger.prototype.copyTo = exports.bnpCopyTo;
exports.BigInteger.prototype.fromInt = exports.bnpFromInt;
exports.BigInteger.prototype.fromString = exports.bnpFromString;
exports.BigInteger.prototype.clamp = exports.bnpClamp;
exports.BigInteger.prototype.dlShiftTo = exports.bnpDLShiftTo;
exports.BigInteger.prototype.drShiftTo = exports.bnpDRShiftTo;
exports.BigInteger.prototype.lShiftTo = exports.bnpLShiftTo;
exports.BigInteger.prototype.rShiftTo = exports.bnpRShiftTo;
exports.BigInteger.prototype.subTo = exports.bnpSubTo;
exports.BigInteger.prototype.multiplyTo = exports.bnpMultiplyTo;
exports.BigInteger.prototype.squareTo = exports.bnpSquareTo;
exports.BigInteger.prototype.divRemTo = exports.bnpDivRemTo;
exports.BigInteger.prototype.invDigit = exports.bnpInvDigit;
exports.BigInteger.prototype.isEven = exports.bnpIsEven;
exports.BigInteger.prototype.exp = exports.bnpExp;

// public
exports.BigInteger.prototype.toString = exports.bnToString;
exports.BigInteger.prototype.negate = exports.bnNegate;
exports.BigInteger.prototype.abs = exports.bnAbs;
exports.BigInteger.prototype.compareTo = exports.bnCompareTo;
exports.BigInteger.prototype.bitLength = exports.bnBitLength;
exports.BigInteger.prototype.mod = exports.bnMod;
exports.BigInteger.prototype.modPowInt = exports.bnModPowInt;

// BigInteger interfaces not implemented in jsbn:

exports.BigInteger.prototype.chunkSize = exports.bnpChunkSize;
exports.BigInteger.prototype.toRadix = exports.bnpToRadix;
exports.BigInteger.prototype.fromRadix = exports.bnpFromRadix;
exports.BigInteger.prototype.fromNumber = exports.bnpFromNumber;
exports.BigInteger.prototype.bitwiseTo = exports.bnpBitwiseTo;
exports.BigInteger.prototype.changeBit = exports.bnpChangeBit;
exports.BigInteger.prototype.addTo = exports.bnpAddTo;
exports.BigInteger.prototype.dMultiply = exports.bnpDMultiply;
exports.BigInteger.prototype.dAddOffset = exports.bnpDAddOffset;
exports.BigInteger.prototype.multiplyLowerTo = exports.bnpMultiplyLowerTo;
exports.BigInteger.prototype.multiplyUpperTo = exports.bnpMultiplyUpperTo;
exports.BigInteger.prototype.modInt = exports.bnpModInt;
exports.BigInteger.prototype.millerRabin = exports.bnpMillerRabin;

// public
exports.BigInteger.prototype.clone = exports.bnClone;
exports.BigInteger.prototype.intValue = exports.bnIntValue;
exports.BigInteger.prototype.byteValue = exports.bnByteValue;
exports.BigInteger.prototype.shortValue = exports.bnShortValue;
exports.BigInteger.prototype.signum = exports.bnSigNum;
exports.BigInteger.prototype.toByteArray = exports.bnToByteArray;
exports.BigInteger.prototype.equals = exports.bnEquals;
exports.BigInteger.prototype.min = exports.bnMin;
exports.BigInteger.prototype.max = exports.bnMax;
exports.BigInteger.prototype.and = exports.bnAnd;
exports.BigInteger.prototype.or = exports.bnOr;
exports.BigInteger.prototype.xor = exports.bnXor;
exports.BigInteger.prototype.andNot = exports.bnAndNot;
exports.BigInteger.prototype.not = exports.bnNot;
exports.BigInteger.prototype.shiftLeft = exports.bnShiftLeft;
exports.BigInteger.prototype.shiftRight = exports.bnShiftRight;
exports.BigInteger.prototype.getLowestSetBit = exports.bnGetLowestSetBit;
exports.BigInteger.prototype.bitCount = exports.bnBitCount;
exports.BigInteger.prototype.testBit = exports.bnTestBit;
exports.BigInteger.prototype.setBit = exports.bnSetBit;
exports.BigInteger.prototype.clearBit = exports.bnClearBit;
exports.BigInteger.prototype.flipBit = exports.bnFlipBit;
exports.BigInteger.prototype.add = exports.bnAdd;
exports.BigInteger.prototype.subtract = exports.bnSubtract;
exports.BigInteger.prototype.multiply = exports.bnMultiply;
exports.BigInteger.prototype.divide = exports.bnDivide;
exports.BigInteger.prototype.remainder = exports.bnRemainder;
exports.BigInteger.prototype.divideAndRemainder = exports.bnDivideAndRemainder;
exports.BigInteger.prototype.modPow = exports.bnModPow;
exports.BigInteger.prototype.modInverse = exports.bnModInverse;
exports.BigInteger.prototype.pow = exports.bnPow;
exports.BigInteger.prototype.gcd = exports.bnGCD;
exports.BigInteger.prototype.isProbablePrime = exports.bnIsProbablePrime;

// JSBN-specific extension
exports.BigInteger.prototype.square = exports.bnSquare;

// "constants"
exports.BigInteger.ZERO = exports.nbv(0);
exports.BigInteger.ONE = exports.nbv(1);


//==============================================================================================================================
// jsbn-prng4.js
//==============================================================================================================================

// prng4.js - uses Arcfour as a PRNG

exports.Arcfour = function() {
	this.i = 0;
	this.j = 0;
	this.S = new Array();
};

// Initialize arcfour context from key, an array of ints, each from [0..255]
exports.ARC4init = function(key) {
	var i, j, t;
	for(i = 0; i < 256; ++i)
		this.S[i] = i;
	j = 0;
	for(i = 0; i < 256; ++i) {
		j = (j + this.S[i] + key[i % key.length]) & 255;
		t = this.S[i];
		this.S[i] = this.S[j];
		this.S[j] = t;
	}
	this.i = 0;
	this.j = 0;
};

exports.ARC4next = function() {
	var t;
	this.i = (this.i + 1) & 255;
	this.j = (this.j + this.S[this.i]) & 255;
	t = this.S[this.i];
	this.S[this.i] = this.S[this.j];
	this.S[this.j] = t;
	return this.S[(t + this.S[this.i]) & 255];
};

exports.Arcfour.prototype.init = exports.ARC4init;
exports.Arcfour.prototype.next = exports.ARC4next;

// Plug in your RNG constructor here
exports.prng_newstate = function() {
	return new Arcfour();
};

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
exports.rng_psize = 256;


//==============================================================================================================================
// jsbn-rng.js
//==============================================================================================================================

// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

exports.rng_state = undefined;
exports.rng_pool = undefined;
exports.rng_pptr = undefined;

// Mix in a 32-bit integer into the pool
exports.rng_seed_int = function(x) {
	exports.rng_pool[exports.rng_pptr++] ^= x & 255;
	exports.rng_pool[exports.rng_pptr++] ^= (x >> 8) & 255;
	exports.rng_pool[exports.rng_pptr++] ^= (x >> 16) & 255;
	exports.rng_pool[exports.rng_pptr++] ^= (x >> 24) & 255;
	if(exports.rng_pptr >= exports.rng_psize) exports.rng_pptr -= exports.rng_psize;
};

// Mix in the current time (w/milliseconds) into the pool
exports.rng_seed_time = function() {
	exports.rng_seed_int(new Date().getTime());
};

// Initialize the pool with junk if needed.
if(exports.rng_pool == null) {
	exports.rng_pool = new Array();
	exports.rng_pptr = 0;
	var t;
	if(window.crypto && window.crypto.getRandomValues) {
		// Use webcrypto if available
		var ua = new Uint8Array(32);
		window.crypto.getRandomValues(ua);
		for(t = 0; t < 32; ++t)
			exports.rng_pool[exports.rng_pptr++] = ua[t];
	}
	// if(exports.navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
	//   // Extract entropy (256 bits) from NS4 RNG if available
	//   var z = window.crypto.random(32);
	//   for(t = 0; t < z.length; ++t)
	//     exports.rng_pool[exports.rng_pptr++] = exports.z.charCodeAt(t) & 255;
	// }
	while(exports.rng_pptr < exports.rng_psize) {  // extract some randomness from Math.random()
		t = Math.floor(65536 * Math.random());
		exports.rng_pool[exports.rng_pptr++] = t >>> 8;
		exports.rng_pool[exports.rng_pptr++] = t & 255;
	}
	exports.rng_pptr = 0;
	exports.rng_seed_time();
	//rng_seed_int(window.screenX);
	//rng_seed_int(window.screenY);
}

exports.rng_get_byte = function() {
	if(rng_state == null) {
		exports.rng_seed_time();
		rng_state = exports.prng_newstate();
		exports.rng_state.init(rng_pool);
		for(exports.rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
			rng_pool[rng_pptr] = 0;
		rng_pptr = 0;
		//rng_pool = null;
	}
	return exports.rng_state.next();
};

exports.rng_get_bytes = function(ba) {
	var i;
	for(i = 0; i < ba.length; ++i) ba[i] = exports.rng_get_byte();
};

exports.SecureRandom = function() {
	return (exports.rng_get_bytes);
};

exports.SecureRandom.prototype.nextBytes = exports.rng_get_bytes;


//==============================================================================================================================
// jsbn-sec.js
//==============================================================================================================================

// Named EC curves

// Requires ec.js, jsbn.js, and jsbn2.js

// ----------------
// X9ECParameters

// constructor
exports.X9ECParameters = function(curve, g, n, h) {
	this.curve = exports.curve;
	this.g = g;
	this.n = n;
	this.h = h;
};

exports.x9getCurve = function() {
	return this.curve;
};

exports.x9getG = function() {
	return this.g;
};

exports.x9getN = function() {
	return this.n;
};

exports.x9getH = function() {
	return this.h;
};

exports.X9ECParameters.prototype.getCurve = exports.x9getCurve;
exports.X9ECParameters.prototype.getG = exports.x9getG;
exports.X9ECParameters.prototype.getN = exports.x9getN;
exports.X9ECParameters.prototype.getH = exports.x9getH;

// ----------------
// SECNamedCurves

exports.fromHex = function(s) {
	return new exports.BigInteger(exports.s, 16);
};

exports.secp128r1 = function() {
	// p = 2^128 - 2^97 - 1
	var p = exports.fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF");
	var a = exports.fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC");
	var b = exports.fromHex("E87579C11079F43DD824993C2CEE5ED3");
	//byte[] S = Hex.decode("000E0D4D696E6768756151750CC03A4473D03679");
	var n = exports.fromHex("FFFFFFFE0000000075A30D1B9038A115");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "161FF7528B899B2D0C28607CA52C5B86"
		+ "CF5AC8395BAFEB13C02DA292DDED7A83");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp160k1 = function() {
	// p = 2^160 - 2^32 - 2^14 - 2^12 - 2^9 - 2^8 - 2^7 - 2^3 - 2^2 - 1
	var p = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");
	var a = exports.BigInteger.ZERO;
	var b = exports.fromHex("7");
	//byte[] S = null;
	var n = exports.fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB"
		+ "938CF935318FDCED6BC28286531733C3F03C4FEE");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp160r1 = function() {
	// p = 2^160 - 2^31 - 1
	var p = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF");
	var a = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC");
	var b = exports.fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45");
	//byte[] S = Hex.decode("1053CDE42C14D696E67687561517533BF3F83345");
	var n = exports.fromHex("0100000000000000000001F4C8F927AED3CA752257");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "4A96B5688EF573284664698968C38BB913CBFC82"
		+ "23A628553168947D59DCC912042351377AC5FB32");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp192k1 = function() {
	// p = 2^192 - 2^32 - 2^12 - 2^8 - 2^7 - 2^6 - 2^3 - 1
	var p = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37");
	var a = exports.BigInteger.ZERO;
	var b = exports.fromHex("3");
	//byte[] S = null;
	var n = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D"
		+ "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp192r1 = function() {
	// p = 2^192 - 2^64 - 1
	var p = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF");
	var a = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC");
	var b = exports.fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1");
	//byte[] S = Hex.decode("3045AE6FC8422F64ED579528D38120EAE12196D5");
	var n = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831");
	var h = exports.BigInteger.ONE;
	var curve = new ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012"
		+ "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp224r1 = function() {
	// p = 2^224 - 2^96 + 1
	var p = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001");
	var a = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE");
	var b = exports.fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4");
	//byte[] S = Hex.decode("BD71344799D5C7FCDC45B59FA3B9AB8F6A948BC5");
	var n = exports.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21"
		+ "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.secp256r1 = function() {
	// p = 2^224 (2^32 - 1) + 2^192 + 2^96 - 1
	var p = exports.fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF");
	var a = exports.fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC");
	var b = exports.fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B");
	//byte[] S = Hex.decode("C49D360886E704936A6678E1139D26B7819F7E90");
	var n = exports.fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551");
	var h = exports.BigInteger.ONE;
	var curve = new exports.ECCurveFp(p, a, b);
	var G = curve.decodePointHex("04"
		+ "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296"
		+ "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");
	return new exports.X9ECParameters(curve, G, n, h);
};

exports.getSECCurveByName = function(name) {
	if(name == "secp128r1") return exports.secp128r1();
	if(name == "secp160k1") return exports.secp160k1();
	if(name == "secp160r1") return exports.secp160r1();
	if(name == "secp192k1") return exports.secp192k1();
	if(name == "secp192r1") return exports.secp192r1();
	if(name == "secp224r1") return exports.secp224r1();
	if(name == "secp256r1") return exports.secp256r1();
	return null;
};


