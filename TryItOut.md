# Try it out

This section goes through the process of creating an account and store on our public BTCPay server. (For evaluation purpose)

* Our [mainnet site](https://mainnet.demo.btcpayserver.org/)
* Our [testnet site](https://testnet.demo.btcpayserver.org)

You can take a look at our video:

[![BTCPay - Introduction](http://img.youtube.com/vi/xh3Eac66qc4/mqdefault.jpg)](http://www.youtube.com/watch?v=xh3Eac66qc4 "BTCPay - Introduction")

## Create your first invoice

First let's create a new store:

1. Go on [Testnet website](https://testnet.demo.btcpayserver.org/)
2. [Create an account](https://testnet.demo.btcpayserver.org/Account/Register)
3. [Create a new store](https://testnet.demo.btcpayserver.org/stores)

Let's create a testnet wallet for your store:

1. Download [Electrum](https://electrum.org)
2. Run Electrum with parameter `--testnet`
3. Open Electrum Desktop. At the top of the screen, click “Wallet” and then “Information”. Copy the whole string starting by `tpub...`

Let's configure the store so it uses your electrum wallet:

1. Go to the setting page of your store in BTCPay
2. In the Information Menu, paste the `ExtPubKey` with the string you just copied from Electrum, validate.

Then you can create an invoice, either by the process documented on the [Custom integration](CustomIntegration.md) page, through plugins or through the website on the `Invoice` menu.

## BTCPay Demo

To see BTCPay in action, visit our demo apps and stores or check out some of the stores using BTCPay in production.

* [BTCPay Demo Store](https://store.demo.btcpayserver.org/)
* [Point of Sale Demo](https://mainnet.demo.btcpayserver.org/apps/87kj5yKay8mB4UUZcJhZH5TqDKMD3CznjwLjiu1oYZXe/pos)
* [Payment Button Demo](https://store.demo.btcpayserver.org/?page_id=44)
* [In-production stores](https://bitcoinshirt.co/btcpay-stores/)
