"""Build ``seed/old-news.json`` from the old site's posts (T30, D62).

    python3 -I scripts/build_old_news.py OLD_SITE_DIR seed/old-news.json

OLD_SITE_DIR holds ``site.json`` (``fetch_old_site.py``) and ``media.csv`` with the
files (``fetch_old_media.py``). Each post gets its old path, a clean title and slug,
its date, excerpt and HTML, and its main photo's file (relative to OLD_SITE_DIR) and alt
text. The posts the seed already has (T18) keep their slugs and are marked ``seeded``.
Runs on stms-data (D24); stdlib only.
"""

from __future__ import annotations

import csv
import importlib.util
import json
import re
import sys
import unicodedata
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("oldsite", HERE.parent / "apps/news/oldsite.py")
oldsite = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oldsite)

# old path -> the news page the seed already has (T18, D44)
SEEDED = {
    "/voc-for-goods-shipped-to-iraq/": "iraq-voc-appointment-announced",
    "/iraqi-quality-mark/": "iraqi-quality-mark",
}
LOX = "/lox-and-tic-quality-control-win-major"


def slugify(title: str) -> str:
    text = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:80].rsplit("-", 1)[0] if len(text) > 80 else text


def main() -> int:
    old_site, target = Path(sys.argv[1]), Path(sys.argv[2])
    site = json.loads((old_site / "site.json").read_text(encoding="utf-8"))
    with (old_site / "media.csv").open(encoding="utf-8", newline="") as handle:
        media = {row["source_url"]: row for row in csv.DictReader(handle)}
    rows, seen = [], set()
    for post in site["posts"]:
        path = oldsite.old_path(post["link"])
        title = oldsite.clean_title(post["title"])
        seeded = path in SEEDED or path.startswith(LOX)
        slug = SEEDED.get(path) or ("iraq-coc-contract-announced" if seeded else slugify(title))
        if slug in seen:
            raise SystemExit(f"two posts make the slug {slug}")
        seen.add(slug)
        photo = media.get(post.get("image") or "", {})
        rows.append(
            {
                "old_path": path,
                "slug": slug,
                "seeded": seeded,
                "title": title,
                "date": post["date"][:10],
                "excerpt": post["excerpt"],
                "html": post["html"],
                "image_file": photo.get("file", ""),
                "image_alt": oldsite.clean_title(photo.get("alt", "")),
            }
        )
    data = {"source": f"{site['site']} (WordPress REST API)", "posts": rows}
    target.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(rows)} posts, {sum(1 for r in rows if r['image_file'])} with a photo")
    return 0


if __name__ == "__main__":
    sys.exit(main())
