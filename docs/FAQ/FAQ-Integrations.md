# BTCPay Integrations Frequently Asked Questions
This page covers questions about BTCPay Server integrations.

## [Integrations General](FAQ-Integrations.md#integrations-general-faq)

* [What e-commerce integrations are available?](FAQ-Integrations.md#what-e-commerce-integrations-are-available)
* [Does BTCPay Server have a Shopify plugin?](FAQ-Integrations.md#does-btcpay-have-a-shopify-plugin)
* [Can I use BTCPay Server without an integration?](FAQ-Integrations.md#can-i-use-btcpay-without-an-integration)

## [WooCommerce FAQ](FAQ-Integrations.md#woocommerce-faq-1)

* [How to configure order status in WooCommerce?](FAQ-Integrations.md#how-to-configure-order-status-in-woocommerce)
* [How to customize e-mail confirmations in WooCommerce?](FAQ-Integrations.md#how-to-customize-e-mail-confirmations-in-woocommerce)
* [Error: If you use an alternative order numbering system, please see class-wc-gateway-btcpay.php to apply a search filter](FAQ-Integrations.md#error-if-you-use-an-alternative-order-numbering-system-please-see-class-wc-gateway-btcpayphp-to-apply-a-search-filter)

## Integrations General FAQ

## What e-commerce integrations are available?

* [WooCommerce](../WooCommerce.md)
* [Drupal](../Drupal.md)
* [Magento](../Magento.md)
* [PrestaShop](../PrestaShop.md)
* [Custom Integration](../CustomIntegration.md)

If you're a developer, you can develop your own integration, by following the [custom integration instructions](../CustomIntegration.md).

### How to use WooCommerce store with BTCPay?

- [BTCPay Server and WooCommerce](https://www.youtube.com/watch?v=tTH3nLoyTcw)
- [BTCPay Server WordPress plugin installation](https://www.youtube.com/watch?v=6QcTWHRKZag)
- [Connecting your store to a third-party BTCPay Server host](https://www.youtube.com/watch?v=IT2K8It3S3o)
- [Connect your wallet to BTCPay Server](https://www.youtube.com/watch?v=xX6LyQej0NQ)
- [Test your store checkout when you finish with the setup](https://www.youtube.com/watch?v=Fi3pYpzGmmo)

### How to use BTCPay with Drupal?

- [BTCPay Server and Drupal installation and configuration](https://github.com/btcpayserver/commerce_btcpay#installation-and-configuration)
- [Drupal Commerce BTCPay Server module installation walkthrough](https://youtube.com/watch?v=XBZwyC2v48s)

### How to use BTCPay with Prestashop?

- [BTCPay Server and Prestashop - getting started guide](https://github.com/btcpayserver/prestashop-plugin#description)
- [Using the BTCPay Server plugin for Prestashop](https://github.com/adapp-tech/prestashop-plugin/blob/master/GUIDE.md#using-the-btcpay-plugin-for-prestashop)

### Does BTCPay have a Shopify plugin?

At this time, BTCPay Server does not have a Shopify integration.

### Can I use BTCPay without an integration?

Yes, you can. While various e-commerce CMS use integrations,  you can use BTCPay Server even if you're not a merchant. For more information about use-cases, see [this page](../UseCase.md)

## WooCommerce FAQ

### How to configure order status in WooCommerce?

Order status depends on a merchant's business model. To better understand BTCPay Server order (invoice) status [read this document](../WooCommerce.md#btcpay-order-statuses).
There's no best way to configure them without trial and error and seeing what works for your business.

### How to customize e-mail confirmations in WooCommerce?

If you wish to send an e-mail after a certain status to the customer, you need to edit WooCommerce order e-mail templates. This is recommended only if you know what you're doing. [Check out this guide](https://www.cloudways.com/blog/how-to-customize-woocommerce-order-emails/).

### Error: If you use an alternative order numbering system, please see class-wc-gateway-btcpay.php to apply a search filter

If by any chance you use a different order numbering than standard in WooCommerce, the following error may appear in your BTCPay Server WooCommerce plugin logs:

> [Error] The BTCPay payment plugin was called to process an IPN message but could not retrieve the order details for order_id: "ON123". If you use an alternative order numbering system, please see class-wc-gateway-btcpay.php to apply a search filter.

Paste the following code at the bottom of your child theme's **functions.php** file:

<details>
  <summary>Click to view</summary>

```php
function get_order_id_from_custom_order_style($orderid){
  if(is_string($orderid)){
    $result = preg_replace('~\D~', '', $orderid);
    return $result;
  }
  return $orderid;
}

add_filter('woocommerce_order_id_from_number', 'get_order_id_from_custom_order_style', 1);
```
</details>