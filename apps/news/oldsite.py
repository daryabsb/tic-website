"""The old site's posts as news pages (master plan 10, "Content migration"; T30, D62).

Pure functions, no Django models: ``import_old_news`` uses them, the tests call them.

- ``clean_title``: math-bold letters (𝐂𝐄𝐎) to plain ones, emoji and flags dropped,
  HTML entities decoded.
- ``clean_html``: WordPress block HTML to the news body's features (h2, h3, bold,
  italic, link, ul, ol): h1 and h2 become h2, h3 to h6 become h3, a table row becomes
  one paragraph ("cell · cell"), images, figures, rules, scripts and styles are
  dropped, every other tag is unwrapped. A link to the old site becomes its path, so
  the redirect map takes the reader to the new page.
- ``standfirst``: the first sentence of the first paragraph (else of the excerpt),
  at most ``limit`` characters.

The house words apply to the text (never to a link): "TICQC" becomes "TIC Quality
Control", "programme" becomes "program" (CLAUDE.md).
"""

from __future__ import annotations

import html
import re
import unicodedata
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

OLD_HOSTS = {"ticqc.ae", "www.ticqc.ae", "ticqc.com", "www.ticqc.com"}
BLOCK = {"p": "p", "li": "li", "ul": "ul", "ol": "ol", "h1": "h2", "h2": "h2"}
BLOCK.update({f"h{n}": "h3" for n in range(3, 7)})
INLINE = {"strong": "b", "b": "b", "em": "i", "i": "i"}
DROP = {"img", "figure", "figcaption", "script", "style", "hr", "iframe", "svg", "noscript"}
HEADINGS = {"h2", "h3"}
HOUSE_WORDS = (
    (re.compile(r"\bTICQC\b", re.IGNORECASE), "TIC Quality Control"),
    (re.compile(r"\bProgramme"), "Program"),
    (re.compile(r"\bprogramme"), "program"),
)


def house_words(text: str) -> str:
    for pattern, word in HOUSE_WORDS:
        text = pattern.sub(word, text)
    return text


def clean_title(raw: str) -> str:
    text = unicodedata.normalize("NFKC", html.unescape(raw))
    text = "".join(
        ch
        for ch in text
        if unicodedata.category(ch) not in {"So", "Sk", "Cs", "Co"}
        and not 0x1F1E6 <= ord(ch) <= 0x1F1FF
    )
    return house_words(re.sub(r"\s+", " ", text.replace(chr(0xFE0F), "")).strip())


def old_path(link: str) -> str:
    """The decoded path of an old address: ``/news/``, ``/é/``."""
    return unquote(urlsplit(link).path) or "/"


def _href(value: str) -> str:
    parts = urlsplit(value)
    if parts.netloc.lower() in OLD_HOSTS:
        return old_path(value)
    return value


class _Cleaner(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self.stack: list[str] = []  # open output tags
        self.skip = 0  # depth inside a dropped element
        self.cells: list[str] | None = None  # cells of the table row being read
        self.cell: list[str] | None = None

    # -- output helpers ---------------------------------------------------------------

    def _emit(self, text: str) -> None:
        if self.cell is not None:
            self.cell.append(text)
        else:
            self.out.append(text)

    def _in_heading(self) -> bool:
        return any(tag in HEADINGS for tag in self.stack)

    # -- parser events ----------------------------------------------------------------

    def handle_starttag(self, tag, attrs):
        if self.skip:
            if tag in DROP:
                self.skip += 1
            return
        if tag in DROP:
            self.skip = 1 if tag not in {"img", "hr"} else 0
            return
        if tag == "tr":
            self.cells = []
            return
        if tag in {"td", "th"} and self.cells is not None:
            self.cell = []
            return
        if self.cell is not None:
            return  # inside a table cell only the text is kept
        if tag == "br":
            self._emit(" ")
            return
        if tag in BLOCK:
            out = BLOCK[tag]
            self.stack.append(out)
            self._emit(f"<{out}>")
        elif tag in INLINE and not self._in_heading():
            out = INLINE[tag]
            self.stack.append(out)
            self._emit(f"<{out}>")
        elif tag == "a":
            href = dict(attrs).get("href") or ""
            if href.startswith(("http://", "https://", "/", "mailto:")):
                self.stack.append("a")
                self._emit(f'<a href="{html.escape(_href(href), quote=True)}">')

    def handle_endtag(self, tag):
        if self.skip:
            if tag in DROP:
                self.skip -= 1
            return
        if tag in {"td", "th"} and self.cell is not None:
            self.cells.append(re.sub(r"\s+", " ", "".join(self.cell)).strip())
            self.cell = None
            return
        if tag == "tr" and self.cells is not None:
            cells = [cell for cell in self.cells if cell]
            if cells:
                self.out.append("<p>" + " · ".join(cells) + "</p>")
            self.cells = None
            return
        if self.cell is not None:
            return
        out = BLOCK.get(tag) or (INLINE.get(tag) if not self._in_heading() else None)
        if tag == "a":
            out = "a"
        if out and out in self.stack:
            while self.stack:
                last = self.stack.pop()
                self._emit(f"</{last}>")
                if last == out:
                    break

    def handle_data(self, data):
        if self.skip:
            return
        self._emit(html.escape(house_words(data), quote=False))

    def result(self) -> str:
        while self.stack:
            self.out.append(f"</{self.stack.pop()}>")
        text = "".join(self.out)
        text = re.sub(r"\s+", " ", text)
        text = re.sub(r"<(\w+)>\s*</\1>", "", text)  # empty blocks
        text = re.sub(r"<(b|i)>\s*</\1>", "", text)
        text = re.sub(r"\s*(</?(?:p|h2|h3|ul|ol|li)>)\s*", r"\1", text)
        return text.strip()


def clean_html(raw: str) -> str:
    cleaner = _Cleaner()
    cleaner.feed(raw)
    cleaner.close()
    return cleaner.result()


def plain(raw: str) -> str:
    text = re.sub(r"<[^>]+>", " ", raw)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def first_paragraph(clean: str) -> str:
    """The first paragraph of cleaned HTML (``clean_html``), as plain text."""
    found = re.search(r"<p>(.*?)</p>", clean)
    return plain(found.group(1)) if found else ""


def standfirst(excerpt: str, limit: int, clean: str = "") -> str:
    """The first sentence of the text's first paragraph (``clean``), else of the excerpt
    (WordPress joins a heading to the next paragraph in the excerpt, without a gap)."""
    text = first_paragraph(clean) if clean else ""
    text = text or plain(excerpt).replace("[…]", "").replace("[&hellip;]", "").strip()
    sentence = re.split(r"(?<=[.!?])\s", text, maxsplit=1)[0]
    if len(sentence) > limit:
        sentence = sentence[: limit - 1].rsplit(" ", 1)[0] + "…"
    return sentence
