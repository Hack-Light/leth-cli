import {expect, test} from '@oclif/test'

describe('abi/functions', () => {
  test
  .stdout()
  .command(['abi/functions'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['abi/functions', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
