class Utils {

    static corsResponse(statusCode, body, headers = {}) {
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Headers"] = "Content-Type,X-Amz-Date,Authorization,X-Api-Key";
        return {
            statusCode: statusCode,
            headers: headers,
            body: JSON.stringify(body)
        };
    }
}

module.exports = Utils;
