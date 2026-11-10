"""Build the self-hosted WOFF2 fonts in static/fonts/ (master plan 08, D7; brand book 12).

Downloads Saira, Open Sans and Cairo from the google/fonts repo at a pinned commit, pins
the width/slant axes of the variable fonts to their defaults (keeping the weight axis),
then subsets each family with fontTools into script files: Saira and Open Sans to Latin,
Cairo to Arabic plus Latin (Arabic pages set Latin words — "TIC", numbers — in Cairo
too). Exporter-facing pages never load Google Fonts (China rule, master plan 12).

    pip install fonttools brotli
    python scripts/build_fonts.py

Downloads are kept in .fontcache/ (gitignored). Output is deterministic for a given
commit and fontTools version. Licence: SIL Open Font License 1.1 for all three
(static/fonts/OFL.txt).
"""

import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".fontcache"
OUT = ROOT / "static" / "fonts"

# google/fonts main on 2026-10-16 (the same pin the Zeneonix site uses).
COMMIT = "47d54ca1ebb14fd864695f1d39dc734f39017c33"
RAW = f"https://raw.githubusercontent.com/google/fonts/{COMMIT}/ofl"

# family dir, file name, output stem, axes pinned to defaults, scripts kept
FAMILIES = [
    ("saira", "Saira[wdth,wght].ttf", "saira", {"wdth": 100}, ["latin"]),
    ("opensans", "OpenSans[wdth,wght].ttf", "open-sans", {"wdth": 100}, ["latin"]),
    ("cairo", "Cairo[slnt,wght].ttf", "cairo", {"slnt": 0}, ["arabic", "latin"]),
]

RANGES = {
    "arabic": "U+0600-06FF,U+0750-077F,U+200C-200F,U+FB50-FDFF,U+FE70-FEFF",
    "latin": (
        "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,"
        "U+0329,U+2000-200B,U+2010-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,"
        "U+FEFF,U+FFFD"
    ),
}

FEATURES = "kern,liga,calt,ccmp,locl,mark,mkmk,init,medi,fina,isol,rlig,tnum,lnum"


def fetch(family_dir: str, filename: str) -> Path:
    folder = CACHE / family_dir
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / filename
    if not target.exists():
        url = f"{RAW}/{family_dir}/{urllib.request.quote(filename)}"
        print(f"download {url}")
        with urllib.request.urlopen(url, timeout=60) as response:  # noqa: S310 - pinned commit
            target.write_bytes(response.read())
    return target


def pin_axes(source: Path, pins: dict[str, float]) -> Path:
    """The variable font with the given axes pinned; the weight axis stays variable."""
    target = source.with_name(source.stem.split("[")[0] + "-wght.ttf")
    if not target.exists():
        font = TTFont(source)
        instancer.instantiateVariableFont(font, pins, inplace=True)
        font.save(target)
    return target


def write_subset(source: Path, output: Path, unicodes: str) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.hinting = False
    options.layout_features = FEATURES.split(",")
    options.name_IDs = ["*"]
    options.notdef_outline = True
    font = subset.load_font(str(source), options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=subset.parse_unicodes(unicodes))
    subsetter.subset(font)
    subset.save_font(font, str(output), options)
    print(f"{output.relative_to(ROOT)}: {output.stat().st_size / 1024:.1f} KB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for family_dir, filename, stem, pins, scripts in FAMILIES:
        source = pin_axes(fetch(family_dir, filename), pins)
        for script in scripts:
            write_subset(source, OUT / f"{stem}-{script}.woff2", RANGES[script])
    licence = fetch("saira", "OFL.txt")
    (OUT / "OFL.txt").write_bytes(licence.read_bytes())


if __name__ == "__main__":
    main()
