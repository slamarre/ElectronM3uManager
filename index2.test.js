import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
const should = require('should');

describe('should test', () => {
  it('find the div', (done) => {
    //const div = window.document.getElementsByTagName('div')[0];
    //expect(div.length).should.not.equal(0);
    done();
  })
});

describe('our first test', () => {
  it.skip('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should say hello', (done) => {
    const index = fs.readFileSync('./index.html', 'utf-8');
    jsdom.env(index, function (err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Directory Scanner and File Management");

      done();
      window.close();
    });
  });
});
