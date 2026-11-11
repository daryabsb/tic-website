# Production image (master plan 13), same build as MLP. Build from the repo root:
#
#   docker build --ssh default -f deploy/Dockerfile -t tic-website .
#
# --ssh default forwards your SSH agent, which must hold a key that can read the
# private repo daryabsb/zeneon-cms. Or pass a GitHub
# token with read access to it, as the build secret "gh_token" (CI does this with the
# ZENEON_REPOS_TOKEN secret, #30):
#
#   GH_TOKEN=$(gh auth token) docker build --secret id=gh_token,env=GH_TOKEN \
#     -f deploy/Dockerfile -t tic-website .
#
# Stage 1 installs the locked requirements into a venv, compiles translations and
# collects static files. Stage 2 is the same slim base with the venv and code only:
# no compiler, no gettext, runs as the non-root user "app".

# python:3.12-slim-bookworm, same digest as MLP (the locks were compiled in it)
ARG PYTHON_IMAGE=python:3.12-slim-bookworm@sha256:34386ef0cb081344d7ec1c103ba398e6e9f64e9ab3a1509accc92a4e24a07258

FROM ${PYTHON_IMAGE} AS builder

ENV PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH=/opt/venv/bin:$PATH

# gettext: msgfmt for compilemessages. git + openssh-client: fetch the private repo
# (zeneon-cms) pinned in the lock. Build stage only.
RUN apt-get update \
    && apt-get install -y --no-install-recommends gettext git openssh-client \
    && rm -rf /var/lib/apt/lists/*

# GitHub's published ed25519 host key (https://api.github.com/meta), so the SSH
# fetch of zeneon-cms is verified.
RUN install -d -m 700 /root/.ssh \
    && echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl" \
        > /root/.ssh/known_hosts

RUN python -m venv /opt/venv
COPY requirements/prod.txt /tmp/prod.txt
# --no-deps: the lock is complete; pip check proves it. An SSH key comes from the
# build's SSH agent (optional) and the token through GIT_CONFIG_* variables of this one
# RUN; neither is ever written to a layer.
RUN --mount=type=ssh --mount=type=secret,id=gh_token,required=false \
    if [ -s /run/secrets/gh_token ]; then \
        export GIT_CONFIG_COUNT=1 \
            GIT_CONFIG_KEY_0="url.https://x-access-token:$(cat /run/secrets/gh_token)@github.com/.insteadOf" \
            GIT_CONFIG_VALUE_0="ssh://git@github.com/"; \
    fi \
    && pip install --no-deps -r /tmp/prod.txt && pip check

WORKDIR /app
COPY . .

# Build-time settings only: placeholders so the production settings import. No real
# secret is ever passed to the build; the runtime .env provides the real values.
RUN export DJANGO_ENV=production \
        SECRET_KEY=build-only-not-a-secret \
        ALLOWED_HOSTS=build.invalid \
        WAGTAILADMIN_BASE_URL=https://build.invalid \
        DATABASE_URL=postgres://build@build.invalid:5432/build \
        HCAPTCHA_SITE_KEY=build-only \
        HCAPTCHA_SECRET_KEY=build-only \
    && python manage.py compilemessages \
    && python manage.py collectstatic --noinput \
    && python -m compileall -q /app/apps /app/tic


FROM ${PYTHON_IMAGE}

ARG APP_UID=10001
ARG APP_GID=10001

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PATH=/opt/venv/bin:$PATH \
    DJANGO_ENV=production

RUN groupadd --system --gid ${APP_GID} app \
    && useradd --system --uid ${APP_UID} --gid app --home-dir /app --no-create-home \
        --shell /usr/sbin/nologin app

COPY --from=builder /opt/venv /opt/venv
# Code and static files belong to root and are read-only for "app"; only media/ and
# private/ (request attachments, D25) are writable, bind-mounted on the server.
COPY --from=builder /app /app
RUN install -d -o app -g app -m 0755 /app/media /app/private

WORKDIR /app
USER app
EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
    CMD ["python", "/app/deploy/healthcheck.py"]

CMD ["gunicorn", "tic.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--threads", "2", "--timeout", "30", "--max-requests", "1000", "--max-requests-jitter", "100", "--access-logfile", "-"]
