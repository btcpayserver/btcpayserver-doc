# BTCPayServer Documentation

## Introduction

BTCPayServer is an open-source, self-hosted payment processor for Bitcoin and other cryptocurrencies.

If you have any issues with BTCPay, please file a [Github issue](https://github.com/btcpayserver/btcpayserver/issues).
If you have more general questions, please come on [Slack](http://slack.btcpayserver.org/) or check our [Wiki Page](https://nbitstack.com/c/btcpayserver) for common issues.

This solution is for you if:

* You want to be in control of your own funds
* Compliance teams of traditional payment processors rejected your application
* You want lower fees (we support SegWit)
* You want a way to support payments in altcoins
* You want to accept payments on the Lightning Network
* You want universally compatible invoices (we support the Bitpay API)

![BTCPayInfographic](img/BTCPAYINFOGRAPHIC.png)

## How it works
### In a nutshell
In layment words, BTCPay Server is a self-hosted and automated invoicing system. When checking out, the customer is presented with an invoice. Each time, a different address is tied to a particular invoice, so there is no address re-use. BTCPay follows the status of the invoice through the blockchain and informs a merchant when he can fulfil the order safely.
### How is it different
BTCPay is a code, not a company. There is no third-party between merchant and a customer. Merchant is always in full control of the funds. There are no processing or subscribtion fees. BTCPay Server is free to use and completely open-source, so the quality of the code can always be inspected by developers or security auditors.
### How it keeps funds secure
Payments via BTCPay are direct, peer to peer. Merchant receives the coins directly to the wallet, with no intermediate. Securing your fuds comes down to securing your private keys. There is an internal wallet inside BTCPay that merchants can use to spend the funds from. The funds from that wallet can only be spent, if a transaction is signed with a compatible hardware wallet.
### How it keeps data private
### How it resists censorship
* Self-hosted
* Can be run on a hardware
* No central point of failiure
* Can easily be re-deployed

BTCPay does not have a central point of failure since nobody is controlling it except for the user running it. If run on the cloud server, the hosting providers can potentially censor users by suspending hosting accounts or disabling access to virtual machines. Since no private keys are stored on the server, a censored individual can easily re-deploy the server with another host. Your coins are always inside your wallet. For ultimate censorship-resistance, users should run [BTCPay on their own hardware](HardwareDeployment.md).

## Documentation

### Getting started

* [Use Case](UseCase.md)
* [Walkthrough](Walkthrough.md)
* [Getting Started](GettingStarted.md)
* [Try it on our test servers](TryItOut.md)
* [Architecture](Architecture.md)

### Deployment

* [Web-Wizard deployment](https://medium.com/@BtcpayServer/launch-btcpay-server-via-web-interface-and-deploy-full-bitcoin-node-lnd-in-less-than-a-minute-dc8bc6f06a3) (easiest) - [Video](https://www.youtube.com/watch?v=NjslXYvp8bk)
* [Azure deployment](AzureDeployment.md) - [Video](https://www.youtube.com/watch?v=Bxs95BdEMHY) 
* [Docker deployment](DockerDeployment.md)
* [Google Cloud Deployment](GoogleCloudDeployment.md)
* [Manual deployment (not recommended)](ManualDeployment.md)
* [Hardware Deployment](HardwareDeployment.md)
* [Third party hosting](ThirdPartyHosting.md)
* [BTC-accepting Hosting Provider: How to deploy on LunaNode manually](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)
* ~~[BTC-accepting Hosting Provider: How to deploy on time4vps](https://medium.com/@BtcpayServer/hosting-btcpay-server-for-cheap-2b27761fdb9d)~~ (They do not officially support docker yet)

### Integrations

* [Drupal](Drupal.md)
* [WooCommerce](WooCommerce.md)
* [Magento](https://github.com/btcpayserver/magento-plugin)
* [PrestaShop](https://github.com/btcpayserver/prestashop-plugin)
* [Custom integration](CustomIntegration.md)

### Tips & tricks

* [FAQ](FAQ.md)
* [Customize Bootstrap theme](Theme.md)
* [How to change the domain name of your BTCPay Server](ChangeDomain.md)
* [How to penny-pinch your Microsoft Azure deployment](AzurePennyPinching.md)

### Get engaged

* [How to add altcoins](Altcoins.md)
* [How to contribute to development](LocalDevelopment.md)
* [How to get support](Support.md)
* [How to connect with the community](Community.md)

### Community articles

* [The Ultimate Guide to BTCPay - The free and open-source Bitcoin Payment processor](https://www.reddit.com/r/Bitcoin/comments/8f1eqf/the_ultimate_guide_to_btcpay_the_free_and/)
* [The Ultimate List of BTCPay Server Hosts and Merchants](https://bitcoinshirt.co/btcpay-stores/)
* [Xadrez - Guide to run an open source based e-store that accepts Litecoin, Bitcoin and fiat](Xadrez.md)
* [Third party hosted BTCPay servers - If you are looking for help with BTCPay Server](ThirdPartyHosting.md)
* [BTCPay Server official youtube channel](https://www.youtube.com/channel/UCpG9WL6TJuoNfFVkaDMp9ug)
* [BTCPay Server Manual Install](http://blog.sipsorcery.com/?p=1052)
