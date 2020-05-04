const customBlock = require('markdown-it-custom-block')
const implicitFigures = require('markdown-it-implicit-figures')

const youtubeEmbed = (id, path) => `
  <div class="ytEmbed" data-id="${id}" style="background-image:url(https://img.youtube.com/vi/${id}/hqdefault.jpg);">
    <iframe
      title="YouTube ${id}"
      data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
      frameborder="0"
      allow="autoplay;encrypted-media;picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>`


module.exports = {
  title: "BTCPay Server Docs",
  description: "BTCPay Server Official Documentation",
  head: [
    // Favicon
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#51b13e" }],
    ["meta", { name: "msapplication-TileColor", content: "#0f3b21" }],
    ["meta", { name: "theme-color", content: "#ffffff" }],
    // Styles
    ["link", { rel: "stylesheet", href: "/styles/btcpayserver-variables.css" }]
  ],
  markdown: {
    extendMarkdown (md) {
      md.use(implicitFigures)
      md.use(customBlock, {
        youtube (arg) {
          const [id, start] = arg.split(',')
          const path = start ? `${id}?start=${start}` : `${id}?`
          return youtubeEmbed(id, path)
        },
        youtubePlaylist (arg) {
          const [id, video] = arg.split(',')
          const path = `${video || ''}?listType=playlist&list=${id}`
          return youtubeEmbed(video || id, path)
        }
      })
    }
  },
  themeConfig: {
    logo: "/img/btcpay-logo.svg",
    displayAllHeaders: false,
    repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 0,
    algolia: {
      indexName: 'BTCPayServerDocs',
      apiKey: '51fb83ef4dd7fe4e43bcd7a97b066df8',
      // See https://www.algolia.com/doc/api-reference/api-parameters/
      algoliaOptions: {
        hitsPerPage: 25
      },
      // See https://community.algolia.com/docsearch/behavior.html#autocompleteoptions
      autocompleteOptions: {
        openOnFocus: true
      }
    },
    nav: [
      {
        text: "Website",
        link: "https://btcpayserver.org/"
      },
      {
        text: "GitHub",
        link: "https://github.com/btcpayserver/"
      },
      {
        text: "Chat",
        link: "https://chat.btcpayserver.org/"
      },
      {
        text: "Twitter",
        link: "https://twitter.com/BtcpayServer"
      }
    ],
    sidebar: [
      {
        title: "Introduction",
        path: "/",
      },
      {
        title: "BTCPay Basics",
        collapsable: false,
        children: [
          {
            title: "Use Case",
            path: "UseCase"
          },
          {
            title: "Walkthrough",
            path: "Walkthrough"
          },
          {
            title: "BTCPay vs. other processors",
            path: "BTCPayVsOthers"
          },
          "TryItOut"
        ]
      },
      {
        title: "Deployment",
        collapsable: false,
        children: [
          "Deployment",
          {
            title: "Web Deployment",
            path: "LunaNodeWebDeployment"
          },
          "AzureDeployment",
          "DockerDeployment",
          "GoogleCloudDeployment",
          {
            title: "Manual Deployment",
            path: "ManualDeployment",
            collapsable: false,
            children: [
              "ManualDeploymentExtended"
            ]
          },
          "HardwareDeployment",
          {
            title: "Raspberry Pi Deployment",
            path: "RaspberryPiDeployment",
            children: [
              "RPi3",
              "RPi4"
            ]
          },
          "ThirdPartyHosting",
          {
            title: "Advanced Deployment",
            collapsable: false,
            children: [
              "DynamicDNS",
              "ReverseSSHtunnel"
            ]
          }
        ]
      },
      {
        title: "Getting Started",
        collapsable: false,
        children: [
          "RegisterAccount",
          "CreateStore",
          {
            title: "(3) Connect a Wallet",
            path: "ConnectWallet",
            collapsable: false,
            children: [
              {
                title: "Ledger Wallet",
                path: "LedgerWallet"
              },
              {
                title: "ColdCard Wallet",
                path: "ColdCardWallet"
              },
              {
                title: "Wasabi Wallet",
                path: "WasabiWallet"
              },
              {
                title: "Electrum Wallet",
                path: "ElectrumWallet",
                children: [
                  "ElectrumX",
                  "ElectrumPersonalServer"
                ]
              },
              {
                title: "Hot Wallet",
                path: "HotWallet"
              },
            ]
          },
          "WhatsNext"
        ]
      },
      {
        title: "Features",
        collapsable: false,
        children: [
          {
            title: "Wallet",
            path: "Wallet",
            collapsable: false,
            children: [
              {
                title: "Hot Wallet",
                path: "HotWallet"
              },
            ]
          },
          "Invoices",
          {
            title: "Apps",
            path: "Apps"
          },
          {
            title: "Lightning Network",
            path: "LightningNetwork"
          },
          {
            title: "Accounting",
            path: "Accounting"
          },
          "PaymentRequests",
          {
            title: "Hardware Wallet Integration",
            path: "Vault"
          },
          {
            title: "Payjoin",
            path: "Payjoin",
            children: [
              {
                title: "Payjoin Specification",
                path: "Payjoin-spec"
              }
            ]
          }
        ]
      },
      {
        title: "Integrations",
        collapsable: false,
        children: [
          {
            title: "WooCommerce",
            path: "WooCommerce"
          },
          {
            title: "Drupal",
            path: "Drupal"
          },
          {
            title: "Magento",
            path: "Magento"
          },
          {
            title: "PrestaShop",
            path: "PrestaShop"
          },
          {
            title: "Custom Integration",
            path: "CustomIntegration"
          }
        ]
      },
      {
        title: "Docker",
        path: "/Docker/",
        collapsable: false,
        children: [
          "/Docker/pihole"
        ]
      },
      {
        title: "Transmuter",
        path: "/Transmuter/",
        collapsable: false,
        children: [
          {
            title: "Email Receipts Preset",
            path: "Transmuter/EmailReceiptsPreset"
          }
        ]
      }
    ]
  }
}
