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
 * stores a Bookmark in the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const bookmark = new Bookmark(body.url, body.title, body.tags);

    const savedBookmark = await new Taboo4Service(docClient, TableName).saveBookmark(bookmark);

    return {
        statusCode: 201,
        headers: {
            // Location header is relative to the URL used to create the bookmark
            "Location": savedBookmark.id
        },
        body: JSON.stringify(savedBookmark.simplify())
    };
};
