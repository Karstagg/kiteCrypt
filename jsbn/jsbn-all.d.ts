/**
 * Created by Jonathan on 12/11/16.
 */
/////////////////////////////////////////
//ecc-salt//
////////////////////////////////////////
export function initializeEllipticCurveParameters() : any;
export function set_ec_params(name: any) : any;
export function set_secp128r1() : any;
export function set_secp160k1() : any;
export function set_secp160r1() : any;
export function set_secp192k1() : any;
export function set_secp192r1() : any;
export function set_secp224r1() : any;
export function set_secp256r1() : any;
export function get_curve() : any;
export function get_G(curve: any) : any;
export function generateSendersPrivateMultiplier(sendersPassword: any, sendersSalt: any) : any;
export function calculateSendersMultipliedPoint(sendersPrivateMultiplier: any) : any;
export function calculateSendersCommonSecretKey() : any;
export function generateReceiversPrivateMultiplier(receiversPassword: any, receiversSalt: any) : any;
export function calculateReceiversMultipliedPoint(receiversPrivateMultiplier: any) : any;
export function calculateReceiversCommonSecretKey() : any;
export function encryptMessage(messagePlainText: any) : any;
export function decryptMessage(messageCipherText: any) : any;
export function pick_rand() : any;
export function getN(n: any) : any;
export function generateRandomString(len: number) : any;
export function convertStringToHex(originalString: any) : any;


///////////////////////////////
// jsbn-ecc////////////////////
///////////////////////////////

export function ECFieldElementFp(q: any,x: any) : any;
export function feFpEquals(other: any) : any;
export function feFpToBigInteger() : any;
export function feFpNegate() : any;
export function feFpAdd(b: any) : any;
export function feFpSubtract(b: any) : any;
export function feFpMultiply(b: any) : any;
export function feFpSquare() : any;
export function feFpDivide(b: any) : any;
export function ECPointFp(curve: any,x: any,y: any,z: any) : any;
export function pointFpGetX() : any;
export function pointFpGetY() : any;
export function pointFpEquals(other: any) : any;
export function pointFpIsInfinity() : any;
export function pointFpNegate() : any;
export function pointFpAdd(b: any) : any;
export function pointFpTwice() : any;
export function pointFpMultiply(k: any) : any;
export function pointFpMultiplyTwo(j: any,x: any,k: any) : any;
export function ECCurveFp(q: any,a: any,b: any) : any;
export function curveFpGetQ() : any;
export function curveFpGetA() : any;
export function curveFpGetB() : any;
export function curveFpEquals(other: any) : any;
export function curveFpGetInfinity() : any;
export function curveFpFromBigInteger(x: any) : any;
export function curveReduce(x: any) : any;
export function curveFpDecodePointHex(s: any) : any;
export function curveFpEncodePointHex(p: any) : any;

/////////////////////////////////////////
// jsbn-jsbn1////////////////////////////
////////////////////////////////////////
export function bnAbs() : any;
export function addTwo(x: number, y: number) : number;
export function bnCompareTo(a: any) : any;
export function nbits(x: any) : any;
export function bnBitLength() : any;
export function bnpDLShiftTo(n: any,r: any) :any;
export function bnpDRShiftTo(n: any,r: any) :any;
export function bnpLShiftTo(n: any,r: any) :any;
export function bnpRShiftTo(n: any,r: any) : any;
export function bnpSubTo(a: any,r: any) : any;
export function bnpMultiplyTo(a: any,r : any) : any;
export function bnpSquareTo(r: any) : any;
export function bnpDivRemTo(m: any,q: any,r: any) : any;
export function bnMod(a: any) : any;
export function Classic(m: any) : any;
export function cConvert(x: any) : any;
export function cRevert(x: any) : any;
export function cReduce(x: any) : any;
export function cMulTo(x: any,y: any,r: any) : any;
export function cSqrTo(x: any,r: any) : any;
export function bnpInvDigit() : any;
export function Montgomery(m: any) : any;
export function montConvert(x: any) : any;
export function montRevert(x: any) : any;
export function montReduce(x: any) : any;
export function montSqrTo(x: any,r: any) : any;
export function montMulTo(x: any,y: any,r: any) : any;
export function bnpIsEven() : any;
export function bnpExp(e: any,z: any) : any;
export function bnModPowInt(e: any,m: any) : any;


//////////////////////////////
//jsbn-jsbn2//////////////////
/////////////////////////////

export function bnClone () : any;
export function bnIntValue () : any;
export function bnByteValue () : any;
export function bnShortValue () : any;
export function bnpChunkSize (r: any) : any;
export function bnSigNum () : any;
export function bnpToRadix (b: any) : any;
export function bnpFromRadix (s: any,b: any) : any;
export function bnpFromNumber (a: any,b: any,c: any) : any;
export function bnToByteArray () : any;
export function bnEquals (a: any) : any;
export function bnMin (a: any) : any;
export function bnMax (a: any) : any;
export function bnpBitwiseTo (a: any,op: any,r: any) : any;
export function op_and (x: any,y: any) : any;
export function bnAnd (a: any) : any;
export function op_or (x: any,y: any) : any;
export function bnOr (a: any) : any;
export function op_xor (x: any,y: any) : any;
export function bnXor (a: any) : any;
export function op_andnot (x: any,y: any) : any;
export function bnAndNot (a: any) : any;
export function bnNot () : any;
export function bnShiftLeft (n: any) : any;
export function bnShiftRight (n: any) : any;
export function lbit (x: any) : any;
export function bnGetLowestSetBit () : any;
export function cbit (x: any) : any;
export function bnBitCount () : any;
export function bnTestBit (n: any) : any;
export function bnpChangeBit (n: any,op: any) : any;
export function bnSetBit (n: any) : any;
export function bnClearBit (n: any) : any;
export function bnFlipBit (n: any) : any;
export function bnpAddTo (a: any,r: any) : any;
export function bnAdd (a: any) : any;
export function bnSubtract (a: any) : any;
export function bnMultiply (a: any) : any;
export function bnSquare () : any;
export function bnDivide (a: any) : any;
export function bnRemainder (a: any) : any;
export function bnDivideAndRemainder (a: any) : any;
export function bnpDMultiply (n: any) : any;
export function bnpDAddOffset (n: any,w: any) : any;
export function NullExp () : any;
export function nNop (x: any) : any;
export function nMulTo (x: any,y: any,r: any) : any;
export function nSqrTo (x: any,r: any) : any;
export function bnPow (e: any) : any;
export function bnpMultiplyLowerTo (a: any,n: any,r: any) : any;
export function bnpMultiplyUpperTo (a: any,n: any,r: any) : any;
export function Barrett (m: any) : any;
export function barrettConvert (x: any) : any;
export function barrettRevert (x: any) : any;
export function barrettReduce (x: any) : any;
export function barrettSqrTo (x: any,r: any) : any;
export function barrettMulTo (x: any,y: any,r: any) : any;
export function bnModPow (e: any,m: any) : any;
export function bnGCD (a: any) : any;
export function bnpModInt (n: any) : any;
export function bnModInverse (m: any) : any;
export function bnIsProbablePrime (t: any) : any;
export function bnpMillerRabin (t: any) : any;

/////////////////////////
////jsbn-prng4//////////
///////////////////////
export function func() : any;
export function ARC4init(key: any) : any;
export function ARC4next() : any;
export function prng_newstate() : any;

//////////////////////////
////jsbn-rng/////////////
////////////////////////
// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.
// Mix in a 32- bit integer into the pool
export function rng_seed_int (x: any): any;
// Mix in the current time (w/milliseconds) into the pool
export function rng_seed_time (): any;
export function rng_get_byte (): any;
export function rng_get_bytes (ba: any): any;
export function SecureRandom (): any;


//////////////////
////jsbn-sec/////
////////////////
// Named EC curves

// Requires ec.js, jsbn.js, and jsbn2.js

// ----------------
// X9ECParameters

// constructor
export function X9ECParameters(curve: any,g: any,n: any,h: any): any;
export function x9getCurve(): any;
export function x9getG(): any;
export function x9getN(): any;
export function x9getH(): any;
// ----------------
// SECNamedCurves
export function fromHex(s: any): any ;
export function secp128r1(): any;
export function secp160k1(): any;
export function secp160r1(): any;
export function secp192k1(): any;
export function secp192r1(): any;
export function secp224r1(): any;
export function secp256r1(): any;

// TODO: make this into a proper hashtable
export function getSECCurveByName(name: any): any;

