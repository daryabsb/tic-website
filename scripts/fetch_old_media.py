"""Download the old site's public Media Library (D32) for reuse on the new site.

    python3 -I scripts/fetch_old_media.py OUT_DIR [--site https://ticqc.ae]

Reads the WordPress REST API (public, no login): every attachment's original file goes
to OUT_DIR/files/<yyyy>/<mm>/<name>, and OUT_DIR/media.csv lists id, file, type, bytes,
width, height, date, title, alt, caption, the page it is attached to and the source URL.
A second run skips files already there. Runs on stms-data (D24), not on Darya's PC.
"""

from __future__ import annotations

import argparse
import csv
import html
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

AGENT = "tic-website-migration/1.0"
FIELDS = "id,date,mime_type,source_url,title,alt_text,caption,post,media_details"


def get(url: str) -> tuple[bytes, dict]:
    request = urllib.request.Request(url, headers={"User-Agent": AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:  # noqa: S310 (https only)
        return response.read(), dict(response.headers)


def text(value) -> str:
    raw = value.get("rendered", "") if isinstance(value, dict) else (value or "")
    return html.unescape(re.sub(r"<[^>]+>", "", raw)).strip()


def media(site: str):
    page = 1
    while True:
        url = f"{site}/wp-json/wp/v2/media?per_page=100&page={page}&_fields={FIELDS}"
        try:
            body, headers = get(url)
        except urllib.error.HTTPError as error:
            if error.code == 400:  # past the last page
                return
            raise
        yield from json.loads(body)
        if page >= int(headers.get("X-WP-TotalPages", page)):
            return
        page += 1


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("out")
    parser.add_argument("--site", default="https://ticqc.ae")
    args = parser.parse_args()
    out = Path(args.out)
    (out / "files").mkdir(parents=True, exist_ok=True)

    rows, failed = [], 0
    for item in media(args.site):
        source = item["source_url"]
        if not source.startswith(args.site + "/wp-content/uploads/"):
            print(f"skip {item['id']}: not on this site: {source}", file=sys.stderr)
            continue
        relative = urllib.parse.unquote(source.split("/wp-content/uploads/", 1)[1])
        if ".." in Path(relative).parts:
            print(f"skip {item['id']}: bad path", file=sys.stderr)
            continue
        target = out / "files" / relative
        if not target.exists():
            try:
                body, _headers = get(source)
            except (urllib.error.URLError, TimeoutError) as error:
                print(f"fail {item['id']} {source}: {error}", file=sys.stderr)
                failed += 1
                continue
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(body)
            time.sleep(0.2)  # gentle on the old server
        details = item.get("media_details") or {}
        rows.append(
            {
                "id": item["id"],
                "file": f"files/{relative}",
                "type": item["mime_type"],
                "bytes": target.stat().st_size,
                "width": details.get("width", ""),
                "height": details.get("height", ""),
                "date": item["date"][:10],
                "title": text(item.get("title")),
                "alt": item.get("alt_text", ""),
                "caption": text(item.get("caption")),
                "attached_to": item.get("post") or "",
                "source_url": source,
            }
        )
    with (out / "media.csv").open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]) if rows else ["id"])
        writer.writeheader()
        writer.writerows(rows)
    print(f"{len(rows)} files listed in {out / 'media.csv'}, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
