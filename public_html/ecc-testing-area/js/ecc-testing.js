
/*
 ----------------------------------------------------------------------------
 Elliptic Curve Parameters
 ----------------------------------------------------------------------------
 */


var rng;

function initializeEllipticCurveParameters() {

   if (getN("eccP").value.length == 0) {
      set_secp160r1();
   }

   rng = new SecureRandom();
}


function set_ec_params(name) {
   var c = getSECCurveByName(name);

   getN("eccP").value = c.getCurve().getQ().toString();
   getN("eccA").value = c.getCurve().getA().toBigInteger().toString();
   getN("eccB").value = c.getCurve().getB().toBigInteger().toString();
   getN("eccGx").value = c.getG().getX().toBigInteger().toString();
   getN("eccGy").value = c.getG().getY().toBigInteger().toString();
   getN("eccN").value = c.getN().toString();

   // Changing EC params invalidates everything else
   getN("sendersPrivateMultiplier").value = "";
   getN("receiversPrivateMultiplier").value = "";
   getN("sendersMultipliedX").value = "";
   getN("sendersMultipliedY").value = "";
   getN("receiversMultipliedX").value = "";
   getN("receiversMultipliedY").value = "";
   getN("sendersCommonSecretKeyX").value = "";
   getN("sendersCommonSecretKeyX").value = "";
   getN("receiversCommonSecretKeyX").value = "";
   getN("receiversCommonSecretKeyY").value = "";
}


function set_secp128r1() {
   set_ec_params("secp128r1");
}

function set_secp160k1() {
   set_ec_params("secp160k1");
}

function set_secp160r1() {
   set_ec_params("secp160r1");
}

function set_secp192k1() {
   set_ec_params("secp192k1");
}

function set_secp192r1() {
   set_ec_params("secp192r1");
}

function set_secp224r1() {
   set_ec_params("secp224r1");
}

function set_secp256r1() {
   set_ec_params("secp256r1");
}

function get_curve() {
   return new ECCurveFp(new BigInteger(getN("eccP").value),
      new BigInteger(getN("eccA").value),
      new BigInteger(getN("eccB").value));
}

function get_G(curve) {
   return new ECPointFp(curve,
      curve.fromBigInteger(new BigInteger(getN("eccGx").value)),
      curve.fromBigInteger(new BigInteger(getN("eccGy").value)));
}




/*
 ----------------------------------------------------------------------------
 Sender's Parameters
 ----------------------------------------------------------------------------
 */


function generateSendersPrivateMultiplier() {

   var r = pick_rand();

   getN("sendersPrivateMultiplier").value = r.toString();


   /*
    ----------------------------------------------------------------------------
    Changing the sender's private multiplier implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   getN("sendersMultipliedX").value = "";
   getN("sendersMultipliedY").value = "";

   getN("sendersCommonSecretKeyX").value = "";
   getN("sendersCommonSecretKeyY").value = "";

   getN("receiversCommonSecretKeyX").value = "";
   getN("receiversCommonSecretKeyY").value = "";

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}



function calculateSendersMultipliedPoint() {

   if (getN("sendersPrivateMultiplier").value.length == 0) {
      alert("Please generate the sender's private multiplier first.");
      return;
   }

   var curve = get_curve();
   var G = get_G(curve);
   var a = new BigInteger(getN("sendersPrivateMultiplier").value);
   var P = G.multiply(a);

   getN("sendersMultipliedX").value = P.getX().toBigInteger().toString();
   getN("sendersMultipliedY").value = P.getY().toBigInteger().toString();

   /*
    ----------------------------------------------------------------------------
    Changing the sender's multiplied point (public key) implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   getN("receiversCommonSecretKeyX").value = "";
   getN("receiversCommonSecretKeyY").value = "";

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}


function calculateSendersCommonSecretKey() {

   /*
    ----------------------------------------------------------------------------
    Check that 1) the private multipliers and
    2) the multiplied (x,y)-points
    are defined for both the sender and the receiver
    ----------------------------------------------------------------------------
    */

   if(getN("sendersPrivateMultiplier").value.length == 0) {
      alert("Please enter (or generate) the sender's private multiplier first.");
      return;
   }

   if(getN("receiversPrivateMultiplier").value.length == 0) {
      alert("Please enter (or generate) the receiver's private multiplier first.");
      return;
   }

   if(getN("sendersMultipliedX").value.length == 0) {
      alert("Please calculate the sender's public key first.");
      return;
   }

   if(getN("sendersMultipliedY").value.length == 0) {
      alert("Please calculate the sender's public key first.");
      return;
   }

   if(getN("receiversMultipliedX").value.length == 0) {
      alert("Please calculate the receiver's public key first.");
      return;
   }

   if(getN("receiversMultipliedY").value.length == 0) {
      alert("Please calculate the receiver's public key first.");
      return;
   }

   /*
    ----------------------------------------------------------------------------
    Calculate the new common secret key.
    ----------------------------------------------------------------------------
    */

   var curve = get_curve();
   var P = new ECPointFp(curve,
      curve.fromBigInteger(new BigInteger(getN("receiversMultipliedX").value)),
      curve.fromBigInteger(new BigInteger(getN("receiversMultipliedY").value)));

   var a = new BigInteger(getN("sendersPrivateMultiplier").value);
   var S = P.multiply(a);

   getN("sendersCommonSecretKeyX").value = S.getX().toBigInteger().toString();
   getN("sendersCommonSecretKeyY").value = S.getY().toBigInteger().toString();

   /*
    ----------------------------------------------------------------------------
    Everything is valid except for the encrypted message.
    ----------------------------------------------------------------------------
    */

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}




/*
 ----------------------------------------------------------------------------
 Receiver's Parameters
 ----------------------------------------------------------------------------
 */


function generateReceiversPrivateMultiplier() {

   var r = pick_rand();

   getN("receiversPrivateMultiplier").value = r.toString();

   /*
    ----------------------------------------------------------------------------
    Changing the receiver's private multiplier invalidates
    the sender's other values, the common secret key, and
    the encrypted message.
    ----------------------------------------------------------------------------
    */

   getN("receiversMultipliedX").value = "";
   getN("receiversMultipliedY").value = "";

   getN("sendersCommonSecretKeyX").value = "";
   getN("sendersCommonSecretKeyY").value = "";

   getN("receiversCommonSecretKeyX").value = "";
   getN("receiversCommonSecretKeyY").value = "";

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}


function calculateReceiversMultipliedPoint() {

   if(getN("receiversPrivateMultiplier").value.length == 0) {
      alert("Please generate the receiver's private multiplier first.");
      return;
   }


   var curve = get_curve();
   var G = get_G(curve);
   var a = new BigInteger(getN("receiversPrivateMultiplier").value);
   var P = G.multiply(a);

   getN("receiversMultipliedX").value = P.getX().toBigInteger().toString();
   getN("receiversMultipliedY").value = P.getY().toBigInteger().toString();

   /*
    ----------------------------------------------------------------------------
    Changing the receiver's multiplied point (public key) implies
    the common secret key and the encrypted message.
    are no longer valid.
    ----------------------------------------------------------------------------
    */

   getN("sendersCommonSeceretKeyX").value = "";
   getN("sendersCommonSeceretKeyY").value = "";

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}


function calculateReceiversCommonSecretKey() {

   /*
    ----------------------------------------------------------------------------
    Check that 1) the private multipliers and
    2) the multiplied (x,y)-points
    are defined for both the sender and the receiver
    ----------------------------------------------------------------------------
    */

   if(getN("sendersPrivateMultiplier").value.length == 0) {
      alert("Please enter (or generate) the sender's private multiplier first.");
      return;
   }

   if(getN("receiversPrivateMultiplier").value.length == 0) {
      alert("Please enter (or generate) the receiver's private multiplier first.");
      return;
   }

   if(getN("sendersMultipliedX").value.length == 0) {
      alert("Please calculate the sender's public key first.");
      return;
   }

   if(getN("sendersMultipliedY").value.length == 0) {
      alert("Please calculate the sender's public key first.");
      return;
   }

   if(getN("receiversMultipliedX").value.length == 0) {
      alert("Please calculate the receiver's public key first.");
      return;
   }

   if(getN("receiversMultipliedY").value.length == 0) {
      alert("Please calculate the receiver's public key first.");
      return;
   }

   /*
    ----------------------------------------------------------------------------
    Calculate the new common secret key.
    ----------------------------------------------------------------------------
    */

   var curve = get_curve();
   var P = new ECPointFp(curve,
      curve.fromBigInteger(new BigInteger(getN("sendersMultipliedX").value)),
      curve.fromBigInteger(new BigInteger(getN("sendersMultipliedY").value)));

   var a = new BigInteger(getN("receiversPrivateMultiplier").value);
   var S = P.multiply(a);

   getN("receiversCommonSecretKeyX").value = S.getX().toBigInteger().toString();
   getN("receiversCommonSecretKeyY").value = S.getY().toBigInteger().toString();

   getN("messageCipherText").value = "";
   getN("decryptedMessage").value = "";

}




/*
 ----------------------------------------------------------------------------
 Encryption
 ----------------------------------------------------------------------------
 */


function encryptMessage() {

   var messagePlainText = getN("messagePlainText").value;

   var messageCipherText = messagePlainText.split("").reverse().join("");

   getN("messageCipherText").value = messageCipherText;

}


function decryptMessage() {

   var messageCipherText = getN("messageCipherText").value;

   var decryptedMessage = messageCipherText.split("").reverse().join("");

   getN("decryptedMessage").value = decryptedMessage;

}




/*
 ----------------------------------------------------------------------------
 Other Functions
 ----------------------------------------------------------------------------
 */


function pick_rand() {

   var n = new BigInteger(getN("eccN").value);

   var n1 = n.subtract(BigInteger.ONE);

   var r = new BigInteger(n.bitLength(), rng);

   return r.mod(n1).add(BigInteger.ONE);

}


function getN(n) {

   return typeof n == 'object' ? n : document.getElementById(n);

}

