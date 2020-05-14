// replace youtube links with embed
module.exports = source =>
  source.replace(/\[(!.*)\]\((.*youtube\.com.*?)(?:\s"(.*?)")?\)/i, (all, preview, url, text) => {
    const [, query] = url.match(/\?(.*)/)
    const params = query.split('&').reduce((res, param) => {
      const [key, val] = param.split('=')
      return Object.assign(res, { [key]: val })
    }, {})
    const { v, t } = params
    const path = t ? `${v}?start=${t}` : `${v}?`

    return `
<div class="ytEmbed" data-id="${v}" style="background-image:url(https://img.youtube.com/vi/${v}/hqdefault.jpg);">
  <iframe
    title="YouTube: ${text || v}"
    data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
    frameborder="0"
    allow="autoplay;encrypted-media;picture-in-picture"
    allowfullscreen
  ></iframe>
</div>`
  })
