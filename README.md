# Esep Webhook

## CLI Commands

Create IAM role:

```sh
IAM_ROLE=$(aws iam create-role --role-name Esep-Webhook --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}')
ARN=$(echo $IAM_ROLE | jq '.Role.Arn')
ARN=$(echo $ARN | tr -d '"')

aws iam attach-role-policy --role-name Esep-Webhook --policy-arn arn:aws:iam::aws:policy/IAMFullAccess
aws iam attach-role-policy --role-name Esep-Webhook --policy-arn arn:aws:iam::aws:policy/AWSLambda_FullAccess
aws iam attach-role-policy --role-name Esep-Webhook --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Create Lambda function:

```sh
zip function.zip index.mjs
aws lambda create-function --function-name EsepWebhook \
    --zip-file fileb://function.zip \
    --handler index.handler \
    --runtime nodejs20.x \
    --role $ARN
```

Add environment variable:

```sh
export SLACK_URL=""
aws lambda update-function-configuration \
  --function-name EsepWebhook \
  --environment "Variables={SLACK_URL=$SLACK_URL}"
```

Update function:

```sh
zip function.zip index.mjs
aws lambda update-function-code --function-name EsepWebhook \
--zip-file fileb://function.zip
```

## Extra Resources

- Create lambda with node.js: <https://medium.com/@andrevieira.cloud/how-to-create-lambda-function-with-runtime-nodejs-using-the-aws-cli-fd5dcde33c76>
- Lambda cli: <https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html>
- Add env variables to lambda via cli: <https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html>
