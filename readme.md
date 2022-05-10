# markdown-it-line-number

The markdown-it plugin for adding line numbers.

## Use

```js
const md = require("markdown-it")()
  .use(require("markdown-it-line-number"));

console.log(md.render("# 1 \n## 2"));
```
