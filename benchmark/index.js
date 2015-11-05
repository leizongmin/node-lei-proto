/**
 * lei-proto benchmark
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var parseProto = require('../');


function test (title, proto, times, encodeName, decodeName, fn) {
  var p = parseProto(proto);
  var t = Date.now();
  var encode = p[encodeName];
  var decode = p[decodeName];
  for (var i = 0; i < times; i++) {
    fn(encode, decode, p.encodeEx);
  }
  var s = Date.now() - t;
  console.log('%s\n - %s times, total spent %sms, average %sms, %s times/s',
    title, times, s, (s / times).toFixed(6), (1 / (s / times) * 1000).toFixed(0));
}


var TIMES = 1000000; // 100W

function suit (encodeName, decodeName, isEx) {
  var title = encodeName + ' & ' + decodeName;
  if (isEx) {
    test('#1 ' + title + ' `int`', [['a', 'uint', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: 1}));
    });
    test('#2 ' + title + ' `uint`', [['a', 'int', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: 1}));
    });
    test('#3 ' + title + ' `float`', [['a', 'float']], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: 1.2}));
    });
    test('#4 ' + title + ' `double`', [['a', 'double']], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: 1.2}));
    });
    test('#5 ' + title + ' `string`', [['a', 'string', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: 'a'}));
    });
    test('#6 ' + title + ' `buffer`', [['a', 'buffer', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({a: new Buffer('a')}));
    });
    test('#7 ' + title + ' all', [
      ['a', 'uint', 1],
      ['b', 'int', 1],
      ['c', 'float'],
      ['d', 'double'],
      ['e', 'string', 1],
      ['f', 'buffer', 1]
    ], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode({
        a: 1,
        b: 2,
        c: 3.3,
        d: 4.4,
        e: 'a',
        f: new Buffer('b')
      }));
    });
  } else {
    test('#1 ' + title + ' `int`', [['a', 'uint', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(1));
    });
    test('#2 ' + title + ' `uint`', [['a', 'int', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(1));
    });
    test('#3 ' + title + ' `float`', [['a', 'float']], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(1.2));
    });
    test('#4 ' + title + ' `double`', [['a', 'double']], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(1.2));
    });
    test('#5 ' + title + ' `string`', [['a', 'string', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode('a'));
    });
    test('#6 ' + title + ' `buffer`', [['a', 'buffer', 1]], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(new Buffer('a')));
    });
    test('#7 ' + title + ' all', [
      ['a', 'uint', 1],
      ['b', 'int', 1],
      ['c', 'float'],
      ['d', 'double'],
      ['e', 'string', 1],
      ['f', 'buffer', 1]
    ], TIMES, encodeName, decodeName, function (encode, decode) {
      decode(encode(1, 2, 3.3, 4.4, 'a', new Buffer('b')));
    });
  }
  console.log('-------------');
}


suit('encode', 'decode');
suit('encodeEx', 'decode', true);
suit('encodeStrict', 'decodeStrict');
suit('encodeExStrict', 'decodeStrict', true);

