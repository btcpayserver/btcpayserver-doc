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
            title: 'Lightning Network Setup',
            path: '/LightningNetwork-Setup'
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
          ['/HardwareWalletIntegration', 'Hardware Wallet Integration'],
          ['/Multisig', 'Multisig'],
          ['/LightningNetwork', 'Lightning Network']
        ]
      },
      ['/Invoices', 'Invoices'],
      {
        title: 'Subscriptions',
        path: '/Subscriptions',
        children: [['/Monetization', 'Monetization']]
      },
      ['/Translations', 'Translations'],
      ['/PaymentRequests', 'Payment Requests'],
      {
        title: 'Pull Payments',
        path: '/PullPayments',
        collapsable: false,
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
      ['/Calcom', 'Cal.com'],
      ['/EasyDigitalDownloads', 'Easy Digital Downloads'],
      ['/EasyWebshop', 'EasyWebshop'],
      ['/GiveWP', 'GiveWP'],
      ['/InvoiceNinja', 'Invoice Ninja'],
      ['/Magento', 'Magento'],
      ['/OpenCart', 'OpenCart'],
      ['/PhocaCart', 'PhocaCart'],
      ['/PrestaShop', 'PrestaShop'],
      ['/Pretix', 'Pretix'],
      ['/ShopifyV2', 'Shopify V2'],
      ['/Shopware', 'Shopware'],
      ['/VirtueMart', 'VirtueMart'],
      ['/WooCommerce', 'WooCommerce'],
      ['/CustomIntegration', 'Custom Integration']
    ]
  },
  {
    title: 'Plugins',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      [`https://dev.blink.sv/examples/btcpayserver-plugin`, 'Blink', { type: 'external' }]
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
    children: ['/Deployment/', '/Deployment/ThirdPartyHosting', '/Configurator/']
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
          ['/Deployment/Cloudzy', 'Cloudzy'],
          ['/Deployment/Clovyr', 'Clovyr'],
          {
            title: 'Azure',
            path: '/Deployment/Azure',
            children: [['/Deployment/AzurePennyPinching', 'Reducing Cost on Azure']]
          },
          {
            title: 'Google Cloud',
            path: '/Deployment/GoogleCloud'
          },
          {
            title: 'Comet Cash',
            path: '/Deployment/CometCash'
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
          ['/Deployment/ReverseSSHtunnel', 'Exposing on clearnet with a reverse SSH Tunnel'],
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
    children: ['/Deployment/ManualDeployment', '/Deployment/ManualDeploymentExtended']
  }
]

const sidebarDevelopment = [
  {
    title: 'Greenfield API',
    collapsable: false,
    children: [
      [`${baseUrl}/API/Greenfield/v1`, 'Greenfield API v1', { type: 'external' }],
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
      {
        title: 'Plugins',
        path: '/Development/Plugins',
        children: [['/Development/Plugins-Permissions', 'Extending permissions']]
      },
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

// Swahili (Kiswahili) locale - /sw/
const navSwahili = [
  {
    text: 'Mwongozo wa Mtumiaji',
    link: '/sw/Guide/'
  },
  {
    text: 'Usambazaji',
    link: '/sw/Deployment/'
  },
  {
    text: 'Uendelezaji',
    link: '/sw/Development/'
  },
  {
    text: 'Changia',
    link: '/sw/Contribute/'
  },
  {
    text: 'Maswali',
    link: '/sw/FAQ/'
  }
]

const sidebarSwahili = [
  {
    title: 'Jifunze',
    collapsable: false,
    children: [
      ['/sw/Guide', 'Utangulizi'],
      ['/sw/TryItOut', 'Ijaribu'],
      ['/sw/Walkthrough', 'Maelekezo'],
      ['/sw/UseCase', 'Matumizi'],
      ['/sw/BTCPayVsOthers', 'BTCPay Server dhidi ya Wengine']
    ]
  },
  {
    title: 'Kuanza',
    collapsable: false,
    children: [
      '/sw/RegisterAccount',
      '/sw/CreateStore',
      {
        title: '(3) Usanidi wa Pochi',
        path: '/sw/WalletSetup',
        collapsable: false,
        initialOpenGroupIndex: -1,
        children: [
          {
            title: 'Unganisha Pochi',
            path: '/sw/ConnectWallet'
          },
          {
            title: 'Unda Pochi',
            path: '/sw/CreateWallet'
          },
          {
            title: 'Usanidi wa Mtandao wa Lightning',
            path: '/sw/LightningNetwork-Setup'
          }
        ]
      },
      ['/sw/WhatsNext', '(4) Nini Kifuatavyo?']
    ]
  },
  {
    title: 'Vipengele',
    collapsable: false,
    children: [
      ['/sw/Dashboard', 'Dashibodi'],
      {
        title: 'Pochi',
        path: '/sw/Wallet',
        children: [
          '/sw/HardwareWalletIntegration',
          '/sw/Multisig',
          '/sw/LightningNetwork'
        ]
      },
      '/sw/Invoices',
      {
        title: 'Usajili',
        path: '/sw/Subscriptions',
        children: ['/sw/Monetization']
      },
      '/sw/Translations',
      '/sw/PaymentRequests',
      {
        title: 'Malipo ya Kuvuta',
        path: '/sw/PullPayments',
        collapsable: false,
        children: ['/sw/Refund']
      },
      '/sw/Payouts',
      {
        title: 'Mjenzi wa Fomu',
        path: '/sw/Forms',
        children: ['/sw/AdvancedForms']
      },
      {
        title: 'Programu',
        path: '/sw/Apps',
        children: ['/sw/Conference-PoS-guide']
      },
      '/sw/Reporting',
      ['/sw/Payjoin', 'Payjoin']
    ]
  },
  {
    title: 'Ushirikiano',
    collapsable: false,
    children: [
      ['/sw/Calcom', 'Cal.com'],
      ['/sw/EasyDigitalDownloads', 'Easy Digital Downloads'],
      ['/sw/EasyWebshop', 'EasyWebshop'],
      ['/sw/GiveWP', 'GiveWP'],
      ['/sw/InvoiceNinja', 'Invoice Ninja'],
      ['/sw/Magento', 'Magento'],
      ['/sw/OpenCart', 'OpenCart'],
      ['/sw/PhocaCart', 'PhocaCart'],
      ['/sw/PrestaShop', 'PrestaShop'],
      ['/sw/Pretix', 'Pretix'],
      ['/sw/ShopifyV2', 'Shopify V2'],
      ['/sw/Shopware', 'Shopware'],
      ['/sw/VirtueMart', 'VirtueMart'],
      ['/sw/WooCommerce', 'WooCommerce'],
      ['/sw/CustomIntegration', 'Ushirikiano Maalum']
    ]
  },
  {
    title: 'Msaada na Jamii',
    collapsable: false,
    initialOpenGroupIndex: -1,
    children: [
      ['/sw/Troubleshooting', 'Utatuzi wa Matatizo'],
      ['/sw/Support', 'Msaada'],
      ['/sw/Community', 'Jamii']
    ]
  },
  {
    title: 'Usambazaji',
    collapsable: false,
    children: [
      {
        title: 'Usambazaji',
        path: '/sw/Deployment/',
        children: ['/sw/Deployment/ThirdPartyHosting']
      },
      {
        title: 'Usambazaji wa Wavuti/Wingu',
        path: '/sw/Deployment/webdeployment',
        collapsable: false,
        children: [
          ['/sw/Deployment/LunaNode', 'Luna Node'],
          ['/sw/Deployment/Cloudzy', 'Cloudzy'],
          ['/sw/Deployment/Clovyr', 'Clovyr'],
          {
            title: 'Azure',
            path: '/sw/Deployment/Azure',
            children: ['/sw/Deployment/AzurePennyPinching']
          },
          ['/sw/Deployment/GoogleCloud', 'Google Cloud'],
          ['/sw/Deployment/CometCash', 'Comet Cash']
        ]
      },
      {
        title: 'Usambazaji wa Maunzi',
        path: '/sw/Deployment/Hardware',
        collapsable: false,
        children: [
          ['/sw/Deployment/RaspberryPi4', 'Raspberry Pi'],
          ['/sw/Deployment/Hack0', 'Hack0'],
          ['/sw/Deployment/LightningInABox', 'LightningInABox'],
          '/sw/Deployment/DynamicDNS',
          '/sw/Deployment/ReverseSSHtunnel',
          '/sw/Deployment/ReverseProxyToTor',
          '/sw/Deployment/HardwareAsAService'
        ]
      },
      ['/sw/Deployment/ManualDeployment', 'Usambazaji wa Mwongozo'],
      ['/sw/Deployment/ManualDeploymentExtended', 'Usambazaji wa Mwongozo uliopanuliwa']
    ]
  },
  {
    title: 'Uendelezaji',
    collapsable: false,
    children: [
      {
        title: 'Greenfield API',
        path: '/sw/Development/',
        children: [
          ['/sw/Development/ecommerce-integration-guide', 'Mwongozo wa Ushirikiano'],
          '/sw/Development/GreenFieldExample',
          '/sw/Development/GreenFieldExample-NodeJS',
          '/sw/Development/GreenfieldExample-PHP'
        ]
      },
      {
        title: 'Uendelezaji',
        path: '/sw/Development/LocalDev',
        children: ['/sw/Development/Altcoins', '/sw/Development/InvoiceMetadata', '/sw/Development/Theme']
      },
      {
        title: 'Plugins',
        path: '/sw/Development/Plugins',
        children: ['/sw/Development/Plugins-Permissions']
      },
      {
        title: 'Zaidi',
        collapsable: false,
        children: [
          ['/sw/ElectrumX', 'ElectrumX'],
          ['/sw/ElectrumWallet', 'Electrum Wallet'],
          ['/sw/WasabiWallet', 'Wasabi Wallet'],
          ['/sw/LedgerWallet', 'Ledger Wallet'],
          ['/sw/ColdCardWallet', 'ColdCard Wallet'],
          ['/sw/Sign-PSBT-with-sparrow-wallet', 'Sparrow Wallet PSBT'],
          ['/sw/SamRockProtocol', 'Itifaki ya SamRock'],
          '/sw/Notifications',
          '/sw/Shopify'
        ]
      }
    ]
  },
  {
    title: 'Changia',
    path: '/sw/Contribute/',
    collapsable: false,
    children: [
      {
        title: 'Msimbo',
        path: '/sw/Contribute/Dev',
        collapsable: false,
        children: ['/sw/Contribute/DevCode', '/sw/Contribute/DevTest']
      },
      {
        title: 'Andika',
        path: '/sw/Contribute/Write',
        collapsable: false,
        children: ['/sw/Contribute/WriteSoftware', '/sw/Contribute/WriteDocs', '/sw/Contribute/WriteBlog']
      },
      ['/sw/Contribute/Design', 'Ubunifu'],
      ['/sw/Contribute/Translate', 'Tafsiri'],
      ['/sw/Contribute/Misc', 'Mengineyo']
    ]
  },
  {
    title: 'Maswali Yanayoulizwa Mara kwa Mara',
    path: '/sw/FAQ/',
    collapsable: false,
    children: [
      ['/sw/FAQ/General', 'Jumla'],
      ['/sw/FAQ/Deployment', 'Usambazaji'],
      ['/sw/FAQ/Synchronization', 'Usawazishaji'],
      ['/sw/FAQ/Integrations', 'Ushirikiano'],
      ['/sw/FAQ/ServerSettings', 'Mipangilio ya Seva'],
      ['/sw/FAQ/Stores', 'Maduka'],
      ['/sw/FAQ/Wallet', 'Pochi'],
      ['/sw/FAQ/Apps', 'Programu'],
      ['/sw/FAQ/LightningNetwork', 'Mtandao wa Lightning'],
      ['/sw/FAQ/Altcoin', 'Altcoin']
    ]
  }
]

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title,
      description: 'BTCPay Server Official Documentation'
    },
    '/sw/': {
      lang: 'sw',
      title: 'BTCPay Server',
      description: 'Hati rasmi za BTCPay Server'
    }
  },
  title,
  description: 'BTCPay Server Official Documentation',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1.0' }],
    ['link', { rel: 'stylesheet', href: '/styles/btcpayserver-variables.css' }]
  ],
  chainWebpack(config) {
    config.module.rule('md').test(/\.md$/).use(preprocessMarkdown).loader(preprocessMarkdown).end()
  },
  plugins: [
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page =>
          $page.frontmatter.description || extractDescription($page._strippedContent),
        author: (_, $site) => info,
        tags: $page => $page.frontmatter.tags || ['BTCPay Server'],
        twitterCard: _ => 'summary',
        type: $page => 'article',
        url: (_, $site, path) => `${baseUrl}${path.replace('.html', pageSuffix)}`,
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
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English'
      },
      '/sw/': {
        selectText: 'Lugha',
        label: 'Kiswahili',
        nav: navSwahili,
        sidebar: sidebarSwahili
      }
    },
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
      '/FAQ/': sidebarFAQ,
      '/': sidebarUserGuide
    }
  }
}
