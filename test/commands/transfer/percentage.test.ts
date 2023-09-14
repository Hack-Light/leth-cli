import {expect, test} from '@oclif/test'

describe('transfer/percentage', () => {
  test
  .stdout()
  .command(['transfer/percentage'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['transfer/percentage', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
