'use strict';

// @formatter:off
const AWS           = require("aws-sdk");
const Taboo4Service = require("./Taboo4Service");

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

const buildResponse = (body, statusCode) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body)
    }
};

/**
 *  info function returning some configuration information
 * @returns {Promise<{body, statusCode}>}
 */
module.exports.config = async () => {
    const config = {
        AWSRegion: AWSRegion,
        dynamoDBURL: DynamoDBURL,
        tableName: TableName
    };
    return buildResponse(config, 200);
};

/**
 * function to create the table in DynamoDB. Needed for local integration testing.
 */
module.exports.createTable = async () => {
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

    return new Promise((resolve, reject) => {
        DynamoDB.createTable(params, function (err, data) {
            if (err) {
                reject("Unable to create table. Error JSON:" + JSON.stringify(err, null, 2));
            } else {
                resolve("Created table. Table description JSON:" + JSON.stringify(data, null, 2));
            }
        });
    });
};

/**
 * function to drop the table in DynamoDB. Needed for local integration testing.
 */
module.exports.deleteTable = async () => {
    const params = {
        TableName: TableName,
    };

    return new Promise((resolve, reject) => {
        DynamoDB.deleteTable(params, function (err, data) {
            if (err) {
                reject("Unable to delete table. Error JSON:" + JSON.stringify(err, null, 2));
            } else {
                resolve("Deleted table. Table description JSON:" + JSON.stringify(data, null, 2));
            }
        });
    });
};
