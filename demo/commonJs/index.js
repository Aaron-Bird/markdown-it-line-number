const md = require("markdown-it")()
  .use(require("../../dist/index.js"));

console.log(md.render("#1"));