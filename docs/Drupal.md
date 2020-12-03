# Drupal Commerce 2.x integration

The project can be found [here](https://drupal.org/project/commerce_btcpay) on drupal.org and therefore can be installed using `composer` from the drupal.org packagist (no need to add the repo manually to your `composer.json`). The sources are available on [github](https://github.com/btcpayserver/commerce_btcpay).

## Requirements

* BTCPay Server ([self hosted or 3rd party](./Deployment.md) or [quick start with a testserver](./TryItOut.md))
* Drupal Commerce 2.x installed ([installation guide](https://docs.drupalcommerce.org/commerce2/developer-guide/install-update/installation))
* Drupal: [configured private file system](https://www.drupal.org/docs/8/core/modules/file/overview#content-accessing-private-files)

## Module installation and configuration

### Quick walkthrough screencast

[![Drupal Commerce](https://img.youtube.com/vi/XBZwyC2v48s/mqdefault.jpg "BTCPay Server - Drupal Commerce")](https://youtube.com/watch?v=XBZwyC2v48s "BTCPay Server - Drupal Commerce 2.x quick walkthrough")

### Quick walkthrough steps

#### Generate pairing code on BTCPay server

1. BTCPay server: [create and configure a store](./CreateStore.md#creating-a-store-in-btcpay)
2. in store settings go to "**Access Tokens**"
3. click on **[Create a new token]**
4. **Label:** enter some label (eg. my store)
5. **Public key:** this needs to be left **empty**
6. **Facade:** "merchant"
7. click on **[Request pairing]**
8. on next screen choose your configured store in **Pair to** select dropdown and click on **[approve]**
9. note down the displayed 7-digit code at the top status message, e.g. "d7afaXr"
 (you will need that code below on gateway configuration, see below)

#### Commerce BTCPay: Installation + configuration

1. install module: `composer require drupal/commerce_btcpay`
2. enable the module: `drush en commerce_btcpay -y`
3. make sure you have configured [private file system](https://www.drupal.org/docs/8/core/modules/file/overview#content-accessing-private-files) (needed to store encrypted public+private key)
4. Commerce BTCPay configuration (**Commerce -> Configuration -> Payment -> Payment gateways**):
5. add payment method "BTCPay"
    * **Mode**: Test or Live (you can configure both individually)
    * **Test/Live server host**: enter your URL without https:// prefix e.g. btcpay.yourserver.com (note valid SSL certificate needed)
    * **Test/Live Paring code**: enter the 7-digit pairing code from BTCPay "Access tokens" page
    * **Save**
      You should see a message that the tokens were successfully created.
