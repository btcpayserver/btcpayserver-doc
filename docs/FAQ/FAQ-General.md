# General BTCPay FAQ

This page contains general questions and answers about BTCPay. What it is, how it works, how to install it.

# [General FAQ](FAQ-General.md)

* [What is BTCPay Server?](FAQ-General.md#what-is-btcpay-server)
* [Why should I choose BTCPay over other processors?](FAQ-General.md#why-should-i-choose-btcpay-over-other-processors)
* [Why is everyone so excited about BTCPay?](FAQ-General.md#why-is-everyone-so-excited-about-btcpay)
* [Who can use BTCPay?](FAQ-General.md#who-can-use-btcpay)
* [How to install BTCPay?](FAQ-General.md#how-to-install-btcpay-server)
* [Where to find BTCPay video tutorials?](FAQ-General.md#where-to-find-btcpay-video-tutorials)
* [Do I need to have an online store to use BTCPay Server?](FAQ-General.md#do-i-need-to-have-an-online-store-to-use-btcpay-server)
* [Why can't I just give my public address to a buyer?](FAQ-General.md#why-cant-i-just-give-my-bitcoin-address-to-a-buyer)
* [How does BTCPay create a new address for each invoice?](FAQ-General.md#how-does-btcpay-create-a-new-address-for-each-invoice)
* [Does BTCPay need my private key?](FAQ-General.md#does-btcpay-need-myprivate-key)
* [Does BTCPay Server support crypto to fiat conversion?](FAQ-General.md#does-btcpay-server-support-crypto-to-fiat-conversion)
* [What if I have a problem with a paid invoice?](FAQ-General.md#what-if-i-have-a-problem-with-a-paid-invoice)
* [Where can I get help and support?](FAQ-General.md#where-can-i-get-help-and-support)
* [How can I contribute to BTCPay?](FAQ-General.md#how-can-i-contribute-to-btcpay)
* [How can I use the BTCPay Server API?](FAQ-General.md#how-can-i-use-the-btcpay-server-api)

## What is BTCPay Server?

BTCPay Server is a free and open-source cryptocurrency payment processor which allows you to receive payments in Bitcoin (on-chain and via the Lightning Network) and altcoins directly, with no fees, transaction cost or a middleman.

BTCPay is a non-custodial invoicing system which eliminates the involvement of a third-party. Payments with BTCPay go directly to your wallet, which increases the privacy and security. Your private keys are never uploaded to the server. There is no address re-use since each invoice generates a new address deriving from your xpubkey.

## Why should I choose BTCPay over other processors?

The most significant advantage of BTCPay over other processors is that it is entirely free and open-source, non-custodial software, created by the community. While most of the other processors hold your Bitcoins, BTCPay allows you to receive payments P2P, directly to your software or hardware wallet.

BTCPay is a self-hosted software. This means that you are your own payment processor. There are no subscriptions, no transaction fees. There's no third-party involvement which significantly increases the censorship-resistance, privacy, and security for you and your customers. Furthermore, BTCPay enables you to become a processor yourself, so that you can offer different packages and help spread the adoption locally or globally.

With BTCPay, you are your own bank.

## Why is everyone so excited about BTCPay?

The community is excited about BTCPay and often recommends it to merchants or content creators because it offers a direct way for store-owners and charities to receive Bitcoin payments, which significantly improves the privacy of the customers/donors.

BTCPay doesn't compromise on censorship-resistance, which is one of the main features of Bitcoin. Besides that, being free and open-source it gives an excellent opportunity for developers to build things and integrations on top of BTCPay.

## Who can use BTCPay?

BTCPay server is a feature-rich software with plenty of use-cases that can solve problems for different types of users. Merchants, content creators, lightning network users, exchanges, hosting providers and many others can find it useful. See the [Use Case page](../UseCase.md) for detailed breakdown of BTCPay use-cases.

BTCPay is licensed under the [MIT License](https://github.com/btcpayserver/btcpayserver/blob/master/LICENSE). 

## How to install BTCPay Server?

First take a look at the various deployment options and consider which one best suits your specific needs.

- [See all deployments](../Deployment.md)

If you still have questions, visit the [Deployment FAQ](./FAQ-Deployment.md)

## Where to find BTCPay video tutorials?

BTCPay Server instructional video guides can be found on the official BTCPay Server YouTube channel:

- [BTCPay YouTube channel](https://www.youtube.com/channel/UCpG9WL6TJuoNfFVkaDMp9ug/videos)
- [Assorted playlist of all BTCPay YouTube videos](https://www.youtube.com/playlist?list=PL7b9Wt9shK2r-WXS6ysG4tafVQRu80biZ)

## Do I need to have an online store to use BTCPay Server?

You can use BTCPay even if you don't have an e-commerce store. You can launch your BTCPay Server and be the payment processor for your friends or local market. Another use-case is to accept donations through the POS (Point of Sale) app or payment buttons which can be copy-pasted as HTML snippets into any website.

If you do not have a store, but want to create one, read [How to Create an Online Store & Accept Bitcoin – Step By Step Guide](https://bitcoinshirt.co/how-to-create-store-accept-bitcoin/) which teaches you how to build a store from scratch and install BTCPay.

## Why can't I just give my Bitcoin address to a buyer?

Re-using an address for receiving payments is a privacy issue. Providing a different address manually to each customer is not an optimal solution. Imagine having to send a unique e-mail to everyone that wants to pay you with cryptocurrency.

BTCPay solves the address re-use issue. It automates the checkout process for the merchant by creating a new invoice with a unique address created from the merchant's wallet, each time a customer pays using BTCPay. If you are using an integration with an e-commerce store, BTCPay Server integrates into your checkout process, and customers can pay you in Bitcoin or altcoins in a few clicks, just like any other traditional payment option.

After a customer makes a payment, the BTCPay Server software notifies your store that the order has been paid/completed. Depending on the e-commerce software you're using, it can also change the order status. All you have to worry about is getting items shipped, leave the invoicing and payment processing to BTCPay.

## How does BTCPay create a new address for each invoice?

Merchants connect a wallet to each of their stores that they want to receive payments to. The invoices produced in a store are linked directly to the merchant's connected wallet. The invoice addresses are derived from the [xpubkey](https://bitcointalk.org/index.php?topic=2828777.0) of the wallet associated with the store. The software only needs your extended public key of a wallet to produce new addresses.

## Does BTCPay need my private key?

Absolutely not. Private keys are never uploaded or required by BTCPay. The fact that BTCPay Server never needs access to your master private key for on-chain transactions is a huge security advantage. Even if your server gets hacked, your funds from the on-chain transactions are always safe. Securing your on-chain funds comes down to [securing your wallet](https://btcinformation.org/en/secure-your-wallet). 

If you have a lightning node, BTCPay technically has access to the keys (macaroons) of your LN.

## Does BTCPay Server support crypto to fiat conversion?

At this time, it is possible to do automated conversions using the BTCPay Server plugin called [BTCTransmuter](https://github.com/btcpayserver/btcTransmuter). Please note this software is currently in *alpha state*. 

## What if I have a problem with a paid invoice?

BTCPay Server is an open-source self-hosted software stack, not a company. The community and contributors behind BTCPay Server have no control over who uses the software or how they use it.
If you paid an invoice to a merchant and have a problem with your order, you must contact the merchant directly to see what happened. 

Each merchant running the software controls their own store and the connected wallets that receive funds. The BTCPay Server community does not hold or have access to any funds of a store using the BTCPay Server software, only the merchant does.

## Where can I get help and support?

BTCPay is an open-source project. It is not a company; there is no e-mail, live-chat or phone support. The software relies on a network of contributors and users to provide support.

If you encountered an issue or have a feature request, please [open an issue on GitHub](https://github.com/btcpayserver/btcpayserver/issues). For more general questions, join our [community on Mattermost](https://chat.btcpayserver.org/). Certain community members offer [premium (paid) support](../Support.md).

## How can I contribute to BTCPay?

There are many ways in which you can contribute to an open-source project like BTCPay.

The easiest way is to use the software, provide feedback and report any bugs or issues you or your customers encounter. If you're a developer, you can help us develop and improve the software by contributing in any of the BTCPay Server [GitHub repositories](https://github.com/btcpayserver). Translating BTCPay into your native language on [Transifex](https://www.transifex.com/btcpayserver/btcpayserver/), helping us with documentation and writing are ways in which you can help us out, even if you're not a developer or tech-savvy. We appreciate every contributor to the project.

## How can I use the BTCPay Server API?

The original BTCPay Server API is compatible for the most part with [BitPay's API](https://bitpay.com/api/) to allow merchants to smoothly transition to using BTCPay if they prefer a free, open source, payment processing alternative. 

In 2020, BTCPay Server started releasing a new Greenfield API. This new API will co-exist with the original API and allow full usage of all BTCPay Server features, without requiring the UI. You can find the current [Greenfield API documentation](https://docs.btcpayserver.org/API/Greenfield/v1/) and a [usage example here](https://docs.btcpayserver.org/GreenFieldExample/).

A BTCPay Server functionality that is not found in the Greenfield API documentation means it isn't fully implemented yet in the new API and users should use the original API instead. The discussion on the development of the new Greenfield API can be found [here](https://github.com/btcpayserver/btcpayserver/issues/1320). 
