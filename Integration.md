# ECommerce Integration

Since BTCPay Server has an API compatible with Bitpay, it inherits from all its integration to ECommerce solutions with minimal engineering efforts.

## WooCommerce integration

You can checkout the following video, or head out to [the woocommerce plugin repository](https://github.com/btcpayserver/woocommerce-plugin).

[![WooCommerce](https://img.youtube.com/vi/tTH3nLoyTcw/mqdefault.jpg)](https://www.youtube.com/watch?v=tTH3nLoyTcw "BTCPay - WooCommerce")

## Drupal Commerce 2.x integration

The project can be found [here](https://drupal.org/project/commerce_btcpay) on drupal.org and therefore can be installed using `composer` from the drupal.org packagist (no need to add the repo manually to your `composer.json`).

### Requirements

* BTCPay Server (see [docker setup guide](https://github.com/btcpayserver/btcpayserver-docker))
* Drupal Commerce 2.x installed ([installation guide](https://docs.drupalcommerce.org/commerce2/developer-guide/install-update/installation))  
* Drupal: [configured private file system](https://www.drupal.org/docs/8/core/modules/file/overview#content-accessing-private-files)

### Module installation and configuration

#### Quick walkthrough screencast:
[![Drupal Commerce](https://img.youtube.com/vi/XBZwyC2v48s/mqdefault.jpg)](https://youtu.be/XBZwyC2v48s "BTCPay - Drupal Commerce 2.x quick walkthrough")

#### Quick walkthrough steps

##### Generate pairing code on BTCPay server
1.  in store settings go to "**Access Tokens**"
2.  click on **[Create a new token]**
3.  **Label:** enter some label (eg. my store)
4.  **Public key:** this needs to be left **empty**
5.  **Facade:** "merchant"
6.  click on **[Request pairing]**
7.  on next screen choose your configured store in** Pair to** select dropdown and click on **[approve]**
8.  note down the displayed 7-digit code at the top status message, e.g. "d7afaXr"   
 (you will need that code below on gateway configuration, see below)

##### Commerce BTCPay: Installation + configuration
1.  install module: `composer require drupal/commerce_btcpay`
2.  enable the module: `drush en commerce_btcpay -y`
3.  make sure you have configured [private file system](https://www.drupal.org/docs/8/core/modules/file/overview#content-accessing-private-files) (needed to store encrypted public+private key)
4.  Commerce BTCPay configuration (**Commerce -> Configuration -> Payment -> Payment gateways**): 
5.  add payment method "BTCPay"
    * **Mode**: Test or Live (you can configure both individually)
    * **Test/Live server host**: enter your URL without https:// prefix e.g. btcpay.yourserver.com (note valid SSL certificate needed)
    * **Test/Live Paring code**: enter the 7-digit pairing code from BTCPay "Access tokens" page
    * **Save**  
      You should see a message that the tokens were successfully created.
