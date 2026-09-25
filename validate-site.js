const { readdirSync, readFileSync, statSync } = require('fs')
const { dirname, extname, join, relative, resolve, sep } = require('path')
const redirects = require('./docs/.vuepress/redirects')

const dist = resolve(__dirname, 'docs', '.vuepress', 'dist')
const origin = 'https://docs.btcpayserver.org'
const hostname = new URL(origin).hostname
const redirectMarker = '<meta name="btcpay-redirect" content="true">'
const redirectTargets = new Map(
  redirects.map(({ path, redirect }) => [path.replace(/\/+$/, '') || '/', redirect])
)

const walk = directory =>
  readdirSync(directory).flatMap(name => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const routeFile = pathname => {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch (_) {
    return null
  }

  const relativePath = decoded.replace(/^\/+/, '')
  const candidates = extname(relativePath)
    ? [join(dist, relativePath)]
    : [join(dist, relativePath, 'index.html'), join(dist, `${relativePath}.html`)]
  return candidates.find(
    candidate => candidate.startsWith(`${dist}${sep}`) && statIsFile(candidate)
  )
}

const statIsFile = path => {
  try {
    return statSync(path).isFile()
  } catch (_) {
    return false
  }
}

const pageUrl = file => {
  const path = relative(dist, file).split(sep).join('/')
  if (path === 'index.html') return '/'
  if (path.endsWith('/index.html')) return `/${path.slice(0, -10)}`
  return `/${path}`
}

const decodeHtml = value =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

const attributes = (html, name) => {
  const values = []
  const pattern = new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'gi')
  let match
  while ((match = pattern.exec(html))) values.push(decodeHtml(match[1] ?? match[2]))
  return values
}

const hasAnchor = (file, html, fragment) => {
  let id
  try {
    id = decodeURIComponent(fragment.replace(/^#/, ''))
  } catch (_) {
    return false
  }
  if (!id || attributes(html, 'id').includes(id)) return true

  if (relative(dist, file).split(sep).join('/') !== 'API/Greenfield/v1/index.html') return false

  const swagger = JSON.parse(readFileSync(join(dirname(file), 'swagger.json'), 'utf8'))
  if (id.startsWith('operation/')) {
    const operationId = id.slice('operation/'.length)
    return Object.values(swagger.paths || {}).some(path =>
      Object.values(path).some(operation => operation && operation.operationId === operationId)
    )
  }
  if (id.startsWith('tag/')) {
    const tag = id.slice('tag/'.length)
    return (swagger.tags || []).some(item => item.name === tag)
  }
  if (id.startsWith('section/Authentication/')) {
    const scheme = id.slice('section/Authentication/'.length)
    return Boolean(swagger.components?.securitySchemes?.[scheme])
  }
  return false
}

const followRedirects = url => {
  const visited = new Set()
  while (url.hostname === hostname) {
    const source = url.pathname.replace(/\/+$/, '') || '/'
    const redirect = redirectTargets.get(source)
    if (!redirect || visited.has(source)) return url
    visited.add(source)

    const target = new URL(redirect, origin)
    if (!target.hash) target.hash = url.hash
    url = target
  }
  return url
}

const validateRedirects = errors => {
  const sources = new Map()
  redirects.forEach(({ path, redirect }) => {
    const source = path.replace(/\/+$/, '') || '/'
    const key = source
    if (sources.has(key)) errors.push(`Duplicate redirect source: ${sources.get(key)} and ${path}`)
    sources.set(key, path)

    if (/[?#]/.test(path)) errors.push(`Invalid redirect source: ${path}`)

    const sourceFile = routeFile(new URL(path, origin).pathname)
    if (!sourceFile || !readFileSync(sourceFile, 'utf8').includes(redirectMarker)) {
      errors.push(`Redirect source was not generated safely: ${path}`)
    }

    let target
    try {
      target = new URL(redirect, origin)
    } catch (_) {
      errors.push(`Invalid redirect target: ${path} -> ${redirect}`)
      return
    }
    if (target.hostname !== hostname) return

    const visited = new Set([source])
    let destination = target
    while (destination.hostname === hostname) {
      const destinationPath = destination.pathname.replace(/\/+$/, '') || '/'
      if (visited.has(destinationPath)) {
        errors.push(`Redirect cycle: ${path} -> ${redirect}`)
        return
      }
      visited.add(destinationPath)
      const next = redirectTargets.get(destinationPath)
      if (!next) break
      destination = new URL(next, origin)
    }

    const file = routeFile(target.pathname)
    if (!file) {
      errors.push(`Missing redirect target: ${path} -> ${redirect}`)
      return
    }
    if (target.hash && !hasAnchor(file, readFileSync(file, 'utf8'), target.hash)) {
      errors.push(`Missing redirect target anchor: ${path} -> ${redirect}`)
    }
  })
}

const validateLinks = (htmlFiles, errors) => {
  const pages = new Map(htmlFiles.map(file => [file, readFileSync(file, 'utf8')]))
  pages.forEach((html, source) => {
    attributes(html, 'href').forEach(href => {
      if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) return

      let target
      try {
        target = new URL(href, `${origin}${pageUrl(source)}`)
      } catch (_) {
        errors.push(`Invalid link in ${pageUrl(source)}: ${href}`)
        return
      }
      target = followRedirects(target)
      if (target.hostname !== hostname) return

      const file = routeFile(target.pathname)
      if (!file) {
        errors.push(`Missing link target in ${pageUrl(source)}: ${href}`)
        return
      }
      if (target.hash) {
        const targetHtml = pages.get(file) || readFileSync(file, 'utf8')
        if (!hasAnchor(file, targetHtml, target.hash)) {
          errors.push(`Missing link anchor in ${pageUrl(source)}: ${href}`)
        }
      }
    })
  })
}

const validateSite = () => {
  if (!statIsFile(join(dist, 'index.html'))) throw new Error(`Build output does not exist: ${dist}`)

  const errors = []
  const htmlFiles = walk(dist).filter(file => extname(file) === '.html')
  validateRedirects(errors)
  validateLinks(htmlFiles, errors)
  return [...new Set(errors)].sort()
}

if (require.main === module) {
  const errors = validateSite()
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log('Generated site links, anchors, and redirects are valid.')
  }
}

module.exports = { attributes, followRedirects, pageUrl, routeFile, validateSite }
