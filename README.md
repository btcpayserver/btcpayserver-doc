# BTCPay Server Documentation

## Introduction

BTCPay Server is an Open Source payment processor which conforms to the invoice API of Bitpay.
This allows easy migration of your codebase to your own, self-hosted payment processor.

If you have any issues with BTCPay, please file a [github issue](https://github.com/btcpayserver/btcpayserver/issues).
If you have more general questions, please come on [Slack](http://slack.forkbitpay.ninja/).

This solution is for you if:

* You want to be in control of your own funds
* Compliance teams of traditional payment processor rejected your application,
* You want lower fees (we support SegWit),
* You want to become a payment processor yourself and offer BTCPay hosted solution to merchants
* You want a way to support payment in altcoins (BGold, Dogecoin, Feathercoin, Groestlcoin, Litecoin, Monacoin, Viacoin, POLIS)
* You want to accept payments on lightning network

## Documentation

### Getting started

* [Try it on our test servers](TryItOut.md)
* [Architecture](Architecture.md)

### Deployment

* [Azure deployment (simplest)](AzureDeployment.md)
* [Docker deployment](DockerDeployment.md)
* [Manual deployment (not recommended)](ManualDeployment.md)
* [Third party hosting](ThirdPartyHosting.md)
* [BTC-accepting Hosting Provider: How to deploy on LunaNode](https://medium.com/@BtcpayServer/hosting-btcpayserver-on-lunanode-bf9ef5fff75b)
* ~~[BTC-accepting Hosting Provider: How to deploy on time4vps](https://medium.com/@BtcpayServer/hosting-btcpay-server-for-cheap-2b27761fdb9d)~~ (They do not officially support docker yet)

### Integrations

* [Drupal](Drupal.md)
* [Woocommerce](Woocommerce.md)
* [Custom integration](CustomIntegration.md)

### Tips & tricks

* [FAQ](FAQ.md)
* [How to change the domain name of your BTCPay Server](ChangeDomain.md)
* [The guide for penny pinching your Microsoft Azure bill](PennyPinching.md)

### Get engaged

* [How to contribute](LocalDevelopment.md)
* [How to get support](Support.md)
* [Connect with the community](Community.md)

### Community articles

* [The Ultimate Guide to BTCPay - The free and open-source Bitcoin Payment processor](https://www.reddit.com/r/Bitcoin/comments/8f1eqf/the_ultimate_guide_to_btcpay_the_free_and/)
* [The Ultimate List of BTCPay Server Hosts and Merchants](https://bitcoinshirt.co/btcpay-stores/)
* [Xadrez - Guide to run an open source based e-store that accepts Litecoin, Bitcoin and fiat](Xadrez.md)
* [Third party hosted BTCPay servers - If you are looking for help with BTCPay Server](Managed.md)
* [BTCPay Server official youtube channel](https://www.youtube.com/channel/UCpG9WL6TJuoNfFVkaDMp9ug)

