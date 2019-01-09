'use strict';

// @formatter:off
const AWS           = require("aws-sdk");

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
// @formatter:on

const DynamoDB = new AWS.DynamoDB({region: AWSRegion, endpoint: DynamoDBURL});

/**
 * function to drop the table in DynamoDB. Needed for local integration testing.
 */
module.exports.handler = async () => {
    const params = {
        TableName: TableName,
    };

    return new Promise((resolve, reject) => {
        DynamoDB.deleteTable(params, (err, data) => {
            if (err) {
                reject("Unable to delete table. Error JSON:" + JSON.stringify(err, null, 2));
            } else {
                resolve("Deleted table");
            }
        });
    });
};
