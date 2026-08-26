#!/bin/bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
GH="${ROOT}/.tools/gh_2.67.0_macOS_arm64/bin/gh"
REPO_NAME="${1:-hbo-max-irr-form}"
VISIBILITY="${2:-private}"

if [[ ! -x "$GH" ]]; then
  echo "GitHub CLI not found at $GH"
  exit 1
fi

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Not logged into GitHub. Run:"
  echo "  $GH auth login -h github.com -p https -w"
  exit 1
fi

OWNER="$("$GH" api user -q .login)"
REMOTE="https://github.com/${OWNER}/${REPO_NAME}.git"

echo "Creating repository ${OWNER}/${REPO_NAME} (${VISIBILITY})..."
if "$GH" repo view "${OWNER}/${REPO_NAME}" >/dev/null 2>&1; then
  echo "Repository already exists."
else
  "$GH" repo create "$REPO_NAME" --"$VISIBILITY" --confirm
fi

upload_file() {
  local file_path="$1"
  local repo_path="$2"
  local message="$3"
  local encoded

  encoded=$(python3 - <<PY
import base64, pathlib
print(base64.b64encode(pathlib.Path("${file_path}").read_bytes()).decode())
PY
)

  "$GH" api \
    --method PUT \
    "repos/${OWNER}/${REPO_NAME}/contents/${repo_path}" \
    -f message="$message" \
    -f content="$encoded" >/dev/null

  echo "Uploaded ${repo_path}"
}

upload_file "${ROOT}/index.html" "index.html" "Add index.html"
upload_file "${ROOT}/styles.css" "styles.css" "Add styles.css"
upload_file "${ROOT}/app.js" "app.js" "Add app.js"
upload_file "${ROOT}/assets/hbo-max-logo.png" "assets/hbo-max-logo.png" "Add HBO Max logo"
upload_file "${ROOT}/.gitignore" ".gitignore" "Add gitignore"

echo
echo "Done! Repository URL:"
echo "  https://github.com/${OWNER}/${REPO_NAME}"
echo
echo "To enable GitHub Pages for coworkers:"
echo "  Settings -> Pages -> Deploy from branch -> main / root"
echo "  Live URL: https://${OWNER}.github.io/${REPO_NAME}/"
