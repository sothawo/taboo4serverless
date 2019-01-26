'use strict';

// @formatter:off
const corsResponse  = require("./utils").corsResponse;

// @formatter:on


/**
 *  info function returning theinput event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    console.log("event:");
    console.log(event);
};
