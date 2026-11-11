#!/usr/bin/env bash
# Ticket #11: make the tic stack folders on zeneon-1 (idempotent).
# Run ON THE SERVER as "deploy", from a checkout of this repo:
#
#   git clone git@github.com:daryabsb/tic-website.git ~/tic-website   # or git pull
#   bash ~/tic-website/deploy/server-setup.sh
#
# What it does:
#   1. /srv/stacks/tic/{staging,prod}/{media,private,} with .env and backup.env
#      copied from the examples when missing (mode 600). You fill the values.
#   2. staging compose.yaml rendered from compose.yaml + compose.staging.yaml;
#      prod compose.yaml copied as is.
#   3. The two forced-command lines in ~/.ssh/authorized_keys (public keys in deploy/ssh/).
#   4. Caddy: tic-staging.caddy into /srv/platform/caddy/sites/, validate, reload.
#      Needs TIC_STAGING_BASIC_AUTH_HASH in /srv/platform/caddy/caddy.env first.
#   5. Prints the remaining by-hand steps (platform timers need sudo).
set -euo pipefail
HERE="$(cd "$(dirname "$(readlink -f "$0")")" && pwd)"
PLATFORM=/srv/platform
STACKS=/srv/stacks/tic
APP_UID=10001

step() { printf '\n== %s\n' "$*"; }

step "1. stack folders"
for env in staging prod; do
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
# staging values differ from the example defaults
if grep -q '^DJANGO_ENV=production' "$STACKS/staging/.env"; then
	sed -i -e 's/^DJANGO_ENV=production/DJANGO_ENV=staging/' \
		-e 's/^ALLOWED_HOSTS=.*/ALLOWED_HOSTS=tic-staging.zeneon.co.uk/' \
		-e 's#^WAGTAILADMIN_BASE_URL=.*#WAGTAILADMIN_BASE_URL=https://tic-staging.zeneon.co.uk#' \
		"$STACKS/staging/.env"
	sed -i -e 's#zeneon-backups/tic-prod#zeneon-backups/tic-staging#' "$STACKS/staging/backup.env"
fi

step "2. compose files"
install -m 0644 "$HERE/compose.yaml" "$STACKS/prod/compose.yaml"
docker compose -f "$HERE/compose.yaml" -f "$HERE/compose.staging.yaml" \
	config --no-interpolate --no-env-resolution --no-path-resolution \
	> "$STACKS/staging/compose.yaml.new"
mv "$STACKS/staging/compose.yaml.new" "$STACKS/staging/compose.yaml"
echo "  $STACKS/prod/compose.yaml and $STACKS/staging/compose.yaml"

step "3. forced-command SSH keys"
AK=~/.ssh/authorized_keys
install -d -m 700 ~/.ssh; touch "$AK"; chmod 600 "$AK"
for env in staging prod; do
	pub="$(cut -d' ' -f1,2 "$HERE/ssh/tic-$env.pub")"
	line="restrict,command=\"$PLATFORM/bin/deploy tic $env\" $pub gha-tic-$env"
	if grep -qF "$pub" "$AK"; then echo "  $env key already present"; else printf '%s\n' "$line" >> "$AK"; echo "  added $env key"; fi
done

step "4. Caddy staging site"
if ! grep -q '^TIC_STAGING_BASIC_AUTH_HASH=' "$PLATFORM/caddy/caddy.env" 2>/dev/null; then
	echo "  TIC_STAGING_BASIC_AUTH_HASH is missing from $PLATFORM/caddy/caddy.env."
	echo "  Make one:  docker run --rm caddy:2.10-alpine caddy hash-password"
	echo "  add the line (single quotes), then: cd $PLATFORM/caddy && docker compose up -d"
	echo "  and run this script again. Skipping the Caddy step."
else
	install -m 0644 "$HERE/caddy/tic-staging.caddy" "$PLATFORM/caddy/sites/tic-staging.caddy"
	(cd "$PLATFORM/caddy" \
		&& docker compose exec -w /etc/caddy caddy caddy validate --config /etc/caddy/Caddyfile \
		&& docker compose exec -w /etc/caddy caddy caddy reload --config /etc/caddy/Caddyfile)
	echo "  staging site installed and Caddy reloaded"
fi

step "5. by hand (needs sudo / secrets)"
cat <<EOF
  a. Fill $STACKS/staging/.env, $STACKS/prod/.env, both backup.env (RESTIC_PASSWORD, B2 keys, HC_PING_URL).
  b. Platform timers:  cd $PLATFORM && git pull && sudo $PLATFORM/systemd/install
     then: systemctl list-timers 'backup@tic-*' 'task@tic-*'
  c. Healthchecks URL for the retry task:
     sudo tee /etc/server-platform/healthchecks/task@tic-prod-retry.env <<<'HC_PING_URL=https://hc-ping.com/...'
  d. GHCR pull on the server (package is private): docker login ghcr.io with a read:packages token, once.
  e. First deploy, after CI pushes an image:  $PLATFORM/bin/deploy tic staging <sha>
     first content, once:     $PLATFORM/bin/run-task tic staging seed_site
     first admin, once:       cd $STACKS/staging && IMAGE_TAG=\$(head -1 .deploy-tag) docker compose -p tic-staging exec web python manage.py createsuperuser
  f. First backup by hand:  sudo $PLATFORM/bin/backup-stack tic-prod
EOF
