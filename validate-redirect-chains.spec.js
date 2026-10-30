const { mkdirSync, mkdtempSync, rmSync, writeFileSync } = require('fs')
const { tmpdir } = require('os')
const { join } = require('path')

describe('redirect chain validation', () => {
  let dist

  beforeEach(() => {
    dist = mkdtempSync(join(tmpdir(), 'btcpay-redirect-chains-'))
    writeFileSync(join(dist, 'index.html'), '<!DOCTYPE html><title>Home</title>')
    for (const route of ['old', 'bridge']) {
      mkdirSync(join(dist, route))
      writeFileSync(join(dist, route, 'index.html'), '<meta name="btcpay-redirect" content="true">')
    }
  })

  afterEach(() => {
    jest.dontMock('path')
    jest.dontMock('./docs/.vuepress/redirects')
    rmSync(dist, { recursive: true, force: true })
  })

  const validateChain = destination => {
    let errors
    jest.isolateModules(() => {
      jest.doMock('path', () => ({
        ...jest.requireActual('path'),
        resolve: () => dist
      }))
      jest.doMock('./docs/.vuepress/redirects', () => [
        { path: '/old/', redirect: '/bridge/' },
        { path: '/bridge/', redirect: destination }
      ])
      errors = require('./validate-site').validateSite()
    })
    return errors
  }

  test.each(['https://example.com/manual/', 'https://example.com/manual/#installation'])(
    'accepts a chain ending outside the documentation site: %s',
    destination => {
      expect(validateChain(destination)).toEqual([])
    }
  )

  test('still validates an internal destination', () => {
    expect(validateChain('/missing/')).toContain('Missing redirect target: /old/ -> /bridge/')
  })

  test('still detects a redirect cycle', () => {
    expect(validateChain('/old/')).toContain('Redirect cycle: /old/ -> /bridge/')
  })
})
