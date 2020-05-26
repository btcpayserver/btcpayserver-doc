# (3) Wallet Setup

After [account registration](RegisterAccount.md) and [store creation](CreateStore.md), it's time to configure a wallet in your BTCPay Server, so that you can start receiving payments into it.

There are two ways to set up a wallet in BTCPay Server:
 
 - [Use an existing wallet](#use-an-existing-wallet)
 - [Create a new wallet](#create-a-new-wallet)

## Use an existing wallet

:::tip
When using an existing wallet with BTCPay Server, you're providing an extended public key (xpub) which is a watch-only wallet token. The public key allows BTCPay Server to generate a new address each time a new invoice is created. 

You can receive payments to your wallet, without BTCPay Server knowing your private key. If a malicious attacker hacked your server and obtained the xpub, they could observe your addresses and balance, but cannot access the funds.
:::

Using an existing wallet assumes that you already have an external wallet created and backed up. You can:

- [Use an existing hardware wallet](#use-an-existing-hardware-wallet)
- [Use an existing software wallet](#use-an-existing-software-wallet)

### Use an existing hardware wallet

Hardware wallets provide best balance between security and ease of use. We've made an app - BTCPay Vault that allows you to set up your hardware wallet with BTCPay Server automatically. Furthermore, if you're self-hosting an instance, it allows your hardware wallet to rely on your full node, further enhancing the privacy. 

:::tip
If you own a hardware wallet, follow the instructions on how to [use a hardware wallet with your BTCPay Server](Vault.md)
:::

### Use an existing software wallet

Using an existing software wallet assumes that you already have an external wallet created and backed up. In theory, any mobile/desktop wallet that provides an extended public key should work, however, most wallets have technical limitations [(gap-limit)](FAQ/FAQ-Wallet/#missing-payments-in-my-software-or-hardware-wallet) that may cause serious user-experience problems for you later on.

For that reason, we recommend that you only use software wallets listed below.

Click on the link below you will be redirected to a step by step tutorial on how to set up particular software wallet with BTCPay Server.

- [Electrum Wallet](ElectrumWallet.md)
- [Wasabi Wallet](WasabiWallet.md)

To spend and manage the funds received to your external software wallet, you can use an [internal BTCPay Wallet](Wallet.md) and sign a transaction with your private key or simply manage the funds in that external wallet itself.

## Create a new wallet

***Proceed to the next step - [What's Next?](WhatsNext.md).***
