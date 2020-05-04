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
    ["link", { rel: "stylesheet", href: "/styles/btcpayserver-variables.css" }],
    // ["link", { rel: "stylesheet", href: "/styles/btcpayserver-main.css" }]
  ],
  themeConfig: {
    logo: "/img/btcpay-logo.svg",
    displayAllHeaders: false,
    repo: "btcpayserver/btcpayserver-doc",
    docsDir: "docs",
    editLinks: true,
    sidebarDepth: 1,
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
        sidebarDepth: 1
      },
      {
        title: "BTCPay Basics",
        collapsable: false,
        sidebarDepth: 1,
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
        sidebarDepth: 0,
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
            sidebarDepth: 0,
            children: [
              "ManualDeploymentExtended"
            ]
          },
          "HardwareDeployment",
          {
            title: "Raspberry Pi Deployment",
            path: "RaspberryPiDeployment",
            sidebarDepth: 0,
            children: [
              "RPi3",
              "RPi4"
            ]
          },
          "ThirdPartyHosting",
          {
            title: "Advanced Deployment",
            collapsable: false,
            sidebarDepth: 0,
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
        sidebarDepth: 0,
        children: [
          "RegisterAccount",
          "CreateStore",
          {
            title: "(3) Connect a Wallet",
            path: "ConnectWallet",
            collapsable: false,
            sidebarDepth: 0,
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
        sidebarDepth: 0,
        children: [
          {
            title: "Wallet",
            path: "Wallet",
            collapsable: false,
            sidebarDepth: 0,
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
            sidebarDepth: 0,
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
        sidebarDepth: 0,
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
        sidebarDepth: 0,
        children: [
          "/Docker/pihole"
        ]
      },
      {
        title: "Transmuter",
        path: "/Transmuter/",
        collapsable: false,
        sidebarDepth: 0,
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
