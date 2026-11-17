"""Exporter-facing pages must load from mainland China (master plan 12; proposal 03 §10):
no Google Fonts, Tag Manager, Analytics, Maps, reCAPTCHA, YouTube embeds or LinkedIn
widgets; fonts and scripts self-hosted."""

import re
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parent.parent

FORBIDDEN_HOSTS = (
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "googletagmanager.com",
    "google-analytics.com",
    "maps.googleapis.com",
    "google.com/recaptcha",
    "youtube.com/embed",
    "platform.linkedin.com",
    "challenges.cloudflare.com",
)

pytestmark = pytest.mark.django_db


@pytest.mark.parametrize(
    "path",
    [
        "/en/",
        "/ar/",
        "/en/nothing-here/",
        "/en/services/",
        "/en/services/inspection/",
        "/en/services/inspection/pre-shipment-inspection/",
    ],
)
def test_public_pages_load_nothing_from_blocked_hosts(client, seeded_home, path):
    html = client.get(path).content.decode()

    for host in FORBIDDEN_HOSTS:
        assert host not in html, host


def test_fonts_are_self_hosted_and_split_by_script(client):
    html = client.get("/en/").content.decode()
    assert 'href="/static/css/fonts.css"' in html
    assert "/static/fonts/saira-latin.woff2" in html

    css = (REPO_ROOT / "static" / "css" / "fonts.css").read_text(encoding="utf-8")
    for face in ("saira-latin", "open-sans-latin", "cairo-arabic", "cairo-latin"):
        assert f"../fonts/{face}.woff2" in css
    assert "googleapis" not in css


def test_arabic_pages_preload_cairo_not_saira(client):
    html = client.get("/ar/").content.decode()

    assert "cairo-arabic.woff2" in html
    assert "saira-latin.woff2" not in html.split("<body")[0]


def test_the_spam_check_is_hcaptcha_and_the_csp_allows_only_hcaptcha():
    """D33: Turnstile is not reachable from mainland China; hCaptcha is."""
    from django.conf import settings

    contact = settings.ZENEON_CMS["contact"]
    assert contact["spam_provider"] == "hcaptcha"
    caddy = (REPO_ROOT / "deploy" / "staging" / "Caddyfile").read_text(encoding="utf-8")
    assert "challenges.cloudflare.com" not in caddy
    assert "https://*.hcaptcha.com" in caddy


def test_templates_have_no_inline_styles():
    """D34: the CSP is `style-src 'self'`, so the browser ignores style="..."; layout
    lives in static/css/site.css. The one exception is the email HTML (D41): mail apps
    drop <style> and classes, and no CSP applies there."""
    emails = REPO_ROOT / "templates" / "zeneon" / "requests" / "alerts"
    found = [
        str(path.relative_to(REPO_ROOT))
        for path in (REPO_ROOT / "templates").rglob("*.html")
        if emails not in path.parents and 'style="' in path.read_text(encoding="utf-8")
    ]
    assert found == []


# The CSP (Caddy, master plan 12) allows scripts and styles from 'self' and hCaptcha
# only: no 'unsafe-inline'. An inline script or style is blocked in the browser (T32:
# the language select did nothing on staging), so no page may carry one.
INLINE_SCRIPT = re.compile(r"<script(?![^>]*\bsrc=)(?![^>]*application/(?:ld\+)?json)[^>]*>")
INLINE_STYLE = re.compile(r"<style[\s>]|\sstyle=\"")


@pytest.mark.parametrize(
    "path",
    ["/en/", "/ar/", "/en/nothing-here/", "/en/services/", "/en/request/", "/en/search/?q=iraq"],
)
def test_public_pages_have_no_inline_script_or_style(client, seeded_home, path):
    html = client.get(path).content.decode()

    assert not INLINE_SCRIPT.findall(html)
    assert not INLINE_STYLE.findall(html)
    assert "/static/js/lang.js" in html


def test_every_seeded_page_has_a_description(seeded_home):
    """Lighthouse SEO on staging (T32): 28 pages had no meta description. Every page
    type now falls back to its own lead text (``apps.pages.describe``)."""
    from zeneon_cms.seo.meta import pages_without_description

    assert [page.url_path for page in pages_without_description()] == []


def test_the_request_page_has_a_description(client, seeded_home):
    html = client.get("/en/request/").content.decode()

    assert re.search(r'<meta name="description" content="[^"]+"', html)


def test_cloudflare_leaves_the_email_addresses_alone(client, seeded_home):
    """Cloudflare's email obfuscation needs a script the CSP blocks: visitors saw
    "[email protected]" on every office page (T33). The page opts out."""
    html = client.get("/en/contact/").content.decode()

    assert html.index("<!--email_off-->") < html.index("mailto:") < html.index("<!--/email_off-->")


# The house words (CLAUDE.md; launch checklist): "TIC Quality Control", then "TIC";
# never "TICQC". "Program", not "programme". "Kurdistan Region of Iraq".
HOUSE_WORD_SLIPS = re.compile(r"TICQC|[Pp]rogramme|Kurdistan(?! Region)")


def test_templates_and_seed_keep_the_house_words():
    files = [*(REPO_ROOT / "templates").rglob("*.html"), *(REPO_ROOT / "seed").glob("*.yaml")]
    slips = [
        f"{path.relative_to(REPO_ROOT)}: {match.group(0)}"
        for path in files
        for match in HOUSE_WORD_SLIPS.finditer(path.read_text(encoding="utf-8"))
    ]

    assert slips == []
