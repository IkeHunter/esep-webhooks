#!/bin/bash

set -e

zip function.zip index.mjs
aws lambda update-function-code --function-name EsepWebhook --zip-file fileb://function.zip