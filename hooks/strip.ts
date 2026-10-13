const TRAILER = /[ \t]*Co-Authored-By:[^\n"'`]*(?:Claude|Anthropic)[^\n"'`]*/gi
const BADGE = /[ \t]*(?:🤖\s*)?Generated (?:with|by) \[?Claude(?: Code)?\]?(?:\([^)\n]*\))?[^\n"'`]*/gi

export const IS_COMMIT = /\bgit\b[^\n;&|]*\bcommit\b/
export const WRITES_MESSAGE = /\bgit\b[^\n;&|]*\bcommit\b|\bgh\s+pr\s+(?:create|edit)\b/

export function stripCredit(command: string): string {
  return command.replace(TRAILER, '').replace(BADGE, '')
}

// Appended after a commit as a safety net: amends HEAD if credit still got in.
const CREDIT = 'Co-Authored-By:.*(Claude|Anthropic)|Generated (with|by) .?Claude'
export const AMEND_GUARD =
  `; __rc=$?; if git log -1 --format=%B 2>/dev/null | grep -qiE '${CREDIT}'; then ` +
  `git log -1 --format=%B | grep -viE '${CREDIT}' | cat -s | ` +
  `git commit --amend --no-verify -q -F -; fi; (exit $__rc)`
