"""Shared helpers for the settings components.

`config` is python-decouple reading real environment variables first, then the
repo-root `.env` (or the file named by ENV_FILE) if it exists. The reader comes from
the CMS core (`zeneon_cms.settings.env`).
"""

from pathlib import Path

from zeneon_cms.settings.env import make_config

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

config = make_config(BASE_DIR)
