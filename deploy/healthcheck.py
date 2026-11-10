"""Container healthcheck: exit 0 when GET <path> on this container answers <status>.

Used by the image's HEALTHCHECK and by deploy/compose.yaml. Copied from MLP.
Standard library only, so it runs without loading Django. Django rejects a Host
header that is not in ALLOWED_HOSTS, so the probe sends the first allowed host.

    python healthcheck.py                  # web: 8000 /healthz/ must answer 200
    python healthcheck.py 8001 /mcp 401    # mcp container

The MCP server has no health route: its only endpoint is /mcp behind the bearer
token (zeneon_cms.mcp.server). A GET without the token answers 401 from the running
app (uvicorn up, settings loaded, token configured), and is not counted by the
rate limit. A 401 is the healthy answer there.
"""

import http.client
import os
import sys


def probe_host(allowed_hosts: str) -> str:
    """First usable name from a comma-separated ALLOWED_HOSTS value."""
    for raw in allowed_hosts.split(","):
        host = raw.strip().lstrip(".")
        if host and host != "*":
            return host
    return "localhost"


def main(port: int = 8000, path: str = "/healthz/", expect: int = 200, timeout: float = 4) -> int:
    host = probe_host(os.environ.get("ALLOWED_HOSTS", ""))
    conn = http.client.HTTPConnection("127.0.0.1", port, timeout=timeout)
    try:
        conn.request("GET", path, headers={"Host": host})
        status = conn.getresponse().status
    except OSError as exc:
        print(f"healthcheck: {exc}", file=sys.stderr)
        return 1
    finally:
        conn.close()
    if status != expect:
        print(f"healthcheck: {path} answered {status}, expected {expect}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    path = sys.argv[2] if len(sys.argv) > 2 else "/healthz/"
    expect = int(sys.argv[3]) if len(sys.argv) > 3 else 200
    sys.exit(main(port, path, expect))
