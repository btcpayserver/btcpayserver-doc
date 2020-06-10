# BTCPay Server Wallet

BTCPay Server has a built in, full-node reliant wallet that allows easier funds management. 

Each [store](CreateStore.md) and cryptocurrency have a separate wallet displayed on the wallets page. A wallet can be accessed by clicking **Wallets** from the top menu. To access a particular wallet, click **Manage**.

![Wallets Page BTCPay](./img/wallet/Wallets.png)

## Wallet features

The wallet contains following features:

1. Transactions
2. Send
3. Receive
4. Re-scan
5. PSBT
6. Settings

### Transactions

An overview of the incoming (green), outgoing (red) and unconfirmed (grayed out) transactions displayed together with timestamps and balances, sorted by date. You can click on the tx ID to preview the transaction on the block explorer.

![Individual Wallet](./img/walle/WalletTransactions.png)

### Send

The Send function allows spending of the funds from the BTCPay wallet.

![Send from the Wallet](./img/wallet/WalletSend.png)

#### Signing a transaction (spending)

To spend the funds, you are required to **sign** the transaction. Transactions can be signed with:

- HD Private key or mnemonic seed
- Wallet supporting PSBT
- Hardware Wallet (BTCPay Vault)
- Hot Wallet

##### Signing with HD Private Key or mnemonic seed

Transactions in BTCPay's wallet can be signed with a private key or mnemonic seed. Prior to inputing the private key, make sure to set a proper `AccountKeyPath` in Wallet > Settings.

##### Signing with a wallet supporting PSBT

PSBT (Partially Signed Bitcoin transaction) is supported and can be signed with PSBT compatible wallet.

Check this tutorial on how to [sign a transaction with ColdCard Hardware Wallet](ColdCardWallet.md#spending-from-btcpay-server-wallet-with-coldcard-psbt) completely air-gaped.

##### Signing with Hardware Wallets (BTCPay Vault)

[BTCPay Vault](https://blog.btcpayserver.org/btcpay-vault/) is a cross-platform desktop application that makes it possible to use a wide range of hardware wallets with the BTCPay Wallet.

Check [BTCPay Vault](Vault.md) documentation for instructions on how to set up and sign with a [compatible hardware wallet](https://github.com/bitcoin-core/HWI#device-support).

##### Signing with a Hot Wallet

BTCPay Server also allows stores to generate or import a wallet while also storing its private keys. If your store was configured this way, you'll have the option available in the "Sign with.." dropdown.
:::danger
Using the hot wallet feature comes with its own security implications, please be sure to read and understand them over at the [Hot Wallet documentation](HotWallet.md)
:::

#### Advanced Settings

Certain wallet features are available for advanced users. Toggle the `Advanced Settings` within the `Send` tab to preview them.

##### Make sure no change UTXO is created (Advanced mode)

This option is available in the `Advanced mode` of the `Send` page.

It is a privacy enhancing feature which is useful when you're sending funds to another wallet of yours or to an exchange. It makes sure that no change UTXO is created by **rounding up** the amount sent.

By default this feature is disabled, so if your wallet has an UTXO of `1.1 BTC` and you input an amount equals to `1.0 BTC`, the resulting transaction will have two outputs `0.1 BTC` of change, and `1.0 BTC` to your destination.

Blockchain analysis will understand that those `0.1 BTC` of change belong to the same entity which controlled `1.1 BTC` before, and can track the future purchase you make under the same pattern.

By enabling this feature, BTCPay Server wallet will round up the amount sent to `1.1 BTC` such that no change output is sent back to you.

Warning: Despite the fact, in this example, that you entered `1.0` in the amount field, the amount that will really be sent to your destination will be `1.1 BTC`.

### Receive

Receive tab generates an unused address which can be used to receive payments. The same can be achieved by generating an invoice (Invoices > Create new invoice).

![Wallet Receive](./img/wallet/WalletReceive.png)


### Re-scan

The Rescan relies on Bitcoin Core 0.17.0's scantxoutset to scan the current state of the blockchain (called UTXO Set) for coins belonging to the derivation scheme being used.

![Wallet Rescan](./img/wallet/WalletRescan.png)

Wallet re-scan solves two critical problems for BTCPay users:

1. [Gap limit](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet)
2. Importing a previously used wallet

**Gap limit**: Most of the wallets have the gap limit set to 20. This means that if a merchant receives 21 or more consecutive unpaid invoices, those wallets show the incorrect balance and some transactions may not be visible.

**Wallet import**: When users add a derivation scheme of a wallet that had transactions in the past (previously used wallet), BTCPay won't be able to show the balance and transactions from the past.

![Wallet rescan progress](./img/wallet/WalletRescanProgress.png)

Re-scan is a feature that solves both of these problems. Once the scan is complete, BTCPay Server will show the correct balance, along with the past transactions of the wallet.

Wallet re-scan requires access to the full node which means that this function is only available for server owners.

Users who use a third party host should use a newly generated xpub key and also use an external wallet like Electrum which allows them to increase the gap limit.

### PSBT

### Settings