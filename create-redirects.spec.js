const { mkdirSync, rmSync, writeFileSync } = require('fs')
const { dirname } = require('path')
const { createRedirects, redirectFile, redirectHtml } = require('./create-redirects')

describe('redirect generation', () => {
  const files = ['/test-redirect', '/test-redirect/child'].map(redirectFile)

  beforeEach(() => files.forEach(file => rmSync(dirname(file), { recursive: true, force: true })))
  afterAll(() => files.forEach(file => rmSync(dirname(file), { recursive: true, force: true })))

  test('preserves an incoming anchor when the target has none', () => {
    const html = redirectHtml('/target/')
    expect(html).toContain('if(!target.hash&&location.hash)target.hash=location.hash')
  })

  test('escapes redirect targets in HTML attributes', () => {
    const html = redirectHtml('/target/?value="<unsafe>&other=value')
    expect(html).toContain('href="/target/?value=&quot;&lt;unsafe&gt;&amp;other=value"')
    expect(html).not.toContain('href="/target/?value="')
  })

  test('rejects sources containing fragments', () => {
    expect(() => redirectFile('/source/#anchor')).toThrow('Invalid redirect source')
  })

  test('rejects duplicate filesystem routes', () => {
    expect(() =>
      createRedirects([
        { path: '/test-redirect', redirect: '/one/' },
        { path: '/test-redirect/', redirect: '/two/' }
      ])
    ).toThrow('Duplicate redirect sources')
  })

  test('does not overwrite a generated page', () => {
    mkdirSync(dirname(files[1]), { recursive: true })
    writeFileSync(files[1], '<!DOCTYPE html><title>Page</title>')
    expect(() => createRedirects([{ path: '/test-redirect/child', redirect: '/target/' }])).toThrow(
      'collides with a generated page'
    )
  })
})
