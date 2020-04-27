# BTCPayServer Documentation

## Introduction

BTCPay Server is an open-source, self-hosted payment processor for Bitcoin and other cryptocurrencies.

If you have trouble using BTCPay Server, consider joining the [communities listed on the official website](https://btcpayserver.org/#communityCTA) to get help from BTCPay community members. 

Only file [Github issue](https://github.com/btcpayserver/btcpayserver/issues) for technical issues you can't resolve through other channels or feature requests you've validated with other members of community.

Please check out our [official website](https://btcpayserver.org/), our [complete documentation](https://github.com/btcpayserver/btcpayserver-doc) and [FAQ](https://github.com/btcpayserver/btcpayserver-doc/tree/master/FAQ#btcpay-frequently-asked-questions-and-common-issues) for more details.

![](img/BTCPayServerScreenshot.png) 

## Features

* Direct, peer-to-peer Bitcoin payments
* No transaction fees (other than the [network fee](https://en.bitcoin.it/wiki/Miner_fees))
* No processing fees
* No middleman
* No KYC
* Non-custodial (complete control over the private key)
* Enhanced privacy
* Enhanced security
* Self-hosted
* SegWit support
* Lightning Network support (LND, c-lightning, Eclair and Ptarmigan)
* Tor support
* Opt-in [altcoin](Altcoins.md) integrations
* Full compatibility with BitPay API (easy migration)
* Process payments for others
* Easy-embeddable Payment buttons
* Point of sale app
* Crowdfunding app
* Payment Requests
* Internal, full-node reliant wallet with [hardware wallet integration](Vault.md)
* [Payjoin Support](Payjoin.md)

## How it works

[![How BTCPay Works](img/thumbnails/HowBTCPayServerWorks.png)](https://www.youtube.com/watch?v=nr0UNbz3AoQ "How BTCPay Server Works")

### In a nutshell

In layman's terms, BTCPay Server is a self-hosted and automated invoicing system. At checkout, the customer is presented with an invoice. Each time, a different address is tied to a particular invoice, so there is no address re-use. BTCPay Server follows the status of the invoice through the blockchain and informs a merchant when he can fulfill the order safely.

### How is it different

BTCPay is code, not a company. There is no third-party between a merchant and a customer. The merchant is always in full control of the funds. There are no processing or subscription fees, apart from BTC network fees. BTCPay Server is free to use and completely open-source, so developers or security auditors can always inspect the quality of the code.

[![BTCPay Server Simply Explained](img/thumbnails/BTCPayServerSimplyExplained.png)](https://www.youtube.com/watch?v=dbX6qWZlxOw "BTCPay Server Simply Explained")

### How it keeps funds secure

Payments via BTCPay Server are direct, peer to peer. The merchant receives the coins directly to their wallet, with no intermediary. Securing funds comes down to the merchant securing their own private keys, which is standard for most cryptocurrency wallets. 

There is an [internal wallet](Wallet.md) inside BTCPay Server that merchants can use to view and spend funds received by their customers. The funds from that wallet can only be spent, if a transaction is signed with the merchant's compatible hardware wallet or a private key. This allows merchants to have complete control of funds received.

### How it keeps data private

The data is shared only between two parties - the buyer and a seller. Other payment processors collect and share user data with other parties, making it very hard to comply with privacy law regulations like GDPR. Each invoice in BTCPay Server has a different receiving address, so there is no [address re-use](https://en.bitcoin.it/wiki/Address_reuse) which improves privacy significantly.

### How it resists censorship

* Self-hosted
* Can be run everywhere, from low-powered device like Raspberry Pi at home to enterprise-grade servers
* No third-party
* Can easily be re-deployed

BTCPay Server does not have a central point of failure since nobody is controlling it except for the user running it. If run on the cloud server, the hosting providers can potentially censor users by suspending hosting accounts or disabling access to virtual machines. This is always a risk for anyone using a hosting provider. Since no private keys are stored on the server, a censored individual can easily re-deploy the server with another host. Your coins are always inside your wallet.

If an invoice is paid while your BTCPay Server is down, the software will automatically determine and notify the merchant of offline invoice payments when your server is back up. If a hosting provider suspends the server, and there was no proper backup, server settings and invoice data may be lost, but on-chain payments are always in your wallet. For ultimate censorship-resistance, users should run [BTCPay on their own hardware](HardwareDeployment.md). The software can even be run on a single-board computer, like [Raspberry Pi](RaspberryPiDeployment.md) from the comfort of your home.

### Beyond payment processing

BTCPay Server is often misconceived as being the payment processor used by the merchants only. In reality, the [use-cases](UseCase.md) are limitless. 

BTCPay is a tech-stack that glues lots of complex components into an easy-to-use and coherent interface. The software can be used by self-sovereign individuals as a way to run a full node at home with a full-node reliant wallet.

Developers can build the entire businesses and projects on top of the stack. 

Enterprises can use it as scalable and secure back-end of their infrastracture without ever having to put a trust in a third-party. BTCPay Server is a [toolbox](https://www.facebook.com/kriptomedia/videos/vl.418099655731067/2898112140218815) with lots of tools you can use, it's up to you how you want to use it.

## Documentation

### BTCPay Basics

  - [Use Case](UseCase.md)
  - [Walkthrough](Walkthrough.md)
  - [BTCPay vs other processors](BTCPayVsOthers.md)
  - [Try it Out](TryItOut.md)

### Getting Started

  - [(1) Register account](RegisterAccount.md)
  - [(2) Create a store](CreateStore.md)
  - [(3) Connect a wallet](ConnectWallet.md)
    - [Ledger Wallet](LedgerWallet.md)
    - [ColdCard Wallet](ColdCardWallet.md)
    - [Wasabi Wallet](WasabiWallet.md)
    - [Electrum Wallet](ElectrumWallet.md)
      - [ElectrumX](ElectrumX.md)
      - [Electrum Personal Server EPS](ElectrumPersonalServer.md)
- [(4) What's next](WhatsNext.md)

### Deployment
- [Choosing a Deployment Method](Deployment.md)
- [Web Deployment](LunaNodeWebDeployment.md)
- [Azure Deployment](AzureDeployment.md)
    - [Reducing Cost on Azure](AzurePennyPinching.md)
    - [Changing Domain](ChangeDomain.md) 
- [Docker Deployment](DockerDeployment.md)
- [Google Cloud Deployment](GoogleCloudDeployment.md)
- [Manual Deployment](ManualDeployment.md)
    - [Manual Deployment Extended](ManualDeploymentExtended.md)
- [Hardware Deployment](HardwareDeployment.md)
- [Raspberry Pi Deployment](RaspberryPiDeployment.md)
    - [Raspberry Pi 3 Deployment](RPi3.md)
    - [Raspberry Pi 4 Deployment](RPi4.md)
- [Third-Party Hosting](ThirdPartyHosting.md)

### Features

* [Wallet](Wallet.md)
* [Invoices](Invoices.md)
* [Apps](Apps.md)
* [Lightning Network](LightningNetwork.md)
* [Accounting](Accounting.md)
* [Payment Requests](PaymentRequests.md)
* [Hardware Wallet Integration (BTCPay Vault) ](Vault.md)
* [Payjoin](Payjoin.md)
  - [Payjoin Specification](Payjoin-spec.md)

### Integrations

* [WooCommerce](WooCommerce.md)
* [Drupal](Drupal.md)
* [Magento](Magento.md)
* [PrestaShop](PrestaShop.md)
* [Custom Integration](CustomIntegration.md)

### Development

* [Architecture](Architecture.md)
* [Developing Locally](LocalDevelopment.md)
* [How to add an Altcoin](Altcoins.md)
* [Customizing Themes](Theme.md)

### FAQ and common issues

* [FAQ Table of Contents](FAQ/readme.md)
* [General FAQ](FAQ/FAQ-General.md)
* [Deployment FAQ](FAQ/FAQ-Deployment.md)
* [Synchronization FAQ](FAQ/FAQ-Synchronization.md)
* [Integrations FAQ](FAQ/FAQ-Integrations.md)
* [Server Settings FAQ](FAQ/FAQ-ServerSettings.md)
* [Stores FAQ](FAQ/FAQ-Stores.md)
* [Wallet FAQ](FAQ/FAQ-Wallet.md)
* [Apps FAQ](FAQ/FAQ-Apps.md)
* [Lightning Network FAQ](FAQ/FAQ-LightningNetwork.md)
* [Altcoins FAQ](FAQ/FAQ-Altcoin.md)

### Support and Community

* [Troubleshooting an issue](Troubleshooting.md)
* [Support](Support.md)
* [Contribute](Contribute.md)
* [Translate](Translate.md)
* [Community](Community.md)

### Community articles

* [The Ultimate Guide to BTCPay - The free and open-source Bitcoin Payment processor](https://www.reddit.com/r/Bitcoin/comments/8f1eqf/the_ultimate_guide_to_btcpay_the_free_and/)
* [The Ultimate List of BTCPay Server Hosts and Merchants](https://bitcoinshirt.co/btcpay-stores/)
* [BTCPay Server official youtube channel](https://www.youtube.com/channel/UCpG9WL6TJuoNfFVkaDMp9ug)
* [BTCPay Server Manual Install](http://blog.sipsorcery.com/?p=1052)
* [How to Setup BTC and Lightning Payment Gateway with BTCPayServer on Linux (Manual Install)](https://freedomnode.com/blog/114/how-to-setup-btc-and-lightning-payment-gateway-with-btcpayserver-on-linux-manual-install)
* [BTCPay Server Setup Using Digital Ocean](https://medium.com/@molthoff/running-btcpay-on-digital-ocean-for-10-month-how-to-add-other-coins-7a497339fb2f)
* [BTCPay Server Setup Using AWS EC2](https://wiki.ion.radar.tech/tutorials/nodes/btcpay-+-aws-ec2)

For list of articles, podcasts and video presentations about BTCPay, please see our [media repository](https://github.com/btcpayserver/btcpayserver-media/tree/master/Publications).

### Contributing

Pull requests are welcome and appreciated.

If you're beginner, take a look at the step by step guide on how to contribute to BTCPay Server documentation below.

[![Contributing to Documentation](img/thumbnails/ContributingDocumentation.png)](https://www.youtube.com/watch?v=bSDROcdSSWw "How BTCPay Server Works")

### Supporters

The BTCPay Server Project is proudly supported by these entities through the [BTCPay Server Foundation](https://foundation.btcpayserver.org/).

![](img/SupportersReadme.PNG)

If you'd like to support the project, please visit the [donation page](https://btcpayserver.org/donate/).
