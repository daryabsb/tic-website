#!/usr/bin/env bash
# Deploy the checked-out commit to staging on stms-data (D27): https://staging.ticqc.ae
#
#   bash scripts/deploy-staging.sh          # deploy HEAD (uncommitted changes are NOT sent)
#
# Deploy main after a GREEN gate (scripts/ci.sh). The image is built on the VM with
# the GitHub token as a build secret (read access to zeneon-cms; never stored).
# Rollback: ssh stms-data 'bash ~/tic/staging/rollback.sh' (the previous image tag).
set -euo pipefail

HOST="${STAGING_HOST:-stms-data}"
SHA="$(git rev-parse --short HEAD)"
echo "== staging deploy of ${SHA} on ${HOST}"

git archive HEAD | ssh -o BatchMode=yes "$HOST" \
  'rm -rf ~/tic/staging/src && mkdir -p ~/tic/staging/src && tar -x -C ~/tic/staging/src'

gh auth token | ssh -o BatchMode=yes "$HOST" \
  "bash ~/tic/staging/src/scripts/deploy-staging-remote.sh ${SHA}"
