## Connect an existing wallet

![Import Existing Wallet](./img/createwallet/ImportWallet.png)

By using an existing wallet, you can receive payments to the external wallet, without BTCPay Server knowing the wallet's private key. If a malicious attacker hacked your server and obtained the xpub, they could observe your transaction history, but cannot access the funds.

- [Connect hardware wallet (Recommended)](#connect-hardware-wallet)
- [Import Wallet file (Recommended)](#import-wallet-file)
- [Enter extended public key](#enter-extended-public-key)
- [Scan wallet QR code](#scan-wallet-qr-code)
- [Enter wallet seed (Not Recommended)](#enter-wallet-seed)

### Connect hardware wallet

Hardware wallets provide a good balance between security and ease of use. If you already have a hardware wallet set up, you can easily use it with your BTCPay Server. Thanks to built-in [hardware wallet integration](HardwareWalletIntegration.md) the xpub key from the hardware wallet is automatically added to your BTCPay Server. The integration further allows you to spend funds received to your store within BTCPay's [internal wallet](./Wallet.md).

:::tip
If you own a hardware wallet, follow the instructions on how to [use a an existing hardware wallet with your BTCPay Server](HardwareWalletIntegration.md)
:::

### Import Wallet file

Using an existing software wallet assumes that you already have an external wallet created and backed up. In theory, any mobile/desktop wallet that provides an extended public key should work, however, most wallets have technical limitations [(gap-limit)](./FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet) that may cause serious user-experience problems for you later on.

For that reason, we recommend that you only use software wallets listed below.

- [Electrum Wallet](./ElectrumWallet.md)
- [Wasabi Wallet](./WasabiWallet.md)

Click on the links above and you will be redirected to a step by step tutorial on how to set up each particular software wallet with BTCPay Server.

To spend and manage the funds received to your external software wallet, you can use the [internal BTCPay Wallet](./Wallet.md) and sign a transaction with your private key or simply manage the funds in that external wallet itself.

### Enter extended public key

This option can be useful if you want to modify [legacy wallet addresses](./FAQ/FAQ-General.md#what-if-i-have-a-problem-paying-an-invoice) or if your wallet type is not compatible with the Hardware Wallet Integration (Vault). 

This method requires you to configure your wallet connection manually and should only be used if you have a good understanding of wallet extended public keys, account key paths and master fingerprints. 

### Scan wallet QR code

Some wallets allow you to create a wallet and export the extended public key (xPub) using a QR Code. You can easily connect your BTCPay Server to these types of wallets with the scan QR code option. The common [(gap-limit)](./FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet) issue is likely to occur using any xPub, unless the wallet provider has a way to adjust it.

To spend and manage the funds in your [internal BTCPay Wallet](./Wallet.md) you will need to provide the private key (used to generate the xpub QR Code) during transaction signing or simply receive funds through your BTCPay and manage the funds in the external wallet.

### Enter wallet seed

This option is useful if you have **no other way** of spending funds in a certain wallet. Such as an altcoin wallet that was previously compatible with the hardware wallet integration but no longer is. In general you should never type wallet seed words on any internet connected device. 

This method requires you to configure your wallet connection manually and should only be used if you have a good understanding of wallet formats, extended public keys, account key paths and master fingerprints. 