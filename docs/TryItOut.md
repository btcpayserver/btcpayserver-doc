# Try it out

This section goes through the process of creating an account and store on our public BTCPay server. (For evaluation purpose)

You can also follow along in this video:

[![BTCPay - Introduction](img/thumbnails/BTCPayServerWalkthourgh.png)](http://www.youtube.com/watch?v=xh3Eac66qc4 "BTCPay - Introduction")

## Create your first invoice

First let's create a new store:

1. Go to the [Testnet website](https://testnet.demo.btcpayserver.org/)
2. In the top right corner click on **Register** to [create an account](https://testnet.demo.btcpayserver.org/Account/Register)
3. After having signed in, go to **Stores** and [create a new store](https://testnet.demo.btcpayserver.org/stores)

Let's use Electrum to create a testnet wallet for your store:

1. Download [Electrum](https://electrum.org)
2. Run Electrum with parameter `--testnet` (i.e. on Mac OS using `open -a Electrum.app --args --testnet`)
3. Click through the wizard and create a test wallet, using the default settings Electrum proposes
4. After the wallet is set up, go to "Wallet" > "Information" in the Electrum menu.
5. Copy the "Master Public Key" string (starting by `*pub...`)

Let's configure the store so it uses your Electrum wallet:

1. Go to the Settings page of your store in BTCPay
2. On the "General Settings" page you will find the "Derivation Scheme" section - click the "Modify" action for BTC
3. Paste the "Master Public Key" copied from Electrum into the "Derivation Scheme" text field and click "Continue"
4. Confirm the addresses by clicking on "Receive" in Electrum: The "Receiving address" should match the first address shown in BTCPay
5. After that your test wallet should appear on the [Wallets page](https://testnet.demo.btcpayserver.org/wallets) of your BTCPay account

Then you can create an invoice, either through
* the "Invoice" menu on the website or
* the process documented on the [Custom integration](CustomIntegration.md)

See the [What's Next](https://docs.btcpayserver.org/getting-started/whatsnext) page for other options on how to continue exploring BTCPay.

## BTCPay Demo

To see BTCPay in action, visit our demo apps and stores or check out some of the stores using BTCPay in production.

* [BTCPay Demo Store](https://store.btcpayserver.org/)
* [Point of Sale Demo](https://mainnet.demo.btcpayserver.org/apps/87kj5yKay8mB4UUZcJhZH5TqDKMD3CznjwLjiu1oYZXe/pos)
* [In-production stores](https://bitcoinshirt.co/btcpay-stores/)
