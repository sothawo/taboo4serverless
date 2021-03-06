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
 * deletes a Bookmark from the database.
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    const id = event.pathParameters.id;

    const msg = await new Taboo4Service(docClient, TableName).deleteBookmarkById(id);
    if (msg) {
        return corsResponse(200, "deleted")
    } else {
        return corsResponse(404, "bookmark with id " + id + " not found");
    }
};
