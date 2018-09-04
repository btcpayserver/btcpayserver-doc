# Try it out

This section goes through the process of creating an account and store on our public BTCPay server. (For evaluation purpose)

* Our [mainnet site](https://main2-btc-ltc.forkbitpay.ninja)
* Our [testnet site](https://test2-btc-ltc.forkbitpay.ninja)

You can take a look at our video:

[![BTCPay - Introduction](http://img.youtube.com/vi/xh3Eac66qc4/mqdefault.jpg)](http://www.youtube.com/watch?v=xh3Eac66qc4 "BTCPay - Introduction")

## Create your first invoice

First let's create a new store:

1. Go on [Testnet website](http://test2-btc-ltc.forkbitpay.ninja/)
2. [Create an account](http://test2-btc-ltc.forkbitpay.ninja/Account/Register)
3. [Create a new store](http://test2-btc-ltc.forkbitpay.ninja/stores)

Let's create a testnet wallet for your store:

1. Download [Electrum](https://electrum.org)
2. Run Electrum with parameter `--testnet`
3. Go to Wallet menu then Master Public Key, copy the whole string starting by `tpub...`

Let's configure the store so it uses your electrum wallet:

1. Go to the setting page of your store in BTCPay
2. In the Information Menu, paste the `ExtPubKey` with the string you just copied from Electrum, validate.

Then you can create an invoice, either by the process documented on the [Custom integration](CustomIntegration.md) page, through plugins or through the website on the `Invoice` menu.
