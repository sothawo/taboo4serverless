# taboo4serverless

the next version of my bookmarkservice in serverless usign AWS

After OpenShift stopped its developer program where I had my taboo3 app running it's time again to change it.

This version now will be build for running on AWS using Lambdas, API Gateway, S3 and DynamoDB.

#  subdirectories

## playground

this is where I try things

## backend

the backend service with the lambdas and serverless configuration

## frontend

the frontend single page app

# dev and debugging

## dynamodb

running in docker, exposed to port 8080:
 
  ```
  docker run --name dynamodb -d -p 8000:8000 amazon/dynamodb-local
  ```
needs AWS credentials, any fake credential in the environment will do.  
works without problems with a sample node js app.

### listing tables

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

## serverless

serverless functions can be tested with the `sls invoke local -f func` command.
