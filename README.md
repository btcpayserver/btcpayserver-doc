# BTCPay Server Documentation

[![Build Status](https://github.com/btcpayserver/btcpayserver-doc/workflows/Node%20CI/badge.svg)](https://github.com/btcpayserver/btcpayserver-doc/actions?query=workflow%3A%22Node+CI%22)

## Introduction

BTCPay Server is an open-source, self-hosted payment processor for Bitcoin and other cryptocurrencies.

If you have trouble using BTCPay Server, consider joining the [communities listed on the official website](https://btcpayserver.org/#communityCTA) to get help from community members.

Only file a [Github issue](https://github.com/btcpayserver/btcpayserver/issues) for technical issues you can't resolve through other channels or feature requests you've validated with other members of community.

Please check out our [official website](https://btcpayserver.org/), our [complete documentation](https://github.com/btcpayserver/btcpayserver-doc) and [FAQ](https://github.com/btcpayserver/btcpayserver-doc/tree/master/FAQ#btcpay-frequently-asked-questions-and-common-issues) for more details.

## Contributing

Pull requests are welcome and appreciated. To contribute to BTCPay Server, first check the [contributing guidelines](docs/Contribute/README.md).

If you're beginner, take a look at the step by step guide on how to contribute to BTCPay Server documentation below.

[![Contributing to Documentation](https://img.youtube.com/vi/bSDROcdSSWw/mqdefault.jpg)](https://www.youtube.com/watch?v=bSDROcdSSWw "How BTCPay Server Works")

### Build the Documentation Locally

In order to build the website locally, you'll need [Node.js](https://nodejs.org/) >= 12.16 (or basically the latest LTS version).
A prerequisite for the `setup-deps.sh` script is [jq](https://stedolan.github.io/jq/).

The setup is straight forward:

```bash
# Install dependencies
npm install

# Link external doc repos
./setup-deps.sh

# Serve locally (by default on port 8080)
npm start
```

### Text Highlights

There are [three types of text highlights](https://vuepress.vuejs.org/guide/markdown.html#custom-containers) that can be used to display different colored boxes.

A green box displaying a friendly tip:

```md
:::tip
foo
:::
```

A yellow box with a cautious warning:

```md
:::warning
foo
:::
```

A red box with a clear danger, you can also add a title `foo` to any container:

```md
:::danger foo
bar
:::
```

### SEO improvements

We are using the [Vuepress SEO plugin](https://www.npmjs.com/package/vuepress-plugin-seo) to add relevant meta tags to the site and individual pages.

To improve the meta attributes of a specific page, you can add them as YAML frontmatter like this: (see the WooCommerce page for an example)

```text
---
description: How to integrate BTCPay Server into your WooCommerce store.
tags:
- WooCommerce
- WordPress
- Plugin
- eCommerce
---
# WooCommerce integration

This document explains how to **integrate BTCPay Server into your WooCommerce store**.
```

### Embedding YouTube videos

To add a YouTube video with a preview, you can so so by linking to it like this:

```md
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/mqdefault.jpg)](https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
```

Note that the link item need to be a preview image (either from YouTube or a custom one) to result in an embedded video.

### External documentation repos

The build documentation site combines a bunch of docs living in different repositories.

Before the build we check out the other repositories, copy their docs into the right places and link them just as the docs in this repo.

The process for that is defined in the [setup-deps.sh](./setup-deps.sh) script.

External repos can trigger the docs build whenever they change.
You can use GitHub's [repository_dispatch](https://help.github.com/en/actions/reference/events-that-trigger-workflows#external-events-repository_dispatch) feature for this, which is exposed via the API:

```sh
curl -X POST https://api.github.com/repos/btcpayserver/btcpayserver-doc/dispatches \
  -u "${{ secrets.GH_PAT }}" \
  -H "Accept: application/vnd.github.everest-preview+json" \
  -H "Content-Type: application/json" \
  --data '{"event_type": "build_docs"}'
```

The `GH_PAT` needs to be a [personal access token](https://help.github.com/en/actions/reference/events-that-trigger-workflows#triggering-new-workflows-using-a-personal-access-token).

### Check for broken links

The GitHub Actions pipeline checks for broken links after deploying the production site.
You can also run the link check locally using `npm run linkcheck:local`.
The dev server needs to be running alongside for this to work.

## Supporters

The BTCPay Server Project is proudly supported by these entities through the [BTCPay Server Foundation](https://foundation.btcpayserver.org/).

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://kraken.com" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/kraken.svg?sanitize=true" alt="Kraken" height=100>
          <br/>
          <span>Kraken</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://twitter.com/sqcrypto" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/squarecrypto.svg?sanitize=true" alt="Square Crypto" height=100>
          <br/>
          <span>Square Crypto</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.pnxbet.com" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/pnxbet.png?sanitize=true" alt="PNXBET" height=100>
          <br/>
          <span>PNXBET</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://acinq.co/" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/acinq-logo.svg?sanitize=true" alt="ACINQ" height=100>
          <br/>
          <span>ACINQ</span>
        </a>
      </tr>
      <tr>
      </td>
      <td align="center" valign="middle">
        <a href="https://lunanode.com" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/lunanode.svg?sanitize=true" alt="LunaNode" height=100>
          <br/>
          <span>LunaNode</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://walletofsatoshi.com/" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/walletofsatoshi.svg?sanitize=true" alt="Wallet of Satoshi" height=100>
          <br/>
          <span>Wallet of Satoshi</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://nomics.com/" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/nomics.svg?sanitize=true" alt="Nomics" height=100>
          <br/>
          <span>Nomics</span>
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://coincards.com/" target="_blank">
          <img  src="https://raw.githubusercontent.com/btcpayserver/btcpayserver/master/BTCPayServer/wwwroot/img/coincards.svg?sanitize=true" alt="Coincards" height=100>
          <br/>
          <span>Coincards</span>
        </a>
      </td>
    </tr>
  </tbody>
</table>

If you'd like to support the project, please visit the [donation page](https://btcpayserver.org/donate/).
