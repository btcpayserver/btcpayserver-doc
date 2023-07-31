module.exports = [
  // Basics
  { path: '/btcpay-basics', redirect: '/UseCase/' },
  { path: '/btcpay-basics/usecase', redirect: '/UseCase/' },
  { path: '/btcpay-basics/walkthrough', redirect: '/Walkthrough/' },
  { path: '/btcpay-basics/btcpayvsothers', redirect: '/BTCPayVsOthers/' },
  { path: '/btcpay-basics/tryitout', redirect: '/TryItOut/' },
  { path: '/btcpay-basics/gettingstarted', redirect: '/RegisterAccount/' },
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
    redirect: '/Deployment/ChangeDomain/'
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
  { path: '/getting-started', redirect: '/RegisterAccount/' },
  { path: '/getting-started/registeraccount', redirect: '/RegisterAccount/' },
  { path: '/getting-started/createstore', redirect: '/CreateStore/' },
  { path: '/getting-started/connectwallet', redirect: '/WalletSetup/' },
  { path: '/ConnectWallet', redirect: '/WalletSetup/' },
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
  { path: '/getting-started/whatsnext', redirect: '/WhatsNext/' },
  // Features
  { path: '/features', redirect: '/Apps/' },
  { path: '/features/apps', redirect: '/Apps/' },
  { path: '/features/wallet', redirect: '/Wallet/' },
  { path: '/features/invoices', redirect: '/Invoices/' },
  { path: '/features/lightningnetwork', redirect: '/LightningNetwork/' },
  { path: '/features/accounting', redirect: '/Accounting/' },
  { path: '/features/paymentrequests', redirect: '/PaymentRequests/' },
  { path: '/features/vault', redirect: '/HardwareWalletIntegration/' },
  { path: '/Vault', redirect: '/HardwareWalletIntegration/' },
  { path: '/features/payjoin', redirect: '/Payjoin/' },
  { path: '/features/payjoin/payjoin-spec', redirect: '/Payjoin-spec/' },
  // Integrations
  { path: '/integrations', redirect: '/WooCommerce/' },
  { path: '/integrations/woocommerce', redirect: '/WooCommerce/' },
  { path: '/integrations/drupal', redirect: '/Drupal/' },
  { path: '/integrations/magento', redirect: '/Magento/' },
  { path: '/integrations/prestashop', redirect: '/PrestaShop/' },
  { path: '/integrations/virtuemart', redirect: '/VirtueMart/' },
  { path: '/integrations/opencart', redirect: '/OpenCart/' },
  { path: '/integrations/shopware', redirect: '/Shopware/' },
  { path: '/integrations/customintegration', redirect: '/CustomIntegration/' },
  // Development
  { path: '/development', redirect: '/Development/Architecture/' },
  { path: '/development/architecture', redirect: '/Development/Architecture/' },
  {
    path: '/development/localdevelopment',
    redirect: '/Development/LocalDevelopment/'
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
  // Redirects for old c-lightning faq links
  {
    path: '/FAQ/LightningNetwork/#how-to-change-from-c-lightning-to-lnd-or-vice-versa',
    redirect: '/FAQ/LightningNetwork/#how-to-change-from-core-lightning-cln-to-lnd-or-vice-versa'
  },
  {
    path: '/FAQ/LightningNetwork/#lightning-network-c-lightning-faq',
    redirect: '/FAQ/LightningNetwork/#lightning-network-core-lightning-cln-faq'
  },
  {
    path: '/FAQ/LightningNetwork/#how-to-restart-my-c-lightning',
    redirect: '/FAQ/LightningNetwork/#how-to-restart-my-core-lightning-cln'
  },
  { path: '/FAQ/FAQ-Altcoin/', redirect: '/FAQ/Altcoin/' },
  // Support
  { path: '/support-and-community', redirect: '/Troubleshooting/' },
  {
    path: '/support-and-community/troubleshooting',
    redirect: '/Troubleshooting/'
  },
  { path: '/support-and-community/support', redirect: '/Support/' },
  { path: '/support-and-community/contribute', redirect: '/Contribute/' },
  { path: '/support-and-community/translate', redirect: '/Translate/' },
  { path: '/support-and-community/community', redirect: '/Community/' },
  // Old paths in new docs
  { path: '/DockerDeployment/', redirect: '/Docker/' },
  { path: '/HotWallet/', redirect: '/CreateWallet/' },
  { path: '/Contribute/ContributeDev/', redirect: '/Contribute/Dev/' },
  { path: '/Contribute/ContributeDevCode/', redirect: '/Contribute/DevCode/' },
  { path: '/Contribute/ContributeDevTest/', redirect: '/Contribute/DevTest/' },
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
  { path: '/GreenFieldExample/', redirect: '/Development/GreenFieldExample/' },
  { path: '/ThirdPartyHosting/', redirect: '/Deployment/ThirdPartyHosting/' },
  { path: '/ChangeDomain/', redirect: '/Deployment/ChangeDomain/' },
  { path: '/DynamicDNS/', redirect: '/Deployment/DynamicDNS/' },
  { path: '/Deployment/RaspberryPi/', redirect: '/Deployment/RaspberryPi4/' },
  { path: '/Deployment/RPi3/', redirect: '/Deployment/RaspberryPi4/' },
  { path: '/Deployment/RPi4/', redirect: '/Deployment/RaspberryPi4/' },
  {
    path: '/Deployment/ChangeDomain',
    redirect: '/FAQ/Deployment/#how-to-change-your-btcpay-server-domain-name'
  }
]
