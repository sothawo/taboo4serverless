'use strict';

// @formatter:off
const Taboo4Service = require("./Taboo4Service");
const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
// @formatter:on

const buildResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    }
};

// info function returning some configuration information
module.exports.config = async (event, context, callback) => {
    const config = {
        tableName: TableName
    };
    return buildResponse(200, config);
};
