// prng4.js - uses Arcfour as a PRNG

exports.Arcfour = function () {
  this.i = 0;
  this.j = 0;
  this.S = new Array();
};

// Initialize arcfour context from key, an array of ints, each from [0..255]
exports.ARC4init = function (key) {
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

exports.ARC4next = function () {
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
exports.prng_newstate = function () {
  return new Arcfour();
};

// Pool size must be a multiple of 4 and greater than 32.
// An array of bytes the size of the pool will be passed to init()
exports.rng_psize = 256;
