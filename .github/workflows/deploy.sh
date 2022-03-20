#!/bin/bash


make-release-tag () {
    local NOW="$(TZ=Asia/Tokyo date +%Y%m%d_%H%M%S)"
    local TAG_NAME=release/${NOW}
    git tag ${TAG_NAME}
    git push origin ${TAG_NAME}
}


MAKE_RELEASE_TAG=


while [[ $# -gt 0 ]]; do
  case $1 in
    -t|--make-release-tag)
      MAKE_RELEASE_TAG=TRUE
      shift
      shift
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      echo "No positional arguments is allowed"
      exit 1
      ;;
  esac
done


aws s3 sync . "${ADLP_ORIGIN_S3}" \
    --delete --acl public-read \
    --exclude "*.git*" --exclude "*.github*"
aws cloudfront create-invalidation \
    --distribution-id "${ADLP_DISTRO_ID}" --paths "/*"

if [ ! -z "${MAKE_RELEASE_TAG}" ]; then
    make-release-tag
fi
