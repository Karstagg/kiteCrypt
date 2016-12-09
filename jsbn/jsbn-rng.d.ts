// Random number generator - requires a PRNG backend, e.g. prng4.js

// For best results, put code like
// <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
// in your main HTML document.

export function rng_state = undefined;
export function rng_pool = undefined;
export function rng_pptr = undefined;
// Mix in a 32- bit integer into the pool
export function rng_seed_int (x: any): any;
// Mix in the current time (w/milliseconds) into the pool
export function rng_seed_time (): any;
export function rng_get_byte (): any;
export function rng_get_bytes (ba: any): any;
export function SecureRandom (): any;

