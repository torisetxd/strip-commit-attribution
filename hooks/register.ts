import type { Register } from 'claude-code'
import { AMEND_GUARD, IS_COMMIT, WRITES_MESSAGE, stripCredit } from './strip'

export const register: Register = on => {
  on('tool.call', { tool: 'Bash' }, ($, e, next) => {
    if (!WRITES_MESSAGE.test(e.command)) return next(e)

    let command = stripCredit(e.command)
    if (IS_COMMIT.test(command) && !/--amend\b/.test(command)) command += AMEND_GUARD

    return next({ ...e, command })
  })
}
