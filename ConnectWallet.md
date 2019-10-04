# Connecting a wallet to BTCPay

After [account registration](RegisterAccount.md), [store creation](CreateStore.md), it's time to connect a wallet to your BTCPay Server.

BTCPay is a non-custodial software, which means that all the funds received to your store, will end up directly into your connected wallet.

*Note: A [private key](https://en.bitcoin.it/wiki/Private_key) (xprv) is **never** required for receiving money on-chain to a BTCPay wallet. The software needs a public key (xpubkey) which is a watch-only wallet token. The xpubkey allows BTCPay to generate a new address each time a new invoice is generated. It enables users to observe the wallet balance and transactions without having to share their private key. Exception is [Lightning Network](LightningNetwork.md) which is a hot wallet with keys online.*

To manage the funds received to your BTCPay wallet, you can use an [internal BTCPay Wallet](Wallet.md) or an external wallet. We recommend that you use internal wallet, since it's connected to your full node and does not leak information to third-parties. If you're using an external wallet, we recommend that you use the wallet which:

1. Allows connection to a full node
2. Allows custom [gap limit](FAQ/FAQ-Wallet.md)

## Recommended wallets

This page lists the recommended wallets for BTCPay Server. Click on the link and you will be redirected to a step by step tutorial on how to set up particular wallet with BTCPay Server.

### Internal BTCPay Wallet

- [Ledger Wallet](LedgerWallet.md)
- [Coldcard Wallet]( 	ColdCardWallet.md)

### External Wallets

- [Wasabi Wallet](WasabiWallet.md)
- [Electrum Wallet](ElectrumWallet.md)

***Proceed to the next step - [What's Next?](WhatsNext.md).***
