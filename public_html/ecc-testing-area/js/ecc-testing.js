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
var eccA;
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

   randomNumber = new SecureRandom();
   
   eccA = new SecureRandom();
   eccB = new SecureRandom();
   eccP = new SecureRandom();
   eccN = new SecureRandom();

   getN("eccA").value = eccA;
   getN("eccB").value = eccB;
   getN("eccP").value = eccP;
   getN("eccN").value = eccN;
}




/*-------------------------------------------------------------------------------*/
/* Sender's Parameters */
/*-------------------------------------------------------------------------------*/

function generateSendersX() {

   sendersX = new SecureRandom();
}


function generateSendersY() {

   sendersY = new SecureRandom();
}


function generateSendersPrivateMultiplier() {

   sendersPrivateMultiplier = new SecureRandom();
}


function calculateSendersMultipliedX() {

   sendersMultipliedX = new SecureRandom();
}


function calculateSendersMultipliedY() {

   sendersMultipliedY = new SecureRandom();
}




/*-------------------------------------------------------------------------------*/
/* Calculate Common Secret Key */
/*-------------------------------------------------------------------------------*/

function calculateCommonSecretKey() {

   sendersCommonSecretKey = new SecureRandom();
   receiversCommonSecretKey= sendersCommonSecretKey;
}




/*-------------------------------------------------------------------------------*/
/* Receiver's Parameters */
/*-------------------------------------------------------------------------------*/

function generateReceiversX() {

   receiversX = new SecureRandom();
}


function generateReceiversY() {

   receiversY = new SecureRandom();
}


function generateReceiversPrivateMultiplier() {

   receiversPrivateMultiplier = new SecureRandom();
}


function calculateReceiversMultipliedX() {

   receiversMultipliedX = new SecureRandom();
}


function calculateReceiversMultipliedY() {

   receiversMultipliedY = new SecureRandom();
}




/*-------------------------------------------------------------------------------*/
/* Message */
/*-------------------------------------------------------------------------------*/

function encryptMessage() {

   messagePlainText = new SecureRandom();
   messageCipherText =  new SecureRandom();
}


function decryptMessage() {

   decryptedMessage = new SecureRandom();
}




/*-------------------------------------------------------------------------------*/
/* Other Functions */
/*-------------------------------------------------------------------------------*/

function getN(n) {

   return typeof n == 'object' ? n : document.getElementByName(n);
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
  
  