"""Screenshots for the editor guide (T27), taken from the staging admin.

Runs in the Playwright image on stms-data with the guide logins of
``~/tic/staging/guide-users.txt`` (one ``guide.<role> <password>`` per line; D58).
From ``~/tic/staging``:

    docker run --rm --network host -v "$PWD/src/scripts:/s:ro" -v "$PWD/shots:/out" \
      -v "$PWD/guide-users.txt:/users.txt:ro" mcr.microsoft.com/playwright/python:v1.49.1-noble \
      sh -c "pip -q install playwright==1.49.1 && python /s/guide_shots.py <scene> [...]"

Scenes: ``editor``, ``news`` (makes a test news page and submits it), ``reviewer``,
``requests`` (``guide.admin``; names, emails and phones are masked in the picture).
After ``reviewer``, delete the page "Guide test: Baghdad office news" in the shell. The
pictures are JPEG, 1280 × 800, named as ``docs/editor-guide.md`` uses them; copy them to
``docs/editor-guide/``.
"""

from __future__ import annotations

import sys

from playwright.sync_api import Page, sync_playwright

BASE = "https://staging.ticqc.ae"
OFFICES, BAGHDAD, PROGRAM, NEWS = 52, 55, 45, 46
TEST_TITLE = "Guide test: Baghdad office news"
SCROLL = "el => el.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'instant'})"


def password(role: str) -> str:
    with open("/users.txt") as users:
        rows = dict(line.split() for line in users if line.strip())
    return rows[f"guide.{role}"]


def shot(page: Page, name: str) -> None:
    page.wait_for_timeout(400)
    page.screenshot(path=f"/out/{name}.jpg", type="jpeg", quality=80)
    print("shot", name)


def go(page: Page, path: str) -> None:
    page.goto(f"{BASE}{path}")
    page.wait_for_load_state("networkidle")


def show(page: Page, text: str = "", css: str = "") -> None:
    """Scroll the form's first element with this exact text (or this CSS selector) near
    the top of the window. The minimap on the right repeats the headings; never it."""
    found = page.locator(css) if css else page.locator("form").get_by_text(text, exact=True)
    found.first.evaluate(SCROLL)
    page.evaluate("""() => document.querySelectorAll('*').forEach(el => {
        if (el.scrollLeft) el.scrollLeft = 0;
    })""")
    page.evaluate("window.scrollBy({top: -110, behavior: 'instant'})")


def open_actions(page: Page) -> None:
    page.locator("footer [data-w-dropdown-target='toggle']").first.click()


def login(page: Page, role: str, picture: str = "") -> None:
    go(page, "/admin/login/")
    page.fill("input[name=username]", f"guide.{role}")
    page.fill("input[name=password]", password(role))
    if picture:
        shot(page, picture)
    page.click("button[type=submit]")
    page.wait_for_load_state("networkidle")


def editor(page: Page) -> None:
    login(page, "editor", "01-login")
    shot(page, "02-dashboard")
    go(page, f"/admin/pages/{OFFICES}/")
    shot(page, "03-offices")
    go(page, f"/admin/pages/{BAGHDAD}/edit/")
    shot(page, "04-office-edit")
    show(page, "Reach the office")
    shot(page, "05-office-reach")
    open_actions(page)
    shot(page, "06-office-actions")
    go(page, f"/admin/pages/{PROGRAM}/edit/")
    show(page, "product table")
    shot(page, "12-program-products")
    show(page, css="[id$=product_list_date]")
    shot(page, "13-program-date")
    show(page, css="#id_owning_office_name")
    shot(page, "14-program-review")
    go(page, "/admin/reports/past-review/")
    shot(page, "15-past-review")


def news(page: Page) -> None:
    login(page, "editor")
    go(page, f"/admin/pages/{NEWS}/add_subpage/")
    if "add/news/newspage" not in page.url:
        page.get_by_role("link", name="News page").first.click()
        page.wait_for_load_state("networkidle")
    page.fill("#id_title", TEST_TITLE)
    page.fill("#id_date", "2026-11-17")
    page.locator("#id_title").click()
    shot(page, "07-news-new")
    page.locator("[data-contentpath='office']").get_by_role("button").first.click()
    modal = page.locator(".modal")
    modal.locator("input[name=q]").fill("Baghdad")
    page.wait_for_timeout(1500)
    shot(page, "08-news-office-choose")
    modal.get_by_role("link", name="Baghdad office").first.click()
    page.wait_for_timeout(800)
    page.fill("#id_standfirst", "One sentence: what changed and from when.")
    show(page, "Office")
    shot(page, "09-news-office")
    page.locator(".DraftEditor-root").first.click()
    page.keyboard.type("The text of the news item. Short paragraphs, one idea each.")
    show(page, "Text")
    shot(page, "10-news-text")
    open_actions(page)
    shot(page, "11-news-submit")
    page.locator("button[name=action-submit]").click()
    page.wait_for_load_state("networkidle")
    print("after submit:", page.url)


def reviewer(page: Page) -> None:
    login(page, "reviewer")
    shot(page, "16-reviewer-dashboard")
    page.get_by_role("link", name=TEST_TITLE).first.click()
    page.wait_for_load_state("networkidle")
    open_actions(page)
    shot(page, "17-reviewer-approve")


MASK = """names => {
    // Personal data never goes into a picture: names, emails and phone numbers become
    // sample text in the browser before the screenshot (the database is not touched).
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode()); ) {
        let text = node.nodeValue;
        for (const name of names) text = text.split(name).join("Sample Customer");
        text = text.replace(/[\\w.+-]+@[\\w-]+\\.[\\w.]+/g, "customer@example.com");
        text = text.replace(/\\+?\\d[\\d ]{8,}\\d/g, "+000 000 000 000");
        node.nodeValue = text;
    }
}"""


def requests(page: Page) -> None:
    login(page, "admin")
    go(page, "/admin/requests/")
    page.locator("a[href*='/admin/requests/inspect/']").first.click()
    page.wait_for_load_state("networkidle")
    label = page.get_by_text("Name", exact=True).first
    name = label.locator("xpath=following-sibling::*[1]").inner_text().strip()
    names = [name] if len(name) >= 3 else []
    page.evaluate(MASK, names)
    shot(page, "19-request-open")
    go(page, "/admin/requests/")
    page.evaluate(MASK, names)
    shot(page, "18-requests")


def refused(page: Page) -> None:
    """Submit the Iraq program with its missing facts: the form refuses and saves
    nothing, so the picture shows the publish messages (T35)."""
    login(page, "editor")
    go(page, f"/admin/pages/{PROGRAM}/edit/")
    open_actions(page)
    page.locator("button[name=action-submit]").click()
    page.wait_for_load_state("domcontentloaded")
    # The refused form is "dirty", and Wagtail's autosave would store it as a draft
    # revision of the real page: no POST leaves this browser after the refusal.
    page.route(
        "**/*",
        lambda route: route.abort() if route.request.method == "POST" else route.continue_(),
    )
    page.wait_for_load_state("networkidle")
    shot(page, "a01-refused-top")


def manager(page: Page) -> None:
    login(page, "manager")
    go(page, "/admin/images/")
    shot(page, "a03-images")
    go(page, "/admin/images/multiple/add/")
    shot(page, "a04-image-add")
    go(page, "/admin/documents/")
    shot(page, "a05-documents")
    go(page, f"/admin/pages/{PROGRAM}/history/")
    shot(page, "a06-history")
    go(page, f"/admin/pages/{PROGRAM}/edit/")
    page.locator("header [data-w-dropdown-target='toggle']").first.click()
    shot(page, "a07-page-menu")


def admin(page: Page) -> None:
    login(page, "admin")
    go(page, "/admin/snippets/zeneon_requests/routingrule/")
    shot(page, "a08-routing")
    first = page.locator("a[href*='/routingrule/edit/']").first
    if first.count():
        first.click()
        page.wait_for_load_state("networkidle")
        shot(page, "a09-routing-rule")
    go(page, "/admin/users/")
    page.evaluate(MASK, [])
    shot(page, "a10-users")
    go(page, "/admin/groups/")
    shot(page, "a11-groups")
    go(page, "/admin/translations/")
    shot(page, "a12-translations")


SCENES = {
    "editor": editor,
    "news": news,
    "reviewer": reviewer,
    "requests": requests,
    "refused": refused,
    "manager": manager,
    "admin": admin,
}


def main(*scenes: str) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for scene in scenes:
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            SCENES[scene](page)
            page.close()
        browser.close()


if __name__ == "__main__":
    main(*sys.argv[1:])
