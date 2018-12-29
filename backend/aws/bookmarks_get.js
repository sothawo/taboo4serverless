'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const Bookmark      = require("../data/Bookmark");

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
 * loads all Bookmarks from the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {

    const bookmarks = await new Taboo4Service(docClient, TableName).allBookmarks();

    if (bookmarks) {
        return {
            statusCode: 200,
            body: JSON.stringify(bookmarks.map(it => it.simplify()))
        };
    } else {
        return {
            statusCode: 500,
            body: "oops"
        }
    }
};
