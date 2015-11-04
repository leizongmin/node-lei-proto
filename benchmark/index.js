/**
 * lei-proto benchmark
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var parseProto = require('../');


function test (title, proto, times, fn) {
  var p = parseProto(proto);
  var t = Date.now();
  for (var i = 0; i < times; i++) {
    fn(p.encode, p.decode, p.encodeEx);
  }
  var s = Date.now() - t;
  console.log('%s\n - %s times, total spent %sms, average %sms, %s times/s',
    title, times, s, (s / times).toFixed(6), (1 / (s / times) * 1000).toFixed(0));
}


var TIMES = 1000000; // 100W

test('#1 encode & decode `int`', [['a', 'uint', 1]], TIMES, function (encode, decode) {
  decode(encode(1));
});
test('#2 encode & decode `uint`', [['a', 'int', 1]], TIMES, function (encode, decode) {
  decode(encode(1));
});
test('#3 encode & decode `float`', [['a', 'float']], TIMES, function (encode, decode) {
  decode(encode(1.2));
});
test('#4 encode & decode `double`', [['a', 'double']], TIMES, function (encode, decode) {
  decode(encode(1.2));
});
test('#5 encode & decode `string`', [['a', 'string', 1]], TIMES, function (encode, decode) {
  decode(encode('a'));
});
test('#6 encode & decode `buffer`', [['a', 'buffer', 1]], TIMES, function (encode, decode) {
  decode(encode(new Buffer('a')));
});
test('#7 encode & decode all', [
  ['a', 'uint', 1],
  ['b', 'int', 1],
  ['c', 'float'],
  ['d', 'double'],
  ['e', 'string', 1],
  ['f', 'buffer', 1]
], TIMES, function (encode, decode) {
  decode(encode(1, 2, 3.3, 4.4, 'a', new Buffer('b')));
});

console.log('--------');

test('#1 encode & decode `int`', [['a', 'uint', 1]], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: 1}));
});
test('#2 encode & decode `uint`', [['a', 'int', 1]], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: 1}));
});
test('#3 encode & decode `float`', [['a', 'float']], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: 1.2}));
});
test('#4 encode & decode `double`', [['a', 'double']], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: 1.2}));
});
test('#5 encode & decode `string`', [['a', 'string', 1]], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: 'a'}));
});
test('#6 encode & decode `buffer`', [['a', 'buffer', 1]], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({a: new Buffer('a')}));
});
test('#7 encode & decode all', [
  ['a', 'uint', 1],
  ['b', 'int', 1],
  ['c', 'float'],
  ['d', 'double'],
  ['e', 'string', 1],
  ['f', 'buffer', 1]
], TIMES, function (encode, decode, encodeEx) {
  decode(encodeEx({
    a: 1,
    b: 2,
    c: 3.3,
    d: 4.4,
    e: 'a',
    f: new Buffer('b')
  }));
});
