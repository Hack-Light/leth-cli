import {expect, test} from '@oclif/test'

describe('transfer/single', () => {
  test
  .stdout()
  .command(['transfer/single'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['transfer/single', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
