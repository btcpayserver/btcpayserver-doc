module.exports = [
  // Basics
  { path: '/btcpay-basics', redirect: '/UseCase/' },
  { path: '/btcpay-basics/usecase', redirect: '/UseCase/' },
  { path: '/btcpay-basics/walkthrough', redirect: '/Users/' },
  { path: '/btcpay-basics/btcpayvsothers', redirect: '/BTCPayVsOthers/' },
  { path: '/btcpay-basics/tryitout', redirect: '/TryItOut/' },
  {
    path: '/btcpay-basics/gettingstarted',
    redirect: '/Users/account-and-store-setup/#create-an-account'
  },
  // Deployment
  { path: '/deployment', redirect: '/Deployment/' },
  { path: '/deployment/deployment', redirect: '/Deployment/' },
  {
    path: '/deployment/lunanodewebdeployment',
    redirect: '/Deployment/LunaNode/'
  },
  { path: '/deployment/azuredeployment', redirect: '/Deployment/Azure/' },
  {
    path: '/deployment/azuredeployment/azurepennypinching',
    redirect: '/Deployment/AzurePennyPinching/'
  },
  {
    path: '/deployment/azuredeployment/changedomain',
    redirect: '/FAQ/Deployment/#how-to-change-your-btcpay-server-domain-name'
  },
  { path: '/deployment/dockerdeployment', redirect: '/Docker/' },
  {
    path: '/deployment/googleclouddeployment',
    redirect: '/Deployment/GoogleCloud/'
  },
  {
    path: '/deployment/manualdeployment',
    redirect: '/Deployment/ManualDeployment/'
  },
  {
    path: '/deployment/manualdeployment/manualdeploymentextended',
    redirect: '/Deployment/ManualDeploymentExtended/'
  },
  { path: '/deployment/hardwaredeployment', redirect: '/Deployment/Hardware/' },
  {
    path: '/deployment/raspberrypideployment',
    redirect: '/Deployment/RaspberryPi4/'
  },
  {
    path: '/deployment/raspberrypideployment/rpi3',
    redirect: '/Deployment/RaspberryPi4/'
  },
  {
    path: '/deployment/raspberrypideployment/rpi4',
    redirect: '/Deployment/RaspberryPi4/'
  },
  {
    path: '/deployment/thirdpartyhosting',
    redirect: '/Deployment/ThirdPartyHosting/'
  },
  {
    path: '/deployment/advanced-deployment',
    redirect: '/Deployment/DynamicDNS/'
  },
  {
    path: '/deployment/advanced-deployment/dynamicdns',
    redirect: '/Deployment/DynamicDNS/'
  },
  {
    path: '/deployment/advanced-deployment/reversesshtunnel',
    redirect: '/Deployment/ReverseSSHtunnel/'
  },
  { path: '/LunaNodeWebDeployment', redirect: '/Deployment/LunaNode/' },
  { path: '/ThirdPartyHosting', redirect: '/Deployment/ThirdPartyHosting/' },
  // Getting Started
  { path: '/getting-started', redirect: '/Users/' },
  {
    path: '/getting-started/registeraccount',
    redirect: '/Users/account-and-store-setup/#create-an-account'
  },
  {
    path: '/getting-started/createstore',
    redirect: '/Users/account-and-store-setup/#create-a-store'
  },
  { path: '/getting-started/connectwallet', redirect: '/Users/wallet-setup/' },
  { path: '/ConnectWallet', redirect: '/Users/wallet-setup/' },
  {
    path: '/getting-started/connectwallet/ledgerwallet',
    redirect: '/LedgerWallet/'
  },
  {
    path: '/getting-started/connectwallet/coldcardwallet',
    redirect: '/ColdCardWallet/'
  },
  {
    path: '/getting-started/connectwallet/wasabiwallet',
    redirect: '/WasabiWallet/'
  },
  {
    path: '/getting-started/connectwallet/electrumwallet',
    redirect: '/ElectrumWallet/'
  },
  {
    path: '/getting-started/connectwallet/electrumwallet/electrumx',
    redirect: '/ElectrumX/'
  },
  {
    path: '/getting-started/connectwallet/electrumwallet/electrumpersonalserver',
    redirect: '/ElectrumPersonalServer/'
  },
  { path: '/getting-started/whatsnext', redirect: '/Users/next-steps/' },
  // Features
  { path: '/features', redirect: '/Apps/' },
  { path: '/features/apps', redirect: '/Apps/' },
  { path: '/features/wallet', redirect: '/Wallet/' },
  { path: '/features/invoices', redirect: '/Invoices/' },
  { path: '/features/lightningnetwork', redirect: '/LightningNetwork/' },
  {
    path: '/LightningNetwork_PaymentChannels/',
    redirect: '/LightningNetwork-Setup/#managing-ongoing-liquidity'
  },
  { path: '/features/accounting', redirect: '/Reporting/' },
  { path: '/Accounting', redirect: '/Reporting/' },
  { path: '/features/paymentrequests', redirect: '/PaymentRequests/' },
  { path: '/features/vault', redirect: '/HardwareWalletIntegration/' },
  { path: '/features/payjoin', redirect: '/Payjoin/' },
  {
    path: '/features/payjoin/payjoin-spec',
    redirect: 'https://github.com/bitcoin/bips/blob/master/bip-0078.mediawiki'
  },
  // Integrations
  { path: '/integrations', redirect: '/WooCommerce/' },
  { path: '/integrations/woocommerce', redirect: '/WooCommerce/' },
  { path: '/integrations/drupal', redirect: '/Drupal/' },
  { path: '/integrations/magento', redirect: '/Magento/' },
  { path: '/integrations/phocacart', redirect: '/PhocaCart/' },
  { path: '/integrations/prestashop', redirect: '/PrestaShop/' },
  { path: '/integrations/virtuemart', redirect: '/VirtueMart/' },
  { path: '/integrations/opencart', redirect: '/OpenCart/' },
  { path: '/integrations/shopware', redirect: '/Shopware/' },
  { path: '/integrations/customintegration', redirect: '/CustomIntegration/' },
  { path: '/shopify', redirect: '/ShopifyV2' },
  // Development
  {
    path: '/development',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/architecture.md'
  },
  {
    path: '/development/architecture',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/architecture.md'
  },
  {
    path: '/development/localdevelopment',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/local-development.md'
  },
  { path: '/development/altcoins', redirect: '/Development/Altcoins/' },
  { path: '/development/theme', redirect: '/Development/Theme/' },
  // FAQ
  { path: '/faq-and-common-issues', redirect: '/FAQ/' },
  { path: '/faq-and-common-issues/faq', redirect: '/FAQ/' },
  { path: '/faq-and-common-issues/faq-general', redirect: '/FAQ/General/' },
  {
    path: '/faq-and-common-issues/faq-deployment',
    redirect: '/FAQ/Deployment/'
  },
  {
    path: '/faq-and-common-issues/faq-synchronization',
    redirect: '/FAQ/Synchronization/'
  },
  {
    path: '/faq-and-common-issues/faq-integrations',
    redirect: '/FAQ/Integrations/'
  },
  {
    path: '/faq-and-common-issues/faq-serversettings',
    redirect: '/FAQ/ServerSettings/'
  },
  { path: '/faq-and-common-issues/faq-stores', redirect: '/FAQ/Stores/' },
  { path: '/faq-and-common-issues/faq-wallet', redirect: '/FAQ/Wallet/' },
  { path: '/faq-and-common-issues/faq-apps', redirect: '/FAQ/Apps/' },
  {
    path: '/faq-and-common-issues/faq-lightningnetwork',
    redirect: '/FAQ/LightningNetwork/'
  },
  { path: '/faq-and-common-issues/faq-altcoin', redirect: '/FAQ/Altcoin/' },
  { path: '/FAQ/FAQ-General/', redirect: '/FAQ/General/' },
  { path: '/FAQ/FAQ-Deployment/', redirect: '/FAQ/Deployment/' },
  { path: '/FAQ/FAQ-Synchronization/', redirect: '/FAQ/Synchronization/' },
  { path: '/FAQ/FAQ-Integrations/', redirect: '/FAQ/Integrations/' },
  { path: '/FAQ/FAQ-ServerSettings/', redirect: '/FAQ/ServerSettings/' },
  { path: '/FAQ/FAQ-Stores/', redirect: '/FAQ/Stores/' },
  { path: '/FAQ/FAQ-Wallet/', redirect: '/FAQ/Wallet/' },
  { path: '/FAQ/FAQ-Apps/', redirect: '/FAQ/Apps/' },
  { path: '/FAQ/FAQ-LightningNetwork/', redirect: '/FAQ/LightningNetwork/' },
  { path: '/FAQ/FAQ-Altcoin/', redirect: '/FAQ/Altcoin/' },
  // Support
  { path: '/support-and-community', redirect: '/Troubleshooting/' },
  {
    path: '/support-and-community/troubleshooting',
    redirect: '/Troubleshooting/'
  },
  { path: '/support-and-community/support', redirect: '/Support/' },
  { path: '/support-and-community/contribute', redirect: '/Contribute/' },
  { path: '/support-and-community/translate', redirect: '/Contribute/Translate/' },
  { path: '/support-and-community/community', redirect: '/Community/' },
  // Old paths in new docs
  { path: '/DockerDeployment/', redirect: '/Docker/' },
  { path: '/HotWallet/', redirect: '/Users/wallet-setup/' },
  {
    path: '/Contribute/ContributeDev/',
    redirect: 'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/README.md'
  },
  {
    path: '/Contribute/ContributeDevCode/',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/local-development.md'
  },
  {
    path: '/Contribute/ContributeDevTest/',
    redirect: 'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/testing.md'
  },
  { path: '/Contribute/ContributeWrite/', redirect: '/Contribute/Write/' },
  {
    path: '/Contribute/ContributeWrite/WriteSoftware',
    redirect: '/Contribute/WriteSoftware/'
  },
  {
    path: '/Contribute/ContributeWrite/WriteDocs',
    redirect: '/Contribute/WriteDocs/'
  },
  {
    path: '/Contribute/ContributeWrite/WriteBlog',
    redirect: '/Contribute/WriteBlog/'
  },
  { path: '/Contribute/ContributeDesign', redirect: '/Contribute/Design/' },
  {
    path: '/Contribute/ContributeTranslate',
    redirect: '/Contribute/Translate/'
  },
  { path: '/Contribute/ContributeMisc', redirect: '/Contribute/Misc/' },
  { path: '/Theme/', redirect: '/Development/Theme/' },
  { path: '/GreenFieldExample/', redirect: '/Developers/api/examples/#curl' },
  {
    path: '/ChangeDomain/',
    redirect: '/FAQ/Deployment/#how-to-change-your-btcpay-server-domain-name'
  },
  { path: '/DynamicDNS/', redirect: '/Deployment/DynamicDNS/' },
  { path: '/Deployment/RaspberryPi/', redirect: '/Deployment/RaspberryPi4/' },
  { path: '/Deployment/RPi3/', redirect: '/Deployment/RaspberryPi4/' },
  { path: '/Deployment/RPi4/', redirect: '/Deployment/RaspberryPi4/' },
  {
    path: '/Deployment/ChangeDomain',
    redirect: '/FAQ/Deployment/#how-to-change-your-btcpay-server-domain-name'
  },
  // Pages migrated into the BTCPay Server repository
  { path: '/Users/overview/', redirect: '/Users/' },
  { path: '/Users/account-and-store-setup/', redirect: '/Users/' },
  { path: '/Users/wallet-setup/', redirect: '/Users/' },
  { path: '/Users/first-payment/', redirect: '/Users/' },
  { path: '/Users/next-steps/', redirect: '/Users/' },
  { path: '/Operators/configuration/', redirect: '/Operators/' },
  { path: '/Operators/host-integration/', redirect: '/Operators/' },
  { path: '/Operators/database-migration/', redirect: '/Operators/' },
  { path: '/Operators/diagnostics/', redirect: '/Operators/' },
  {
    path: '/RegisterAccount/',
    redirect: '/Users/account-and-store-setup/#create-an-account'
  },
  {
    path: '/CreateStore/',
    redirect: '/Users/account-and-store-setup/#create-a-store'
  },
  { path: '/WalletSetup/', redirect: '/Users/wallet-setup/#set-up-a-wallet' },
  { path: '/CreateWallet/', redirect: '/Users/wallet-setup/#set-up-a-wallet' },
  { path: '/Guide/', redirect: '/Users/#overview' },
  { path: '/Walkthrough/', redirect: '/Users/#user-guide' },
  { path: '/WhatsNext/', redirect: '/Users/next-steps/#next-steps' },
  {
    path: '/Development/HostIntegration/',
    redirect: '/Operators/host-integration/#host-integration'
  },
  {
    path: '/Development/GreenFieldExample/',
    redirect: '/Developers/api/examples/#curl'
  },
  {
    path: '/Development/GreenFieldExample-NodeJS/',
    redirect: '/Developers/api/examples/#nodejs'
  },
  {
    path: '/Development/GreenfieldExample-PHP/',
    redirect: '/Developers/api/examples/#php'
  },
  {
    path: '/Development/Plugins/',
    redirect: '/Developers/plugins/#plugin-development'
  },
  {
    path: '/Development/Plugins-Permissions/',
    redirect: '/Developers/plugins/permissions/#plugin-authentication-and-permissions'
  },
  {
    path: '/Development/LocalDevelopment/',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/local-development.md'
  },
  {
    path: '/Development/LocalDev/',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/local-development.md'
  },
  {
    path: '/Contribute/Dev/',
    redirect: 'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/README.md'
  },
  {
    path: '/Contribute/DevCode/',
    redirect:
      'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/local-development.md'
  },
  {
    path: '/Contribute/DevTest/',
    redirect: 'https://github.com/btcpayserver/btcpayserver/blob/master/docs/maintainers/testing.md'
  },
  { path: '/BTCPayServer/db-migration/', redirect: '/Operators/database-migration/' },
  {
    path: '/BTCPayServer/greenfield-development/',
    redirect: '/Developers/api/compatibility/'
  },
  {
    path: '/BTCPayServer/greenfield-authorization/',
    redirect: '/Developers/api/authentication/'
  }
]
