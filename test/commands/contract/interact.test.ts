import {expect, test} from '@oclif/test'

describe('contract/interact', () => {
  test
  .stdout()
  .command(['contract/interact'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['contract/interact', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
