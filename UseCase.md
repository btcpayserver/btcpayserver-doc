# BTCPay Server Use Cases

Built with the community in mind, BTCPay server is a feature-rich software with plenty of use-cases that can solve problems for different types of users.

In this guide, we will show you some of the use-cases of BTCPay, but it is by no means limited to the groups of users we mentioned.

So let's have a look at what you can do with BTCPay and what are the benefits of using it.

![BTCPayInfographic](img/BTCPayUseCaseInfographic.png)

## Merchants

By choosing BTCPay to process payments, you are:

* Saving money (no fees, no subscriptions)
* Cutting off the middle-man (Payments go directly to your wallet)
* Enhancing privacy for you and your customers (no address re-use, no IP leaks to third parties)
* Saving time (easy integration and installation)
* Protecting yourself from interference in your business (self-sovereignty)

To enjoy most of these benefits, you don't even need to run a BTCPay server yourself, you could just create an account on someone else's server. It will be even easier to set up for free or a fee depending on the host's choice. Downside is that you will rely on the server admin to keep it functional and up-to-date.  

With the growth of your business it will eventually become important to set-up your own server to be really independent.

Want to give it a try? Here is an up-to-date list of [third-party hosts](ThirdPartyHosting.md).

### Online Store

If you're a merchant running an e-commerce business, you can easily [deploy BTCPay](https://docs.btcpayserver.org/deployment) and connect it to your store via [integration plugins](https://docs.btcpayserver.org/integrations/) in just a few clicks.

BTCPay checkout is no different to any other payment gateway. Your customer gets an invoice. They pay it by scanning a QR code or by copy-pasting the amount and the address. When their payment is confirmed, you will be notified via your e-commerce CMS, and you can ship the item. Take a look at [our demo online store](https://store.demo.btcpayserver.org/).

### Physical Store

For brick and mortar stores, BTCPay has a [web-based Point of Sale](https://mainnet.demo.btcpayserver.org/apps/87kj5yKay8mB4UUZcJhZH5TqDKMD3CznjwLjiu1oYZXe/pos) (POS) App which can be customized. Similarly to the online store, your customer is presented with an invoice that he can pay on the spot. You can create a watch-only wallet on your phone to be notified of the payments through the POS, without the need of any additional software. There are plans to develop the POS mobile app which would make the process even smoother.

### Lightning Network payments

No matter the kind of business you run, BTCPay offers a very easy way to get started on the Lightning Network. You can use and experiment with this innovative second-layer solution build on top of Bitcoin by [following this guide](LightningNetwork.md). Both merchants and customers can use BTCPay to receive or make payments off-chain with instant confirmations and neglectable network fees.

## Charities and Content Creators (Donations)

Charities, non-profits, content creators, and other organizations that want to accept cryptocurrency donations in a more private way than the traditional single bitcoin address method can utilize the [Pay Button](https://docs.btcpayserver.org/btcpay-basics/gettingstarted#creating-the-pay-button),  [POS app](https://github.com/btcpayserver/btcpayserver-doc/blob/master/GettingStarted.md#creating-the-point-of-sale-app), and [Crowdfunding app](Apps.md#crowdfunding-app) for a better user experience.

Benefits of using BTCPay for accepting donations:

* Saving money (no fees, no subscriptions)
* Cutting off the middle-man (Payments go directly to your wallet)
* Enhancing privacy for you and your customers (no address re-use, no IP leaks to third parties)

It is particularly important to mention that BTCPay prevents address reuse, as many people has been reusing address for donations in the past. Here is why you SHOULD NOT reuse Bitcoin address:

* Privacy: reusing the same address for donations not only make it incredibly easy to link it to your identity, it also compromises the privacy of your donators and every person that interacts with you
* Security: by compromising your privacy, address reuse increases your attack surface, as people that want to steal you or harm you would have MANY information about you and your donators
* High fees: fees for a Bitcoin transaction are calculated according to the "size" of a transaction (which has nothing to do with the amount being sent). By reusing addresses, you are building huge transactions involving many inputs, that will cost you a lot in fees when you want to move them

You can read more about address reuse on the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Address_reuse).

## Local Payment Processor

When you deploy a self-hosted BTCPay Server, you can attach and create an unlimited number of stores and apps. This means when you launch BTCPay, you can become a payment processor for your family members, friends or your local community. You can do that to promote Bitcoin amongst people you know or to help out people that can't rely on other solutions.

While you're allowing them to rely on your full node, the payments go directly to their wallets, and you have zero control over their funds at any point in the transaction, and cannot charge a processing fee. You can, however, develop a registration paywall and charge monthly fees.

Take a look at the list of [third-party hosts](ThirdPartyHosting.md).

## Cryptocurrency Exchanges

The number of merchants using BTCPay grows each day, and cryptocurrency exchanges could benefit from it by developing integration with BTCPay and allow instant conversion of cryptocurrency payments into local fiat currencies.

Being an open-sourced project, BTCPay doesn't have the power to impose anything on exchanges, meaning that any of them could build on top of it, regardless of their size or the country they operate.

## Hosting Providers

Hosting providers can (and some already did) create easy 1-click BTCPay deployment solutions for their customers. With the growing interest in BTCPay, hosting companies can tap into this source of new customers and make money by hosting easily-deployable BTCPay instances for merchants.

## Developers

BTCPay community is amiable and open-minded. Developers can not only learn a lot and get their name out by working on an open-source project, but also participate in transforming the payment processing business.

---

These are some of the many ways in which you can use BTCPay. Unleash your creativity and feel free to build your own solutions to solve problems.
