const { resolve } = require('path')
const implicitFigures = require('markdown-it-implicit-figures')
const slugify = require('./slugify')
const preprocessMarkdown = resolve(__dirname, 'preprocessMarkdown')

const baseUrl = 'https://docs.btcpayserver.org'

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
  chainWebpack (config) {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use(preprocessMarkdown)
        .loader(preprocessMarkdown)
        .end()
  },
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
    slugify
  },
  themeConfig: {
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
                      ["/ReverseSSHtunnel", "Reverse SSH Tunnel"]
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
                title: "Use existing hardware wallet",
                path: "/HardwareWalletIntegration",
                children: [
                  ["/ColdCardWallet", "ColdCard Wallet"]
                ]
              },
              {
                title: "Use existing software wallet",
                children: [
                  {
                    title: "Electrum Wallet",
                    path: "/ElectrumWallet",
                  },
                  ["/WasabiWallet", "Wasabi Wallet"]
                ]
              },
              {
                title: "Create a new wallet",
                path: "/CreateWallet",
                children: [
                  ["/HotWallet", "Hot Wallet"]
                ]
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
