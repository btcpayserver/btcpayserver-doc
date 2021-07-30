# BTCPay Frequently Asked Questions and Common Issues

This document contains a Table of contents to all FAQ and common issues.

## [General FAQ](./FAQ-General.md)

General, non-technical questions about BTCPay. What it is, how it works, what are its features, why is it different and who can use it.

* [What is BTCPay Server?](./FAQ-General.md#what-is-btcpay-server)
* [Why should I choose BTCPay over other processors?](./FAQ-General.md#why-should-i-choose-btcpay-over-other-processors)
* [Why is everyone so excited about BTCPay?](./FAQ-General.md#why-is-everyone-so-excited-about-btcpay)
* [Who can use BTCPay?](./FAQ-General.md#who-can-use-btcpay)
* [How to install BTCPay?](./FAQ-General.md#how-to-install-btcpay-server)
* [Where to find BTCPay video tutorials?](./FAQ-General.md#where-to-find-btcpay-video-tutorials)
* [Do I need to have an online store to use BTCPay Server?](./FAQ-General.md#do-i-need-to-have-an-online-store-to-use-btcpay-server)
* [Why can't I just give my public address to a buyer?](./FAQ-General.md#why-cant-i-just-give-my-bitcoin-address-to-a-buyer)
* [How does BTCPay create a new address for each invoice?](./FAQ-General.md#how-does-btcpay-create-a-new-address-for-each-invoice)
* [Does BTCPay need my private key?](./FAQ-General.md#does-btcpay-need-myprivate-key)
* [Does BTCPay Server support crypto to fiat conversion?](./FAQ-General.md#does-btcpay-server-support-crypto-to-fiat-conversion)
* [What if I have a problem paying a BTCPay Server invoice?](./FAQ-General.md#what-if-i-have-a-problem-paying-an-invoice)
* [What if I have a problem with a paid invoice?](./FAQ-General.md#what-if-i-have-a-problem-with-a-paid-invoice)
* [Where can I get help and support?](./FAQ-General.md#where-can-i-get-help-and-support)
* [How can I contribute to BTCPay?](./FAQ-General.md#how-can-i-contribute-to-btcpay)
* [How can I use the BTCPay Server API?](./FAQ-General.md#how-can-i-use-the-btcpay-server-api)
* [How can I backup my BTCPay Server?](./FAQ-General.md#how-can-i-backup-my-btcpay-server)
* [How can I charge for using my BTCPay Server instance?](./FAQ-General.md#how-can-i-charge-for-using-my-btcpay-server-instance)

## [Deployment FAQ](./FAQ-Deployment.md)

Questions and solutions to BTCPay installation.

### [General Deployment FAQ](./FAQ-Deployment.md#general-deployment-faq)

* [How much does it cost to run BTCPay Server?](./FAQ-Deployment.md#how-much-does-it-cost-to-run-btcpay-server)
* [What are the minimal requirements for BTCPay?](./FAQ-Deployment.md#what-are-the-minimal-requirements-for-btcpay)
* [What is the easiest method to deploy a self-hosted BTCPay Server?](./FAQ-Deployment.md#what-is-the-easiest-method-to-deploy-a-self-hosted-btcpay-server)
* [How to choose a proper deployment method?](./FAQ-Deployment.md#how-to-choose-a-proper-deployment-method)
* [Why do I need a VPS? Can't I just run BTCPay on my home computer?](FAQ-Deployment.md#can-i-run-btcpay-on-my-home-computer)
* [Can I run BTCPay on my hardware?](./FAQ-Deployment.md#can-i-run-btcpay-on-my-own-hardware)
* [Can I deploy on my existing VPS?](./FAQ-Deployment.md#can-i-deploy-btcpay-on-my-existing-vps)
* [Are there free hosts where I can test?](./FAQ-Deployment.md#are-there-free-hosts-where-i-can-test)
* [After initial deployment, I can't register and I don't have a login yet?](./FAQ-Deployment.md#after-initial-deployment-i-can-t-register-and-i-don-t-have-a-login-yet)
* [How do I activate Tor on my BTCPay Server?](./FAQ-Deployment.md#how-do-i-activate-tor-on-my-btcpay-server)
* [How do I disable Tor on my BTCPay Server?](./FAQ-Deployment.md#how-do-i-disable-tor-on-my-btcpay-server)
* [Why activate Tor? Does it mean that nobody knows who I am?](./FAQ-Deployment.md#why-activate-tor-does-it-mean-that-nobody-knows-who-i-am)
* [How to access the .onion address without clearnet?](./FAQ-Deployment.md#how-to-access-the-onion-address-without-clearnet)
* [How can I modify or deactivate environment variables?](./FAQ-Deployment.md#how-can-i-modify-or-deactivate-environment-variables)
* [How can I run BTCPay on testnet?](./FAQ-Deployment.md#how-can-i-run-btcpay-on-testnet)
* [Can I start BTCPay only when I'm expecting a payment?](./FAQ-Deployment.md#can-i-start-btcpay-only-when-i-m-expecting-a-payment)
* [Can I connect to my BTCPay Bitcoin P2P on port 8333?](./FAQ-Deployment.md#can-i-connect-to-my-btcpay-bitcoin-p2p-on-port-8333)
* [How can I renew my SSL certificate?](./FAQ-Deployment.md#how-can-i-renew-my-ssl-certificate)
* [Can I use an existing Nginx server as a reverse proxy with SSL termination?](./FAQ-Deployment.md#can-i-use-an-existing-nginx-server-as-a-reverse-proxy-with-ssl-termination)

### [Web Deployment FAQ](./FAQ-Deployment.md#web-deployment-faq)

#### [Luna Node Web Deployment FAQ](./FAQ-Deployment.md#luna-node-web-deployment-faq)

* [How to change domain name on my LunaNode BTCPay?](./FAQ-Deployment.md#how-to-change-domain-name-on-my-lunanode-btcpay)

### [Manual Deployment FAQ](./FAQ-Deployment.md#manual-deployment)

* [How to manually install BTCPay on Ubuntu 18.04?](./FAQ-Deployment.md#how-to-manually-install-btcpay-on-ubuntu-18-04)
* [How do I completely uninstall BTCPay from a linux environment (docker version)](./FAQ-Deployment.md#how-do-i-completely-uninstall-btcpay-from-a-linux-environment-docker-version)
* [How to deploy BTCPay Server alongside existing Bitcoin full node?](./FAQ-Deployment.md#how-to-deploy-btcpay-server-alongside-existing-bitcoin-node)
* [With the docker deployment, how to use a different volume for the data?](./FAQ-Deployment.md#with-the-docker-deployment-how-to-use-a-different-volume-for-the-data)
* [Getting 500 nginx error on a local server https and for http (BTCPay is expecting you to access this website from)](./FAQ-Deployment.md#cause-4-getting-500-nginx-error-on-a-local-server-https-and-for-http-btcpay-is-expecting-you-to-access-this-website-from)
* [Error: BTCPay is expecting you to access this website from...](./FAQ-Deployment.md#cause-3-btcpay-is-expecting-you-to-access-this-website-from)
* [You access BTCPay Server over an unsecured network](./FAQ-Deployment.md#cause-3-btcpay-is-expecting-you-to-access-this-website-from)

## [Synchronization FAQ](./FAQ-Synchronization.md)

Common questions and issues that may occur during the initial sync of BTCPay.

* [Why does BTCPay sync?](./FAQ-Synchronization.md#why-does-btcpay-sync)
* [Can I skip/speed up the sync?](./FAQ-Synchronization.md#can-i-skip-the-synchronization)
* [How do I know that the sync is finished?](./FAQ-Synchronization.md#how-do-i-know-that-btcpay-synced-completely)
* [How can I check the block height of my bitcoin node?](./FAQ-Synchronization.md#how-can-i-check-the-block-height-of-my-bitcoin-node)
* [BTCPay takes forever to synchronize](./FAQ-Synchronization.md#btcpay-server-takes-forever-to-synchronize)
* [BTCPay Server keeps showing that my node is always starting](./FAQ-Synchronization.md#btcpay-server-keeps-showing-that-my-node-is-always-starting)
* [I already have a synced full node, can I use it with BTCPay?](./FAQ-Synchronization.md#im-running-a-full-node-and-have-a-synched-blockchain-can-btcpay-use-it-so-that-it-doesnt-have-to-do-a-full-sync)
* [How to enable Bitcoin node pruning?](./FAQ-Synchronization.md#how-to-enable-bitcoin-node-pruning)
* [How to disable Bitcoin node pruning?](./FAQ-Synchronization.md#how-to-disable-bitcoin-node-pruning)

## [Integrations FAQ](./FAQ-Integrations.md)

Questions about e-commerce and other integrations.

### [Integrations General](./FAQ-Integrations.md#integrations-general-faq)

* [What e-commerce integrations are available?](./FAQ-Integrations.md#what-e-commerce-integrations-are-available)
* [Does BTCPay have a Shopify plugin?](./FAQ-Integrations.md#does-btcpay-have-a-shopify-plugin)
* [Can I use BTCPay without an integration?](./FAQ-Integrations.md#can-i-use-btcpay-without-an-integration)

### [WooCommerce FAQ](./FAQ-Integrations.md#woocommerce-faq-2)

* [How to configure order status in WooCommerce?](./FAQ-Integrations.md#how-to-configure-order-status-in-woocommerce)
* [How to customize e-mail confirmations in WooCommerce?](./FAQ-Integrations.md#how-to-customize-e-mail-confirmations-in-woocommerce)
* [Error: If you use an alternative order numbering system, please see class-wc-gateway-btcpay.php to apply a search filter](./FAQ-Integrations.md#error-if-you-use-an-alternative-order-numbering-system-please-see-class-wc-gateway-btcpayphp-to-apply-a-search-filter)

## [Server Settings FAQ](./FAQ-ServerSettings.md)

Common problems and questions server admins have.

### [Maintenance FAQ](./FAQ-ServerSettings.md#maintainance)

* [How to update BTCPay Server?](./FAQ-ServerSettings.md#how-to-update-btcpay-server)
* [How to restart BTCPay Server?](./FAQ-ServerSettings.md#how-to-restart-btcpay-server)
* [How to SSH into my BTCPay running on VPS?](./FAQ-ServerSettings.md#how-to-ssh-into-my-btcpay-running-on-vps)
* [How can I check my BTCPay Server version?](./FAQ-ServerSettings.md#how-can-i-see-my-btcpay-version)
* [How can I check my BTCPay Server version via terminal?](./FAQ-ServerSettings.md#how-can-i-check-my-btcpay-server-version-via-terminal)
* [What is BTCPay SSH key file](./FAQ-ServerSettings.md#what-is-btcpay-ssh-key-file)
* [Forgot BTCPay Admin password](./FAQ-ServerSettings.md#forgot-btcpay-admin-password)
* [How to add a new user by invite?](./FAQ-ServerSettings.md#how-to-add-a-new-user-by-invite)
* [How to disable U2F and 2FA for a user?](./FAQ-ServerSettings.md#how-to-disable-u2f-and-2fa-for-a-user)
* [How to configure SMTP settings in BTCPay?](./FAQ-ServerSettings.md#how-to-configure-smtp-settings-in-btcpay)
* [Error: Maintenance feature requires access to SSH properly configured in BTCPayServer configuration](./FAQ-ServerSettings.md#error-maintenance-feature-requires-access-to-SSH-properly-configured-in-btcpayserver-configuration)
* [Error: Your local changes to the following files would be overwritten by merge](./FAQ-ServerSettings.md#error-your-local-changes-to-the-following-files-would-be-overwritten-by-merge)
* [Error: the BTCPAY_SSHKEYFILE variable is not set/ Unable to update](./FAQ-ServerSettings.md#error-btcpay-sshkeyfile-is-not-set-when-running-the-docker-install-or-unable-to-update-through-server-settings-maintenance)

### [Theme / Customization FAQ](./FAQ-ServerSettings/#theme-customization)

* [How to customize my BTCPay theme style?](./FAQ-ServerSettings.md#how-to-customize-my-btcpay-theme-style)
* [How to modify BTCPay the checkout page?](./FAQ-ServerSettings.md#how-to-modify-the-checkout-page)
* [How to customize the POS app theme?](../Theme.md#2-bootstrap-themes)
* [How to add Google Analytics code to BTCPay?](./FAQ-ServerSettings.md#how-to-add-google-analytics-code-to-btcpay)

### [Policies FAQ](./FAQ-ServerSettings.md#policies)

* [How to allow registration on my BTCPay Server?](./FAQ-ServerSettings.md#how-to-allow-registration-on-my-btcpay-server)
* [How to hide my BTCPay Server from Search Engines?](./FAQ-ServerSettings.md#how-to-hide-my-btcpay-server-from-search-engines)

### [Services FAQ](./FAQ-ServerSettings.md#services)

* [How to remotely connect to my BTCPay full node?](./FAQ-ServerSettings.md#how-to-remotely-connect-to-my-btcpay-full-node)

### [Files FAQ](./FAQ-ServerSettings.md#files)

* [How to upload files to BTCPay?](./FAQ-ServerSettings.md#how-to-upload-files-to-btcpay)

## [Stores FAQ](./FAQ-Stores.md)

Store settings explained.

* [How to create a store in BTCPay?](./FAQ-Stores.md#how-to-create-a-store-in-btcpay)
* [How many stores can I create?](./FAQ-Stores.md#how-many-stores-can-i-create)
* [Why are invoices without payment showing as complete?](./FAQ-Stores.md#why-are-invoices-without-payment-showing-as-complete)
* [Store General Settings](./FAQ-Stores.md#store-general-settings)
* [Add network fee to invoice (vary with mining fees)?](./FAQ-Stores.md#add-network-fee-to-invoice-vary-with-mining-fees)
* [Allow anyone to create invoice?](./FAQ-Stores.md#allow-anyone-to-create-invoice)
* [Invoice expires if the full amount has not been paid after ... minutes?](./FAQ-Stores.md#invoice-expires-if-the-full-amount-has-not-been-paid-after-minutes)
* [Payment invalid if transactions fails to confirm ... minutes after invoice expiration?](./FAQ-Stores.md#payment-invalid-if-transactions-fails-to-confirm-minutes-after-invoice-expiration)
* [Consider the invoice confirmed when the payment transaction?](./FAQ-Stores.md#consider-the-invoice-confirmed-when-the-payment-transaction)
* [Consider the invoice paid even if the paid amount is ... % less than expected?](./FAQ-Stores.md#consider-the-invoice-paid-even-if-the-paid-amount-is-less-than-expected)
* [How to disable email on invoices?](./FAQ-Stores.md#how-to-disable-email-on-invoices)
* [How to denominate invoices in sats?](./FAQ-Stores.md#how-to-denominate-invoices-in-sats)
* [How to collect additional buyer information?](./FAQ-Stores.md#how-to-collect-additional-buyer-information)
* [How to redirect store invoices after payment?](./FAQ-Stores.md#how-to-redirect-store-invoices-after-payment)
* [Can I delete invoices from BTCPay?](./FAQ-Stores.md#can-i-delete-invoices-from-btcpay)
* [How to change the exchange rate provider for invoices?](./FAQ-Stores.md#how-to-change-the-exchange-rate-provider-for-invoices)
* [Getting GetRatesAsync was called on coinaverage error](./FAQ-Stores.md#getting-getratesasync-was-called-on-coinaverage-error)

## [Wallet FAQ](./FAQ-Wallet.md)

Here are some of the questions and problems about wallets in BTCPay.

* [What is BTCPay Server wallet?](./FAQ-Wallet.md#what-is-btcpay-server-wallet)
* [How to set up my wallet with BTCPay Server?](./FAQ-Wallet.md#how-to-set-up-my-wallet-with-btcpay-server)
* [Can I use a hardware wallet with BTCPay Server?](./FAQ-Wallet.md#can-i-use-a-hardware-wallet-with-btcpay-server)
* [Do I have to use BTCPay Server wallet?](./FAQ-Wallet.md#do-i-have-to-use-btcpay-server-wallet)
* [Why is sending a transaction using Trezor failing?](./FAQ-Wallet.md#why-is-sending-a-transaction-using-trezor-failing)
* [Missing payments in wallet?](./FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet)
* [What is a derivation scheme?](./FAQ-Wallet.md#what-is-a-derivation-scheme)
* [What is a Replace-By-Fee (RBF) transaction?](./FAQ-Wallet.md#what-is-a-replace-by-fee-rbf-transaction)
* [How to add custom labels and comments to transactions?](./FAQ-Wallet.md#how-to-add-custom-labels-and-comments-to-transactions)
* [I don't see Lightning network payments in BTCPay wallet?](./FAQ-Wallet.md#i-dont-see-lightning-network-payments-in-btcpay-wallet)
* [Is there a mobile app for BTCPay Server wallet?](./FAQ-Wallet.md#is-there-a-mobile-app-for-btcpay-server-wallet)

## [Apps FAQ](./FAQ-Apps.md)

Frequent questions about the applications in BTCPay.

* [What are the Apps in BTCPay?](./FAQ-Apps.md#what-are-the-apps-in-btcpay)
* [Is there a limit on the number of Apps I can create?](./FAQ-Apps.md#is-there-a-limit-on-the-number-of-apps-i-can-create)
* [Is there a Point of Sale feature in BTCPay?](./FAQ-Apps.md#is-there-a-point-of-sale-feature-in-btcpay)
* [How can I use BTCPay in a physical store?](./FAQ-Apps.md#how-can-i-use-btcpay-in-a-physical-store)
* [How to customize the appearance of POS in BTCPay?](./FAQ-Apps.md#how-to-customize-the-appearance-of-Point-of-Sale-App-in-BTCPay)
* [What is a Payment Button?](./FAQ-Apps.md#what-is-a-payment-button)
* [How to create a Pay Button with a custom amount?](./FAQ-Apps.md#how-to-create-a-pay-button-with-a-custom-amount)
* [How to map a domain name to an app?](./FAQ-Apps.md#how-to-map-a-domain-name-to-an-app)
* [How to redirect to another site after payment?](./FAQ-Apps.md#how-to-redirect-to-another-site-after-payment)
* [How to integrate WooCommerce Store in BTCPay Crowdfund app?](./FAQ-Apps.md#how-to-integrate-woocommerce-store-into-a-btcpay-crowdfund-app)

## [Lightning Network FAQ](./FAQ-LightningNetwork.md)

Lightning Network troubleshooting and common problems.

### [Lightning Network General FAQ](./FAQ-LightningNetwork.md#lightning-network-general-faq)

* [How many users can use Lightning Network in BTCPay?](./FAQ-LightningNetwork.md#how-many-users-can-use-lightning-network-in-btcpay)
* [How to find node info and open a direct channel with a store using BTCPay?](./FAQ-LightningNetwork.md#how-to-find-node-info-and-open-a-direct-channel-with-a-store-using-btcpay)
* [As a merchant, do I need to open direct channels?](./FAQ-LightningNetwork.md#as-a-merchant-do-i-need-to-open-direct-channels)
* [How can I get inbound capacity to my node?](./FAQ-LightningNetwork.md#how-can-i-get-inbound-capacity-to-my-node)
* [Previously installed BTCPay without Lightning, can I enable it?](./FAQ-LightningNetwork.md#i-previously-installed-btcpayserver-without-lightning-can-i-enable-it)
* [Can I use a pruned node with LN in BTCPay?](./FAQ-LightningNetwork.md#can-i-use-a-pruned-node-with-ln-in-btcpay)
* [Can I use my existing LN node with BTCPay?](./FAQ-LightningNetwork.md#can-i-use-my-existing-ln-node-with-btcpay)
* [How to change from c-lightning to LND or vice-versa?](./FAQ-LightningNetwork.md#how-to-change-from-c-lightning-to-lnd-or-vice-versa)
* [Switched Lightning Network implementation, getting "no payment available" error](./FAQ-LightningNetwork.md#i-switched-lightning-network-implementation-but-getting-no-payment-available-error)
* [WARNING: The LIGHTNING_ALIAS variable is not set. Defaulting to a blank string" when starting container](./FAQ-LightningNetwork.md#i-get-warning-the-lightning-alias-variable-is-not-set-defaulting-to-a-blank-string-when-starting-container)
* [How to display my Lightning Node information so that others can connect to me?](./FAQ-LightningNetwork.md#how-to-display-my-lightning-node-information-so-that-others-can-connect-to-me)
* [Where can I find recovery seed backup for my Lightning Network wallet in BTCPay Server?](./FAQ-LightningNetwork.md#where-can-i-find-recovery-seed-backup-for-my-lightning-network-wallet-in-btcpay-server)
* [How to disable on-chain payments and use LN payments only?](./FAQ-LightningNetwork.md#how-to-disable-on-chain-payments-and-use-ln-payments-only)
* [Where can I get Lightning Network Support?](./FAQ-LightningNetwork.md#lightning-network-questions-and-support)
* [How to see my Lightning Network version?](./FAQ-LightningNetwork.md#how-to-see-my-lightning-network-version)

### [Lightning Network (LND) FAQ](./FAQ-LightningNetwork.md#lightning-network-lnd-faq)

* [How to restart my LND?](./FAQ-LightningNetwork.md#how-to-restart-my-lnd)
* [How to see LND logs?](./FAQ-LightningNetwork.md#how-to-see-lnd-logs)
* [What’s the default LND Directory in BTCPay?](./FAQ-LightningNetwork.md#what-s-the-default-directory-of-lnd-in-btcpay)
* [Which macaroon needs to be provided for external nodes?](./FAQ-LightningNetwork.md#which-macaroon-needs-to-be-provided-for-external-nodes)
* [LND connection issue - cannot get macaroon: root key with id 0 doesn’t exist](./FAQ-LightningNetwork.md#lnd-connection-issues-after-an-update)
* [How to change LND Node alias](./FAQ-LightningNetwork.md#how-to-change-my-LND-Node-alias)
* [How to edit lnd.conf](./FAQ-LightningNetwork.md#how-to-edit-lndconf)
* [How to install ThunderHub](./FAQ-LightningNetwork.md#how-to-install-thunderhub)

### [Lightning Network (c-lightning) FAQ](./FAQ-LightningNetwork.md#lightning-network-c-lightning-faq)

* [How to restart my c-lightning?](./FAQ-LightningNetwork.md#how-to-restart-my-c-lightning)
* [How to announce an IPv6 address?](./FAQ-LightningNetwork.md#how-to-announce-an-ipv6-address)
* [How to find an on-chain address in Spark?](./FAQ-LightningNetwork.md#how-to-find-an-on-chain-address-in-spark)
* [How to withdraw funds from my on-chain Spark wallet?](./FAQ-LightningNetwork.md#how-to-withdraw-funds-from-my-on-chain-spark-wallet)

## [Altcoins FAQ](./FAQ-Altcoin.md)

* [Which coins does BTCPay Server support?](./FAQ-Altcoin.md#which-coins-does-btcpay-server-support)
* [Can an XYZ coin be added in BTCPay?](./FAQ-Altcoin.md#can-an-xyz-coin-be-added-in-btcpay)
* [How to add an altcoin to BTCPay?](./FAQ-Altcoin.md#how-to-add-an-altcoin-in-btcpay)
* [How to add an altcoin to an existing BTCPay deployment?](./FAQ-Altcoin.md#how-to-add-an-altcoin-to-an-existing-btcpay-deployment)
* [How to remove a coin from BTCPay?](./FAQ-Altcoin.md#how-to-remove-a-coin-from-btcpay)
