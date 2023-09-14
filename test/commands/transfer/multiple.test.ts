import {expect, test} from '@oclif/test'

describe('transfer/multiple', () => {
  test
  .stdout()
  .command(['transfer/multiple'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['transfer/multiple', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
