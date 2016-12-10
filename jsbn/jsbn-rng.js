// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

exports.rng_state = undefined;
exports.rng_pool = undefined;
exports.rng_pptr = undefined;

// Mix in a 32-bit integer into the pool
exports.rng_seed_int = function (x) {
  exports.rng_pool[exports.rng_pptr++] ^= x & 255;
  exports.rng_pool[exports.rng_pptr++] ^= (x >> 8) & 255;
  exports.rng_pool[exports.rng_pptr++] ^= (x >> 16) & 255;
  exports.rng_pool[exports.rng_pptr++] ^= (x >> 24) & 255;
  if(exports.rng_pptr >= exports.rng_psize) exports.rng_pptr -= exports.rng_psize;
};

// Mix in the current time (w/milliseconds) into the pool
exports.rng_seed_time = function () {
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
  if(navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
    // Extract entropy (256 bits) from NS4 RNG if available
    var z = window.crypto.random(32);
    for(t = 0; t < z.length; ++t)
      exports.rng_pool[exports.rng_pptr++] = z.charCodeAt(t) & 255;
  }  
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

exports.rng_get_byte = function () {
  if(rng_state == null) {
    rng_seed_time();
    rng_state = prng_newstate();
    rng_state.init(rng_pool);
    for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
    //rng_pool = null;
  }
  // TODO: allow reseeding after first request
  return rng_state.next();
};

exports.rng_get_bytes = function (ba) {
  var i;
  for(i = 0; i < ba.length; ++i) ba[i] = exports.rng_get_byte();
};

exports.SecureRandom = function () {
  return(exports.rng_get_bytes);
};

exports.SecureRandom.prototype.nextBytes = exports.rng_get_bytes;
