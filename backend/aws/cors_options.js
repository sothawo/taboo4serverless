'use strict';

// @formatter:off
const corsResponse  = require("./utils").corsResponse;

// @formatter:on

/**
 *  info function returning some configuration information
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event, context) => {
    return corsResponse(200, "");
};
