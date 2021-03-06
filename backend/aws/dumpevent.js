'use strict';

// @formatter:off
const corsResponse  = require("./utils").corsResponse;

// @formatter:on


/**
 *  info function returning theinput event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    return corsResponse(200, event);
};
