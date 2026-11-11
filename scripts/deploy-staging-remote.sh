#!/usr/bin/env bash
# The VM half of scripts/deploy-staging.sh (D27). Runs on stms-data from
# ~/tic/staging/src; reads the GitHub token on stdin for the image build.
#
#   deploy-staging-remote.sh <sha>
#
# First run only: writes ~/tic/staging/.env with generated secrets, a basic-auth
# password in ~/tic/staging/basic-auth.txt, the Arabic locale.
# Every run: build tic-website:<sha>, migrate, seed (fills blanks only, D30), start, wait for health, install the
# weekly backup timer, keep the two newest images.
set -euo pipefail
SHA="${1:?usage: deploy-staging-remote.sh <sha>}"
read -r GH_TOKEN; export GH_TOKEN  # first line of stdin, from `gh auth token`
exec </dev/null

S=~/tic/staging
SRC="$S/src"
APP_UID=10001
cd "$S"
dc() { IMAGE_TAG="$SHA" docker compose -p tic-staging -f "$S/compose.yaml" --env-file "$S/.env" "$@"; }
step() { printf '== %s\n' "$*"; }
setenv() { # setenv KEY VALUE: replace the KEY= line in .env (values never contain '|')
  sed -i "s|^$1=.*|$1=$2|" "$S/.env"
}

step "1. folders and stack files"
for d in media private; do
  mkdir -p "$S/$d"
  [ "$(stat -c %u "$S/$d")" = "$APP_UID" ] || sudo chown "$APP_UID:$APP_UID" "$S/$d"
done
cmp -s "$SRC/deploy/staging/Caddyfile" "$S/Caddyfile" || CADDY_CHANGED=1
install -m 0644 "$SRC/deploy/staging/compose.yaml" "$SRC/deploy/staging/Caddyfile" "$S/"
install -m 0755 "$SRC/deploy/staging/backup.sh" "$SRC/deploy/staging/rollback.sh" "$S/"

if [ ! -f "$S/.env" ]; then
  step "   first deploy: generating .env"
  install -m 0600 "$SRC/deploy/staging/env.example" "$S/.env"
  setenv SECRET_KEY "$(python3 -c 'import secrets; print(secrets.token_urlsafe(64))')"
  PW="$(openssl rand -hex 24)"
  setenv POSTGRES_PASSWORD "$PW"
  setenv DATABASE_URL "postgres://tic:${PW}@db:5432/tic"
  AUTH="$(openssl rand -base64 18 | tr -d '/+=')"
  HASH="$(docker run --rm caddy:2.10-alpine caddy hash-password --plaintext "$AUTH")"
  # Single quotes: Compose reads the bcrypt hash's '$' literally.
  setenv TIC_STAGING_BASIC_AUTH_HASH "'${HASH}'"
  umask 077; printf 'user: review\npassword: %s\n' "$AUTH" > "$S/basic-auth.txt"; umask 022
fi
chmod 600 "$S/.env"

step "2. image tic-website:${SHA}"
docker build --quiet --secret id=gh_token,env=GH_TOKEN \
  -f "$SRC/deploy/Dockerfile" -t "tic-website:${SHA}" "$SRC" >/dev/null

step "3. database and migrations"
dc up -d --wait db
dc run --rm --no-deps web python manage.py migrate --noinput
if [ ! -f "$S/.seeded" ]; then
  step "   first deploy: Arabic locale"
  dc run --rm --no-deps web python manage.py zeneon_setup_locales --title "ar=تي آي سي لمراقبة الجودة"
  touch "$S/.seeded"
fi
# D30: the seed runs on every deploy. It fills blanks only, so an editor's text is
# kept and new page types reach staging with their ticket. Summary lines only.
seed_out="$(dc run --rm --no-deps web python manage.py seed_site 2>&1)" \n  || { echo "$seed_out" | tail -20; exit 1; }
echo "$seed_out" | grep -E "^(seed_site|redirect|industry card|[a-z]{2}:)" || true
# D31: rebuild the search index (a page type may have new search fields).
dc run --rm --no-deps web python manage.py update_index >/dev/null

step "4. start web and caddy"
dc up -d --wait --remove-orphans web caddy || { dc logs --tail 40 web caddy; exit 1; }
# A bind-mounted Caddyfile is read at start only.
[ "${CADDY_CHANGED:-0}" = 1 ] && dc restart caddy >/dev/null && echo "   caddy restarted (new Caddyfile)"
if grep -q '^TUNNEL_TOKEN=.\+' "$S/.env"; then
  dc up -d cloudflared
  echo "   tunnel up: https://staging.ticqc.ae"
else
  echo "   TUNNEL_TOKEN is empty in $S/.env: the stack runs, the tunnel does not."
fi

step "5. tags, backup timer, old images"
if [ -f "$S/.deploy-tag" ] && [ "$(cat "$S/.deploy-tag")" != "$SHA" ]; then
  cp "$S/.deploy-tag" "$S/.deploy-tag.prev"
fi
echo "$SHA" > "$S/.deploy-tag"
for unit in tic-staging-backup.service tic-staging-backup.timer; do
  if ! cmp -s "$SRC/deploy/staging/$unit" "/etc/systemd/system/$unit"; then
    sudo install -m 0644 "$SRC/deploy/staging/$unit" /etc/systemd/system/
    CHANGED=1
  fi
done
if [ "${CHANGED:-0}" = 1 ]; then
  sudo systemctl daemon-reload && sudo systemctl enable --now tic-staging-backup.timer
fi
keep="$SHA $(cat "$S/.deploy-tag.prev" 2>/dev/null || true)"
for tag in $(docker image ls tic-website --format '{{.Tag}}'); do
  case " $keep dev " in *" $tag "*) ;; *) docker image rm -f "tic-website:$tag" >/dev/null ;; esac
done

dc ps --format 'table {{.Service}}\t{{.Status}}'
step "deployed ${SHA}"
