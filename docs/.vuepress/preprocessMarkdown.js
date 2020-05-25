// external docs: local dir as key, repo base as value
const EXTERNAL_DOCS = {
  'Docker': 'https://github.com/btcpayserver/btcpayserver-docker',
  'Transmuter': 'https://github.com/btcpayserver/btcTransmuter',
}

const replaceExternalDocsLinks = source => {
  let processed = source

  Object.keys(EXTERNAL_DOCS).forEach(baseDir => {
    const baseUrl = EXTERNAL_DOCS[baseDir]
    const regexp = new RegExp(`\\[.*?\\]\\((${baseUrl}/blob/master/(README\.md|docs/.*?))\\)`, 'gi')

    processed = processed.replace(regexp, (all, url, path) => all.replace(url, `/${baseDir}/${path}`))
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

module.exports = source => {
  let processed = source

  processed = replaceYouTubeLinks(processed)
  processed = replaceExternalDocsLinks(processed)

  return processed
}
