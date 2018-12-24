require("chai").should();
const handler = require("./handler.js");

describe('hello', () => {
    it('returns a promise that resolves to a hello message', async () => {
        (await handler.hello('test')).should.equal('hello from test');
    })
});
