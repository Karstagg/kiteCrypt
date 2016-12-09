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

