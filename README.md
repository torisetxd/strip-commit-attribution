# strip-commit-attribution

A [Claude Code](https://claude.com/claude-code) plugin that removes Claude/Anthropic attribution from git commit messages and PR bodies.

## What it does

A `tool.call` hook on `Bash` that, for `git commit` and `gh pr create|edit` commands:

- strips `Co-Authored-By:` trailers naming Claude or Anthropic
- strips `` badges
- keeps human co-authors untouched
- after a `git commit`, appends a safety net that amends HEAD if any credit still slipped into the message

## Install

Copy or clone this folder into a local plugin directory and load it with Claude Code:

```sh
git clone https://github.com/torisetxd/strip-commit-attribution ~/.claude/local-plugins/strip-commit-attribution
```

Validate and test:

```sh
claude plugin validate .
claude plugin test .
```

Note: `.claude-plugin/types/` holds type declarations that Claude Code generates when it loads the plugin; it is not checked in. Run `claude plugin validate .` once to regenerate it if you want editor type checking.

## License

MIT
