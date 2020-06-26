const { join, relative, resolve } = require('path')
const docsDir = resolve(__dirname, '..')

// external docs: local dir as key, repo base as value
const EXTERNAL_DOCS = {
  'Docker': 'https://github.com/btcpayserver/btcpayserver-docker',
  'Transmuter': 'https://github.com/btcpayserver/btcTransmuter',
}

const replaceExternalRepoLinks = (source, resourcePath) => {
  let processed = source

  Object.keys(EXTERNAL_DOCS).forEach(baseDir => {
    const baseUrl = EXTERNAL_DOCS[baseDir]

    // rewrite repo internal links to external links
    const repoLinks = new RegExp(`\\]\\(((?!https?:\/\/|#|\.?\/).*?)\\)`, 'gi')
    processed = processed.replace(repoLinks, (all, path) => all.replace(path, `${baseUrl}/blob/master/${path}`))

    // rewrite links to docs to internal VuePress links
    const docsLinks = new RegExp(`\\]\\((${baseUrl}/blob/master/((README\.md|docs/).*?))\\)`, 'gi')
    processed = processed.replace(docsLinks, (all, url, path) => all.replace(url, `/${baseDir}/${path.replace('docs/', '')}`))

    // rewrite external links to docs to internal VuePress links
    const links = new RegExp(`\\]\\((https://docs.btcpayserver.org(.*))\\)`, 'gi')
    processed = processed.replace(links, (all, url, path) => all.replace(url, path))
  })

  return processed
}

const replaceYouTubeLinks = source =>
  source.replace(/\[(!.*)\]\((.*youtube\.com.*?)(?:\s"(.*?)")?\)/gi, (all, preview, url, text) => {
    const [, query] = url.match(/\?(.*)/)
    const params = query.split('&').reduce((res, param) => {
      const [key, val] = param.split('=')
      return Object.assign(res, { [key]: val })
    }, {})
    const { v, t } = params
    const path = t ? `${v}?start=${t}` : `${v}?`

    return `
<a href="${url}" class="ytEmbed" data-id="${v}" style="background-image:url(https://img.youtube.com/vi/${v}/hqdefault.jpg);">
  <iframe
    title="YouTube: ${text || v}"
    data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
    frameborder="0"
    allow="autoplay;encrypted-media;picture-in-picture"
    allowfullscreen
  ></iframe>
</a>`
  })

// https://webpack.js.org/api/loaders/
module.exports = function (source) {
  const { resourcePath } = this
  let processed = source

  processed = replaceYouTubeLinks(processed)

  if (source.match(`externalRepo: `)) {
    processed = replaceExternalRepoLinks(processed, resourcePath)
  }

  return processed
}
