'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const corsResponse  = require("./utils").corsResponse;

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
// @formatter:on

/**
 *  info function returning some configuration information
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event, context) => {
    const config = {
        AWSRegion: AWSRegion,
        dynamoDBURL: DynamoDBURL,
        tableName: TableName
    };
    return corsResponse(200, config);
};
