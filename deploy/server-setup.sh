#!/usr/bin/env bash
# Make the tic PRODUCTION stack folders on a server-platform host (idempotent; master plan 13).
# Staging is not here: it runs on stms-data, scripts/deploy-staging.sh (D27).
# Run ON THE SERVER as "deploy", from a checkout of this repo:
#
#   git clone git@github.com:daryabsb/tic-website.git ~/tic-website   # or git pull
#   bash ~/tic-website/deploy/server-setup.sh
#
# What it does:
#   1. /srv/stacks/tic/prod/{media,private,} with .env and backup.env
#      copied from the examples when missing (mode 600). You fill the values.
#   2. prod compose.yaml copied as is.
#   3. The forced-command line in ~/.ssh/authorized_keys (public keys in deploy/ssh/).
#   4. Prints the remaining by-hand steps (platform timers need sudo).
set -euo pipefail
HERE="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
PLATFORM=/srv/platform
STACKS=/srv/stacks/tic
APP_UID=10001

step() { printf '\n== %s\n' "$*"; }

step "1. stack folders"
for env in prod; do
	d="$STACKS/$env"
	mkdir -p "$d"
	# deploy has no passwordless sudo; the docker group can chown through a container.
	# media/: public uploads. private/: request attachments (D25), never served by Caddy.
	for sub in media private; do
		if [[ ! -d "$d/$sub" ]]; then
			mkdir -m 0755 "$d/$sub"
		fi
		if [[ "$(stat -c %u "$d/$sub")" != "$APP_UID" ]]; then
			docker run --rm -v "$d/$sub:/m" alpine:3.20 chown $APP_UID:$APP_UID /m
			echo "  $d/$sub owned by $APP_UID"
		fi
	done
	for f in .env backup.env; do
		if [[ ! -f "$d/$f" ]]; then
			install -m 0600 "$HERE/$f.example" "$d/$f"
			echo "  wrote $d/$f from the example: FILL IT IN"
		fi
	done
	chmod 600 "$d/.env" "$d/backup.env"
done
step "2. compose files"
install -m 0644 "$HERE/compose.yaml" "$STACKS/prod/compose.yaml"
echo "  $STACKS/prod/compose.yaml"

step "3. forced-command SSH keys"
AK=~/.ssh/authorized_keys
install -d -m 700 ~/.ssh; touch "$AK"; chmod 600 "$AK"
for env in prod; do
	pub="$(cut -d' ' -f1,2 "$HERE/ssh/tic-$env.pub")"
	line="restrict,command=\"$PLATFORM/bin/deploy tic $env\" $pub gha-tic-$env"
	if grep -qF "$pub" "$AK"; then echo "  $env key already present"; else printf '%s\n' "$line" >> "$AK"; echo "  added $env key"; fi
done

step "4. by hand (needs sudo / secrets)"
cat <<EOF
  a. Fill $STACKS/prod/.env and backup.env (RESTIC_PASSWORD, B2 keys, HC_PING_URL).
  b. Platform timers:  cd $PLATFORM && git pull && sudo $PLATFORM/systemd/install
     then: systemctl list-timers 'backup@tic-*' 'task@tic-*'
  c. Healthchecks URL for the retry task:
     sudo tee /etc/server-platform/healthchecks/task@tic-prod-retry.env <<<'HC_PING_URL=https://hc-ping.com/...'
  d. GHCR pull on the server (package is private): docker login ghcr.io with a read:packages token, once.
  e. First deploy, after an image exists:  $PLATFORM/bin/deploy tic prod <sha>
     first content, once:     $PLATFORM/bin/run-task tic prod seed_site
  f. First backup by hand:  sudo $PLATFORM/bin/backup-stack tic-prod
EOF
