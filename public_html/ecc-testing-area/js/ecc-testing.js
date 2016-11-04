/*

Elliptic Curve Parameters
-------------------------

eccA  a = coefficient of the x term in: y ^ 2 = x ^ 3 + a * x + b

    generateX0CoefficientA()

eccB  b = value of the constant term in: y ^ 2 = x ^ 3 + a * x + b

    generateX0CoefficientB()
    


eccP  p = prime number bounding the field of elliptic curve points

    generateBoundingPrimeP()
    


eccN  n = number of points on the elliptic curve within the field (can be calculated)

    calculateNumberOfPointsInFieldN()
    



Sender's Parameters
-------------------

sendersX                    The x of the sender's (x,y)-point on the elliptic curve.
    
    generateSendersX()

sendersY                    The y of the sender's (x,y)-point on the elliptic curve.
    
    generateSendersY()
  


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

receiversX                    The x of the receiver's (x,y)-point on the elliptic curve.
    
    generateReceiversX()

receiversY                    The y of the receiver's (x,y)-point on the elliptic curve.

    generateReceiversY()
    


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




var randomNumber;

var eccA;
var eccB;
var eccP;
var eccN;

var sendersX;
var sendersY;
var sendersPrivateMultiplier;
var sendersMultipliedX;
var sendersMultipliedY;
var sendersCommonSecretKey;

var receiversX;
var receiversY;
var receiversPrivateMultiplier;
var receiversMultipliedX;
var receiversMultipliedY;
var receiversCommonSecretKey;

var messagePlainText;
var messageCipherText;
var decryptedMessage;




/*-------------------------------------------------------------------------------*/
/* Elliptic Curve Parameters */
/*-------------------------------------------------------------------------------*/

function initializeEllipticCurveParameters() {

   eccA = "Initial A";
   eccB = "Initial B";
   eccP = "Initial P";
   eccN = "Initial N";

   getN("eccA").value = eccA;
   getN("eccB").value = eccB;
   getN("eccP").value = eccP;
   getN("eccN").value = eccN;
}




function generateX0CoefficientA() {

   eccA = "Generated A";

   getN("eccA").value = eccA;
}


function generateX0CoefficientB() {

   eccB = "Generated B";

   getN("eccB").value = eccB;
}


function generateBoundingPrimeP() {

   eccP = "Generated P";

   getN("eccP").value = eccP;
}


function calculateNumberOfPointsInFieldN() {

   eccN = "Generated N";

   getN("eccN").value = eccN;
}


/*-------------------------------------------------------------------------------*/
/* Sender's Parameters */
/*-------------------------------------------------------------------------------*/

function generateSendersX() {

   sendersX = "Sender's X";

   getN("sendersX").value = sendersX;
}


function generateSendersY() {

   sendersY = "Sender's Y";

   getN("sendersY").value = sendersY;
}


function generateSendersPrivateMultiplier() {

   sendersPrivateMultiplier = "Sender's Multiplier";

   getN("sendersPrivateMultiplier").value = sendersPrivateMultiplier;
}


function calculateSendersMultipliedX() {

   sendersMultipliedX = "Sender's Multiplied X";

   getN("sendersMultipliedX").value = sendersMultipliedX;
}


function calculateSendersMultipliedY() {

   sendersMultipliedY = "Sender's Multiplied Y";

   getN("sendersMultipliedY").value = sendersMultipliedY;
}




/*-------------------------------------------------------------------------------*/
/* Calculate Common Secret Key */
/*-------------------------------------------------------------------------------*/

function calculateCommonSecretKey() {

   sendersCommonSecretKey = "Common Secret Key";
   receiversCommonSecretKey= sendersCommonSecretKey;

   getN("sendersCommonSecretKey").value = sendersCommonSecretKey;
   getN("receiversCommonSecretKey").value = receiversCommonSecretKey;
}




/*-------------------------------------------------------------------------------*/
/* Receiver's Parameters */
/*-------------------------------------------------------------------------------*/

function generateReceiversX() {

   receiversX = "Receiver's X";

   getN("receiversX").value = receiversX;
}


function generateReceiversY() {

   receiversY = "Receiver's Y";

   getN("receiversY").value = receiversY;
}


function generateReceiversPrivateMultiplier() {

   receiversPrivateMultiplier = "Receiver's Multiplier";

   getN("receiversPrivateMultiplier").value = receiversPrivateMultiplier;
}


function calculateReceiversMultipliedX() {

   receiversMultipliedX = "Receiver's Multiplied X";

   getN("receiversMultipliedX").value = receiversMultipliedX;
}


function calculateReceiversMultipliedY() {

   receiversMultipliedY = "Receiver's Multiplied Y";

   getN("receiversMultipliedY").value = receiversMultipliedY;
}




/*-------------------------------------------------------------------------------*/
/* Message */
/*-------------------------------------------------------------------------------*/

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




/*-------------------------------------------------------------------------------*/
/* Other Functions */
/*-------------------------------------------------------------------------------*/

function getN(n) {

   return typeof n == 'object' ? n : document.getElementById(n);
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


function () {

   randomNumber = new SecureRandom();
}
*/
  
  