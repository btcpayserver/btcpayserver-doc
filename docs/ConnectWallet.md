# (3) Wallet Setup

After [account registration](RegisterAccount.md) and [store creation](CreateStore.md), it's time to configure a wallet in your BTCPay Server, so that you can start receiving payments into it.

There are two ways to set up a wallet in BTCPay Server:
 - Use an existing wallet
 - Create a brand new wallet

## Use an existing wallet

:::tip
When using an existing wallet with BTCPay Server, you're only providing a public key (xpubkey) which is a watch-only wallet token. The public key allows BTCPay Server to generate a new address each time a new invoice is created. Even if a malicious attacker hacked your server, they cannot access your funds.
:::

Connecting an existing wallet assumes that you already have an external wallet created and backed up. In theory, any wallet that provides you with an extended public key

Below are wallets that meet the above criteria.

- [Wasabi Wallet](WasabiWallet.md)
- [Electrum Wallet](ElectrumWallet.md)


## Create a new wallet 

BTCPay is a non-custodial software, which means that all the funds received to your store, will end up directly into your connected wallet.

*Note: A [private key](https://en.bitcoin.it/wiki/Private_key) (xprv) is **never** required for receiving money on-chain to a BTCPay wallet. The software needs a public key (xpubkey) which is a watch-only wallet token. The xpubkey allows BTCPay to generate a new address each time a new invoice is generated. It enables users to observe the wallet balance and transactions without having to share their private key. Exception is [Lightning Network](LightningNetwork.md) which is a hot wallet with keys online.*

To manage the funds received to your BTCPay wallet, you can use an [internal BTCPay Wallet](Wallet.md) or an external wallet. We recommend that you use internal wallet, since it's connected to your full node and does not leak information to third-parties. If you're using an external wallet, we recommend that you use the wallet which:

1. Allows connection to a full node
2. Allows custom [gap limit](FAQ/FAQ-Wallet.md)

## Recommended wallets

This page lists the recommended wallets for BTCPay Server. Click on the link and you will be redirected to a step by step tutorial on how to set up particular wallet with BTCPay Server.

### Internal BTCPay Wallet

- [Ledger Wallet](LedgerWallet.md)
- [Coldcard Wallet](ColdcardwWallet.md)

### External Wallets

- [Wasabi Wallet](WasabiWallet.md)
- [Electrum Wallet](ElectrumWallet.md)

***Proceed to the next step - [What's Next?](WhatsNext.md).***
