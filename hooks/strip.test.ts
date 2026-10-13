import { test, expect } from 'claude-code/testing'
import { stripCredit } from './strip'

test('strips co-author trailer and badge', () => {
  const cmd = [
    `git commit -m "$(cat <<'EOF'`,
    'fix: thing',
    '',
    '🤖 Generated with [Claude Code](https://claude.com/claude-code)',
    '',
    'Co-Authored-By: Claude <noreply@anthropic.com>',
    'EOF',
    ')"',
  ].join('\n')
  const out = stripCredit(cmd)
  expect(out).not.toMatch(/Claude|anthropic/i)
  expect(out).toContain('fix: thing')
})

test('keeps human co-authors', () => {
  expect(stripCredit('git commit -m "x\n\nCo-Authored-By: Bob <b@x.io>"')).toContain('Bob')
})
