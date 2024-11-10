const isDev = process.env.NODE_ENV === 'development'

// external docs: local dir as key, repo base as value
const EXTERNAL_DOCS = {
  BigCommerce: 'https://github.com/TChukwuleta/BTCPayServerPlugins/tree/main/Plugins/BTCPayServer.Plugins.BigCommercePlugin',
  Breez: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Breez',
  Bringin: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Bringin',
  BTCPayServer: 'https://github.com/btcpayserver/btcpayserver',
  Configurator: 'https://github.com/btcpayserver/btcpayserver-configurator',
  Docker: 'https://github.com/btcpayserver/btcpayserver-docker',
  Drupal: 'https://github.com/btcpayserver/commerce_btcpay',
  DynamicReports: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.DynamicReports',
  Grandnode: 'https://github.com/btcpayserver/grandnode',
  LNDhubAPI: 'https://github.com/dennisreimann/btcpayserver-plugin-lndhub-api',
  NBXplorer: 'https://github.com/dgarage/NBXplorer',
  Nopcommerce: 'https://github.com/btcpayserver/nopcommerce',
  Nostr: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.NIP05',
  Odoo: 'https://github.com/btcpayserver/odoo',
  Payroll: 'https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/tree/master/Plugins/BTCPayServer.RockstarDev.Plugins.Payroll',
  PodServer: 'https://github.com/dennisreimann/btcpayserver-plugin-podserver',
  SideShift: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.SideShift',
  Smartstore: 'https://github.com/btcpayserver/Smartstore.BTCPayServer',
  TicketTailor: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.TicketTailor',
  Transmuter: 'https://github.com/btcpayserver/btcTransmuter',
  Trocador: 'https://github.com/saltrafael/trocador-plugin',
  Vault: 'https://github.com/btcpayserver/BTCPayServer.Vault',
  Wix: 'https://github.com/btcpayserver/wix',
  Wabisabi: 'https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Wabisabi',
  Xenforo: 'https://github.com/btcpayserver/xenforo',
  Zapier: 'https://github.com/btcpayserver/zapier'
}

const replaceExternalRepoLinks = (source, externalRepoUrl, resourcePath) => {
  const replacements = []
  const replace = (text, str, replacement, type) => (
    replacements.push([str, replacement, type]), text.replace(str, replacement)
  )

  let processed = source

  Object.keys(EXTERNAL_DOCS).forEach(baseDir => {
    const baseUrl = EXTERNAL_DOCS[baseDir]

    if (baseUrl === externalRepoUrl) {
      // rewrite repo internal links to external links
      const repoLinks = new RegExp(
        `\\]\\(((?!https?:\/\/|#|\.?\/).*?)\\)`,
        'gi'
      )
      processed = processed.replace(repoLinks, (all, path) =>
        replace(all, path, `${baseUrl}/blob/master/${path}`, 1)
      )

      // rewrite links to docs to internal VuePress links
      const docsLinks = new RegExp(
        `\\]\\((${baseUrl}/blob/master/((README\.md|docs/).*?))\\)`,
        'gi'
      )
      processed = processed.replace(docsLinks, (all, url, path) =>
        replace(all, url, `/${baseDir}/${path.replace('docs/', '')}`, 2)
      )
    }

    // rewrite external links to docs to internal VuePress links
    const links = new RegExp(
      `\\]\\((https:\\/\\/docs.btcpayserver.org((?!\\/API\\/Greenfield).*))\\)`,
      'gi'
    )
    processed = processed.replace(links, (all, url, path) =>
      replace(all, url, path, 3)
    )
  })

  if (replacements.length && !isDev) {
    console.group('Markdown replacements in', resourcePath)
    replacements.forEach(([str, rep, type]) =>
      console.log(`${type}:`, str, '->', rep)
    )
    console.groupEnd()
  }

  return processed
}

const replaceYouTubeLinks = source =>
  source.replace(
    /\[(!.*)\]\((.*(youtube\.com\/watch|youtu\.be).*?)(?:\s(["'])(.*?)\4)?\)/gi,
    (all, preview, url, _1, _2, text) => {
      const [, alt] = preview.match(/\[(.*)\]/)
      const title = (text || alt || 'YouTube').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
      const [, query] = url.match(/\?(.*)/) || url.match(/.*youtu\.be\/(.*)/)
      const params = query.split('&').reduce((res, param) => {
        let [key, val] = param.split('=')
        if (param === key) {
          key = 'v'
          val = param
        }
        return Object.assign(res, { [key]: val })
      }, {})
      const { v, t } = params
      const path = t ? `${v}?start=${t}` : `${v}?`

      return `
<a href="${url}" title="${title}" class="ytEmbed" data-id="${v}" style="background-image:url(https://img.youtube.com/vi/${v}/hqdefault.jpg);">
  <iframe
    title="${title}"
    data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
    frameborder="0"
    allow="autoplay;encrypted-media;picture-in-picture"
    allowfullscreen
  ></iframe>
</a>`
    }
  )

// https://webpack.js.org/api/loaders/
module.exports = function (source) {
  const { resourcePath } = this
  let processed = source
  processed = replaceYouTubeLinks(processed)

  const [, externalRepo] = source.match(/externalRepo: (.*)/) || []
  processed = replaceExternalRepoLinks(processed, externalRepo, resourcePath)

  return processed
}
