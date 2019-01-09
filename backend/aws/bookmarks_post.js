'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const Bookmark      = require("../data/Bookmark");
const corsResponse  = require("./utils").corsResponse;

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
// @formatter:on

const docClient = new AWS.DynamoDB.DocumentClient({region: AWSRegion, endpoint: DynamoDBURL});

/**
 * stores an array of Bookmarks in the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    try {
        const bookmarks = JSON.parse(event.body).map(item => new Bookmark(item.url, item.title, item.tags));
        const message = await new Taboo4Service(docClient, TableName).saveBookmarks(bookmarks);
        return corsResponse(200, message);
    }
    catch(error) {
        return corsResponse(500, error);
    }
};
