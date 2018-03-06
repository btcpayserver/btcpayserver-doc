<img src="xadrez.jpg" width="20%"><br>
# Xadrez 
**Seeking the best open source setup for an e-commerce store that accepts Litecoin (LTC) and Bitcoin (BTC)**

Author: Ricardo Sodré Andrade ([Twitter](https://www.twitter.com/ricsodre))

*This guide is not finished yet (I expect to put images and describe everything step-by-step). At this stage you can get good ideas and directions to build your own e-store. If you consider this useful, contribute with some lites to LTC address: [LdMwrnsBoggWVcHcM7yeg242e8QqetYAzU](https://live.blockcypher.com/ltc/address/LdMwrnsBoggWVcHcM7yeg242e8QqetYAzU/)*

Short URL to this guide: [http://xadrez.yndexa.com](http://xadrez.yndexa.com)

I personally run an online bookstore which uses Xadrez to give the option for customers pay with Litecoin and Bitcoin: [9Bravos](https://www.9bravos.com.br/loja). At same time that e-store let me validate what I've documented here. The store is in Brazilian Portuguese.

# Table of contents
1. [Introduction](#introduction)
2. [Components](#components)
    1. [Wordpress](#wordpress)
    2. [WooCommerce plugin](#woocommerce-plugin)
    3. [BTCpay Server](#btcpay-server)
    4. ["Wordpress-Woocommerce-BTCpay" plugin](#wordpress-woocommerce-btcpay-plugin)
    5. [Fiat2LTC-WooCommerce plugin](#fiat2ltc-woocommerce)
    6. [Electrum](#electrum) (desktop and mobile wallet)
    7. [Electrum-LTC](#electrum-ltc) (desktop wallet)
    8. [Samourai Wallet](#samourai-wallet) (mobile wallet)
    9. [Loafwallet](#loafwallet) (mobile wallet)

## Introduction <a name="introduction"></a>

This tutorial expect to give directions and tools to anyone who want to setup an ecommerce store that accepts Litecoin (LTC) and Bitcoin (BTC). Old payment methods like credit card and stuff can be enabled too. All components in this solution are open source software and can be obtained at their websites.

This setup is called Xadrez just to be easier to anyone who want to refer the proposal presented here. Xadrez is Chess in portuguese language and we will change the pieces (the components) on the board until we reach a very nice full featured setup for a stable and definitive ecommerce store (the Checkmate). 

The e-commerce store setup need to use stable software, be easy to configure by merchants with no more than basic tech skills and be able to show products, handle carts, inventory, customer accounts, generate reports and others expected capabilities. All the Litecoin and Bitcoin received need to go directly to the merchant's (preferable mobile) wallets.

I personally run an online bookstore which uses Xadrez to give the option for customers pay with Litecoin and Bitcoin: [9Bravos](https://www.9bravos.com.br/loja). At same time that e-store let me validate what I've documented here. The store is in Brazilian Portuguese.

## Components <a name="components"></a>

Currently setup of Xadrez is formed by the components listed and described below.

### [Wordpress](https://www.wordpress.org)
