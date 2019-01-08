'use strict';

// @formatter:off
const AWS           = require("aws-sdk");

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

const DynamoDB = new AWS.DynamoDB();

/**
 * function to create the table in DynamoDB. Needed for local integration testing.
 */
module.exports.handler = async () => {
    const params = {
        TableName: TableName,
        KeySchema: [
            {AttributeName: "partition", KeyType: "HASH"},  //Partition key
            {AttributeName: "sort", KeyType: "RANGE"}  //Sort key
        ],
        AttributeDefinitions: [
            {AttributeName: "partition", AttributeType: "S"},
            {AttributeName: "sort", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };

    console.log(`create table ${TableName} at ${DynamoDBURL}`);

    return new Promise((resolve, reject) => {
        DynamoDB.createTable(params, (err, data) => {
            if (err) {
                reject("Unable to create table. Error JSON:" + JSON.stringify(err, null, 2));
            } else {
                resolve("Created table. Table description JSON:" + JSON.stringify(data, null, 2));
            }
        });
    });
};
