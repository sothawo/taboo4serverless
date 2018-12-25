'use strict';

const Taboo4 = require('./taboo4.js');

// simple ping function returning pong answer
module.exports.ping = async (event, context, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: Taboo4.ping(),
            input: event
        })
    }
};
