# BTCPay Apps Frequently Asked Questions

This document covers frequently asked question about the Apps in BTCPay.

* [What are the Apps in BTCPay?](#what-are-the-apps-in-btcpay)
* [Is there a limit on the number of Apps I can deploy?](#is-there-a-limit-on-the-number-of-apps-i-can-deploy)
* [Is there a Point of Sale feature in BTCPay?](#is-there-a-point-of-sale-feature-in-btcpay)
* [How can I use BTCPay in a physical store?](#how-can-i-use-btcpay-in-a-physical-store)
* [How to customize the apperance of Point of Sale App in BTCPay?](#how-to-customize-the-appearance-of-Point-of-Sale-App-in-BTCPay)
* [What is a Payment Button?](#what-is-a-payment-button)
* [How to fix empty spacing around payment button](#how-to-fix-empty-spacing-around-payment-button)

## What are the Apps in BTCPay?
Apps are plugins (features) you can use to expand the-use case of your BTCPay.

## Is there a limit on the number of Apps I can deploy?
There's no limit. Each app can be created unlimited amount of times. Apps are added on a store level, you need to have a store to create an app.

## Is there a Point of Sale feature in BTCPay?
Yes. Please read our [guide on creating the POS app](/GettingStarted.md#creating-the-pay-button)

## How can I use BTCPay in a physical store?
You can use our Point of Sale up. For creating physical POS, right now, the easiest solution is to utilize POS App that’s available and then set that as URL within your in store POS. When you create POS app within BtcPayServer - you will get publicly accessible URL where checkout buttons for products you’ve defined will be displayed. Click on the button creates an invoice.

## How to customize the appearance of Point of Sale App in BTCPay
It is very easy to customize the look of the Point of Sale app. [Follow this guide](/Theme.md) to learn how to change the theme.

## What is a Payment Button?
The Payment Button is a simple and customizable HTML button you can create and embed into your website. To create a payment button, [follow this guide](/GettingStarted.md#creating-the-point-of-sale-app)

## How to fix empty spacing around payment button?
This usually happensi in Wordpress. The Wordpress text editor can cause conflicts with the pay button code by adding `<br>`, which is "line break" in HTML, between the hidden lines of the form, thus adding invisible empty lines. 

You can get rid of that with a simple Wordpress plugin, [Don't muck my markup](https://wordpress.org/plugins/dont-muck-my-markup/). Install, activate it and then you should see this box on the right of the edit page of your posts :  

![Dont-muck-markup](/img/Dont-muck-markup.png)

Just tick the case in the post you want to stick the pay button in and the problem should be solved.

If the same problem occurs with other CMS please check that the text editor does not add `<br>` tag automatically in the HTML code of your post.
