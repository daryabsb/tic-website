"""Fetch the rendered HTML of the current site's public pages (T43, D82).

    python3 -I scripts/fetch_old_pages.py OLD_SITE_DIR

OLD_SITE_DIR holds ``site.json`` (``fetch_old_site.py``): its page list has no text (the
pages are built with a page builder, and the REST API gives no content for them). This
script reads each page's public address and writes, in OLD_SITE_DIR/pages:

- ``<slug>.html``: the page as served;
- ``<slug>.txt``: its text, one line per block. ``@@H1`` to ``@@H6`` mark headings,
  ``- `` marks a list row. Scripts, styles, the header, the footer and the menus are cut.

Runs on stms-data (D24); stdlib only; read only on ticqc.ae (public pages, 0.5 s apart).
"""

from __future__ import annotations

import html
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

AGENT = "tic-website-migration/1.0"
CUT = re.compile(r"<(script|style|noscript|svg|header|footer|nav)\b.*?</\1>", re.S | re.I)
HEADING = re.compile(r"<(h[1-6])\b[^>]*>(.*?)</\1>", re.S | re.I)
TAG = re.compile(r"<[^>]+>")


def get(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:  # noqa: S310 (https only)
        return response.read().decode("utf-8", "replace")


def main_text(page: str) -> str:
    body = CUT.sub(" ", page)
    body = HEADING.sub(lambda m: f"\n\n@@{m.group(1).upper()} {TAG.sub(' ', m.group(2))}\n", body)
    body = re.sub(r"<li\b[^>]*>", "\n- ", body, flags=re.I)
    body = re.sub(r"</(p|div|li|tr|ul|ol|section)>|<br\s*/?>", "\n", body, flags=re.I)
    body = html.unescape(TAG.sub(" ", body))
    lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in body.split("\n")]
    kept: list[str] = []
    for line in lines:
        if line and (not kept or line != kept[-1]):
            kept.append(line)
    return "\n".join(kept)


def main(out_dir: Path) -> None:
    site = json.loads((out_dir / "site.json").read_text(encoding="utf-8"))
    pages = out_dir / "pages"
    pages.mkdir(exist_ok=True)
    for page in site["pages"]:
        slug = page["slug"] or "home"
        try:
            served = get(page["link"])
        except OSError as error:
            print(slug, "ERROR", str(error)[:60])
            continue
        (pages / f"{slug}.html").write_text(served, encoding="utf-8")
        text = main_text(served)
        head = f"URL: {page['link']}\nTITLE: {html.unescape(page['title'])}\n\n"
        (pages / f"{slug}.txt").write_text(head + text + "\n", encoding="utf-8")
        print(slug, len(text))
        time.sleep(0.5)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
