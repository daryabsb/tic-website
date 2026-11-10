#!/usr/bin/env bash
# The VM half of scripts/ci.sh (D25). Runs in ~/tic/dev on stms-data; reads the GitHub
# token on stdin for the image build. Do not run by hand on a PC (D24).
set -euo pipefail
read -r GH_TOKEN; export GH_TOKEN  # first line of stdin, from `gh auth token`
exec </dev/null
cd ~/tic/dev
dc() { docker compose -p tic-dev -f deploy/compose.dev.yaml -f ~/tic/override.yaml "$@"; }

echo "== 1. image build (compilemessages + collectstatic run inside it)"
dc build --quiet web

echo "== 2. dev stack up: migrate, locales, seed"
dc up -d --force-recreate --wait web || { dc logs --tail 40 web; exit 1; }
echo "== 3. seed idempotence"
dc exec -T web python manage.py seed_site | tee /tmp/tic-seed.txt
grep -q "0 change(s)" /tmp/tic-seed.txt || { echo "seed_site is not idempotent"; exit 1; }

echo "== 4. ruff, migrations, .po, pytest + coverage"
rc=0
dc run --rm -T -u root -v "$HOME/tic/dev:/src" -w /src -e DJANGO_ENV=test web sh -c '
  set -e
  grep -v "^zeneon-cms" requirements/dev.txt > /tmp/d.txt
  pip install -q --no-deps -r /tmp/d.txt
  ruff check .
  ruff format --check .
  DJANGO_ENV=development python manage.py makemigrations --check --dry-run
  python - <<PY
import pathlib, polib
n = 0
for p in sorted(pathlib.Path("locale").rglob("*.po")):
    for e in polib.pofile(str(p)):
        if not e.obsolete and ("fuzzy" in e.flags or not e.translated()):
            n += 1; print(f"warning: {p}:{e.linenum}: {e.msgid[:60]!r}")
print(f"{n} untranslated or fuzzy entries (warning only until T28)")
PY
  coverage run -m pytest -q -p no:cacheprovider
  coverage report
' || rc=$?
# files written by root in the mounted source go back to the login user
dc run --rm -T -u root -v "$HOME/tic/dev:/src" --no-deps --entrypoint "" web \
  chown -R "$(id -u):$(id -g)" /src >/dev/null 2>&1 || true
[ "$rc" -eq 0 ] && echo "== GREEN" || echo "== RED (exit $rc)"
exit "$rc"
