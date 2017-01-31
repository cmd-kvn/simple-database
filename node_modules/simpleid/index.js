var crypto = require('crypto');

var arr = 'k7mx56j4fb3veg2payn9rwqzd8'.toUpperCase();
var clen = arr.length;
var byteLen = 4;

module.exports = function() {
    return getRandomString(byteLen) + getTimeString();
}

function getRandomString(len) {
    var bytes = crypto.randomBytes(len);
    var s = '';
    for (var i = 0; i < len; i++) {
        s += arr[bytes[i] % clen];
    }
    return s;
}

function getTimeString() {
    var now = Date.now();
    var offset = new Date('2000-01-01T00:00:00').getTime();
    now -= offset;
    now = Math.floor(now / 1000);
    var s = '';
    while (now) {
        var r = now % clen;
        now = Math.floor(now / clen);
        s = arr[r] + s;
    }
    return s;
}

