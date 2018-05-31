(function() {
  var proto = {
    // 编码器
    encode: function(a, b) {
      b = Buffer.from(b);
      var $buf = Buffer.alloc(5 + b.length);
      a.copy($buf, 0, 0, 5);
      b.copy($buf, 5, 0);
      return $buf;
    },
    // 编码器，参数为一个对象
    encodeEx: function(data) {
      return proto.encode(data.a, data.b);
    },
    // 严格模式的编码器
    encodeStrict: function(a, b) {
      if (!Buffer.isBuffer(a)) throw new InvalidDataTypeError("a", "buffer");
      if (!Buffer.isBuffer(b)) throw new InvalidDataTypeError("b", "buffer");
      b = Buffer.from(b);
      var $buf = Buffer.alloc(5 + b.length);
      a.copy($buf, 0, 0, 5);
      b.copy($buf, 5, 0);
      return $buf;
    },
    // 严格模式的编码器，参数为一个对象
    encodeExStrict: function(data) {
      return proto.encodeStrict(data.a, data.b);
    },
    // 解码器
    decode: function($buf) {
      return {
        a: $buf.slice(0, 5),
        b: $buf.slice(5)
      };
    },
    // 严格模式的解码器
    decodeStrict: function($buf) {
      if ($buf.length < 5) throw new IncorrectBufferSizeError(5, $buf.length);
      return {
        a: $buf.slice(0, 5),
        b: $buf.slice(5)
      };
    },
    // 数据包长度，如果最后一项是不定长的，则总长度为size+最后一项的长度
    size: offset
  };
  return proto;
})();
