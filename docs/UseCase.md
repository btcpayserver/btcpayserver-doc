---
description: Who uses BTCPay Server and why? What are the benefits of using BTCPay Server over other payment gateways?
tags:
- Use-case
- Target-audience
- BTCPay users
- benefits
---
# Who can use BTCPay Server?

The versatility and flexibility of the BTCPay Server attract different types of users. **Anyone** can use BTCPay Server.

We're ensuring an open future for businesses and individuals regardless of geographic, political or financial barriers.

Below are the most common use-cases for BTCPay Server:

* **Merchants** who sell products and services online or in-permission
* Self-sovereign **individuals** wanting to protect their wealth and manage their funds and full bitcoin node
* **Charities and non-profits** looking to accept donations or crowdfund their dream project
* **Developers** building on top of bitcoin and bleeding-edge payment infrastructure
* Members of **local communities** willing to onboard people to their BTCPay instance and offer payment processing as a service or for free, creating a circular economy.
* **Exchanges** offering instant conversions for the users of BTCPay Server
* **Hosting providers** offering BTCPay as a cloud service or ready-to-use hardware.

![BTCPay UseCase Infographic](./img/infographics/BTCPayUseCaseInfographic.png "BTCPay Server UseCase Infographic")

The software usage is by no means limited to the groups of users mentioned in this document.

## Merchants

Merchants accepting bitcoin payments online or in-person are the primary user group of a BTCPay Server.

By choosing BTCPay Server to process payments, merchants are:

* Saving money (BTCPay is free, no fees or no subscriptions)
* Cutting out the middle-man (If self-hosted payments go directly to their wallet)
* Enhancing privacy for their customers (no address re-use, no information leaks to the third party serves if they're self-hosting BTCPay Server)
* Saving time (easy integration with popular e-commerce platforms)
* Protecting themselves from interference in their business (self-sovereignty)

### Online Stores

Merchants selling goods or services over the internet, usually pick an online e-commerce plugin we offer for multiple popular e-commerce platforms [WooCommerce]((/WooCommerce.md), [Shopify](/Shopify.md), [PrestaShop](/Prestashop.md), [Magento](/Magento.md) [Drupal](Drupal.md), [Shopaware](https://github.com/lampsolutions/LampSBtcPayShopware) or other. Install a plugin for the CMS of your choice, and connect it to a self-hosted BTCPay or the one hosted by a third-party.

BTCPay Server's checkout is no different to any other payment gateway. The customer gets an invoice. They pay it by scanning a QR code or by copy-pasting the amount and the bitcoin address. When their payment is confirmed, you're notified via the e-commerce software, and can ship the item.

### Physical Store

For brick and mortar stores, BTCPay Server has a [web-based Point of Sale](./Apps.md#point-of-sale-app). Similarly to the online store, the customer is presented with an invoice that he can pay on the spot. The **POS app** can be run on any web-connected device.

Take a look at [our demo POS app](https://mainnet.demo.btcpayserver.org/apps/3utBTfSKkW4gK7aQMd2hW5Bh9Fpa/pos).

## Self-sovereign individuals

**Privacy-minded individuals** can use BTCPay Server internal wallet for their everyday bitcoin transactions without providing a private key. For self-hosted servers, the [internal wallet](./Wallet.md) relies on a full node, significantly enhances the privacy. [Hardware wallet integration](./HardwareWalletIntegration.md) allows the usage of a hardware wallet with a [full node](https://en.bitcoin.it/wiki/Full_node) and avoids leaks to a third-party server.

## Freelancers & Bill Pay

**Freelancers** can *request* for payment by sharing a [Payment Request](./PaymentRequests.md). Content and appearance of the payment request is customizable. With or without expiry, customers can pay the request at any time. BTCPay Server automatically updates the exchange rate when the customer pays the payment request when it's convenient for them. Merchants or freelancers can use payment requests for bill pay services. Payment requests can even be used to quickly request money from friends.

Merchants can *provide* payment by sharing a [Pull Payment](./PullPayments.md). This is a long lived payment offer that the freelancer can pull funds from at their convenience. The merchant can specify the total amount and approve partial or a full request for payment.

## Charities and Content Creators (Donations)

Charities, non-profits, content creators, and other organizations that want to accept bitcoin donations in a more private way than the traditional static bitcoin address method can utilize the [Pay Button](./WhatsNext.md#creating-the-pay-button), [POS app](./WhatsNext.md#creating-the-point-of-sale-app) or [Crowdfunding app](./Apps.md#crowdfunding-app) for a better user experience.

Benefits of using BTCPay for accepting donations:

* Saving money (no fees, no subscriptions)
* Cutting out the middle-man (Payments go directly to their wallet)
* Enhancing privacy for them and their donors (no address re-use, no IP leaks to third parties)

It is particularly important to mention that BTCPay Sever prevents address reuse, as many people have been reusing addresses for donations in the past. Here is why you SHOULD NOT reuse a Bitcoin address:

* Privacy: reusing the same address for donations not only makes it incredibly easy to link it to your identity, it also compromises the privacy of your donors and every person that interacts with you
* Security: by compromising your privacy, address reuse increases your attack surface, as people that want to steal from you or harm you would have A LOT of information about you and your donors
* High fees: fees for a Bitcoin transaction are calculated according to the "size" of a transaction (which has nothing to do with the amount being sent). By reusing addresses, you are building huge transactions involving many inputs, that will cost you a lot in fees when you want to move them

You can read more about address reuse on the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Address_reuse).

## Developers

BTCPay Server community is amiable and open-minded. **Developers** can not only learn a lot and get their name out by working on an open-source project, but also participate in transforming the payment processing business.

## Local Communities

Admin running a BTCPay Server instance, can enable registration for other users and become a [third-party payment processor](/Deployment/ThirdPartyHosting.md) for family members, friends or their local community.

This means that admin allows other people to register and use their instance, while the payments remain non-custodial.

Take a look at the list of [third-party hosts](/Deployment/ThirdPartyHosting.md).

[![BTCPay Server for local communities](https://img.youtube.com/vi/9n81qnzlPf8/mqdefault.jpg)](https://www.youtube.com/watch?v=9n81qnzlPf8 "BTCPay Server for local communities")


## Cryptocurrency Exchanges

The [number of merchants](https://directory.btcpayserver.org) using BTCPay Server grows each day, and cryptocurrency exchanges could benefit from it by developing integration with BTCPay and allow instant conversion of cryptocurrency payments into local fiat currencies.

Being an open-sourced project, BTCPay Server doesn't have the power to impose anything on exchanges, meaning that any of them could build on top of it, regardless of their size or the country they operate.

## Hosting Providers

Hosting providers can (and some already have) create easy 1-click BTCPay deployment solutions for their customers. With the growing interest in BTCPay Server, hosting companies can tap into this source of new customers and make money by hosting easily-deployable BTCPay instances for merchants.

---

These are some of the many ways in which you can use BTCPay. Unleash your creativity and feel free to build your own solutions to solve problems.
