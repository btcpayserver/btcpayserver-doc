const { resolve } = require('path')
const implicitFigures = require('markdown-it-implicit-figures')
const slugify = require('./slugify')
const preprocessMarkdown = resolve(__dirname, 'preprocessMarkdown')

const title = 'BTCPay Server Docs'
const baseUrl = 'https://docs.btcpayserver.org'
const pageSuffix = '/'
const info = {
  name: title,
  twitter: 'btcpayserver'
}
const extractDescription = text => {
  if (!text) return
  const paragraph = text.match(/^[A-Za-z].*(?:\n[A-Za-z].*)*/m)
  return paragraph ? paragraph.toString().replace(/[\*\_\(\)\[\]]/g, '') : null
}

module.exports = {
  title,
  description: "BTCPay Server Official Documentation",
  head: [
    ["link", { rel: "stylesheet", href: "/styles/btcpayserver-variables.css" }]
  ],
  chainWebpack (config) {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use(preprocessMarkdown)
        .loader(preprocessMarkdown)
        .end()
  },
  plugins: [
    ['seo', {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description || extractDescription($page._strippedContent),
      author: (_, $site) => info,
      tags: $page => ($page.frontmatter.tags || ['BTCPay Server']),
      twitterCard: _ => 'summary',
      type: $page => 'article',
      url: (_, $site, path) => `${baseUrl}${path.replace('.html', pageSuffix)}`,
      image: ($page, $site) => `${baseUrl}/card.png`
    }],
    ['clean-urls', {
      normalSuffix: pageSuffix,
      indexSuffix: pageSuffix,
      notFoundPath: '/404.html',
    }],
    ['code-copy', {
      color: '#8F979E',
      backgroundTransition: false,
      staticIcon: true
    }],
    ['sitemap', {
      hostname: baseUrl,
      exclude: ['/404.html']
    }],
    ['@vuepress/medium-zoom']
  ],
  markdown: {
    extendMarkdown (md) {
      md.use(implicitFigures)
    },
    pageSuffix,
    slugify
  },
  themeConfig: {
    domain: baseUrl,
    logo: "/img/btcpay-logo.svg",
    displayAllHeaders: false,
    repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    notSatisfiedLinks: true, // our own addition, see theme/components/PageEdit.vue
    sidebarDepth: 0,
    algolia: {
      indexName: 'btcpayserver',
      apiKey: '6a3a4c4380385cb5c9f9070247fdfca6',
      // See https://www.algolia.com/doc/api-reference/api-parameters/
      algoliaOptions: {
        // hitsPerPage: 10,
        typoTolerance: 'min'
      },
      // See https://community.algolia.com/docsearch/behavior.html#autocompleteoptions
      autocompleteOptions: {
        openOnFocus: true
      }
    },
    nav: [
      {
        text: "Website",
        link: "https://btcpayserver.org/",
        rel: "noopener noreferrer website"
      },
      {
        text: "Chat",
        link: "https://chat.btcpayserver.org/",
        rel: "noopener noreferrer chat"
      },
      {
        text: "GitHub",
        link: "https://github.com/btcpayserver/",
        rel: "noopener noreferrer github"
      },
      {
        text: "Twitter",
        link: "https://twitter.com/BtcpayServer",
        rel: "noopener noreferrer twitter"
      }
    ],
    sidebar: [
      ["/", "Introduction"],
      {
        title: "Basics",
        collapsable: false,
        children: [
          ["/UseCase", "Use Case"],
          ["/Walkthrough", "Walkthrough"],
          ["/BTCPayVsOthers", "BTCPay Server vs. Others"],
          ["/TryItOut", "Try it out"]
        ]
      },
      {
        title: "Deployment",
        collapsable: false,
        children: [
          ["/Deployment", "Choosing a Deployment Method"],
          ["/ThirdPartyHosting", "Third-party Hosting"],
          {
            title: "Docker",
            path: "/Docker/",
            collapsable: false,
            children: [
              {
                title: "Web Deployment",
                path: "/LunaNodeWebDeployment"
              },
              {
                title: "Azure Deployment",
                path: "/AzureDeployment",
                children: [
                  ["/AzurePennyPinching", "Reducing Cost on Azure"],
                  ["/ChangeDomain", "Changing domain"]
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
                      ["/DynamicDNS", "Dynamic DNS"],
                      ["/ReverseSSHtunnel", "Reverse SSH Tunnel"],
                      ["/ReverseProxyToTor", "Reverse Proxy to Tor"]
                    ]
                  },
                  {
                    title: "Hardware As A Service",
                    path: "/HardwareAsAService"
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
                    path: "/Transmuter/",
                    children: [
                      ["/Transmuter/DCA", "Dollar Cost Average Preset"],
                      ["/Transmuter/EmailReceiptsPreset", "Email Receipts Preset"]
                    ]
                  },
                  ["/ElectrumX", "Electrum X"],
                  ["/ElectrumPersonalServer", "Electrum Personal Server"],
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
          },
          {
            title: "Configurator",
            path: "/Configurator/"
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
            title: "(3) Wallet Setup",
            path: "/WalletSetup",
            collapsable: false,
            initialOpenGroupIndex: -1,
            children: [
              {
                title: "Connect an existing wallet",
                path: "/HardwareWalletIntegration"
              },
              {
                title: "Create a new wallet",
                path: "/HotWallet"
              }
            ]
          },
          ["/WhatsNext", "(4) What's Next?"]
        ]
      },
      {
        title: "Features",
        collapsable: false,
        children: [
          ["/Apps", "Apps"],
          ["/Wallet", "Wallet"],
          ["/Invoices", "Invoices"],
          {
            title: "Pull Payments",
                path: "/PullPayments",
                children: [
                  ["/Refund", "Refunds"]
            ]
          },
          ["/PaymentRequests", "Payment Requests"],
          ["/LightningNetwork", "Lightning Network"],
          ["/Accounting", "Accounting"],
          {
            title: "Payjoin",
            path: "/Payjoin",
            children: [
              ["https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki", "Payjoin specification", { type: 'external' }]
            ]
          }
        ]
      },
      {
        title: "Integrations",
        collapsable: false,
        children: [
          ["/WooCommerce", "WooCommerce"],
          ["/Shopify", "Shopify"],
          ["/Drupal", "Drupal"],
          ["/Magento", "Magento"],
          ["/PrestaShop", "PrestaShop"],
          ["https://github.com/lampsolutions/LampSBtcPayShopware", "Shopware", { type: 'external' }],
          ["/CustomIntegration", "Custom Integration"]
        ]
      },
      {
        title: "Support and Community",
        collapsable: false,
        initialOpenGroupIndex: -1,
        children: [
          {
            title: "FAQ and common issues",
            path: "/FAQ",
            children: [
              ["/FAQ/FAQ-General", "General FAQ"],
              ["/FAQ/FAQ-Deployment", "Deployment FAQ"],
              ["/FAQ/FAQ-Synchronization", "Synchronization FAQ"],
              ["/FAQ/FAQ-Integrations", "Integrations FAQ"],
              ["/FAQ/FAQ-ServerSettings", "Server Settings FAQ"],
              ["/FAQ/FAQ-Stores", "Stores FAQ"],
              ["/FAQ/FAQ-Wallet", "Wallet FAQ"],
              ["/FAQ/FAQ-Apps", "Apps FAQ"],
              ["/FAQ/FAQ-LightningNetwork", "Lightning Network FAQ"],
              ["/FAQ/FAQ-Altcoin", "Altcoins FAQ"]
            ]
          },
          ["/Troubleshooting", "Troubleshooting an issue"],
          ["/Support", "Support"],
          {
            title: "Contribute to BTCPay Server",
            path: "/Contribute",
            children: [
              {
                title: "Develop",
                path: "/Contribute/ContributeDev/",
                 children: [
                   ["/Contribute/ContributeDev/ContributeDevCode", "Code"],
                   ["/Contribute/ContributeDev/ContributeDevTest", "Test"]
                 ]
              },
              {
                title: "Write",
                path: "/Contribute/ContributeWrite/",
                 children: [
                   ["/Contribute/ContributeWrite/WriteSoftware", "Software Stack"],
                   ["/Contribute/ContributeWrite/WriteDocs", "Documentation"],
                   ["/Contribute/ContributeWrite/WriteBlog", "Blog"]
                 ]
              },
              ["/Contribute/ContributeDesign", "Design"],
              ["/Contribute/ContributeTranslate", "Translate"],
              ["/Contribute/ContributeMisc", "Miscellaneous"],
            ]
          },
          ["/Community", "Community"]
        ]
      },
      {
        title: "Development",
        collapsable: false,
        children: [
          ["/Architecture", "Architecture"],
          ["/LocalDevelopment", "Developing Locally"],
          ["/Altcoins", "How to add an Altcoin"],
          ["/Theme", "Customizing Themes"],
          [`${baseUrl}/API/Greenfield/v1`, "Greenfield API v1", { type: 'external' }],
          ["/GreenFieldExample", "Greenfield example with cURL"],
          ["/BTCPayServer/Security", "Security Disclosures"],
        ]
      }
    ]
  }
}
