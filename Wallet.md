# BTCPay Server Wallet

This document explains the features of the internal BTCPay wallet. For frequently asked questions - check the [Wallets FAQ](FAQ/FAQ-Wallet.md)

Note: A [private key](https://en.bitcoin.it/wiki/Private_key) (xprv) is **never** required for receiving money to a BTCPay wallet. The software needs a public key (xpubkey) which is a watch-only wallet token. The xpubkey allows BTCPay to generate a new address each time a new invoice is generated. It enables users to observe the wallet balance and transactions without having to share their private key.

*The wallet does not generate a private key. Users have to create their own private key externally and import an xpubkey derived from the private key into Store Settings > Derivation scheme.  The public key (xpubkey) can be imported from a compatible hardware wallet or added manually by pasting the key into the field and adding an appropriate suffix. For more information on how to add a derivation scheme to BTCPay, see the [Getting Started Guide](GettingStarted.md). If you're using a [third-party host](ThirdPartyHosting.md) and are asked to provide a private key, it's certainly a scam. Never share your private key with anyone. It's called private for a reason.*

BTCPay's **internal**, full-node reliant wallet that can be accessed by clicking **Wallets** from the top menu. The reliance on the user's own full node makes the wallet more private and secure compared to any [SPV](https://en.bitcoin.it/wiki/Thin_Client_Security#Simplified_Payment_Verification_.28SPV.29) wallet.

Each store and a cryptocurrency have a separate wallet displayed on the Wallets page. To access a particular wallet, click **Manage**.

![Wallets Page BTCPay](/img/BTCPayWallets1.png)

### Wallet overview

The wallet contains following features:

1. Transactions
2. Send 
3. Re-scan
4. PSBT 
5. Settings

#### Transactions

An overview of the incoming (green), outgoing (red) and unconfirmed (greyed out) transactions displayed together with timestamp and balances, sorted by date. Users can click on the tx ID to preview the transaction on the block explorer.

![Individual Wallet](/img/BTCPayWallets2.png)

#### Send

The Send function allows spending of the funds from the BTCPay wallet.

![Send from the Wallet](/img/BTCPayWallets3.png)

Since the wallet is not a hot wallet, in order to spend the funds, user is required to sign the transaction.  Signing can be achieved in several ways :

- Ledger Hardware Wallet
- HD Private key or mnemonic seed
- Wallet supporting PSBT

#### Signing with Ledger Hardware wallet
Ledger's Nano S is a hardware wallet that can be used to sign transactions in BTCPay's wallet. To understand how to configure it and use it, watch a video below.

[![How to Use Ledger Nano S in BTCPay](https://img.youtube.com/vi/1Sj5mP4TkFI/mqdefault.jpg)](https://www.youtube.com/watch?v=1Sj5mP4TkFI "How to Use Ledger Nano S in BTCPay")

##### Advanced Settings

###### Make sure no change UTXO is created (Expert mode)

This option is available in the `expert mode` of the Send page.
It is a privacy enhancing feature which is useful when you send to another of your own wallets or to an exchange. It makes sure that no change UTXO is created by **rounding up** the amount sent.

By default this feature is disabled, so if your wallet has a UTXO of `1.1 BTC` and you input an amount equals to `1.0 BTC`, the resulting transaction will have two outputs `0.1 BTC` of change, and `1.0 BTC` to your destination. Blockchain analysis will understand that those `0.1 BTC` of change belong to the same entity which controlled `1.1 BTC` before, and can track the future purchase you make under the same pattern.

By enabling this feature, BTCPay Server wallet will round up the amount sent to `1.1 BTC` such that no change output is sent back to you.

Warning: Despite the fact, in this example, that you entered `1.0` in the amount field, the amount that will really be sent to your destination will be `1.1 BTC`.

#### Re-scan

The Rescan relies on Bitcoin Core 0.17.0's scantxoutset to scan the current state of the blockchain (called UTXO Set) for coins belonging to the derivation scheme being used. 

![Wallet rescan](/img/BTCPayWallets4.png)

Wallet re-scan solves two critical problems for BTCPay users:

1. [Gap limit](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet)
2. Importing a previously used wallet

**Gap limit**: Most of the wallets have the gap limit set to 20. This means that if a merchant receives 21 or more consecutive unpaid invoices, those wallets show the incorrect balance and some transactions may not be visible.

**Wallet import**: When users add a derivation scheme of a wallet that had transactions in the past (used wallet), BTCPay won't be able to show the balance and transactions from the past.

![Wallet rescan progress](/img/BTCPayWallets5.png)

Re-scan is a feature that solves both of these problems. Once the scan is complete, BTCPay Server will show the correct balance, along with the past transactions of the wallet. Wallet re-scan requires access to the full node which means that this function is only available for server owners.

Users who use a third party host should use a newly generated xpub key and also use an external wallet like Electrum which allows them to increase the gap limit.
