'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const corsResponse  = require("./utils").corsResponse;
const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
// @formatter:on


const docClient = new AWS.DynamoDB.DocumentClient({region: AWSRegion, endpoint: DynamoDBURL});

/**
 * loads all Bookmarks from the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {

    const bookmarks = await new Taboo4Service(docClient, TableName).allBookmarks();

    if (bookmarks) {
        return corsResponse(200, bookmarks.map(it => it.simplify()));
    } else {
        return corsResponse(500, "oops");
    }
};
