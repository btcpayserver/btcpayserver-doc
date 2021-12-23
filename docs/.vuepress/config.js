const { resolve } = require('path')
const include = require('markdown-it-include')
const implicitFigures = require('markdown-it-implicit-figures')
const slugify = require('./slugify')
const preprocessMarkdown = resolve(__dirname, 'preprocessMarkdown')

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
    title: 'Basics',
    collapsable: false,
    children: [
      ['/Guide', 'Introduction'],
      ['/UseCase', 'Use Case'],
      ['/Walkthrough', 'Walkthrough'],
      ['/BTCPayVsOthers', 'BTCPay Server vs. Others'],
      ['/TryItOut', 'Try it out']
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
          }
        ]
      },
      ['/WhatsNext', '(4) What\'s Next?']
    ]
  },
  {
    title: 'Features',
    collapsable: false,
    children: [
      ['/Apps', 'Apps'],
      {
        title: 'Wallet',
        path: '/Wallet',
        children: [
          ['/HardwareWalletIntegration', 'Hardware Wallet Integration']
        ]
      },
      ['/Invoices', 'Invoices'],
      {
        title: 'Pull Payments',
        path: '/PullPayments',
        children: [
          ['/Refund', 'Refunds']
        ]
      },
      ['/PaymentRequests', 'Payment Requests'],
      ['/LightningNetwork', 'Lightning Network'],
      ['/Accounting', 'Accounting'],
      {
        title: 'Payjoin',
        path: '/Payjoin',
        children: [
          ['https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki', 'Payjoin specification', { type: 'external' }]
        ]
      }
    ]
  },
  {
    title: 'Integrations',
    collapsable: false,
    children: [
      ['/Zapier/', 'Zapier'],
      ['/WooCommerce', 'WooCommerce'],
      ['/Shopify', 'Shopify'],
      ['/Drupal', 'Drupal'],
      ['/Magento', 'Magento'],
      ['/PrestaShop', 'PrestaShop'],
      ['https://github.com/lampsolutions/LampSBtcPayShopware', 'Shopware', { type: 'external' }],
      ['/CustomIntegration', 'Custom Integration']
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
        title: 'Web Deployment',
        path: '/Deployment/LunaNode'
      },
      {
        title: 'Azure',
        path: '/Deployment/Azure',
        children: [
          ['/Deployment/AzurePennyPinching', 'Reducing Cost on Azure'],
          ['/Deployment/ChangeDomain', 'Changing domain']
        ]
      },
      {
        title: 'Google Cloud Deployment',
        path: '/Deployment/GoogleCloud'
      },
      {
        title: 'Hardware Deployment',
        path: '/Deployment/Hardware',
        children: [
          ['/Deployment/DynamicDNS', 'Dynamic DNS'],
          ['/Deployment/ReverseSSHtunnel', 'Reverse SSH Tunnel'],
          ['/Deployment/ReverseProxyToTor', 'Reverse Proxy to Tor'],
          {
            title: 'Hardware As A Service',
            path: '/Deployment/HardwareAsAService'
          }
        ]
      },
      {
        title: 'Raspberry Pi Deployment',
        path: '/Deployment/RaspberryPi',
        children: [
          '/Deployment/RPi3',
          '/Deployment/RPi4'
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
          '/Docker/ndlc'
        ]
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
      [`${baseUrl}/API/Greenfield/v1`, 'Greenfield API v1', { type: 'external' }],
      '/Development/GreenFieldExample'
    ]
  },
  {
    title: 'Development',
    collapsable: false,
    children: [
      '/Development/',
      '/Development/LocalDevelopment',
      '/Development/Altcoins',
      '/Development/Theme'
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
        children: [
          '/Vault/HowToVerify'
        ]
      },
      ['/BTCPayServer/Security', 'Security Disclosures']
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
        children: [
          '/Contribute/DevCode',
          '/Contribute/DevTest'
        ]
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
  },

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
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1.0'}],
    ['link', { rel: 'stylesheet', href: '/styles/btcpayserver-variables.css' }]
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
      md.use(include, { root: resolve(__dirname, 'includes') })
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
        text: 'User Guide',
        link: '/Guide'
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
