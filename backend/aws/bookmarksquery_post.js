'use strict';

// @formatter:off
const AWS = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const TabooSet = require("../data/TabooSet");

const TableName = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL = process.env.DYNAMODB_URL;
// @formatter:on

if (DynamoDBURL !== undefined) {
    AWS.config.update({
        region: AWSRegion,
        endpoint: DynamoDBURL
    });
}

const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * processes a query request and returns matching bookmarks.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const bookmarks = new TabooSet();

    // tags in query?
    if (body.tags && body.tags.constructor === Array) {
        (await new Taboo4Service(docClient, TableName).bookmarksByTags(body.tags))
            .forEach(it => bookmarks.add(it));
    }

    return {
        statusCode: 200,
        body: JSON.stringify(bookmarks.getElements().map(it => it.simplify()))
    };
};
