// https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
const openVideo = embedEl => {
  const lazyAttr = 'data-src'
  const iframe = embedEl.querySelector(`iframe[${lazyAttr}]`)
  if (iframe) {
    const src = iframe.getAttribute(lazyAttr)
    iframe.setAttribute('src', src)
  }
}

const isEnter = e => e.code === 'Enter' || (e.keyCode || e.which) === 13

const handleClick = e => {
  const isSearchInput = e.target.matches('#algolia-search-input') && isEnter(e)

  // blur search field on select
  if (e.target.matches('.ds-dropdown-menu *') || isSearchInput) {
    document.getElementById('algolia-search-input').blur()
  }

  // youtube previews
  if (e.target.matches('.ytEmbed')) {
    openVideo(e.target)
  }
}

// Theme Switch
const COLOR_MODES = ['light', 'dark']
const THEME_ATTR = 'data-btcpay-theme'
const STORE_ATTR = 'btcpay-theme'

function setColorMode (mode) {
  if (COLOR_MODES.includes(mode)) {
    window.localStorage.setItem(STORE_ATTR, mode)
    document.documentElement.setAttribute(THEME_ATTR, mode)
  }
}

if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
  const systemColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? COLOR_MODES[1] : COLOR_MODES[0]
  const userColorMode = window.localStorage.getItem(STORE_ATTR)
  const initialColorMode = COLOR_MODES.includes(userColorMode) ? userColorMode : systemColorMode

  setColorMode(initialColorMode)
}

export default ({ router }) => {
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
    router.onReady(() => {
      const { app } = router

      // redirects
      router.addRoutes([
        // Basics
        { path: '/btcpay-basics', redirect: '/UseCase/' },
        { path: '/btcpay-basics/usecase', redirect: '/UseCase/' },
        { path: '/btcpay-basics/walkthrough', redirect: '/Walkthrough/' },
        { path: '/btcpay-basics/btcpayvsothers', redirect: '/BTCPayVsOthers/' },
        { path: '/btcpay-basics/tryitout', redirect: '/TryItOut/' },
        // Deployment
        { path: '/deployment', redirect: '/Deployment/' },
        { path: '/deployment/deployment', redirect: '/Deployment/' },
        { path: '/deployment/lunanodewebdeployment', redirect: '/LunaNodeWebDeployment/' },
        { path: '/deployment/azuredeployment', redirect: '/AzureDeployment/' },
        { path: '/deployment/azuredeployment/azurepennypinching', redirect: '/AzurePennyPinching/' },
        { path: '/deployment/azuredeployment/changedomain', redirect: '/ChangeDomain/' },
        { path: '/deployment/dockerdeployment', redirect: '/DockerDeployment/' },
        { path: '/deployment/googleclouddeployment', redirect: '/GoogleCloudDeployment/' },
        { path: '/deployment/manualdeployment', redirect: '/ManualDeployment/' },
        { path: '/deployment/manualdeployment/manualdeploymentextended', redirect: '/ManualDeploymentExtended/' },
        { path: '/deployment/hardwaredeployment', redirect: '/HardwareDeployment/' },
        { path: '/deployment/raspberrypideployment', redirect: '/RaspberryPiDeployment/' },
        { path: '/deployment/raspberrypideployment/rpi3', redirect: '/RPi3/' },
        { path: '/deployment/raspberrypideployment/rpi4', redirect: '/RPi4/' },
        { path: '/deployment/thirdpartyhosting', redirect: '/ThirdPartyHosting/' },
        { path: '/deployment/advanced-deployment', redirect: '/DynamicDNS/' },
        { path: '/deployment/advanced-deployment/dynamicdns', redirect: '/DynamicDNS/' },
        { path: '/deployment/advanced-deployment/reversesshtunnel', redirect: '/ReverseSSHtunnel/' },
        // Getting Started
        { path: '/getting-started', redirect: '/RegisterAccount/' },
        { path: '/getting-started/registeraccount', redirect: '/RegisterAccount/' },
        { path: '/getting-started/createstore', redirect: '/CreateStore/' },
        { path: '/getting-started/connectwallet', redirect: '/ConnectWallet/' },
        { path: '/getting-started/connectwallet/ledgerwallet', redirect: '/LedgerWallet/' },
        { path: '/getting-started/connectwallet/coldcardwallet', redirect: '/ColdCardWallet/' },
        { path: '/getting-started/connectwallet/wasabiwallet', redirect: '/WasabiWallet/' },
        { path: '/getting-started/connectwallet/electrumwallet', redirect: '/ElectrumWallet/' },
        { path: '/getting-started/connectwallet/electrumwallet/electrumx', redirect: '/ElectrumX/' },
        { path: '/getting-started/connectwallet/electrumwallet/electrumpersonalserver', redirect: '/ElectrumPersonalServer/' },
        { path: '/getting-started/connectwallet/hotwallet', redirect: '/HotWallet/' },
        { path: '/getting-started/whatsnext', redirect: '/WhatsNext/' },
        // Features
        { path: '/features', redirect: '/Apps/' },
        { path: '/features/apps', redirect: '/Apps/' },
        { path: '/features/wallet', redirect: '/Wallet/' },
        { path: '/features/wallet/hotwallet', redirect: '/HotWallet/' },
        { path: '/features/invoices', redirect: '/Invoices/' },
        { path: '/features/lightningnetwork', redirect: '/LightningNetwork/' },
        { path: '/features/accounting', redirect: '/Accounting/' },
        { path: '/features/paymentrequests', redirect: '/PaymentRequests/' },
        { path: '/features/vault', redirect: '/Vault/' },
        { path: '/features/payjoin', redirect: '/Payjoin/' },
        { path: '/features/payjoin/payjoin-spec', redirect: '/Payjoin-spec/' },
        // Integrations
        { path: '/integrations', redirect: '/WooCommerce/' },
        { path: '/integrations/woocommerce', redirect: '/WooCommerce/' },
        { path: '/integrations/drupal', redirect: '/Drupal/' },
        { path: '/integrations/magento', redirect: '/Magento/' },
        { path: '/integrations/prestashop', redirect: '/PrestaShop/' },
        { path: '/integrations/customintegration', redirect: '/CustomIntegration/' },
        // Deveelopment
        { path: '/development', redirect: '/Architecture/' },
        { path: '/development/architecture', redirect: '/Architecture/' },
        { path: '/development/localdevelopment', redirect: '/LocalDevelopment/' },
        { path: '/development/altcoins', redirect: '/Altcoins/' },
        { path: '/development/architecture', redirect: '/Architecture/' },
        { path: '/development/theme', redirect: '/Theme/' },
        // FAQ
        { path: '/faq-and-common-issues', redirect: '/FAQ/' },
        { path: '/faq-and-common-issues/faq', redirect: '/FAQ/' },
        { path: '/faq-and-common-issues/faq-general', redirect: '/FAQ/FAQ-General/' },
        { path: '/faq-and-common-issues/faq-deployment', redirect: '/FAQ/FAQ-Deployment/' },
        { path: '/faq-and-common-issues/faq-synchronization', redirect: '/FAQ/FAQ-Synchronization/' },
        { path: '/faq-and-common-issues/faq-integrations', redirect: '/FAQ/FAQ-Integrations/' },
        { path: '/faq-and-common-issues/faq-serversettings', redirect: '/FAQ/FAQ-ServerSettings/' },
        { path: '/faq-and-common-issues/faq-stores', redirect: '/FAQ/FAQ-Stores/' },
        { path: '/faq-and-common-issues/faq-wallet', redirect: '/FAQ/FAQ-Wallet/' },
        { path: '/faq-and-common-issues/faq-apps', redirect: '/FAQ/FAQ-Apps/' },
        { path: '/faq-and-common-issues/faq-lightningnetwork', redirect: '/FAQ/FAQ-LightningNetwork/' },
        { path: '/faq-and-common-issues/faq-altcoin', redirect: '/FAQ/FAQ-Altcoin/' },
        // Support
        { path: '/support-and-community', redirect: '/Troubleshooting/' },
        { path: '/support-and-community/troubleshooting', redirect: '/Troubleshooting/' },
        { path: '/support-and-community/support', redirect: '/Support/' },
        { path: '/support-and-community/contribute', redirect: '/Contribute/' },
        { path: '/support-and-community/translate', redirect: '/Translate/' },
        { path: '/support-and-community/community', redirect: '/Community/' }
      ])

      // initial page rendering
      app.$once('hook:mounted', () => {
        setTimeout(() => {
          // append theme switch
          const navbar = document.querySelector('.navbar .links')
          if (navbar) {
            var btn = document.createElement('button')
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            btn.setAttribute('class', 'btcpay-theme-switch')
            svg.setAttribute('viewBox','0 0 10 10')
            svg.setAttribute('width','10')
            svg.setAttribute('height','10')
            svg.innerHTML = '<path class="btcpay-theme-switch-dark" transform="translate(1 1)" d="M2.72 0A3.988 3.988 0 000 3.78c0 2.21 1.79 4 4 4 1.76 0 3.25-1.14 3.78-2.72-.4.13-.83.22-1.28.22-2.21 0-4-1.79-4-4 0-.45.08-.88.22-1.28z"/><path class="btcpay-theme-switch-light" transform="translate(1 1)" d="M4 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 0 4 0zM1.5 1c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM.5 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM1.5 6c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 7 4 7z"/>'
            btn.appendChild(svg)
            navbar.appendChild(btn)

            document.querySelectorAll(".btcpay-theme-switch").forEach(function (link) {
              link.addEventListener("click", function (e) {
                e.preventDefault()
                const current = document.documentElement.getAttribute(THEME_ATTR) || COLOR_MODES[0]
                const mode = current === COLOR_MODES[0] ? COLOR_MODES[1] : COLOR_MODES[0]
                setColorMode(mode)
              })
            })
          }
        }, 250)
      })

      document.addEventListener('click', handleClick)
      document.addEventListener('keyup', e => {
        if (isEnter(e)) handleClick(e)
      })
    })
  }
}
