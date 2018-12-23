'use strict';


function hello(mode) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mode + ' executed successfully')
        }, 30)
    });
}

module.exports.helloAsync = async (event, context) => {

    var response = {
        statusCode: 200,
        body: JSON.stringify({
            message: await hello('helloAsync'),
            input: event,
        }),
    };

    return response;

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.helloSync = (event, context, callback) => {


    hello('helloSync')
        .then(result => {
            var response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: result,
                    input: event,
                }),
            };
            callback(null, response)
        })
        .catch(e => {
            callback(e, null)
        });

};
