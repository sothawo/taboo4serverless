'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");

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

const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * loads all tags from the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {

    const tags = await new Taboo4Service(docClient, TableName).allTags();

    if (tags) {
        return {
            statusCode: 200,
            body: JSON.stringify(tags)
        };
    } else {
        return {
            statusCode: 500,
            body: "oops"
        }
    }
};
