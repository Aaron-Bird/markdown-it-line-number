const markdownit = require('markdown-it');
const markdownitLineNumber = require('../src');
const expect = require('chai').expect;
const JSDOM = require('jsdom').JSDOM;
const md = markdownit();
md.use(markdownitLineNumber);

function renderDom(text) {
  const html = md.render(text);
  return new JSDOM(html).window.document.body;
}

describe('block', function () {
  it('header', function () {
    const el = renderDom('\n# 1\n## 2');
    expect(el.querySelector('h1').getAttribute('data-line')).to.be.equal('1');
    expect(el.querySelector('h2').getAttribute('data-line')).to.be.equal('2');
  });
});

describe('inline', function () {
  it('link', function () {
    const el = renderDom('\n[example](https://example.com)');
    expect(el.querySelector('a').getAttribute('data-line')).to.be.equal('1');
  });

  it('autolink', function () {
    const el = renderDom('\n<https://example.com>');
    expect(el.querySelector('a').getAttribute('data-line')).to.be.equal('1');
  });

  it('bold', function () {
    const el = renderDom('\n**a  \nb**');
    const spans = el.querySelectorAll('strong span');
    expect(spans[0].getAttribute('data-line')).to.be.equal('1');
    expect(spans[1].getAttribute('data-line')).to.be.equal('2');
  });

  it('italic', function () {
    const el = renderDom('\n*a  \nb*');
    const spans = el.querySelectorAll('em span');
    expect(spans[0].getAttribute('data-line')).to.be.equal('1');
    expect(spans[1].getAttribute('data-line')).to.be.equal('2');
  });

  it('image', function () {
    const el = renderDom('\n![example](https://example.com "title")');
    expect(el.querySelector('img').getAttribute('data-line')).to.be.equal('1');
  });

  it('strike through', function () {
    const el = renderDom('\n ~~a~~');
    expect(el.querySelector('s').getAttribute('data-line')).to.be.equal('1');
  });

  it('text', function () {
    const el = renderDom('\na  \nb\n\nc');
    const spans = el.querySelectorAll('span');
    expect(spans[0].getAttribute('data-line')).to.be.equal('1');
    expect(spans[1].getAttribute('data-line')).to.be.equal('2');
    expect(spans[2].getAttribute('data-line')).to.be.equal('4');
  });
});
