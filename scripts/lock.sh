#!/usr/bin/env bash
# Re-lock requirements/{base,dev,prod}.txt for the image: Linux x86_64, Python 3.12.
# Copied from the Zeneonix site; one private repo here (zeneon-cms).
#
#   bash scripts/lock.sh             # keep current pins, add what is new
#   bash scripts/lock.sh --upgrade   # newest versions inside the ranges of the .in files
#
# Needs uv (https://docs.astral.sh/uv/). Works in Git Bash and on Linux.
#
# The private repos are pinned by ssh URL in base.in:
#
#   zeneon-cms           local clone ZENEON_CMS_DIR,          default ../zeneon-cms
#
# This machine may have no GitHub SSH key, so the script resolves each one from its local
# clone at the same SHA, then writes the ssh URLs back into the locks. The result is the
# same: each package's dependencies come from its pyproject.toml at that commit. Options
# match MLP's pip-compile (--allow-unsafe --no-emit-index-url --strip-extras); every line
# stays pinned.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REQ="$ROOT/requirements"

# name|local clone. Every git+ssh pin in base.in must be in this list.
PRIVATE=(
	"zeneon-cms|${ZENEON_CMS_DIR:-$ROOT/../zeneon-cms}"
)

known=" "
for entry in "${PRIVATE[@]}"; do known+="${entry%%|*} "; done
while read -r name; do
	[[ "$known" == *" $name "* ]] \
		|| { echo "$name is a git+ssh pin in base.in with no local clone in lock.sh" >&2; exit 1; }
done < <(grep -oE '^[a-z0-9-]+(\[[a-z,]+\])? @ git\+ssh://' "$REQ/base.in" | sed -E 's/[[ ].*//')

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
cp "$REQ"/*.in "$REQ"/*.txt "$work/"

ssh_urls=()
file_urls=()
for entry in "${PRIVATE[@]}"; do
	name="${entry%%|*}"
	dir="${entry#*|}"
	ssh_url="git+ssh://git@github.com/daryabsb/$name.git"
	line="$(grep -E "^$name(\[[a-z,]+\])? @ git\+ssh://" "$REQ/base.in")" \
		|| { echo "no $name pin in base.in" >&2; exit 1; }
	sha="${line##*@}"
	[[ "$sha" =~ ^[0-9a-f]{40}$ ]] || { echo "no 40-char $name SHA in base.in" >&2; exit 1; }
	git -C "$dir" cat-file -e "$sha^{commit}" 2>/dev/null \
		|| { echo "commit $sha not in $dir (git -C $dir fetch)" >&2; exit 1; }
	# Git Bash: E:/api/zeneon-cms (pwd -W); Linux: /home/.../zeneon-cms
	path="$(cd "$dir" && { pwd -W 2>/dev/null || pwd; })"
	file_url="git+file:///${path#/}"
	# ssh -> local file URL, in the inputs and in the old locks (kept as preferences)
	sed -i "s#$ssh_url@#$file_url@#" "$work"/*.in "$work"/*.txt
	ssh_urls+=("$ssh_url")
	file_urls+=("$file_url")
done

cd "$work"
for name in base dev prod; do
	echo "--- $name.txt"
	uv pip compile --quiet "$@" \
		--python-platform x86_64-unknown-linux-gnu --python-version 3.12 \
		--no-emit-index-url --allow-unsafe --strip-extras \
		--custom-compile-command "uv pip compile --python-platform x86_64-unknown-linux-gnu --python-version 3.12 --no-emit-index-url --allow-unsafe --strip-extras -o $name.txt $name.in" \
		--output-file "$name.txt" "$name.in"
done

for name in base dev prod; do
	for i in "${!ssh_urls[@]}"; do
		sed -i "s#${file_urls[$i]}@#${ssh_urls[$i]}@#" "$name.txt"
	done
	cp "$name.txt" "$REQ/$name.txt"
	if grep -q 'git+file:' "$REQ/$name.txt"; then echo "file URL left in $name.txt" >&2; exit 1; fi
done
grep -H '^zeneon-cms @' "$REQ"/base.txt
echo "locked: requirements/base.txt dev.txt prod.txt"
