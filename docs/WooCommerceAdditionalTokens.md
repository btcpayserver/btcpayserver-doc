# WooCommerce Additional Tokens

With using the additional token configuration you will be able to have separate payment methods for each configured token/currency. This means you can have separate payment methods for BTC, Lightning Network, LTC, ETH (and ERC20 tokens), Liquid assets, ... you name it. This allows you to issue and use [Liquid Assets](https://help.blockstream.com/hc/en-us/articles/900001543146-What-are-Liquid-assets-) as coupons or vouchers, see more details below.)

## Use cases
- give away products for free via promotional tokens
- allow discounts for certain payment methods (tokens)
- restrict products to certain payment methods (tokens)
- restrict payment methods (tokens) on shipping zones
- and many more, see examples below

## Requirements
- all tokens you configure on the WooCommerce side need to be available in your store on BTCPay Server side
- to use promotional tokens you need to have [Liquid Assets plugin](https://TODO_LINK_TO_LIQUID_ASSETS_PLUGIN) installed on BTCPay Server

## Token types
### Payment tokens
Payment tokens are what is supported by BTCPay Server out of the box (BTC, Lightning Network, LTC, XMR, etc.). They are used as normal payment currency converted by the current exchange rate vs the fiat currency of your shop.

### Promotional tokens (100% discount)
With the introduction of above mentioned Liquid Assets plugin you now also have the possibility to accept **promotional tokens**. You can think of them like coupons or vouchers that can be used to redeem a product/gift. They are special in the sense that they do not have decimals and you need to always pay 1 token per quantity of a product. 

You as a store owner can [issue your own Liquid assets](https://docs.blockstream.com/liquid/developer-guide/developer-guide-index.html#issued-assets) for this purpose or accept [existing ones](https://blockstream.info/liquid/assets).

## Configuration
Make sure the tokens you will configure on your WooCommerce store are available and properly configured on your BTCPay Server, otherwise you will get errors on invoice creation during the checkout process. This will change in the future when we have a new woocommerce plugin that directly fetches the needed data via the Greenfield API but for now the data needs to be entered in some comma separated value (CSV) style.

### Preparation
Make sure to have the latest woocommerce plugin installed.

### Setup your additional tokens
In the BTCPay payment method settings you have a new setting **“Additional token configuration”** where you can input the token configuration in a specific CSV format of 4 columns.

1. **token symbol**:   
   Important: this needs to match the symbol on BTCPay Server, e.g. BTC, 

2. **display name**:   
   The visible text for the payment method on checkout

3. **type**:   
   this can be “**payment**” or “**promotion**” [see explanation above](#token-types)

4. **token icon (optional)**:    
   url to token symbol shown during checkout (can be empty but be sure to include the quotes). You can upload the icon in media manager and copy the url or you can use a link to external site or CDN.

:::danger   
**Important:** All the columns text needs to be enclosed by double quotes `"` and separated by semicolon `; each asset has to be put in a new line.
:::

#### Example token config
```
"BTC_OFFCHAIN";"Lightning BTC";"payment";""
"USDt";"USDt (Liquid Theter)";"payment";"https://example.com/wp-content/uploads/2021/01/usdt.png"
"eKr";"eKrona (Liquid Asset)";"promotion";""
```

After saving you will see each asset to be available as payment method. You can enable/disable them like any other payment method. They won’t have any settings itself for now though (everything is configured by the CSV data). But you can use them together with e.g. woocommerce payment plugins to allow discounts for certain payment methods etc.

// todo: add screenshot


## Common WooCommerce use-cases with other plugins

### Use-case 1: limit product to a region/shipping zone
Free plugin used: [Country Based Restrictions for WooCommerce](https://wordpress.org/plugins/woo-product-country-base-restrictions/)
After installing and activating the plugin go to a product in “Product data” block there is a new tab “Country restrictions”. You can configure the restrictions you want there.

Example configuration:   
// todo: add screenshot

### Use-case 2: (Promotion) products should have free shipping
This is doable with woocommerce out of the box (no plugins needed):

1. In shipping settings add a new shipping class e.g. “free-shipping”
2. On your shipping zones / shipping method config you need to make sure you set the rate to be 0 for that shipping class but also that “cost” is empty or 0. And your “no shipping class cost” is set to the normal rate (using flat-rate as example):   
   // todo: add screenshot
3. In product settings "Product data" block you have a tab "Shipping", there you set the above created "Free-shipping" class and it will taken care during checkout.   
   // todo: add screenshot

### Use-case 3: limit product payment methods
E.g. allow only a special token payment for promotional product(s)

Free plugin used: [Conditional Payments for WooCommerce](https://wordpress.org/plugins/conditional-payments-for-woocommerce/)

This plugin provides a condition rules builder where you can enable/disable available payment methods for products. See example config in the screenshot:   
// todo: add screenshot

### Use-case 4: discount per payment method

Free plugin used: [Discounts Per Payment Method for WooCommerce](https://wordpress.org/plugins/woo-payment-discounts/)

In the now available “Discount per Payment” setting in your WooCommerce settings you have a list of all payment methods and can give percentage or fixed discounts.

// todo: add screenshot

### Use-case 5: make sure promotional products can only be purchased exclusively

This is needed because promotion token payment methods need to override the product price with 1 (per quantity). Otherwise a user could mix normal products with promo products during checkout, which you want to avoid.

In product settings on the right sidebar you have “Product tags” enter a new tag “promotion”

// todo: add screenshot

:::warning   
THIS CODE BELOW WILL PROBABLY GO INTO THE WOOCOMMERCE PLUGIN BEFORE FINISHING THIS DOC.
:::
Edit your themes function.php and add this snipped (or put it in any custom plugin you see fit)
```
/**
* Check if a product is tagged with "promotion" and show a notice that it only
* can be ordered exclusively without any other products in the cart.
*/
function btcpay_check_promotion_product($valid, $product_id, $quantity) {
  $promotion_tag = 'promotion';
  // Check if there are any items in the cart.
  if (!empty($cart_items = WC()->cart->get_cart()) && $valid) {
    // Check if the product is a promotional product and abort.
    if (has_term($promotion_tag, 'product_tag', $product_id)) {
      wc_add_notice( 'Promotional products can only be purchased exclusively, please remove other items from your cart first.', 'error' );
      return false;
    }
    // Also check the case where one has already a promotion product in the
    // cart and also do not allow adding a normal product in that case.
    foreach ($cart_items as $item) {
      if (has_term($promotion_tag, 'product_tag', $item['product_id'])) {
        wc_add_notice( 'Promotional products can only be purchased exclusively, please proceed with checkout or remove the item first.', 'error' );
        return false;
      }
    }
  }
 
  return $valid;
}
add_filter('woocommerce_add_to_cart_validation', 'btcpay_check_promotion_product', 10, 3);
```

### Use-case 6: Limit the checkout of only 1 piece of a product

This is also solved already by WooCommerce. You can activate this on a per product level in Product settings: Tab “**Inventory**”:    
set the checkbox [x] “*Enable this to only allow one of this item to be bought in a single order*”



