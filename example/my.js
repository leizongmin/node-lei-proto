(function() {
  var proto = {
    /** 编码器 */
    encode: function(a, b, c, d) {
      d = Buffer.from(d);
      var $buf = Buffer.allocUnsafe(20 + d.length);
      a.copy($buf, 0, 0, 5);
      b.copy($buf, 5, 0, 10);
      $buf.write(c, 15, 5);
      Buffer.from(d).copy($buf, 20, 0);
      return $buf;
    },
    /** 编码器，参数为一个对象 */
    encodeEx: function(data) {
      return proto.encode(data.a, data.b, data.c, data.d);
    },
    /** 严格模式的编码器 */
    encodeStrict: function(a, b, c, d) {
      if (!Buffer.isBuffer(a)) throw new InvalidDataTypeError("a", "buffer");
      if (!Buffer.isBuffer(b)) throw new InvalidDataTypeError("b", "buffer");
      if (typeof c !== "string") throw new InvalidDataTypeError("c", "string");
      if (typeof d !== "string") throw new InvalidDataTypeError("d", "string");
      d = Buffer.from(d);
      var $buf = Buffer.allocUnsafe(20 + d.length);
      a.copy($buf, 0, 0, 5);
      b.copy($buf, 5, 0, 10);
      $buf.write(c, 15, 5);
      Buffer.from(d).copy($buf, 20, 0);
      return $buf;
    },
    /** 严格模式的编码器，参数为一个对象 */
    encodeExStrict: function(data) {
      return proto.encodeStrict(data.a, data.b, data.c, data.d);
    },
    /** 解码器 */
    decode: function($buf) {
      return {
        a: $buf.slice(0, 5),
        b: $buf.slice(5, 15),
        c: $buf.slice(15, 20).toString(),
        d: $buf.slice(20).toString(),
      };
    },
    /** 严格模式的解码器 */
    decodeStrict: function($buf) {
      if ($buf.length < 20) throw new IncorrectBufferSizeError(20, $buf.length);
      return {
        a: $buf.slice(0, 5),
        b: $buf.slice(5, 15),
        c: $buf.slice(15, 20).toString(),
        d: $buf.slice(20).toString(),
      };
    },
    /** 数据包长度，如果最后一项是不定长的，则总长度为size+最后一项的长度 */
    size: offset,
  };
  return proto;
})();
