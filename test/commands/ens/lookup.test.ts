import {expect, test} from '@oclif/test'

describe('ens/lookup', () => {
  test
  .stdout()
  .command(['ens/lookup'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['ens/lookup', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
