# Try it out

This section goes through the process of **creating an account and store on our public BTCPay server**. (For evaluation purpose)

You can also follow along in this video:

[![BTCPay - Introduction](https://img.youtube.com/vi/xh3Eac66qc4/mqdefault.jpg)](https://www.youtube.com/watch?v=xh3Eac66qc4 "BTCPay - Introduction")

## Create your first invoice

For an in production setup, skip to [Mainnet](./TryItOut.md#mainnet)

### Testnet
First let's create a new store:

1. Go to the [Testnet website](https://testnet.demo.btcpayserver.org/)
2. On the right side click on **Create an account** to [create an account](https://testnet.demo.btcpayserver.org/Account/Register) or **Sign In** if you already have an account.
3. After having signed in, go to **Stores** and [create a new store](https://testnet.demo.btcpayserver.org/stores)

Let's use Electrum to create a testnet wallet for your store:

1. Download [Electrum](https://electrum.org)
2. Run Electrum with parameter `--testnet` (i.e. on Mac OS using `open -a Electrum.app --args --testnet`)
3. Click through the wizard and create a test wallet, using the default settings Electrum proposes
4. After the wallet is set up, go to "Wallet" > "Information" in the Electrum menu.
5. Copy the "Master Public Key" string (starting by `*pub...`)

Let's configure the store so it uses your Electrum wallet:

1. Go to the Settings page of your store in BTCPay
2. On the "General Settings" page you will find the "Wallet" section - click the "Setup" button for configuring an on-chain wallet.
3. Paste the "Master Public Key" copied from Electrum into the "Derivation Scheme" text field and click "Continue"
4. Confirm the addresses by clicking on "Receive" in Electrum: The "Receiving address" should match the first address shown in BTCPay
5. After that your test wallet should appear on the [Wallets page](https://testnet.demo.btcpayserver.org/wallets) of your BTCPay account

Then you can create an invoice, either through
* the "Invoice" menu on the website or
* the process documented on the [Custom integration](./CustomIntegration.md)

### Mainnet

First choose where to setup your store.
Either:
* Host your store on someone else's BTCPay Server. You can find a list of third-party hosts [here](./ThirdPartyHosting.md#where-is-the-list-of-btcpay-third-party-hosts).
* Or [deploy your own](./Deployment.md).

Click on the following links for detailed instructions on how to [Register an account](./RegisterAccount.md), [Create your first store](./CreateStore.md) and [Connect your own wallet](./WalletSetup.md)

Then you can create an invoice, either through
* The "Invoice" menu on the website or
* The process documented on the [Custom integration](./CustomIntegration.md)

See the [What's Next](./WhatsNext.md) page for other options on how to continue exploring BTCPay.

## BTCPay Server Demo

To see BTCPay Server in action, visit our demo apps and stores or check out some of the stores using BTCPay Server in production.

* [BTCPay Demo Store](https://store.btcpayserver.org/)
* [Point of Sale Demo](https://mainnet.demo.btcpayserver.org/apps/87kj5yKay8mB4UUZcJhZH5TqDKMD3CznjwLjiu1oYZXe/pos)
* [In-production stores](https://directory.btcpayserver.org)
