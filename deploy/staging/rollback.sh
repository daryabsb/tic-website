#!/usr/bin/env bash
# Start staging again on the previous image (D27). On stms-data:
#   bash ~/tic/staging/rollback.sh
# Migrations are not reversed: a rollback across a migration needs a restore
# (backup.sh output) as well.
set -euo pipefail
S=~/tic/staging
PREV="$(cat "$S/.deploy-tag.prev")"
IMAGE_TAG="$PREV" docker compose -p tic-staging -f "$S/compose.yaml" --env-file "$S/.env" \
  up -d --wait web caddy
cp "$S/.deploy-tag" "$S/.deploy-tag.prev"
echo "$PREV" > "$S/.deploy-tag"
echo "staging runs ${PREV}"
