#!/usr/bin/env bash
# T32 security and speed numbers (master plan 12, 15; D63): Mozilla's HTTP Observatory
# grade and Lighthouse mobile, median of 3 runs, on a live hostname. Runs on stms-data in
# throwaway node containers; nothing is installed on the VM.
#
#   ssh stms-data 'bash -s' < scripts/launch_checks.sh staging.ticqc.ae ~/tic/staging/basic-auth.txt
#   ssh stms-data 'bash -s' < scripts/launch_checks.sh ticqc.com
#
# The second argument is a basic-auth file (lines "user: …" and "password: …"); staging
# needs it, production does not. The hosted Observatory (developer.mozilla.org) cannot pass
# basic auth, so the scanner runs here (@mdn/mdn-http-observatory, the same grader); its
# scan() drops the request headers, a one-line patch passes them through.
# Output: one line per page, and the folder /tmp/launch-checks/out with the full reports.
set -euo pipefail
HOST="$1"
AUTH_FILE="${2:-}"
PAGES="/ /en/services/ /en/programs/iraq-certificate-of-conformity/ /en/verify/ /en/news/ /en/request/ /ar/"
W=/tmp/launch-checks
mkdir -p "$W" && rm -rf "$W/out" && mkdir "$W/out"
echo '{}' > "$W/hdr.json"
if [ -n "$AUTH_FILE" ]; then
  U=$(sed -n "s/^user: *//p" "$AUTH_FILE"); P=$(sed -n "s/^password: *//p" "$AUTH_FILE")
  printf '{"Authorization":"Basic %s"}' "$(printf '%s:%s' "$U" "$P" | base64 -w0)" > "$W/hdr.json"
fi
chmod 600 "$W/hdr.json"

cat > "$W/observatory.mjs" <<'EOF'
import { readFileSync } from "node:fs";
import { scan } from "@mdn/mdn-http-observatory";
const headers = Object.entries(JSON.parse(readFileSync("/w/hdr.json"))).map(([k, v]) => `${k}: ${v}`);
const r = await scan(process.argv[2], { headers });
console.log(`observatory ${process.argv[2]}: ${r.scan.grade} ${r.scan.score} (HTTP ${r.scan.statusCode}, ${r.scan.testsPassed} passed, ${r.scan.testsFailed} failed)`);
for (const [name, t] of Object.entries(r.tests)) if (!t.pass) console.log(`  failed: ${name} ${t.result}`);
EOF
docker run --rm -v "$W:/w" -w /w node:22-alpine sh -c '
  [ -d node_modules/@mdn/mdn-http-observatory ] || npm i -s --ignore-scripts @mdn/mdn-http-observatory@1.4.8 >/dev/null
  cd node_modules/@mdn/mdn-http-observatory
  [ -f conf/hsts-preload.json ] || { node src/retrieve-hsts.js; node src/retrieve-tld-list.js; } >/dev/null
  sed -i "s/await retrieve(hostname);/await retrieve(hostname, options);/" src/scanner/index.js
  cd /w && node observatory.mjs "$0"' "$HOST"

cat > "$W/lighthouse.sh" <<EOF
apk add --no-cache chromium >/dev/null 2>&1
npm i -g -s lighthouse@12.8.2 >/dev/null 2>&1
for p in $PAGES; do for i in 1 2 3; do
  lighthouse "https://$HOST\$p" --quiet --output=json --output-path="/w/out/\$(echo "\$p" | tr / _)\$i.json" \
    --extra-headers=/w/hdr.json --chrome-flags="--headless=new --no-sandbox" >/dev/null 2>&1 || echo "failed \$p \$i"
done; done
EOF
docker run --rm -e CHROME_PATH=/usr/bin/chromium -v "$W:/w" node:22-alpine sh /w/lighthouse.sh

docker run --rm -v "$W/out:/o" -w /o node:22-alpine node -e '
const fs = require("fs"); const pages = {};
for (const f of fs.readdirSync(".")) {
  const r = JSON.parse(fs.readFileSync(f)), a = r.audits, c = r.categories;
  (pages[f.replace(/\d\.json$/, "")] ||= []).push({
    perf: c.performance.score * 100, a11y: c.accessibility.score * 100,
    bp: c["best-practices"].score * 100, seo: c.seo.score * 100,
    lcp: (a["largest-contentful-paint"].numericValue / 1000).toFixed(2),
    tbt: Math.round(a["total-blocking-time"].numericValue),
    cls: a["cumulative-layout-shift"].numericValue.toFixed(3),
    kb: Math.round(a["total-byte-weight"].numericValue / 1024) });
}
for (const [page, runs] of Object.entries(pages)) {
  runs.sort((x, y) => x.perf - y.perf); const m = runs[Math.floor(runs.length / 2)];
  console.log(`lighthouse ${page.replace(/_/g, "/")}: perf ${m.perf} a11y ${m.a11y} bp ${m.bp} seo ${m.seo} LCP ${m.lcp}s TBT ${m.tbt}ms CLS ${m.cls} ${m.kb}KB`);
}'
