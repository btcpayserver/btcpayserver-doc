# (3) Wallet Setup

After [account registration](./RegisterAccount.md) and [store creation](./CreateStore.md), it's time to configure a wallet in your BTCPay Server, so that you can start receiving payments into it.

There are two ways to set up a wallet in BTCPay Server:

 - [Connect an existing wallet](#connect-an-existing-wallet)
 - [Create a new wallet](#create-a-new-wallet)

## Connect an existing wallet

![Import Existing Wallet](./img/createwallet/ImportWallet.png)

Using an existing wallet assumes that you already have an external wallet created and backed up. 

By using an existing wallet, you can receive payments to the external wallet, without BTCPay Server knowing the wallet's private key. If a malicious attacker hacked your server and obtained the xpub, they could observe your transaction history, but cannot access the funds.

- [Connect hardware wallet (Recommended)](#use-an-existing-hardware-wallet)
- [Import Wallet file (Recommended)](#use-an-existing-software-wallet)
- [Enter extended public key](#enter-extended-public-key)
- [Scan wallet QR code](#scan-wallet-qr-code)
- [Enter wallet seed (Not Recommended)](#enter-wallet-seed)

### Connect hardware wallet

Hardware wallets provide a good balance between security and ease of use. If you already have a hardware wallet set up, you can easily use it with your BTCPay Server. Thanks to built-in [hardware wallet integration](HardwareWalletIntegration.md) the xpub key from the hardware wallet is automatically added to your BTCPay Server. The integration further allows you to spend funds received to your store within BTCPay's [internal wallet](./Wallet.md).

:::tip
If you own a hardware wallet, follow the instructions on how to [use a an existing hardware wallet with your BTCPay Server](HardwareWalletIntegration.md)
:::

### Import Wallet file

Using an existing software wallet assumes that you already have an external wallet created and backed up. In theory, any mobile/desktop wallet that provides an extended public key should work, however, most wallets have technical limitations [(gap-limit)](FAQ/FAQ-Wallet.md/#missing-payments-in-my-software-or-hardware-wallet) that may cause serious user-experience problems for you later on.

For that reason, we recommend that you only use software wallets listed below.

- [Electrum Wallet](./ElectrumWallet.md)
- [Wasabi Wallet](./WasabiWallet.md)

Click on the link above you will be redirected to a step by step tutorial on how to set up particular software wallet with BTCPay Server.

To spend and manage the funds received to your external software wallet, you can use the [internal BTCPay Wallet](./Wallet.md) and sign a transaction with your private key or simply manage the funds in that external wallet itself.

### Enter extended public key

This option can be useful if you want to modify [legacy wallet addresses](./FAQ/FAQ-General.md#what-if-i-have-a-problem-paying-an-invoice) or if your wallet type is not compatible with the Hardware Wallet Integration (Vault). 

This method requires you to configure your wallet connection manually and should only be used if you have a good understanding of wallet extended public keys, account key paths and master fingerprints. 

### Scan wallet QR code

Some wallets allow you to create a wallet and export the extended public key (xPub) using a QR Code. You can easily connect your BTCPay Server to these types of wallets with the scan QR code option. The common [(gap-limit)](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet) issue is likely to occur using any xPub, unless the wallet provider has a way to adjust it.

To spend and manage the funds in your [internal BTCPay Wallet](./Wallet.md) you will need to provide the private key (used to generate the xpub QR Code) during transaction signing or simply receive funds through your BTCPay and manage the funds in the external wallet.

### Enter wallet seed

This option is useful if you have **no other way** of spending funds in a certain wallet. Such as an altcoin wallet that was previously compatible with the hardware wallet integration but no longer is. In general you should never type wallet seed words on any internet connected device. 

This method requires you to configure your wallet connection manually and should only be used if you have a good understanding of wallet formats, extended public keys, account key paths and master fingerprints. 

## Create a new wallet

![Hot Wallet](./img/hotwallet/HotWallet.png)

### Hot Wallet 

If you do not have an existing wallet, you can generate a new one within your BTCPay Server. Whether you have an existing wallet or not, the quickest way to get a wallet connected to your store is to create a new wallet. You can always replace it with an alternative wallet after receiving a few small payments to your server, if you just want to get your store ready quickly. 

If are using a [third-party host](./ThirdPartyHosting.md), this option needs to be explicitly enabled by the server admin. Generating a new wallet in an environment you are not sure is trustworthy, is discouraged.

:::warning
When a new wallet is generated, BTCPay Server will show you a twelve word recovery seed. After the initial display, the recovery seed is wiped from the server, unless a [hot wallet option](./HotWallet.md) is enabled.
:::

:::warning
Anyone with access to your recovery seed can also access and steal all your funds (current AND future funds!), since a private key is derived from a recovery seed. Securely back up your seed by writing it down and keep it in a safe place. Do not photograph it or store it in a digital format. Do not rely solely on your server for storing your recovery seed, even if you're using a hot wallet.
:::

### Watch-only wallet

Similar to the hot wallet, the watch-only wallet can get your store connected to a wallet instantly. In contrast, this option does not store the private keys on the server. As a result the wallet becomes "watch-only" for any received funds. 

In order to spend the funds you would need to manually provide your seed words each time. Alternatively you can spend funds in another external wallet where you have imported your BTCPay Server produced seed words. Be sure to consider the [gap limit issue](FAQ/FAQ-Wallet.md#missing-payments-in-my-software-or-hardware-wallet) if you're using an external wallet with your watch-only wallet.

## Summary

There are many options on how set up a wallet with your BTCPay Server. It's up to you to decide what works best for your use-case. Once you configure a wallet, you're all set. The next step, is to [start exploring the features](./WhatsNext.md).

***Proceed to the next step - [What's Next?](./WhatsNext.md).***
