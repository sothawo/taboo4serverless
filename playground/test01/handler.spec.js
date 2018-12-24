var chai = require('chai').should();

hello = require('./handler.js').hello;

describe('hello', function () {
    it('returns a promise that resolves to a hello message', async function() {
        (await hello('test')).should.equal('hello from test');
    })
});
