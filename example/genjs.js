const fs = require("fs");
const path = require("path");
const parseProto = require("../");

const p = parseProto([["a", "buffer", 5], ["b", "buffer", 10], ["c", "string", 5], ["d", "string"]], {
  sourceCode: true,
});

console.log(p);
fs.writeFileSync(path.resolve(__dirname, "my.js"), p);
