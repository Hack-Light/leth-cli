import {expect, test} from '@oclif/test'

describe('ens/search', () => {
  test
  .stdout()
  .command(['ens/search'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['ens/search', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
