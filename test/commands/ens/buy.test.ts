import {expect, test} from '@oclif/test'

describe('ens/buy', () => {
  test
  .stdout()
  .command(['ens/buy'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['ens/buy', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
