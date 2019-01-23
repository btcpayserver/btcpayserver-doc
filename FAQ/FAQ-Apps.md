# BTCPay Apps Frequently Asked Questions

This document covers frequently asked questions about the Apps in BTCPay.

* [What are the Apps in BTCPay?](#what-are-the-apps-in-btcpay)
* [Is there a limit on the number of Apps I can deploy?](#is-there-a-limit-on-the-number-of-apps-i-can-deploy)
* [Is there a Point of Sale feature in BTCPay?](#is-there-a-point-of-sale-feature-in-btcpay)
* [How can I use BTCPay in a physical store?](#how-can-i-use-btcpay-in-a-physical-store)
* [How to customize the appearance of Point of Sale App in BTCPay?](#how-to-customize-the-appearance-of-Point-of-Sale-App-in-BTCPay)
* [What is a Payment Button?](#what-is-a-payment-button)
* [How to fix empty spacing around payment button](#how-to-fix-empty-spacing-around-payment-button)
* [How to integrate WooCommerce Store in BTCPay Crowdfund app?](#how-to-integrate-woocommerce-store-into-a-btcpay-crowdfund-app)

## What are the Apps in BTCPay?
Apps are plugins (features) you can use to expand the use case of your BTCPay.

## Is there a limit on the number of Apps I can deploy?
There's no limit. Each app can be created an unlimited amount of times. Apps are added on a store level; you need to have a store to create an app.

## Is there a Point of Sale feature in BTCPay?
Yes. Please read our [guide on creating the POS app](/GettingStarted.md#creating-the-pay-button)

## How can I use BTCPay in a physical store?
You can use our Point of Sale up. For creating physical POS, right now, the easiest solution is to utilize POS App that’s available and then set that as URL within your in-store POS. When you create POS app within BtcPayServer - you will get publicly accessible URL where checkout buttons for products you’ve defined will be displayed. Click on the button creates an invoice.

## How to customize the appearance of Point of Sale App in BTCPay
It is very easy to customize the look of the Point of Sale app. [Follow this guide](/Theme.md) to learn how to change the theme.

## What is a Payment Button?
The Payment Button is a simple and customizable HTML button you can create and embed into your website. To create a payment button, [follow this guide](/GettingStarted.md#creating-the-point-of-sale-app)

## How to fix empty spacing around payment button?
This usually happens in Wordpress. The Wordpress text editor can cause conflicts with the pay button code by adding `<br>`, which is "line break" in HTML, between the hidden lines of the form, thus adding invisible empty lines. 

You can get rid of that with a simple Wordpress plugin, [Don't muck my markup](https://wordpress.org/plugins/dont-muck-my-markup/). Install, activate it, and then you should see this box on the right of the edit page of your posts :  

![Dont-muck-markup](/img/Dont-muck-markup.png)

Just tick the case in the post you want to stick the pay button in, and the problem should be solved.

If the same problem occurs with other CMS, please check that the text editor does not add `<br>` tag automatically in the HTML code of your post.

## How to integrate WooCommerce Store into a BTCPay Crowdfund app?
If you want to provide a way for your backers to receive digital files and physical products, you can embed WooCommerce store into your Crowdfunding app.

The following tutorial assumes you have a semi-advanced understanding of BTCPay, WordPress and WooCommerce.

### Requirements
1. Wordpress Website
2. [WooCommerce Plugin](https://wordpress.org/plugins/woocommerce/)
3. [BTCPay for WooCommerce Plugin](https://wordpress.org/plugins/btcpay-for-woocommerce/)
4. [Storefront Theme](https://wordpress.org/themes/storefront/) (if you're using another theme, you may need to modify the CSS code to fit your theme.
5. BTCPay Server 

#### Optional WordPress Plugins
The following plugins are recommended, but not required. You don't have to use them if you're an advanced WordPress user. 
* [Flexible Checkout Fields](https://wordpress.org/plugins/flexible-checkout-fields/) (to edit checkout and remove redundant checkout fields in Woo)
* [My Custom Functions](https://wordpress.org/plugins/my-custom-functions/) (place all PHP functions here instead of placing them directly into a functions.php file, so they don't get wiped during theme update)
* [WooCommerce Direct Checkout](https://wordpress.org/plugins/woocommerce-direct-checkout/) (remove redundant steps in the checkout process and make pledging quicker)
* [Header and Footer Scripts](https://wordpress.org/plugins/header-and-footer-scripts/) (place <script> code here)

### Instructions

#### 1. Connecting 2 stores to a single wallet

In your BTCPay Server, create two separate stores:
1. Store for WooCommerce
2. Store for Crowdfunding app

Add the **same xpub derivation scheme**, so that both stores remain in sync.

#### 2. Modifying CSS in WordPress
In the first step, you need to remove all the redundancies from the WordPress store and make it clean and simple, so that it embeds smoothly into the crowdfund app. 

Place the following custom CSS code into WordPress. Appearance > Customize > **Custom CSS**
```
.storefront-product-section .section-title {
   display: none;
}
.site-footer {
   display: none;
}

#masthead {
   display: none;
}
#header {
   display: none;
}

.woocommerce-breadcrumb  {  display: none;
}

.related.products {
   display: none;
}

.storefront-breadcrumb {
   display: none;
}

.storefront-sorting {
   display: none;
}

.woocommerce-products-header {display: none;}

.iframe {
 overflow: hidden;
}

ul.products li.product .button {
    margin-bottom: .236em;
    display: block;
}

.woocommerce-additional-fields {
   display: none;
}

.product:hover{
background-color:rgba(0,0,255,0.3);
color:rgba(0,0,0,0);
padding-bottom:45px;
}
.product:hover a *{
visibility:hidden;
}

.product:hover a.add_to_cart_button {
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    padding-top: 50%;
    color: white;
    background-color:rgba(0,0,255,0.3);

}

.product:hover a.add_to_cart_button:hover{

background-color:rgba(0,0,255,0.5);
}
```
The code above removes and hides all the unnecessary things from your store (headers, footers, breadcrumbs, and sorting). If you're not using the Storefront theme, you may need to modify it slightly. Besides removing, the bottom part of the code adds a bit of different style which improves the checkout experience and makes it more KickStarter like. Feel free to modify colors.

To remove the redundant fields in WooCommerce checkout, use [Flexible Checkout Fields](https://wordpress.org/plugins/flexible-checkout-fields/). 

To speed up the checkout process use [WooCommerce Direct Checkout](https://wordpress.org/plugins/woocommerce-direct-checkout/) (remove redundant steps in the checkout process and make pledging quicker)

#### 2. Modifing WordPress functions

Insert the following code at the bottom of your child theme's **functions.php** file. Ideally, if you're a beginner, you should use [My Custom Function](https://wordpress.org/plugins/my-custom-functions/) plugin to insert the custom functions to avoid overlap.

If you add the code directly into Appearance>Editor>functions.php, next time you update the theme, the changes will be wiped. So, use either a plugin like My Custom Function or [create a child theme](https://docs.woocommerce.com/document/set-up-and-use-a-child-theme/).

Assuming you're using the plugin, in your WordPress dashboard, go to Settings > PHP Inserter, paste the code and save changes.

![Adding Custom PHP](/img/AddCustomPhp.gif)

```
//* Allow rendering of checkout and account pages in iframes
add_action( 'after_setup_theme', 'wc_remove_frame_options_header', 11 );
function wc_remove_frame_options_header() {
    remove_action( 'template_redirect', 'wc_send_frame_options_header' );
}
```
(Optional) To remove order notes field:
```
// * Remove Order Notes from checkout field in Woocommerce
add_filter( 'woocommerce_checkout_fields' , 'alter_woocommerce_checkout_fields' );
function alter_woocommerce_checkout_fields( $fields ) {
     unset($fields['order']['order_comments']);
     return $fields;
}
```
(Optional) To display a short product description on the shop page:
```
// * Add products short description on the shop page.
add_action( 'woocommerce_after_shop_loop_item', 'woo_show_excerpt_shop_page', 5 );
function woo_show_excerpt_shop_page() {
    global $product;

    echo $product->post->post_excerpt;
} 
```

#### 3. Adding script to WordPress
Install [Header and Footer Scripts](https://wordpress.org/plugins/header-and-footer-scripts/)plugin. Add the followig code to your header or footer. Settings > Headers and Footers Script, paste the code and save changes.
```
<script>
jQuery( document ).ready(function() {
    jQuery(".product").each(function(){
        var product = jQuery(this);
        var item = product.find(".woocommerce-loop-product__link");
        var cartLink = product.find(".add_to_cart_button").attr("href");
        item.attr("href", cartLink);
    });
});
</script>
```
This piece of code makes sure that each click on the product area adds it to cart and prevents users from viewing product description, which is completely uncecessary for our use-case.

#### 4. Modifying the Crowdfunding app
In your BTCPay, Apps > Create New App > Crowdfunding.

In the description of your app, toggle the code and paste the following code and add `<iframe src="http://yourdomain/shop/"></iframe>`
Replace it with the URL of your WooCommerce Store page.

![EmbedIframeCrowdfund](/img/CrowdfundCodeEmbed.png)

Next, paste the following code into the **Custom CSS Code** section of your crowdfunding app:
```
iframe {
    border: 0;
    max-width: 100%;
}

#crowdfund-body-header-tagline-container,
#crowdfund-body-description-container {
    max-width: 100% !important;
    width: 100% !important;
    flex: 100%;
}

#crowdfund-body-contribution-container {
    display: none;
}

#crowdfund-body-header-cta {
    display: none;
}

#crowdfund-body-description-container iframe {
    width:100%;
}
/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    #crowdfund-body-description-container{
        padding-right: 30%;
        min-height:1200px;
    }
    #crowdfund-body-description-container iframe {
        width:30%;
        position: absolute;
        right: 0;
        top:0;
        height: 100%;
    }
}
```

One final thing, make sure to check (enable) **Count all invoices created on the store as part of the crowdfunding goal**

Save the changes and preview the app.
