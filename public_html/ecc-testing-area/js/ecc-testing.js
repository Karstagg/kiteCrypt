/*

 Elliptic Curve Parameters
 -------------------------

 eccA  a = the coefficient of the x term in: y ^ 2 = x ^ 3 + a * x + b

 eccB  b = the value of the constant term in: y ^ 2 = x ^ 3 + a * x + b



 eccP  p = the prime number bounding the field of elliptic curve points

 eccN  n = a prime which is the order of the base point G (on the elliptic curve)



 Gx                    The x of the (x,y)-point on the elliptic curve. For precomputed curves (for example, NIST elliptic curves), (x,y) should be furnished with the other curve parameters.

 Gy                    The y of the (x,y)-point on the elliptic curve. For precomputed curves (for example, NIST elliptic curves), (x,y) should be furnished with the other curve parameters.




 Sender's Parameters
 -------------------

 sendersPrivateMultiplier    Pick a number (a secret key) to multiply the (x,y)-point (above) by.

 generateSendersPrivateMultiplier()



 sendersMultipliedX          The multiplied x-value of the elliptic curve point.

 calculateSendersMultipliedX()

 sendersMultipliedY          The multiplied y-value of the elliptic curve point.

 calculateSendersMultipliedY()



 sendersCommonSecretKey      The common secret key (will be calculated)

 calculateCommonSecretKey()




 Receiver's Parameters
 ---------------------

 receiversPrivateMultiplier    Pick a number (a secret key) to multiply the (x,y)-point (above) by.

 generateReceiversPrivateMultiplier()



 receiversMultipliedX          The multiplied x-value of the elliptic curve point.

 calculateReceiversMultipliedX()

 receiversMultipliedY          The multiplied y-value of the elliptic curve point.

 calculateReceiversMultipliedX()



 receiversCommonSecretKey      The common secret key (will be calculated)

 calculateCommonSecretKey()




 Message
 -------

 messagePlainText              Enter the plain text message, here.

 encryptMessage()

 messageCipherText             The cipher text will go here, after you press the Encrypt button (above).

 decryptMessage()

 decryptedMessage              The plain text of the decrypted message will go here, after you press the Decrypt button (above).


 */




var ellipticCurve;

var eccA;
var eccB;
var eccP;
var eccN;

var eccGx;
var eccGy;

var eccGxBI;
var eccGyBI;

var sendersPrivateMultiplier;
var sendersMultipliedX;
var sendersMultipliedY;
var sendersCommonSecretKeyX;
var sendersCommonSecretKeyY;

var receiversPrivateMultiplier;
var receiversMultipliedX;
var receiversMultipliedY;
var receiversCommonSecretKeyX;
var receiversCommonSecretKeyY;

var messagePlainText;
var messageCipherText;
var decryptedMessage;

var rng;



/*
 ----------------------------------------------------------------------------
 Elliptic Curve Parameters
 ----------------------------------------------------------------------------
 */

function initializeEllipticCurveParameters(ellipticCurveName) {

   //eccA = "Initial A";
   //eccB = "Initial B";
   //eccP = "Initial P";
   //eccN = "Initial N";

   rng = new SecureRandom();

   if (ellipticCurveName == null) {
      ellipticCurveName = "secp160r1";
   }

   ellipticCurve = getSECCurveByName(ellipticCurveName);

   eccA = ellipticCurve.getCurve().getA().toBigInteger().toString();
   eccB = ellipticCurve.getCurve().getB().toBigInteger().toString();
   eccP = ellipticCurve.getCurve().getQ().toString();
   eccN = ellipticCurve.getN().toString();

   eccGx = ellipticCurve.getG().getX().toBigInteger().toString();
   eccGy = ellipticCurve.getG().getY().toBigInteger().toString();

   eccGxBI = new BigInteger(eccGx); //ellipticCurve.getG().getX().toBigInteger();
   eccGyBI = ellipticCurve.getG().getY().toBigInteger();


   getN("eccA").value = eccA;
   getN("eccB").value = eccB;
   getN("eccP").value = eccP;
   getN("eccN").value = eccN;

   getN("eccGx").value = eccGx;
   getN("eccGy").value = eccGy;


   /*
    ----------------------------------------------------------------------------
    Changing the elliptic curve invalidates everything
    except for the message plain text.
    ----------------------------------------------------------------------------
    */

   sendersPrivateMultiplier = "";
   sendersMultipliedX = "";
   sendersMultipliedY = "";
   sendersCommonSecretKeyX = "";
   sendersCommonSecretKeyY = "";

   receiversPrivateMultiplier = "";
   receiversMultipliedX = "";
   receiversMultipliedY = "";
   receiversCommonSecretKeyX = "";
   receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   getN("sendersMultipliedX").value = sendersMultipliedX;
   getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKeyX").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKeyY").value = sendersCommonSecretKeyY;

   getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   getN("receiversMultipliedX").value = receiversMultipliedX;
   getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKeyX").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKeyY").value = receiversCommonSecretKeyY;

   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}




/*
 ----------------------------------------------------------------------------
 Sender's Parameters
 ----------------------------------------------------------------------------
 */

function generateSendersPrivateMultiplier() {

   //sendersPrivateMultiplier = "Sender's Multiplier";

   var randomValue = pick_rand();
   sendersPrivateMultiplier = randomValue.toString();
   getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;


   /*
    ----------------------------------------------------------------------------
    Changing the sender's private multiplier implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   //sendersPrivateMultiplier = "";
   sendersMultipliedX = "";
   sendersMultipliedY = "";
   sendersCommonSecretKeyX = "";
   sendersCommonSecretKeyY = "";

   //receiversPrivateMultiplier = "";
   //receiversMultipliedX = "";
   //receiversMultipliedY = "";
   receiversCommonSecretKeyX = "";
   receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   //getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   getN("sendersMultipliedX").value = sendersMultipliedX;
   getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKeyX").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKeyY").value = sendersCommonSecretKeyY;

   //getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   //getN("receiversMultipliedX").value = receiversMultipliedX;
   //getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKeyX").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKeyY").value = receiversCommonSecretKeyY;

   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}


function calculateSendersMultipliedX() {

   //sendersMultipliedX = "Sender's Multiplied X";

   sendersPrivateMultiplier = getN("sendersPrivateMultiplier").value;

   if (sendersPrivateMultiplier == "") {
      alert("Please enter (or generate) the sender's private multiplier, first.");
   }


   var G = get_G(ellipticCurve);
   var s = new BigInteger(sendersPrivateMultiplier);
   var sG = G.multiply(s);

   sendersMultipliedX = sG.getX().toBigInteger().toString();
   sendersMultipliedY = sG.getY().toBigInteger().toString();

   /*
    ----------------------------------------------------------------------------
    Changing the sender's private multiplier implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   //sendersPrivateMultiplier = "";
   //sendersMultipliedX = "";
   //sendersMultipliedY = "";
   sendersCommonSecretKeyX = "";
   sendersCommonSecretKeyY = "";

   //receiversPrivateMultiplier = "";
   //receiversMultipliedX = "";
   //receiversMultipliedY = "";
   receiversCommonSecretKeyX = "";
   receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   //getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   getN("sendersMultipliedX").value = sendersMultipliedX;
   getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKeyX").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKeyY").value = sendersCommonSecretKeyY;

   //getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   //getN("receiversMultipliedX").value = receiversMultipliedX;
   //getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKeyX").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKeyY").value = receiversCommonSecretKeyY;

   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}


function calculateSendersMultipliedY() {

   //sendersMultipliedY = "Sender's Multiplied Y";

   calculateSendersMultipliedX()

}




/*
 ----------------------------------------------------------------------------
 Calculate Common Secret Key
 ----------------------------------------------------------------------------
 */

function calculateCommonSecretKey() {

   //sendersCommonSecretKey = "Common Secret Key";
   //receiversCommonSecretKey= sendersCommonSecretKey;

   //getN("sendersCommonSecretKey").value = sendersCommonSecretKey;
   //getN("receiversCommonSecretKey").value = receiversCommonSecretKey;

   /*
    ----------------------------------------------------------------------------
    Check that 1) the private multipliers and
    2) the multiplied (x,y)-points
    are defined for both the sender and the receiver
    ----------------------------------------------------------------------------
    */

   sendersPrivateMultiplier = getN("sendersPrivateMultiplier").value;

   if (sendersPrivateMultiplier == "") {
      alert("Please enter (or generate) the sender's private multiplier, first.");
   }

   receiversPrivateMultiplier = getN("receiversPrivateMultiplier").value;

   if (receiversPrivateMultiplier == "") {
      alert("Please enter (or generate) the receiver's private multiplier, first.");
   }


   sendersMultipliedX = getN("sendersMultipliedX").value;
   sendersMultipliedY = getN("sendersMultipliedY").value;

   if (sendersMultipliedX == "" || sendersMultipliedY == "") {
      calculateSendersMultipliedX();
   }


   receiversMultipliedX = getN("receiversMultipliedX").value;
   receiversMultipliedY = getN("receiversMultipliedY").value;

   if (receiversMultipliedX == "" || receiversMultipliedY == "") {
      calculateReceiversMultipliedX();
   }


   /*
    ----------------------------------------------------------------------------
    Calculate the new common secret key.
    ----------------------------------------------------------------------------
    */


   var s = new BigInteger(sendersPrivateMultiplier);
   var r = new BigInteger(receiversPrivateMultiplier);
   var G = get_G(ellipticCurve);
   var sG = G.multiply(s);
   var rsG = sG.multiply(r);


   sendersCommonSecretKeyX = rsG.getX().toBigInteger().toString();
   sendersCommonSecretKeyY = rsG.getY().toBigInteger().toString();

   receiversCommonSecretKeyX = sendersCommonSecretKeyX;
   receiversCommonSecretKeyY = sendersCommonSecretKeyY;

   /*
    ----------------------------------------------------------------------------
    Everything is valid except for the encrypted message.
    ----------------------------------------------------------------------------
    */

   //sendersPrivateMultiplier = "";
   //sendersMultipliedX = "";
   //sendersMultipliedY = "";
   //sendersCommonSecretKeyX = "";
   //sendersCommonSecretKeyY = "";

   //receiversPrivateMultiplier = "";
   //receiversMultipliedX = "";
   //receiversMultipliedY = "";
   //receiversCommonSecretKeyX = "";
   //receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   //getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   //getN("sendersMultipliedX").value = sendersMultipliedX;
   //getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKeyX").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKeyY").value = sendersCommonSecretKeyY;

   //getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   //getN("receiversMultipliedX").value = receiversMultipliedX;
   //getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKeyX").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKeyY").value = receiversCommonSecretKeyY;

   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}




/*
 ----------------------------------------------------------------------------
 Receiver's Parameters
 ----------------------------------------------------------------------------
 */

function generateReceiversPrivateMultiplier() {

   //receiversPrivateMultiplier = "Receiver's Multiplier";

   var randomValue = pick_rand();
   receiversPrivateMultiplier = randomValue.toString();
   getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;


   /*
    ----------------------------------------------------------------------------
    Changing the sender's private multiplier invalidates
    the sender's other values, the common secret key, and
    the encrypted message.
    ----------------------------------------------------------------------------
    */

   //sendersPrivateMultiplier = "";
   //sendersMultipliedX = "";
   //sendersMultipliedY = "";
   sendersCommonSecretKeyX = "";
   sendersCommonSecretKeyY = "";

   //receiversPrivateMultiplier = "";
   receiversMultipliedX = "";
   receiversMultipliedY = "";
   receiversCommonSecretKeyX = "";
   receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   //getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   //getN("sendersMultipliedX").value = sendersMultipliedX;
   //getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKey").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKey").value = sendersCommonSecretKeyY;

   //getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   getN("receiversMultipliedX").value = receiversMultipliedX;
   getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKey").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKey").value = receiversCommonSecretKeyY;


   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}


function calculateReceiversMultipliedX() {

   //receiversMultipliedX = "Receiver's Multiplied X";

   receiversPrivateMultiplier = getN("receiversPrivateMultiplier").value;

   if (receiversPrivateMultiplier == "") {
      alert("Please enter (or generate) the receiver's private multiplier, first.");
   }

   var r = new BigInteger(receiversPrivateMultiplier);
   var G = get_G(ellipticCurve);
   var rG = G.multiply(r);

   receiversMultipliedX = rG.getX().toBigInteger().toString();
   receiversMultipliedY = rG.getY().toBigInteger().toString();

   /*
    ----------------------------------------------------------------------------
    Changing the receiver's private multiplier implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   //sendersPrivateMultiplier = "";
   //sendersMultipliedX = "";
   //sendersMultipliedY = "";
   sendersCommonSecretKeyX = "";
   sendersCommonSecretKeyY = "";

   //receiversPrivateMultiplier = "";
   //receiversMultipliedX = "";
   //receiversMultipliedY = "";
   receiversCommonSecretKeyX = "";
   receiversCommonSecretKeyY = "";

   messageCipherText = "";
   decryptedMessage = "";


   //getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
   //getN("sendersMultipliedX").value = sendersMultipliedX;
   //getN("sendersMultipliedY").value = sendersMultipliedY;
   getN("sendersCommonSecretKey").value = sendersCommonSecretKeyX;
   getN("sendersCommonSecretKey").value = sendersCommonSecretKeyY;

   //getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
   getN("receiversMultipliedX").value = receiversMultipliedX;
   getN("receiversMultipliedY").value = receiversMultipliedY;
   getN("receiversCommonSecretKey").value = receiversCommonSecretKeyX;
   getN("receiversCommonSecretKey").value = receiversCommonSecretKeyY;

   getN("messageCipherText").value = messageCipherText;
   getN("decryptedMessage").value = decryptedMessage;

}


function calculateReceiversMultipliedY() {

   //receiversMultipliedY = "Receiver's Multiplied Y";

   calculateReceiversMultipliedX()

}




/*
 ----------------------------------------------------------------------------
 Message
 ----------------------------------------------------------------------------
 */

function encryptMessage() {

   messagePlainText = "Message";
   messageCipherText =  "Cipher Text";

   getN("messagePlainText").value = messagePlainText;
   getN("messageCipherText").value = messageCipherText;
}


function decryptMessage() {

   decryptedMessage = "Decrypted Message";

   getN("decryptedMessage").value = decryptedMessage;
}




/*
 ----------------------------------------------------------------------------
 Other Functions
 ----------------------------------------------------------------------------
 */

function pick_rand() {
   var n = new BigInteger(eccN);
   var n1 = n.subtract(BigInteger.ONE);
   var r = new BigInteger(n.bitLength(), rng);
   return r.mod(n1).add(BigInteger.ONE);
}


function get_G(curve) {

   //var gx = ECFieldElementFp(this.q, x);
   //var gx = ECFieldElementFp(this.q, x);

   return new ECPointFp(curve,
      curve.getG().getX(),
      curve.getG().getY());

   /*
   return new ECPointFp(curve,
      curve.curveFpFromBigInteger(new BigInteger(eccGx)),
      curve.curveFpFromBigInteger(new BigInteger(eccGy)));

   return new ECPointFp(curve,
      curve.fromBigInteger(new BigInteger(eccGx)),
      curve.fromBigInteger(new BigInteger(eccGy)));

   return new ECPointFp(curve,
      curve.fromBigInteger(new BigInteger(eccGx)),
      curve.fromBigInteger(new BigInteger(eccGy)));

   return new ECPointFp(curve,
      curve.fromBigInteger(curve.getG().getX().toBigInteger()),
      curve.fromBigInteger(curve.getG().getY().toBigInteger()));

   return new ECPointFp(curve,
      curve.getG().getX(),
      curve.getG().getY());
 */
}


function getN(n) {

   return typeof n == 'object' ? n : document.getElementById(n);
}


function selectEllipticCurve(ellipticCurveName) {

   if (ellipticCurveName == null) {
      ellipticCurveName = "secp160r1";
   }

   ellipticCurve = initializeEllipticCurveParameters(ellipticCurveName);

}


function nistP384() {
   // p = 2^160 - 2^32 - 2^14 - 2^12 - 2^9 - 2^8 - 2^7 - 2^3 - 2^2 - 1
   var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");
   var a = BigInteger.ZERO;
   var b = fromHex("7");
   //byte[] S = null;
   var n = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");
   var h = BigInteger.ONE;
   var curve = new ECCurveFp(p, a, b);
   var G = curve.decodePointHex("04"
      + "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB"
      + "938CF935318FDCED6BC28286531733C3F03C4FEE");
   return new X9ECParameters(curve, G, n, h);
}

function nistP521() {
// p = 2^160 - 2^32 - 2^14 - 2^12 - 2^9 - 2^8 - 2^7 - 2^3 - 2^2 - 1
var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73");
var a = BigInteger.ZERO;
var b = fromHex("7");
//byte[] S = null;
var n = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3");
var h = BigInteger.ONE;
var curve = new ECCurveFp(p, a, b);
var G = curve.decodePointHex("04"
   + "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB"
   + "938CF935318FDCED6BC28286531733C3F03C4FEE");
return new X9ECParameters(curve, G, n, h);
}

/*
 function () {

 randomNumber = new SecureRandom();
 }


 function () {

 randomNumber = new SecureRandom();
 }


 function () {

 randomNumber = new SecureRandom();
 }


 function () {

 randomNumber = new SecureRandom();
 }


 function () {

 randomNumber = new SecureRandom();
 }
 */

