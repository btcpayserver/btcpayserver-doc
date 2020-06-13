# BTCPay Server Wallet FAQ

This document contains frequently questions related to BTCPay Server's [internal wallet](Wallet.md)

* [What is BTCPay Server wallet](#what-is-btcpay-server-wallet)
* [How to set up my wallet with BTCPay Server?](#how-to-set-up-my-wallet-with-btcpay-server)
* [Can I use a hardware wallet with BTCPay Server](can-i-use-a-hardware-wallet-with-btcpay-server)
* [Do I have to use BTCPay Server wallet?](#do-i-have-to-use-btcpay-server-wallet)
* [Missing payments in wallet](#missing-payments-in-my-software-or-hardware-wallet)
* [Electrum and Zap show different addresses](#receiving-address-in-zap-and-electrum-is-different)
* [What is a derivation scheme?](#what-is-a-derivation-scheme)

## What is BTCPay Server wallet?

BTCPay Server has an internal wallet which you can use to preview incoming and outgoing transactions and manage your funds. It works like any other wallet, but has enhanced privacy features by default, and also solves certain UX problems you may encounter when using an external wallet with BTCPay Server. 

For more information on how to use the built-in wallet [check this page](Wallet.md). To use the internal wallet, you first need to [set up the wallet](WalletSetup.md) with your BTCPay store.

## How to set up my wallet with BTCPay Server?

Check our in-depth documentation on [how to set up a wallet](WalletSetup.md).

## Can I use a hardware wallet with BTCPay Server?

The internal wallet has a [built in hardware wallet integration](Vault.md). You can use a supported hardware wallet with the [BTCPay wallet](Wallet.md). 

This  means that you're using a hardware wallet without leaking information to third-party apps or servers, since the wallet relays on the full node in your BTCPay.
 
## Do I have to use BTCPay Server wallet?

By default BTCPay Server requires only extended public key. To receive payments to your BTCPay store, you only need to provide an extended public key which you can generate in an external wallet. You do not have to use a built in wallet at all, you can manage funds in your [existing wallet](/WalletSetup/#use-an-existing-wallet).

However, it's recommended to use a built in wallet for funds management. The built in wallet improves your privacy by default, but also solves user-experience issues like [gap-limit](#missing-payments-in-my-software-or-hardware-wallet).

## Missing payments in my software or hardware wallet

If you're using an [existing software or a hardware wallet](/WalletSetup/#use-an-existing-wallet) with your BTCPay Server, you may experience a discrepancy between balance in your BTCPay wallet and the external wallet's web, destkop or mobile app. This discrepancy is usually related to a **gap-limit** issue. 

### The gap limit problem

Majority of third party wallets are [SPV wallets](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification), they share a node between many users. To  prevent performance issues, SPV wallets limit the amount of addresses without balance they follow on the blockchain. BTCPay Server generates a new address for every invoice. 

With above in mind, after BTCPay Server generates 20 consecutive unpaid invoices, the external wallet stops fetching the transactions, assuming no new transactions occurred. Once 21st, 22nd, etc invoices are paid, your external wallet won't show them.

On the other hand, internal BTCPay Server wallet is a full-node reliant wallet. It does not relay on a third-party and is able to always show a correct balance.

### The gap limit solution

It's not easy to solve the gap limit problem. You have two options:

1. Increase the gap limit in your external wallet
2. Use internal BTCPay Server wallet

#### 1. Increasing the gap limit

If your wallets supports configurable gap-limit, the easy fix is to increase it. However, majority of wallets do not allow this. 

The only wallets that allow configurable gap-limit value are [Electrum](ElectrumWallet.md) and [Wasabi](WasabiWallet.md)

If you'd like to use an external wallet to manage the funds, we recommend that perform a wallet recovery with those two wallets.

- [Increasing gap limit in Electrum](/ElectrumWallet.md/#configuring-the-gap-limit-in-electrum)
- [Increasing gap limit in Wasabi](/WasabiWallet.md/#configuring-the-gap-limit-in-wasabi)

After you've increased the gap limit, the balance in your external wallet and btcpay wallet should match. If they don't you may have set up your derivation scheme incorrectly.

#### 2. Use the internal wallet

For best user-experience and privacy, we recommend that you consider dropping external wallets and start using the [BTCPay Server's internal wallet](/Wallet.md).

## Receiving address in Zap and Electrum is different?

Zap and Electrum are two different wallets. Zap is for [Lightning Network](LightningNetwork.md) and Electrum is for on-chain transactions. They are unrelated and use different private keys. Use Electrum or internal [BTCPay wallet](Wallet.md) to check your on-chain payments and Zap for your Lightning Network payments.

In the future, there will be wallets merging both on-chain and off-chain transactions into one, but for now, you have to use them separately.

## What is a derivation scheme?

In order to receive payments to your BTCPay Server, you need to connect a wallet in your Store Settings by providing an xpubkey generated by your own wallet software. BTCPay uses what is called a `derivation scheme` to represent the destination of the funds received by your invoices. The destination of those funds will be your wallet, located by the xpubkey that you provide.

Using different derivation schemes with your xpub, you can also choose to create various receiving address types, shown in your store invoices.

|Address Type|	Example |
|:--|:--:|
|P2WPKH |	xpub... |
|P2SH-P2WPKH	| xpub...-[p2sh] |
|P2PKH	| xpub...-[legacy] |
|Multi-sig P2WSH	| 2-of-xpub1...-xpub2... |
|Multi-sig P2SH-P2WSH	| 2-of-xpub1...-xpub2...-[p2sh] |
|Multi-sig P2SH |	2-of-xpub1...-xpub2...-[legacy] |
