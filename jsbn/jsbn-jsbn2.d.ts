export function addTwo(x: number, y: number) : number;





// Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.

// Extended JavaScript BN functions, required for RSA private ops.

// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix

// (public)
exports.bnClone = function () { var r = nbi(); this.copyTo(r); return r; };

// (public) return value as integer
exports.bnIntValue = function () {
	if(this.s < 0) {
		if(this.t == 1) return this[0]-this.DV;
		else if(this.t == 0) return -1;
	}
	else if(this.t == 1) return this[0];
	else if(this.t == 0) return 0;
	// assumes 16 < DB < 32
	return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
};

// (public) return value as byte
exports.bnByteValue = function () { return (this.t==0)?this.s:(this[0]<<24)>>24; };

// (public) return value as short (assumes DB>=16)
exports.bnShortValue = function () { return (this.t==0)?this.s:(this[0]<<16)>>16; };

// (protected) return x s.t. r^x < DV
exports.bnpChunkSize = function (r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); };

// (public) 0 if this == 0, 1 if this > 0
exports.bnSigNum = function () {
	if(this.s < 0) return -1;
	else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
	else return 1;
};

// (protected) convert to radix string
exports.bnpToRadix = function (b) {
	if(b == null) b = 10;
	if(this.signum() == 0 || b < 2 || b > 36) return "0";
	var cs = this.chunkSize(b);
	var a = Math.pow(b,cs);
	var d = nbv(a), y = nbi(), z = nbi(), r = "";
	this.divRemTo(d,y,z);
	while(y.signum() > 0) {
		r = (a+z.intValue()).toString(b).substr(1) + r;
		y.divRemTo(d,y,z);
	}
	return z.intValue().toString(b) + r;
};

// (protected) convert from radix string
exports.bnpFromRadix = function (s,b) {
	this.fromInt(0);
	if(b == null) b = 10;
	var cs = this.chunkSize(b);
	var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
	for(var i = 0; i < s.length; ++i) {
		var x = intAt(s,i);
		if(x < 0) {
			if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
			continue;
		}
		w = b*w+x;
		if(++j >= cs) {
			this.dMultiply(d);
			this.dAddOffset(w,0);
			j = 0;
			w = 0;
		}
	}
	if(j > 0) {
		this.dMultiply(Math.pow(b,j));
		this.dAddOffset(w,0);
	}
	if(mi) BigInteger.ZERO.subTo(this,this);
};

// (protected) alternate constructor
exports.bnpFromNumber = function (a,b,c) {
	if("number" == typeof b) {
		// new BigInteger(int,int,RNG)
		if(a < 2) this.fromInt(1);
		else {
			this.fromNumber(a,c);
			if(!this.testBit(a-1))	// force MSB set
				this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
			if(this.isEven()) this.dAddOffset(1,0); // force odd
			while(!this.isProbablePrime(b)) {
				this.dAddOffset(2,0);
				if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
			}
		}
	}
	else {
		// new BigInteger(int,RNG)
		var x = new Array(), t = a&7;
		x.length = (a>>3)+1;
		b.nextBytes(x);
		if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
		this.fromString(x,256);
	}
};

// (public) convert to bigendian byte array
exports.bnToByteArray = function () {
	var i = this.t, r = new Array();
	r[0] = this.s;
	var p = this.DB-(i*this.DB)%8, d, k = 0;
	if(i-- > 0) {
		if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
			r[k++] = d|(this.s<<(this.DB-p));
		while(i >= 0) {
			if(p < 8) {
				d = (this[i]&((1<<p)-1))<<(8-p);
				d |= this[--i]>>(p+=this.DB-8);
			}
			else {
				d = (this[i]>>(p-=8))&0xff;
				if(p <= 0) { p += this.DB; --i; }
			}
			if((d&0x80) != 0) d |= -256;
			if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
			if(k > 0 || d != this.s) r[k++] = d;
		}
	}
	return r;
};

exports.bnEquals = function (a) { return(this.compareTo(a)==0); }
exports.bnMin = function (a) { return(this.compareTo(a)<0)?this:a; }
exports.bnMax = function (a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
exports.bnpBitwiseTo = function (a,op,r) {
	var i, f, m = Math.min(a.t,this.t);
	for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
	if(a.t < this.t) {
		f = a.s&this.DM;
		for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
		r.t = this.t;
	}
	else {
		f = this.s&this.DM;
		for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
		r.t = a.t;
	}
	r.s = op(this.s,a.s);
	r.clamp();
};

// (public) this & a
exports.op_and = function (x,y) { return x&y; };
exports.bnAnd = function (a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; };

// (public) this | a
exports.op_or = function (x,y) { return x|y; };
exports.bnOr = function (a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; };

// (public) this ^ a
exports.op_xor = function (x,y) { return x^y; };
exports.bnXor = function (a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; };

// (public) this & ~a
exports.op_andnot = function (x,y) {};
exports.bnAndNot = function (a) {};
exports.bnNot = function () {};
exports.bnShiftLeft = function (n) {};
exports.bnShiftRight = function (n) {};
exports.lbit = function (x) {};
exports.bnGetLowestSetBit = function () {};
exports.cbit = function (x) {};
exports.bnBitCount = function () {};
exports.bnTestBit = function (n) {};
exports.bnpChangeBit = function (n,op) {};
exports.bnSetBit = function (n) {};
exports.bnClearBit = function (n) {};
exports.bnFlipBit = function (n) {};
exports.bnpAddTo = function (a,r) {};
exports.bnAdd = function (a) {};
exports.bnSubtract = function (a) {};
exports.bnMultiply = function (a) {};
exports.bnSquare = function () {};
exports.bnDivide = function (a) {};
exports.bnRemainder = function (a) {};
exports.bnDivideAndRemainder = function (a) {};
exports.bnpDMultiply = function (n) {};
exports.bnpDAddOffset = function (n,w) {};
exports.NullExp = function () {};
exports.nNop = function (x) {};
exports.nMulTo = function (x,y,r) {};
exports.nSqrTo = function (x,r) {};
exports.bnPow = function (e) {};
exports.bnpMultiplyLowerTo = function (a,n,r) {};
exports.bnpMultiplyUpperTo = function (a,n,r) {};
exports.Barrett = function (m) {};
exports.barrettConvert = function (x) {};
exports.barrettRevert = function (x) {};
exports.barrettReduce = function (x) {};
exports.barrettSqrTo = function (x,r) {};
exports.barrettMulTo = function (x,y,r) {};
exports.bnModPow = function (e,m) {};
exports.bnGCD = function (a) {};
exports.bnpModInt = function (n) {};
exports.bnModInverse = function (m) {};
exports.bnIsProbablePrime = function (t) {};
exports.bnpMillerRabin = function (t) {};

