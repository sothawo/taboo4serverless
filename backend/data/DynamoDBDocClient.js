/**
 * a class describing the AWS DynamoDB document client's methods. Needed by sinon for spying, stubbing and mocking.
 */
class DynamoDBDocClient {
    get(params, callback) {}
    put(params, callback) {}
    query(params, callback) {}
    scan(params, callback) {}
}

module.exports = DynamoDBDocClient;
