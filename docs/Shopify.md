# How to accept Bitcoin in Shopify

The following document guides you through **setting up BTCPay Server with [Shopify](https://www.shopify.com/)**.

## Prerequisites:

- Shopify account
- BTCPay Server] - [self-hosted](Deployment.md) or run by a [third-party host](/Deployment/ThirdPartyHosting.md) v1.4.8 or later.
- [Created BTCPay Server store](CreateStore.md) with [wallet set up](WalletSetup.md)

[![BTCPay Server - Shopify Video](https://img.youtube.com/vi/jJjAyvgWVfk/mqdefault.jpg 'BTCPay Server - Shopify')](https://www.youtube.com/watch?v=jJjAyvgWVfk 'BTCPay Server - Shopify Video')

:::warning
Shopify might give false flags on deprecated API calls. The most likely answer we could find, due to a change by Shopify to specific fields of the `Order` resource and is assumed to get used in BTCPay Server. Find more details [here](https://github.com/btcpayserver/btcpayserver/issues/4510)
:::

## Setting up BTCPay Server with Shopify

1. In Shopify, go to Apps > and at the bottom of the page click on the `Develop apps for your store`.
2. If prompted, click on `Allow custom app development`
3. `Create an app` and name it
4. On the app page, in `Overview` tab, click on the `Configure Admin API scopes`
5. In the filter admin access scopes type in `Orders`
6. In `Orders` enable `read_orders` and `write_orders` and then click `Save`
7. Click on the `Install App` in the top right corner and when pop-up window appears click `Install`
8. Reveal `Admin API access token` and `copy` it.
9. In your BTCPay Server, go to `Store > Settings > Integrations > Shopify`. and click `Setup` button.
10. In second field, `API Secret Key` the paste the `Admin API access token`
11. In the first field, `API key` paste the `API key` from Shopify.
12. In Shopify's `Store Settings > Checkout > Order status page > Additional Scripts` paste the script provided by BTCPay Server on Shopify Integration page (including the opening and closing tag `</script>`.
13. In Shopify's `Store Settings > Payments > Manual payment methods` add `manual payment method` then click `create custom payment method`
14. In `Custom payment method name` fill in `Bitcoin with BTCPay Server`, optionally you can fill in other fields, but it's not required. Note that the name should exactly `Bitcoin with BTCPay Server`
15. Hit `Activate` and you've set up Shopify and BTCPay Server successfully.

:::tip
Custom Payment method name **must** contain at least one of the following words: `bitcoin`, `btcpayserver`, `btcpay server` or `btc` to work.
:::

Below are step by step visuals describing the process outlined above.

![BTCPay Server shopify step 1](./img/shopify/btcpayshopify1.png)

![BTCPay Server shopify step 2](./img/shopify/btcpayshopify2.png)

![BTCPay Server shopify step 3](./img/shopify/btcpayshopify3.png)

![BTCPay Server shopify step 4](./img/shopify/btcpayshopify4.png)

![BTCPay Server shopify step 5](./img/shopify/btcpayshopify5.png)

![BTCPay Server shopify step 6](./img/shopify/btcpayshopify6.png)

![BTCPay Server shopify step 7](./img/shopify/btcpayshopify7.png)

![BTCPay Server shopify step 8](./img/shopify/btcpayshopify8.png)

![BTCPay Server shopify step 9](./img/shopify/btcpayshopify9.png)

![BTCPay Server shopify step 10](./img/shopify/btcpayshopify10.png)

![BTCPay Server shopify step 11](./img/Shopify/btcpayshopify11.jpg)

![BTCPay Server shopify step 12](./img/Shopify/btcpayshopify12.jpg)

![BTCPay Server shopify step 13](./img/shopify/btcpayshopify13.png)

![BTCPay Server shopify step 14](./img/shopify/btcpayshopify14.png)

![BTCPay Server shopify step 15](./img/shopify/btcpayshopify15.png)

![BTCPay Server shopify step 16](./img/shopify/btcpayshopify16.png)

![BTCPay Server shopify step 17](./img/shopify/btcpayshopify17.png)

![BTCPay Server shopify step 18](./img/shopify/btcpayshopify18.png)
