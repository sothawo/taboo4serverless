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
 * loads a title for a website
 * @param event
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        console.log(body);
        const url = body.url;
        console.log(url);
        const title = await new Taboo4Service(docClient, TableName).loadTitle(url);

        return corsResponse(200, title);
    } catch (error) {
        return corsResponse(500, error);
    }
};
