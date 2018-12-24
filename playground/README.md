# Playground

In this directory I'll collect sample samples and scripts from the first findings when setting up the basic infrastructure in AWS - first with the AWS console.

# the webapp

just a HTML file that is uploaded to a S3 bucket

## the bucket

* in the AWS console, creating a bucket named _com.sothawo.t4s.playground.001_, region Frankfurt, no special options, in the first setup no public access
* upload index.html and error.html
* activate website hosting, and add bucket policy to allow public access, http://com.sothawo.t4s.playground.001.s3-website.eu-central-1.amazonaws.com/

**finding:** no SSL possible for the bucket without the use of cloudfront (and Route53)

for the first step, leave SSL away for the webapp; evaluate Cloudfront later

## API Gateway for webapp

* create API Gateway

### proxy to webapp

* add /{poxy+} resource with ANY method and set it up to the URL of the S3 bucket
* 
* deploy it to a stage named _test_

https://1wdkvhfy09.execute-api.eu-central-1.amazonaws.com/test/index.html

**Finding:** no need to put the webapp behind the API Gateway, because it has to be public anyway, and using API gateway just adds unnecessay stage name in the path, making the app itself more complex
