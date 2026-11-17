"""Read the old site's public pages, posts, categories and tags (T30) for the redirect map
and the news import.

    python3 -I scripts/fetch_old_site.py OUT_DIR [--site https://ticqc.ae]

Reads the WordPress REST API (public, no login) and writes:

- OUT_DIR/site.json: pages, posts (with their HTML, date, author name, featured image
  URL, categories, tags), categories and tags;
- OUT_DIR/old-urls.txt: every public address, one per line (the list lychee checks).

Runs on stms-data (D24), not on Darya's PC. The old site's media files are fetched by
``fetch_old_media.py`` (D32).
"""

from __future__ import annotations

import argparse
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

AGENT = "tic-website-migration/1.0"


def get(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:  # noqa: S310 (https only)
        return json.load(response), dict(response.headers)


def every(site: str, base: str, fields: str) -> list[dict]:
    rows, page = [], 1
    while True:
        query = urllib.parse.urlencode({"per_page": 100, "page": page, "_fields": fields})
        batch, headers = get(f"{site}/wp-json/wp/v2/{base}?{query}")
        rows += batch
        if page >= int(headers.get("X-WP-TotalPages", "1")):
            return rows
        page += 1


def rendered(value) -> str:
    return value.get("rendered", "") if isinstance(value, dict) else (value or "")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("out_dir", type=Path)
    parser.add_argument("--site", default="https://ticqc.ae")
    args = parser.parse_args()
    site = args.site.rstrip("/")
    args.out_dir.mkdir(parents=True, exist_ok=True)

    pages = every(site, "pages", "id,link,slug,parent,title,date,modified")
    posts = every(
        site,
        "posts",
        "id,link,slug,title,date,modified,content,excerpt,author,featured_media,categories,tags",
    )
    categories = every(site, "categories", "id,link,slug,name,count")
    tags = every(site, "tags", "id,link,slug,name,count")

    authors: dict[int, str] = {}
    images: dict[int, str] = {}
    for post in posts:
        author = post.get("author")
        if author and author not in authors:
            try:
                user, _ = get(f"{site}/wp-json/wp/v2/users/{author}?_fields=name")
                authors[author] = user["name"]
            except Exception:  # noqa: BLE001 (users may be hidden; the name stays empty)
                authors[author] = ""
        media = post.get("featured_media")
        if media and media not in images:
            try:
                images[media] = get(f"{site}/wp-json/wp/v2/media/{media}?_fields=source_url")[0][
                    "source_url"
                ]
            except Exception:  # noqa: BLE001
                images[media] = ""

    data = {
        "site": site,
        "pages": [
            {**p, "title": rendered(p["title"])} for p in sorted(pages, key=lambda p: p["link"])
        ],
        "posts": [
            {
                "id": p["id"],
                "link": p["link"],
                "slug": p["slug"],
                "title": rendered(p["title"]),
                "date": p["date"],
                "modified": p["modified"],
                "html": rendered(p["content"]),
                "excerpt": rendered(p["excerpt"]),
                "author": authors.get(p.get("author"), ""),
                "image": images.get(p.get("featured_media"), ""),
                "categories": p["categories"],
                "tags": p["tags"],
            }
            for p in sorted(posts, key=lambda p: p["date"])
        ],
        "categories": categories,
        "tags": tags,
    }
    (args.out_dir / "site.json").write_text(json.dumps(data, ensure_ascii=False, indent=1))
    links = sorted(
        {row["link"] for group in ("pages", "posts", "categories", "tags") for row in data[group]}
    )
    (args.out_dir / "old-urls.txt").write_text("\n".join([f"{site}/", *links]) + "\n")
    print(f"{len(pages)} pages, {len(posts)} posts, {len(categories)} categories, {len(tags)} tags")
    print(f"{len(links) + 1} addresses in {args.out_dir / 'old-urls.txt'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
