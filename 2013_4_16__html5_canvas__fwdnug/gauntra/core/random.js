// randomString returns a pseude-random ASCII string which contains at least the specified number of bits of entropy
// the return value is a string of length ?bits/6? of characters from the base64 alphabet

var randomString = function(bits){var chars,rand,i,ret

  chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  ret=''

  // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)

  while(bits > 0){

    rand=Math.floor(Math.random()*0x100000000) // 32-bit integer

    // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.

    for(i=26; i>0 && bits>0; i-=6, bits-=6) ret+=chars[0x3F & rand >>> i]}

  return ret
}

module.exports = randomString;