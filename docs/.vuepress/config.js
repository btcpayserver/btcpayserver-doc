const { resolve } = require('path')
const include = require('markdown-it-include')
const implicitFigures = require('markdown-it-implicit-figures')
const slugify = require('./slugify')
const preprocessMarkdown = resolve(__dirname, 'preprocessMarkdown')
const imageAltToTitlePlugin = require('./imageAltToTitlePlugin')

const title = 'BTCPay Server'
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

const sidebarUserGuide = [
  {
    title: 'Learn',
    collapsable: false,
    children: [
      ['/Guide', 'Introduction'],
      ['/TryItOut', 'Try it out'],
      ['/Walkthrough', 'Walkthrough'],
      ['/UseCase', 'Use Case'],
      ['/BTCPayVsOthers', 'BTCPay Server vs. Others']
    ]
  },
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
      '/RegisterAccount',
      '/CreateStore',
      {
        title: '(3) Wallet Setup',
        path: '/WalletSetup',
        collapsable: false,
        initialOpenGroupIndex: -1,
        children: [
          {
            title: 'Connect Wallet',
            path: '/ConnectWallet'
          },
          {
            title: 'Create Wallet',
            path: '/CreateWallet'
          },
          {
            title: 'Lightning Network',
            path: '/LightningNetwork'
          }
        ]
      },
      ['/WhatsNext', "(4) What's Next?"]
    ]
  },
  {
    title: 'Features',
    collapsable: false,
    children: [
      ['/Dashboard', 'Dashboard'],
      {
        title: 'Wallet',
        path: '/Wallet',
        children: [
          ['/HardwareWalletIntegration', 'Hardware Wallet Integration']
        ]
      },
      ['/Invoices', 'Invoices'],
      ['/PaymentRequests', 'Payment Requests'],
      {
        title: 'Pull Payments',
        path: '/PullPayments',
        children: [['/Refund', 'Refunds']]
      },
      ['/Payouts', 'Payouts'],
      {
        title: 'Form Builder',
        path: '/Forms',
        children: [['/AdvancedForms', 'Advanced Forms']]
      },
      {
        title: 'Apps',
        path: '/Apps',
        children: [['/Conference-PoS-guide', 'Conference PoS Guide']]
      },
      ['/Reporting', 'Reporting'],
      {
        title: 'Payjoin',
        path: '/Payjoin',
        children: [
          [
            'https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki',
            'Payjoin specification',
            { type: 'external' }
          ]
        ]
      }
    ]
  },
  {
    title: 'Integrations',
    collapsable: false,
    children: [
      ['/WooCommerce', 'WooCommerce'],
      ['/Shopify', 'Shopify'],
      ['/Magento', 'Magento'],
      ['/PrestaShop', 'PrestaShop'],
      ['/OpenCart', 'OpenCart'],
      ['/Drupal', 'Drupal'],
      ['/Zapier/', 'Zapier'],
      ['/Shopware', 'Shopware'],
      ['/VirtueMart', 'VirtueMart'],
      ['/Smartstore/', 'Smartstore'],
      ['/Grandnode/', 'Grandnode'],
      ['/Nopcommerce/', 'Nopcommerce'],
      ['/Xenforo/', 'Xenforo'],
      ['/InvoiceNinja', 'Invoice Ninja'],
      ['/CustomIntegration', 'Custom Integration']
    ]
  },
  {
    title: 'Plugins',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      ['/Nostr/', 'Nostr'],
      ['/TicketTailor/', 'TicketTailor'],
      ['/Trocador/', 'Trocador'],
      ['/SideShift/', 'SideShift'],
      ['/Bringin/', 'Bringin'],
      ['/Payroll/', 'Payroll'],
      ['/DynamicReports/', 'Dynamic Reports'],
      ['/Breez/', 'Breez'],
      ['/Wabisabi/', 'Wabisabi Coinjoin'],
      [
        `https://dev.blink.sv/examples/btcpayserver-plugin`,
        'Blink',
        { type: 'external' } 
      ],
    ]
  },
  {
    title: 'Support and Community',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      ['/Troubleshooting', 'Troubleshooting an issue'],
      ['/Support', 'Support'],
      ['/Community', 'Community']
    ]
  }
]

const sidebarDeployment = [
  {
    title: 'Deployment',
    collapsable: false,
    children: [
      '/Deployment/',
      '/Deployment/ThirdPartyHosting',
      '/Configurator/'
    ]
  },
  {
    title: 'Docker',
    collapsable: false,
    children: [
      ['/Docker/', 'Introduction'],
      {
        title: 'Web/Cloud Deployment',
        path: '/Deployment/webdeployment',
        collapsable: false,
        children: [
          ['/Deployment/LunaNode', 'Luna Node'],
          ['/Deployment/voltagecloud', 'Voltage Cloud'],
          ['/Deployment/Clovyr', 'Clovyr'],
          {
            title: 'Azure',
            path: '/Deployment/Azure',
            children: [
              ['/Deployment/AzurePennyPinching', 'Reducing Cost on Azure']
            ]
          },
          {
            title: 'Google Cloud',
            path: '/Deployment/GoogleCloud'
          }
        ]
      },
      {
        title: 'Hardware Deployment',
        path: '/Deployment/Hardware',
        collapsable: false,
        children: [
          {
            title: 'Raspberry Pi Deployment',
            path: '/Deployment/RaspberryPi4'
          },
          {
            title: 'Hack0 Deployment',
            path: '/Deployment/Hack0'
          },
          {
            title: 'LightningInABox Deployment',
            path: '/Deployment/LightningInABox'
          },
          ['/Deployment/DynamicDNS', 'Dynamic DNS'],
          ['/Docker/cloudflare-tunnel', 'Exposing on clearnet with Cloudflare'],
          [
            '/Deployment/ReverseSSHtunnel',
            'Exposing on clearnet with a reverse SSH Tunnel'
          ],
          ['/Deployment/ReverseProxyToTor', 'Exposing on Tor'],
          {
            title: 'Hardware As A Service',
            path: '/Deployment/HardwareAsAService'
          }
        ]
      },
      {
        title: 'Docker Plugins',
        children: [
          {
            title: 'Transmuter',
            path: '/Transmuter/',
            children: [
              ['/Transmuter/DCA', 'Dollar Cost Average Preset'],
              ['/Transmuter/EmailReceiptsPreset', 'Email Receipts Preset']
            ]
          },
          ['/ElectrumX', 'Electrum X'],
          ['/ElectrumPersonalServer', 'Electrum Personal Server'],
          '/Docker/joinmarket',
          '/Docker/pihole',
          '/Docker/fireflyiii',
          '/Docker/ndlc',
          '/Docker/lightning-terminal',
          '/Docker/tallycoin-connect',
          '/Docker/cloudflare-tunnel'
        ]
      },
      {
        title: 'FastSync',
        path: '/Docker/fastsync'
      },
      {
        title: 'Backup & Restore',
        path: '/Docker/backup-restore'
      }
    ]
  },
  {
    title: 'Manual Deployment',
    collapsable: false,
    children: [
      '/Deployment/ManualDeployment',
      '/Deployment/ManualDeploymentExtended'
    ]
  }
]

const sidebarDevelopment = [
  {
    title: 'Greenfield API',
    collapsable: false,
    children: [
      [
        `${baseUrl}/API/Greenfield/v1`,
        'Greenfield API v1',
        { type: 'external' }
      ],
      // [
      //   `${baseUrl}/API/Greenfield/Plugins`,
      //   'Greenfield API Plugins',
      //   { type: 'external' }
      // ],
      '/Development/ecommerce-integration-guide',
      '/BTCPayServer/greenfield-authorization',
      '/Development/GreenFieldExample',
      '/Development/GreenFieldExample-NodeJS',
      '/Development/GreenfieldExample-PHP'
    ]
  },
  {
    title: 'Development',
    collapsable: false,
    children: [
      '/Development/',
      '/Development/LocalDevelopment',
      ['/BTCPayServer/greenfield-development', 'Greenfield API Development'],
      '/Development/Plugins',
      '/Development/Altcoins',
      '/Development/InvoiceMetadata',
      '/Development/Theme'
    ]
  },
  {
    title: 'NBXplorer',
    collapsable: false,
    children: [
      ['/NBXplorer/', 'Overview'],
      '/NBXplorer/API',
      ['/NBXplorer/Postgres-Schema', 'Postgres Schema'],
      ['/NBXplorer/Postgres-Migration', 'Postgres Migration']
    ]
  },
  {
    title: 'More',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      {
        title: 'BTCPay Server Vault',
        path: '/Vault/',
        children: ['/Vault/HowToVerify']
      },
      ['/BTCPayServer/Security', 'Security Disclosures'],
      ['/Development/TestnetDemo', 'Testnet deployment']
    ]
  }
]

const sidebarContribute = [
  {
    title: 'Contribute',
    path: '/Contribute/',
    collapsable: false,
    children: [
      {
        title: 'Code',
        path: '/Contribute/Dev',
        collapsable: false,
        children: ['/Contribute/DevCode', '/Contribute/DevTest']
      },
      {
        title: 'Write',
        path: '/Contribute/Write',
        collapsable: false,
        children: [
          ['/Contribute/WriteSoftware', 'Software Stack'],
          ['/Contribute/WriteDocs', 'Documentation'],
          ['/Contribute/WriteBlog', 'Blog']
        ]
      },
      ['/Contribute/Design', 'Design'],
      ['/Contribute/Translate', 'Translate'],
      ['/Contribute/Misc', 'Miscellaneous']
    ]
  }
]

const sidebarFAQ = [
  {
    title: 'FAQ and common issues',
    path: '/FAQ/',
    collapsable: false,
    children: [
      'General',
      'Deployment',
      'Synchronization',
      'Integrations',
      'ServerSettings',
      'Stores',
      'Wallet',
      'Apps',
      'LightningNetwork',
      'Altcoin'
    ]
  }
]

module.exports = {
  title,
  description: 'BTCPay Server Official Documentation',
  head: [
    [
      'meta',
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' }
    ],
    ['link', { rel: 'stylesheet', href: '/styles/btcpayserver-variables.css' }]
  ],
  chainWebpack(config) {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use(preprocessMarkdown)
      .loader(preprocessMarkdown)
      .end()
  },
  plugins: [
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page =>
          $page.frontmatter.description ||
          extractDescription($page._strippedContent),
        author: (_, $site) => info,
        tags: $page => $page.frontmatter.tags || ['BTCPay Server'],
        twitterCard: _ => 'summary',
        type: $page => 'article',
        url: (_, $site, path) =>
          `${baseUrl}${path.replace('.html', pageSuffix)}`,
        image: ($page, $site) => `${baseUrl}/card.png`
      }
    ],
    [
      'clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/404.html'
      }
    ],
    [
      'code-copy',
      {
        color: '#8F979E',
        backgroundTransition: false,
        staticIcon: true
      }
    ],
    [
      'sitemap',
      {
        hostname: baseUrl,
        exclude: ['/404.html']
      }
    ],
    ['@vuepress/medium-zoom']
  ],
  markdown: {
    extendMarkdown(md) {
      md.use(implicitFigures)
      md.use(include, { root: resolve(__dirname, 'includes') })
      md.use(imageAltToTitlePlugin)
    },
    pageSuffix,
    slugify
  },
  themeConfig: {
    domain: baseUrl,
    logo: '/img/btcpay-logo.svg',
    displayAllHeaders: false,
    repo: 'btcpayserver/btcpayserver-doc',
    docsDir: 'docs',
    editLinks: true,
    notSatisfiedLinks: true, // our own addition, see theme/components/PageEdit.vue
    sidebarDepth: 0,
    algolia: {
      indexName: 'btcpayserver',
      appId: 'EJBX059GO6',
      apiKey: '2ec08d532af6b265b73b2e71cae499ce',
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
        text: 'User Guide',
        link: '/Guide/'
      },
      {
        text: 'Deployment',
        link: '/Deployment/'
      },
      {
        text: 'Developers',
        link: '/Development/'
      },
      {
        text: 'Contribute',
        link: '/Contribute/'
      },
      {
        text: 'FAQ',
        link: '/FAQ/'
      }
    ],
    social: [
      {
        text: 'Website',
        link: 'https://btcpayserver.org/',
        rel: 'noopener noreferrer website'
      },
      {
        text: 'Chat',
        link: 'https://chat.btcpayserver.org/',
        rel: 'noopener noreferrer chat'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/btcpayserver/',
        rel: 'noopener noreferrer github'
      },
      {
        text: 'Twitter',
        link: 'https://twitter.com/BtcpayServer',
        rel: 'noopener noreferrer twitter'
      }
    ],
    sidebar: {
      '/Development': sidebarDevelopment,
      '/Contribute': sidebarContribute,
      '/Vault': sidebarDevelopment,
      '/BTCPayServer': sidebarDevelopment,
      '/NBXplorer': sidebarDevelopment,
      '/Configurator': sidebarDeployment,
      '/Deployment': sidebarDeployment,
      '/Docker': sidebarDeployment,
      '/ElectrumX': sidebarDeployment,
      '/ElectrumPersonalServer': sidebarDeployment,
      '/Transmuter': sidebarDeployment,
      '/FAQ/': sidebarFAQ,
      '/': sidebarUserGuide
    }
  }
}
