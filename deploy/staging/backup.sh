#!/usr/bin/env bash
# Weekly staging backup (D27; master plan 13: "staging Sundays"). Run by
# tic-staging-backup.timer on stms-data, or by hand: bash ~/tic/staging/backup.sh
#
# pg_dump -Fc plus media/ and private/ to the QNAP NAS share (the HBS 3 job copies the
# share to the Iraq NAS). Keeps the 8 newest sets. .env is not copied: its secrets are
# regenerated or re-issued (tunnel token) if the VM is lost. Pings Healthchecks.io when
# HC_PING_URL is set in ~/tic/staging/.env.
set -euo pipefail
S=~/tic/staging
DEST="${TIC_BACKUP_DIR:-/mnt/stms-backups/tic-staging}"
KEEP=8
HC="$(sed -n 's/^HC_PING_URL=//p' "$S/.env")"
ping() { [ -n "$HC" ] && curl -fsS -m 10 --retry 3 -o /dev/null "$HC$1" || true; }
trap 'ping /fail' ERR

ping /start
mountpoint -q "$(dirname "$DEST")" || { echo "NAS share not mounted"; false; }
mkdir -p "$DEST"
stamp="$(date -u +%Y%m%dT%H%MZ)"
dc() { IMAGE_TAG="$(cat "$S/.deploy-tag")" docker compose -p tic-staging -f "$S/compose.yaml" --env-file "$S/.env" "$@"; }

dc exec -T db sh -c 'pg_dump -Fc -U "$POSTGRES_USER" "$POSTGRES_DB"' > "$DEST/.$stamp.dump"
dc exec -T db pg_restore --list < "$DEST/.$stamp.dump" > /dev/null  # the dump reads back
sudo tar -czf "$DEST/.$stamp-files.tgz" -C "$S" media private
mv "$DEST/.$stamp.dump" "$DEST/$stamp.dump"
mv "$DEST/.$stamp-files.tgz" "$DEST/$stamp-files.tgz"

ls -1t "$DEST"/*.dump | tail -n +$((KEEP + 1)) | xargs -r rm -f
ls -1t "$DEST"/*-files.tgz | tail -n +$((KEEP + 1)) | xargs -r rm -f
echo "backup $stamp: $(du -sh "$DEST/$stamp.dump" | cut -f1) db, $(du -sh "$DEST/$stamp-files.tgz" | cut -f1) files"
ping ""
