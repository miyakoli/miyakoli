#!/bin/bash

aws s3 sync . "${ADLP_ORIGIN_S3}" \
    --delete --acl public-read --exclude "*.git*"
aws cloudfront create-invalidation \
    --distribution-id "${ADLP_DISTRO_ID}" --paths "/*"
