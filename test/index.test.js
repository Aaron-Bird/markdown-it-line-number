const markdownit = require("markdown-it");
const markdownitLineNumber = require("../src");
const expect = require("chai").expect;
const JSDOM = require("jsdom").JSDOM;
const md = markdownit();
md.use(markdownitLineNumber);

function renderDom(text) {
  const html = md.render(text)
  return new JSDOM(html).window.document.body
}

describe("block test", function() {
  it("header", function() {
    const el = renderDom(`# 1\n## 2`)
    const children = el.children
    expect(children[0].getAttribute('data-line')).to.be.equal('0')
    expect(children[1].getAttribute('data-line')).to.be.equal('1')
  })
})

describe("inline test", function() {
  it("text", function() {
    const el = renderDom(`a  \nb`).firstChild
    expect(el.getAttribute('data-line')).to.be.equal('0')
    const children = el.children
    expect(children[0].tagName).to.be.equal('SPAN')
    expect(children[0].getAttribute('data-line')).to.be.equal('0')
    
    expect(children[1].tagName).to.be.equal('BR')
    expect(children[1].getAttribute('data-line')).to.not.exist

    expect(children[2].tagName).to.be.equal('SPAN')
    expect(children[2].getAttribute('data-line')).to.be.equal('1')
  })
})