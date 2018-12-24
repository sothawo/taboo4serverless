require("chai").should();
const Taboo4 = require("./taboo4.js");

describe('Taboo4', () => {
    const taboo4 = new Taboo4();
    it('answers a ping with a pong',  () => {
         Taboo4.ping().should.equal('pong');
    })
});
