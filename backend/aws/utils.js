class Utils {

    static corsResponse(statusCode, body, headers = {}) {
        headers["Access-Control-Allow-Origin"] = "*";
        return {
            statusCode: statusCode,
            headers: headers,
            body: JSON.stringify(body)
        };
    }
}

module.exports = Utils;
