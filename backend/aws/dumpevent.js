'use strict';

// @formatter:off
const AWS           = require("aws-sdk");

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
// @formatter:on

if (DynamoDBURL !== undefined) {
    AWS.config.update({
        region: AWSRegion,
        endpoint: DynamoDBURL
    });
}

/**
 *  info function returning theinput event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(event)
    };
};
