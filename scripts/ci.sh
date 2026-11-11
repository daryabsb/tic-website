#!/usr/bin/env bash
# The CI gate, run on the Dubai VM stms-data (D24, D25): no GitHub-hosted runners.
# Same checks as .github/workflows/ci.yml, plus the seed idempotence check.
#
#   bash scripts/ci.sh           # gate the checked-out commit (uncommitted changes are NOT sent)
#
# Needs: `ssh stms-data` (alias, E:/api/stms/deploy/SERVERS.md) and `gh auth token`
# (read access to zeneon-cms for the image build; build secret only, never stored).
# Exit 0 = green. The dev stack (tic-dev) is rebuilt and left running on the VM.
set -euo pipefail

HOST="${CI_HOST:-stms-data}"
SHA="$(git rev-parse --short HEAD)"
echo "== gate for ${SHA} on ${HOST}"

git archive HEAD | ssh -o BatchMode=yes "$HOST" \
  'rm -rf ~/tic/dev && mkdir -p ~/tic/dev && tar -x -C ~/tic/dev'

gh auth token | ssh -o BatchMode=yes "$HOST" 'bash ~/tic/dev/scripts/ci-remote.sh'
