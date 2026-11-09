const { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } = require('fs')
const { dirname, join, resolve } = require('path')
const redirects = require('./docs/.vuepress/redirects')

const dist = resolve(__dirname, 'docs', '.vuepress', 'dist')
const marker = '<meta name="btcpay-redirect" content="true">'

const exists = filePath => {
  try {
    const stat = statSync(filePath)
    return stat.isFile() || stat.isDirectory()
  } catch (_) {
    return false
  }
}

const redirectFile = path => {
  if (
    typeof path !== 'string' ||
    !path.startsWith('/') ||
    path.includes('#') ||
    path.includes('?')
  ) {
    throw new Error(`Invalid redirect source: ${path}`)
  }

  const segments = path.split('/').filter(Boolean)
  if (segments.some(segment => segment === '.' || segment === '..')) {
    throw new Error(`Invalid redirect source: ${path}`)
  }

  return join(dist, ...segments, 'index.html')
}

const redirectHtml = redirect => {
  const destination = JSON.stringify(redirect).replace(/</g, '\\u003c')
  const escaped = redirect
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return `<!DOCTYPE html><html><head><title>Redirect</title>${marker}<link rel="canonical" href="${escaped}"><script>const target=new URL(${destination},location.href);if(!target.hash&&location.hash)target.hash=location.hash;location.replace(target.href)</script><meta http-equiv="refresh" content="0;url=${escaped}"><meta name="robots" content="noindex"></head><body><a href="${escaped}">Click here if you are not redirected.</a></body></html>`
}

const createRedirects = (items = redirects) => {
  if (!exists(dist)) throw new Error(`Build output does not exist: ${dist}`)

  const sources = new Map()
  items.forEach(({ path, redirect }) => {
    if (typeof redirect !== 'string' || !redirect) {
      throw new Error(`Invalid redirect target for ${path}`)
    }

    const target = redirectFile(path)
    const previous = sources.get(target)
    if (previous) {
      throw new Error(`Duplicate redirect sources ${previous} and ${path}`)
    }
    sources.set(target, path)

    if (existsSync(target) && !readFileSync(target, 'utf8').includes(marker)) {
      throw new Error(`Redirect source collides with a generated page: ${path}`)
    }

    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, redirectHtml(redirect))
  })
}

if (require.main === module) createRedirects()

module.exports = { createRedirects, redirectFile, redirectHtml }
