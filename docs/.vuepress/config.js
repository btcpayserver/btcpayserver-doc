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
  plugins: [
    ['vuepress-plugin-clean-urls', {
      normalSuffix: '/',
      indexSuffix: '/',
      notFoundPath: '/404.html',
    }],
    ['vuepress-plugin-code-copy', {
      color: '#8F979E',
      backgroundTransition: false,
      staticIcon: true
    }]
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
    // repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 0,
    algolia: {
      indexName: 'btcpayserver',
      apiKey: '6a3a4c4380385cb5c9f9070247fdfca6',
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
        path: "/"
      },
      {
        title: "BTCPay Basics",
        collapsable: false,
        children: [
          {
            title: "Use Case",
            path: "/UseCase"
          },
          {
            title: "Walkthrough",
            path: "/Walkthrough"
          },
          "/BTCPayVsOthers",
          "/TryItOut"
        ]
      },
      {
        title: "Deployment",
        collapsable: false,
        children: [
          "/Deployment",
          "/ThirdPartyHosting",
          {
            title: "Docker",
            path: "/DockerDeployment",
            collapsable: false,
            children: [
              // TODO: Add Configurator
              {
                title: "Web Deployment",
                path: "/LunaNodeWebDeployment"
              },
              {
                title: "Azure Deployment",
                path: "/AzureDeployment",
                children: [
                  {
                    title: "Reducing Cost on Azure",
                    path: "/AzurePennyPinching"
                  },
                  {
                    title: "Changing domain",
                    path: "/ChangeDomain"
                  }
                ]
              },
              {
                title: "Google Cloud Deployment",
                path: "/GoogleCloudDeployment"
              },
              {
                title: "Hardware Deployment",
                path: "/HardwareDeployment",
                children: [
                  {
                    title: "Advanced Deployment",
                    collapsable: false,
                    children: [
                      {
                        title: "Dynamic DNS",
                        path: "/DynamicDNS"
                      },
                      {
                        title: "Reverse SSH Tunnel",
                        path: "/ReverseSSHtunnel"
                      }
                    ]
                  }
                ]
              },
              {
                title: "Raspberry Pi Deployment",
                path: "/RaspberryPiDeployment",
                children: [
                  "/RPi3",
                  "/RPi4"
                ]
              },
              {
                title: "Docker Plugins",
                children: [
                  {
                    title: "Transmuter",
                    path: "/Transmuter",
                    children: [
                      {
                        title: "Email Receipts Preset",
                        path: "/Transmuter/EmailReceiptsPreset"
                      }
                    ]
                  },
                  "/Docker/pihole"
                ]
              }
            ]
          },
          {
            title: "Manual Deployment",
            path: "/ManualDeployment",
            children: [
              "/ManualDeploymentExtended"
            ]
          }
        ]
      },
      {
        title: "Getting Started",
        collapsable: false,
        children: [
          "/RegisterAccount",
          "/CreateStore",
          {
            title: "(3) Connect a Wallet",
            path: "/ConnectWallet",
            collapsable: false,
            children: [
              {
                title: "Connect a hardware wallet",
                path: "/Vault",
                children: [
                  {
                    title: "Ledger Wallet",
                    path: "/LedgerWallet"
                  },
                  {
                    title: "ColdCard Wallet",
                    path: "/ColdCardWallet"
                  }
                ]
              },
              {
                title: "Connect a software wallet",
                children: [
                  {
                    title: "Electrum Wallet",
                    path: "/ElectrumWallet",
                    children: [
                      {
                        title: "Electrum X",
                        path: "/ElectrumX"
                      },
                      {
                        title: "Electrum Personal Server EPS",
                        path: "/ElectrumPersonalServer"
                      }
                    ]
                  },
                  {
                    title: "Wasabi Wallet",
                    path: "/WasabiWallet"
                  },
                ]
              },
              {
                title: "Create a wallet",
                children: [
                  {
                    title: "Hot Wallet",
                    path: "/HotWallet"
                  }
                ]
              }
            ]
          },
          "/WhatsNext"
        ]
      },
      {
        title: "Features",
        collapsable: false,
        children: [
          {
            title: "Apps",
            path: "/Apps"
          },
          {
            title: "Wallet",
            path: "/Wallet"
          },

          {
            title: "Invoices",
            path: "/Invoices"
          },
          {
            title: "Payment Requests",
            path: "/PaymentRequests"
          },
          {
            title: "Lightning Network",
            path: "/LightningNetwork"
          },
          {
            title: "Accounting",
            path: "/Accounting"
          },
          {
            title: "Payjoin",
            path: "/Payjoin",
            children: [
              {
                title: "Payjoin Specification",
                path: "/Payjoin-spec"
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
            path: "/WooCommerce"
          },
          {
            title: "Drupal",
            path: "/Drupal"
          },
          {
            title: "Magento",
            path: "/Magento"
          },
          {
            title: "PrestaShop",
            path: "/PrestaShop"
          },
          {
            title: "Custom Integration",
            path: "/CustomIntegration"
          }
        ]
      },
      {
        title: "Support and Community",
        collapsable: false,
        children: [
          {
            title: "FAQ and common issues",
            path: "/FAQ",
            children: [
              {
                title: "General FAQ",
                path: "/FAQ/FAQ-General"
              },
              {
                title: "Deployment FAQ",
                path: "/FAQ/FAQ-Deployment"
              },
              {
                title: "Synchronization FAQ",
                path: "/FAQ/FAQ-Synchronization"
              },
              {
                title: "Integrations FAQ",
                path: "/FAQ/FAQ-Integrations"
              },
              {
                title: "Server Settings FAQ",
                path: "/FAQ/FAQ-ServerSettings"
              },
              {
                title: "Stores FAQ",
                path: "/FAQ/FAQ-Stores"
              },
              {
                title: "Wallet FAQ",
                path: "/FAQ/FAQ-Wallet"
              },
              {
                title: "Apps FAQ",
                path: "/FAQ/FAQ-Apps"
              },
              {
                title: "Lightning Network FAQ",
                path: "/FAQ/FAQ-LightningNetwork"
              },
              {
                title: "Altcoins FAQ",
                path: "/FAQ/FAQ-Altcoin"
              }
            ]
          },
          {
            title: "Troubleshooting an issue",
            path: "/Troubleshooting"
          },
          {
            title: "Support",
            path: "/Support"
          },
          {
            title: "Contribute",
            path: "/Contribute"
          },
          {
            title: "Translate",
            path: "/Translate"
          },
          {
            title: "Community",
            path: "/Community"
          }
        ]
      },
      {
        title: "Development",
        collapsable: false,
        children: [
          {
            title: "Clients",
            children: [
              {
                title: "Architecture",
                path: "/Architecture"
              },
              {
                title: "Developing Locally",
                path: "/LocalDevelopment"
              },
              {
                title: "How to add an Altcoin",
                path: "/Altcoins"
              },
              {
                title: "Customizing Themes",
                path: "/Theme"
              }
            ]
          }
        ]
      }
    ]
  }
}
