"""Build ``seed/current-pages.json``: the current site's product pages as articles (T43, D82).

    python3 -I scripts/build_current_pages.py OLD_SITE_DIR seed/current-pages.json

The current site (ticqc.ae) has pages on the inspection and testing of one product group
(ceramic tiles, glassware, bed sheets, rice ...), and two more Iraq pages (the Gujarat
page and the Verification of Conformity page). The new site has no page type for them;
their text is real (Darya, Nov 22, 2026), so each one becomes an article of kind
"insight" under News and insights, word for word: its headings, paragraphs, lists and
questions. Cut: the page builder's title ("Elementor #2963"), the closing "Request ..."
block with the old web address, and the footer blocks (global presence, certifications).

Not moved: the "Paints & Coatings" page. On the current site its body is a second copy
of the sanitary ware text.

Reads OLD_SITE_DIR/pages/<slug>.txt (``fetch_old_pages.py``) and ``site.json`` (dates).
The file has the shape of ``seed/old-news.json``; ``import_old_news --source`` loads it.
Runs on stms-data (D24); stdlib only.
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

# current slug -> new slug
PAGES = {
    "bed-sheet-comforter-set-inspection-services": "bed-sheet-and-comforter-set-inspection",
    "ceramic-porcelain-tile-inspection-services": "ceramic-and-porcelain-tile-inspection",
    "cosmetics-personal-care-products-inspection-services": (
        "cosmetics-and-personal-care-products-inspection"
    ),
    "glassware-inspection-services": "glassware-inspection",
    "household-electrical-appliance-inspection-testing-services": (
        "household-electrical-appliance-inspection-and-testing"
    ),
    "natural-stone-marble-granite-inspection": "natural-stone-marble-and-granite-inspection",
    "noodles-inspection-services": "noodles-inspection-and-quality-control",
    "sanitary-ware-water-closet-inspection-services": "sanitary-ware-and-water-closet-inspection",
    "textile-fabric-inspection-services": "textile-and-fabric-inspection",
    "dairy-products-cheese-testing": "dairy-products-and-cheese-testing",
    "frozen-meat-products-testing-inspection": "frozen-meat-products-testing-and-inspection",
    "rice-testing-inspection": "rice-testing-and-inspection",
    "electrical-switches-sockets-breakers-testing": (
        "electrical-switches-sockets-and-circuit-breakers-testing"
    ),
    # Two Iraq pages whose text the one Iraq program page does not hold in full.
    "iraq-coc-gujarat": "iraq-coc-certification-services-in-gujarat",
    "iraq-verification-of-conformity-program": "iraq-verification-of-conformity-voc-program",
}
# A title the page writes in capital letters, in sentence case.
TITLES = {
    "iraq-verification-of-conformity-program": "Iraq Verification of Conformity (VoC) program",
}
# The page's own text ends where one of these headings starts.
END = re.compile(
    r"^@@H\d (request|contact|get in touch|global presence|our certifications|talk to)\b", re.I
)
JUNK_TITLE = re.compile(r"^(elementor\s*#\d+|)$", re.I)
OLD_NAME = re.compile(r"\bTIC\s?-?QC\b|\bTICQC\b")
HEAD = re.compile(r"^@@H(\d) ?(.*)$")
STRAY = '">'  # left by the page builder in some headings


def clean(text: str) -> str:
    text = text.replace("​", "").replace(STRAY, "").strip()
    text = OLD_NAME.sub("TIC Quality Control", re.sub(r"\s+", " ", text))
    return text.replace("Programme", "Program").replace("programme", "program")


def build(text: str) -> tuple[str, str, str]:
    """``(title, first paragraph, html)`` of one page text."""
    lines = text.split("\n")[3:]  # after "URL:", "TITLE:" and the empty line
    title = first = ""
    parts: list[str] = []
    rows: list[str] = []

    def flush() -> None:
        if rows:
            items = "".join(f"<li>{html.escape(row)}</li>" for row in rows)
            parts.append(f"<ul>{items}</ul>")
            rows.clear()

    for line in lines:
        if END.match(line):
            break
        head = HEAD.match(line)
        if head:
            flush()
            words = clean(head.group(2))
            if JUNK_TITLE.match(words):
                continue
            if not title:
                title = words
                continue
            if words.lower() == title.lower():
                continue
            level = 2 if head.group(1) in "12" else 3
            parts.append(f"<h{level}>{html.escape(words)}</h{level}>")
        elif line.startswith("- "):
            rows.append(clean(line[2:]))
        elif clean(line):
            flush()
            words = clean(line)
            if words.lower() == title.lower():
                continue
            first = first or words
            parts.append(f"<p>{html.escape(words)}</p>")
    flush()
    return title, first, "".join(parts)


def main(old_dir: Path, out: Path) -> None:
    site = json.loads((old_dir / "site.json").read_text(encoding="utf-8"))
    dates = {page["slug"]: page["date"][:10] for page in site["pages"]}
    posts = []
    for slug, new_slug in PAGES.items():
        text = (old_dir / "pages" / f"{slug}.txt").read_text(encoding="utf-8")
        text = text.split("@@H3 AdDresses")[0]
        title, first, body = build(text)
        posts.append(
            {
                "old_path": f"/{slug}/",
                "slug": new_slug,
                "title": TITLES.get(slug, title),
                "date": dates[slug],
                "kind": "insight",
                "excerpt": first,
                "html": body,
            }
        )
        print(f"{len(body):6} {new_slug}: {title}")
    data = {"source": "https://ticqc.ae (public pages, Nov 22, 2026)", "posts": posts}
    out.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(Path(sys.argv[1]), Path(sys.argv[2]))
