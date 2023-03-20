import test from 'ava'
import { shouldInsertListItem } from './useEditingSupport'

const FIXTURE = `# Test Content

Hello

- my markdown text`

test.serial('useEditingSupport', async (t) => {
  t.true(shouldInsertListItem(FIXTURE, FIXTURE.length))
  t.false(shouldInsertListItem(FIXTURE, 1))
})
