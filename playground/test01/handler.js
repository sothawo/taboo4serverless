'use strict';


/**
 * a hello function that answers with a delay, returning a promise.
 * @param mode
 * @returns {Promise<String>}
 */
module.exports.hello = (mode) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello from ' + mode)
        }, 30)
    });
};

function buildResponse(answer, event) {
    return {
        statusCode: 200,
        body:
            JSON.stringify({
                message: answer,
                input: event
            })
    }
}

module.exports.helloAsync = async (event, context) => {

    let answer = await this.hello('helloAsync');
    return buildResponse(answer, event);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.helloSync = (event, context, callback) => {

    this.hello('helloSync')
        .then(answer => {
            callback(null, buildResponse(answer, event))
        })
        .catch(e => callback(e, null));
};
