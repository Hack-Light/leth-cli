import {expect, test} from '@oclif/test'

describe('generateAddress', () => {
  test
  .stdout()
  .command(['generateAddress'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['generateAddress', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
