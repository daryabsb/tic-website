from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import include, path
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from apps.pages.search import search
from apps.verify.views import qr_link

urlpatterns = [
    # / (301 -> /en/) and /healthz/ from the CMS core (zeneon_cms.core)
    path("", include("zeneon_cms.core.urls")),
    # /sitemap.xml and /robots.txt from the core's seo app
    path("", include("zeneon_cms.seo.urls")),
    # Signed attachment links for staff (zeneon_cms.requests)
    path("requests/", include("zeneon_cms.requests.urls")),
    # /r/<code>/ referral links
    path("r/", include("zeneon_cms.requests.referral_urls")),
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    # /verify/?n=&t=: the QR link printed on a certificate (#19, master plan 06)
    path("verify/", qr_link, name="verify_qr"),
]

if settings.DEBUG:
    from django.conf.urls.static import static

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Every public page lives under its language prefix: /en/, /ar/ (master plan 08).
urlpatterns += i18n_patterns(
    # /<lang>/request/: the quote form (master plan 07, #17)
    path("request/", include("zeneon_cms.requests.form_urls")),
    # /<lang>/search/: pages, documents, questions (T12, D31)
    path("search/", search, name="search"),
    # /<lang>/verify/: the certificate check is a VerifyPage (#19, apps.verify)
    path("", include(wagtail_urls)),
    prefix_default_language=True,
)

# Branded 404 in the language of the path, static 500 without database access.
handler404 = "zeneon_cms.core.views.page_not_found"
handler500 = "zeneon_cms.core.views.server_error"
