#!/usr/bin/env bash
# Checks commit messages (and optionally a PR title) against the repo rules:
#   - subject is `type(scope): message`
#   - no AI attribution trailers / "Generated with" footers
#
# Usage: check-commit-messages.sh <base-sha> <head-sha>
#        PR_TITLE="feat(pbb): ..." check-commit-messages.sh <base-sha> <head-sha>
set -euo pipefail

base="${1:?base sha required}"
head="${2:?head sha required}"

subject_re='^(feat|fix|refactor|test|docs|chore|style|perf|ci|build|revert)(\([a-z0-9._-]+\))?!?: .+'
ai_re='(co-authored-by:.*(claude|anthropic|copilot|cursor|codex|openai|gemini|noreply@anthropic\.com))|generated (with|by) \[?(claude|cursor|copilot|chatgpt|codex|gemini)|🤖'

failed=0

check() {
    local label="$1" message="$2"
    local subject
    subject="$(printf '%s\n' "$message" | head -n1)"

    if ! [[ "$subject" =~ $subject_re ]]; then
        echo "✗ $label: subject must be 'type(scope): message' — got: $subject"
        failed=1
    fi

    if printf '%s\n' "$message" | grep -Eiq "$ai_re"; then
        echo "✗ $label: remove AI attribution (Co-Authored-By / 'Generated with' lines)"
        failed=1
    fi
}

if [[ -n "${PR_TITLE:-}" ]]; then
    check "PR title" "$PR_TITLE"
fi

for sha in $(git rev-list --no-merges "$base..$head"); do
    check "commit ${sha:0:7}" "$(git log -1 --format=%B "$sha")"
done

if [[ "$failed" -ne 0 ]]; then
    echo
    echo "Fix with: git rebase -i $base  (reword), then force-push your feature branch."
    exit 1
fi

echo "✓ commit messages OK"
