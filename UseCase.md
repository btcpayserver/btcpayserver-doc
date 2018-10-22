# BTCPay Server: Value Proposition and Opportunities

Build with the community in mind, BTCPay's ambition is to deliver the best Bitcoin payment service for merchants and their customers, while creating opportunities for everyone to contribute and take parts in its development and growth.

## Value Proposition

### Merchants

By choosing BTCPay to process their payments, you are:

* Saving money (no fees, no subscriptions)
* Cutting off the middle-man (Payments go directly to your wallet)
* Enhancing privacy for you and your customers (no address re-use, no IP leaks to third parties)
* Saving time (easy integration and installation)
* Protecting yourself from interference in your business (self-sovereignty) 

#### Online Store

If you're a merchant running an e-commerce business, you can easily [deploy BTCPay](https://docs.btcpayserver.org/deployment) and connect it to your store via [integration plugins](https://docs.btcpayserver.org/integrations/) in just a few clicks. 

BTCPay checkout is no different than any other payment gateway: your customer gets an invoice, that they pay by scanning a QR code or by copy-pasting the amount and the address in their own Bitcoin wallet. When their payment is confirmed, you will be notified via your e-commerce CMS; you can ship the item. Take a look at [our demo online store](https://store.demo.btcpayserver.org/).

#### Physical Store

For brick and mortar stores, BTCPay has a [web-based Point of Sale](https://mainnet.demo.btcpayserver.org/apps/87kj5yKay8mB4UUZcJhZH5TqDKMD3CznjwLjiu1oYZXe/pos) (POS) App which can be customized. Similarly to the online store, your customer is presented with an invoice that he can pay on the spot. You can create a watch-only wallet on your phone to be notified of the payments through the POS, without the need of any additional software. There are plans to develop the POS mobile app which would make the process even smoother.

### Lightning Network payments

No matter the kind of business you run, BTCPay offers a very easy way to get started on the Lightning Network. You can use and experiment with this innovative second-layer solution build on top of Bitcoin by [following this guide](LightningNetwork.md). Both merchants and customers can use BTCPay to receive or make payments off-chain with instant confirmations and neglectable network fees.

### Charities and Content Creators (Donations)

Charities, non-profits, content creators and other organizations that want to accept cryptocurrencies donations in a more private way than the traditional single-address can use the [Pay Button](https://docs.btcpayserver.org/btcpay-basics/gettingstarted#creating-the-pay-button) or the [POS app](https://github.com/btcpayserver/btcpayserver-doc/blob/master/GettingStarted.md#creating-the-point-of-sale-app).

Benefits of using BTCPay for accepting donations:

* Saving money (no fees, no subscriptions)
* Cutting off the middle-man (Payments go directly to their wallet)
* Enhancing privacy for them and their customers (no address re-use, no IP leaks to third parties)

It is particularily important to mention that BTCPay prevents address reuse, as many people has been reusing address for donations in the past. Here is why SHOULD NOT reuse Bitcoin address:

* Privacy: reusing the same address for donations not only make it incredibly easy to link it to your identity, it also compromises the privacy of your donators and every person that interacts with you
* Security: by compromising your privacy, address reuse increases your attack surface, as people that want to steal you or harm you would have MANY information about you and your donators
* High fees: fees for a Bitcoin transaction are calculated according to the "size" of a transaction, meaning the quantity of information it contents. By reusing addresses, you're building huge transactions involving many inputs, that will cost you a lot of fees when you want to move them

Additional features are currently under development for future releases that would enable crowdfunding and dynamic invoices.

## Opportunities

### To Become a Local Payment Processor

When you deploy a self-hosted BTCPay Server, you can attach and create an unlimited number of stores and apps. This means when you launch BTCPay, you can become a payment processor for your family members, friends or your local community. You can do that to promote Bitcoin amongst people you know or to help out people that can't rely on other solutions.

While you're allowing them to rely on your full node, the payments go directly to their wallets, and you have zero control over their funds at any point in the transaction, and cannot charge a processing fee. You can, however, develop a registration paywall and charge monthly fees. 

Take a look at the list of [third-party hosts](ThirdPartyHosting.md).

### For Cryptocurrency Exchanges

The number of merchants using BTCPay grows each day, and cryptocurrency exchanges could benefit from it by developing integration with BTCPay and allow instant conversion of cryptocurrency payments into local fiat currencies. Being an open-sourced project, BTCPay doesn't impose any limitations and gives the opportunity for any exchange to develop on top of it, regardless of their size or the country they operate in.

### For Hosting Providers

Hosting providers can (and some already did) create easy 1-click BTCPay deployment solutions for their customers. With the growing interest in BTCPay, hosting companies can tap into this source of new customers and make money by hosting easily-depoyable BTCPay instances for merchants.

### For Developers

BTCPay community is amiable and open-minded. Developers can not only learn a lot and get their name out by working on an open-source project, but also participate in transforming the payment processing business.

These are some of the many ways in which you can use BTCPay. Unleash your creativity and feel free to build your own solutions that solve problems.
