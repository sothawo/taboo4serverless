'use strict';

// @formatter:off
const AWS   = require("aws-sdk");
const Taboo4Service = require("../service/Taboo4Service");
const Bookmark      = require("../data/Bookmark");

const TableName     = process.env.DYNAMODB_TABLE || "tablename-no-defined";
const AWSRegion     = process.env.AWS_REGION || "eu-central-1";
const DynamoDBURL   = process.env.DYNAMODB_URL;
const S3    = new AWS.S3();
// @formatter:on

const docClient = new AWS.DynamoDB.DocumentClient({region: AWSRegion, endpoint: DynamoDBURL});

/**
 *  processes bookmarks uploaded to the upload bucket. data must be a json containing a bookmark aray.
 */
module.exports.handler =  (event, context, callback) => {
    if (event.Records) {
        event.Records.forEach(record => {
            const bucket = record.s3.bucket.name;
            const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

            console.log(`got ${key} in bucket ${bucket}`);

            S3.getObject({
                Bucket: bucket,
                Key: key
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    const bookmarks = JSON.parse(data.Body.toString("utf-8"))
                        .map(item => new Bookmark(item.url, item.title, item.tags));
                    console.log(`file had ${bookmarks.length} bookmarks`);
                    await new Taboo4Service(docClient, TableName).saveBookmarks(bookmarks);
                    callback(null, null, null);
                }
            })
        });
    }
};
