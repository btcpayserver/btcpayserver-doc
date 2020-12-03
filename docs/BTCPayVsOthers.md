# BTCPay Server vs. Others

![BTCPay Server vs other payment processors](./img/BTCPay-How-Is-It-Different.png "BTCPay Server vs other payment processors")

Most new merchants will likely only consider the price of the service. Since **BTCPay Server is free**, that may have led you here and if so, welcome.

**BTCPay Server is code**, not a company. There is **no third-party between a merchant and a customer**. The merchant is always in full control of their funds. There are no processing or subscription fees. BTCPay Server is free to use and completely open-source, so developers or security auditors can always inspect the quality of the code.

We want users to understand not only BTCPay Server, but also how payments can be processed on behalf of a merchant. In order to help users understand trade-offs when using various **cryptocurrency payment processing methods**. We don't know which **payment processors** provide which services. That will need to be part of your own research. The following list is a good place to start:

- [BTCPay Server vs. Others](#btcpay-server-vs-others)
  - [Features](#features)
  - [Cost](#cost)
  - [Security](#security)
  - [Privacy](#privacy)
  - [Censorship-Resistance](#censorship-resistance)
  - [Decentralized](#decentralized)
  - [Fiat](#fiat)
  - [Can't find this information for other payment processors?](#cant-find-this-information-for-other-payment-processors)

----

## Features

Every payment processor has features, here are some BTCPay Server features:

* **Free & Peer to Peer** - Direct, peer-to-peer payments. No merchant processing fees. No transaction fees (other than the [network fee](https://en.bitcoin.it/wiki/Miner_fees)).
* **Self-hosted** - Your node, your coins. No middleman. No KYC/AML. Non-custodial (complete control over the private key). [Hardware wallet integration](./HardwareWalletIntegration.md) support.
* **Bitcoin & Altcoins** - Accept Bitcoin natively. Opt-in [altcoin](./FAQ/FAQ-Altcoin.md) integrations.
* **Cutting-edge** - Native Segwit support. Rapid Bitcoin microtransactions using the Lightning Network (LND, c-lightning, Eclair and Ptarmigan).
* **CMS Integrations** - Wordpress & WooCommerce, Shopify, Drupal, Magneto, Prestashop and custom integrations.
* **Apps** - Point-Of-Sale interface for physical stores. Crowdfunding interface for donation goals and fundraisers.
* **Payment Buttons** - Easy-embeddable HTML donation and pay buttons.
* **Unlimited Stores** - Merchants can process payments for their own stores, or for others.
* **Translations** - Customers can pay in 20+ different languages.
* **Payment Requests** - Create & send a long-lived invoice requesting payment for goods or services.
* **Privacy & Security focused** - Payjoin support. Tor support. 
* **BitPay compatible** - Fully compatible with BitPay API. Easy migration to BTCPay Server.

----

## Cost

It's important to note that payments made using the Bitcoin Network *always* require a transaction (miner) fee for it to be included in the blockchain. The Bitcoin Network determines if the transaction is authorized and when it is confirmed.

**BTCPay Server creates direct payment invoices** for merchants to provide to their customers. It also **monitors the blockchain** and stores the confirmation status of each payment or donation. To do this BTCPay Server requires being hosted on a server which merchants can deploy on their own hardware, purchase a VPS (less than $10/mo), or use someone else's BTCPay Server instance to host your account (free or paid options).

If you deploy BTCPay Server using a VPS, the following types of fees are **never charged**:

* Merchant fees
* Subscription fees
* Transfer fees
* Software fees

----

## Security

First rule of Bitcoin is always keep your private keys *private*. Using a **secure wallet** is recommended for new merchants as the only provider (creator) of private keys. If there is a chance that someone else (such as a website) knows, stores, or provides your private keys to you, it's generally accepted that they are not actually private.

Secondly, there is another area of security to consider on the applications layer where you have two main options:

* **Option 1**: Most payment processors (including BTCPay Server) use the [BIP 21][1] standard.

* **Option 2**: Others use variations of the [BIP 70][2] standard.
**Note**: [BIP 70 has recently been deprecated in Bitcoin Core][3].
Some payment processors still use this depreciated standard, but some wallets will not be compatible. To be able to pay to a BIP 70 invoice, you need to translate it.
In order to do so, every BTCPay Server instance also hosts a translation tool, that you can access by adding `/translate` to your BTCPay Server URL.

Example: [mainnet.demo.btcpayserver.org/translate](https://mainnet.demo.btcpayserver.org/translate/)

Simply input the invoice URL that you were given in the field to get it translated to a format most wallets will recognise.

----

## Privacy

BTCPay Server will never ask a merchant for any personal identification.

Typically, when converting to or from fiat on behalf of a merchant, payment processors are required to collect personal information for Know Your Customer (KYC) and Anti-money laundering (AML) banking requirements. This may include personal information such as passport ID, phone number, address, bank account, etc.

Fortunately, the Bitcoin Network does not use or collect these types of personal information, and therefore neither does BTCPay Server. 
How **BTCPay Server ensures privacy**:

* No middleman involved.
* Information is shared between customer and seller only.
* Self-hosted users [run a full node][5].
* No address re-use.
* Tor support
* [Payjoin](./Payjoin.md) support

----

## Censorship-Resistance

**BTCPay Server is Censorship-Resistant**. Nobody controls it except for the user running it. No central point of failure.
BTCPay Server can be run on a users' own hardware.

----

## Decentralized

Many payment processors claim to have no middleman. They claim that funds go directly to your wallet or that they offer instant settlement.
However, if a processor makes any of the following claims, they are most likely operating as a **middleman**:

* Waiting time for a merchant to receive payment is longer than sufficient blockchain confirmation.
* The payment processor combines customer payments before sending to the merchant's wallet.
* If there are any kind of limits on transaction volume for the merchant.
* If the payment processor can decline, reject or alter a payment after being sent from a customer's wallet.
* If the payment processor has terms and conditions stating they can hold or freeze your account.
* Fees for using the payment processor are automatically taken out from the customer's payment to the merchant.

**Payment processors** are able act as middlemen by using **custodial wallets**. A payment processor can use an internal custodial wallet for altering customer payments before routing them to merchants. This is how they can collect fees, hold payments for verification and processing, etc. This type of wallet is an intermediary between the merchant wallet and the customer wallet. It's the middleman wallet.

The payment processor may also provide a custodial wallet for the merchant to use. As mentioned above, this is advised against because your private keys may be compromised. If they claim to not save your private keys after giving them to you, it's likely you will not know the truth until it's too late. Centralized services may seem like an easier solution for the merchant. Unfortunately the trade-off is sacrifices in privacy, security and self-sovereignty which is normally obtained using the Bitcoin Network.

----

That's why BTCPay Server was created. To **help merchants remove third party dependencies and simply use the Bitcoin Network freely and securely**. Merchants have their own copy of the BTCPay Server software which runs on their own server or VPS of their choice and validates their own payments using their own node. It's a self-hosted Peer-to-Peer payment processor. The trade-off in this case is some technical understanding is required for initial setup.

As the BTCPay Server community continues to grow, more deployment methods, use cases and tutorials are continually being added to make it easier for non-technical users. BTCPay Server is completely open source. Anyone can join the community to suggest or create improvements, features, guides, etc. Feedback is always welcome.

----

## Fiat

Currently, BTCPay Server is a processor **without fiat conversion** capabilities out of the box. As a merchant, this may be a difficult if business costs require fiat. Not providing fiat conversion out of the box allows BTCPay Server merchants to avoid KYC and AML identification verification. This also allows BTCPay Server to be free and available for anyone to use.

However, a fiat conversion plugin is available for BTCPay Server. Since merchants are always the owners of their private keys, they can always freely convert their coins manually, but for now there's no instant-fiat conversion. More info on the [Transmuter](https://github.com/btcpayserver/btcTransmuter).

----

## Can't find this information for other payment processors?

* It's probably a feature not a bug!
* All of this information should be available to merchants.
* Checkout the [Awesome Payment Processor List](https://github.com/alexk111/awesome-bitcoin-payment-processors)
* If you have more questions about BTCPay Server, read our [Official Documentation][7].

[1]: https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki
[2]: https://github.com/bitcoin/bips/blob/master/bip-0070.mediawiki
[3]: https://github.com/bitcoin/bitcoin/pull/14451
[4]: https://mainnet.demo.btcpayserver.org/translate
[5]: https://en.bitcoin.it/wiki/Why_Your_Business_Should_Use_a_Full_Node_to_Accept_Bitcoin
[6]: https://howtoacceptcrypto.com/chart/
[7]: https://docs.btcpayserver.org/
