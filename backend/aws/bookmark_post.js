'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const Bookmark      = require("../data/Bookmark");
const corsResponse  = require("./utils").corsResponse;

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL || undefined;
// @formatter:on


const docClient = new AWS.DynamoDB.DocumentClient({region: AWSRegion, endpoint: DynamoDBURL});

/**
 * stores a Bookmark in the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const bookmark = new Bookmark(body.url, body.title, body.tags);

        let previousId = "";
        if (event.queryStringParameters && event.queryStringParameters.previousId) {
            previousId = event.queryStringParameters.previousId;
        }

        const savedBookmark = await new Taboo4Service(docClient, TableName).saveBookmark(bookmark, previousId);

        return corsResponse(201,
            savedBookmark.simplify(),
            {
                // Location header is relative to the URL used to create the bookmark
                "Location": savedBookmark.id
            });
    } catch (error) {
        return corsResponse(500, error);
    }
};
