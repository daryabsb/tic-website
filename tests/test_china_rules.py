"""Exporter-facing pages must load from mainland China (master plan 12; proposal 03 §10):
no Google Fonts, Tag Manager, Analytics, Maps, reCAPTCHA, YouTube embeds or LinkedIn
widgets; fonts and scripts self-hosted."""

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
