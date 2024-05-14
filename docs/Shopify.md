# Accept Bitcoin in Shopify with BTCPay Server

Introducing BTCPay Server for Shopify – open-source payment gateway that enables you accept bitcoin payments directly on your website or stores from customers with no fee.

Our integration with Shopify allows you connect your self-hosted BTCPay Server with your [Shopify store](https://www.shopify.com/), enabling you accept Bitcoin payments swiftly and securely.


## What BTCPay offers:

- **Zero fees**: Enjoy a payment gateway with no fees. Yes, You saw that right. Zero fees!
- **Direct payment, No middlemen or KYC**: Say goodbye to intermediaries and tedious paperwork, and get your money directly in your wallet
- **Fully automated system**: BTCPay takes care of payments, invoice management and refunds automatically.
- **Display Bitcoin QR code at checkout**: Enhance customer experience with an easy and secure payment option.
- **Self-hosted infrastructure**: Maintain full control over your payment gateway.
- **Lightning Network integrated**: Instant, fast and low cost payments and payouts
- **Easy CSV exports**
- **Versatile plugin system**: Extend functionality according to your needs
- **Point-of-sale integration** – Accept payments in your physical shops
- **Multilingual ready**: Serve a global audience right out of the box.
- **Community-driven support**: Get responsive assistance from our dedicated community ([Mattermost](http://chat.btcpayserver.org/) or [Telegram](https://t.me/btcpayserver)).


## Prerequisites:

Before diving into the setup process, ensure you have the following:

- Shopify account
- BTCPay Server - [self-hosted](Deployment.md) or run by a [third-party host](/Deployment/ThirdPartyHosting.md) v1.4.8 or later.
- [Created BTCPay Server store](CreateStore.md) with [wallet set up](WalletSetup.md)

[![BTCPay Server - Shopify Video](https://img.youtube.com/vi/jJjAyvgWVfk/mqdefault.jpg)](https://www.youtube.com/watch?v=jJjAyvgWVfk)

:::warning
Shopify might give false flags on deprecated API calls. The most likely answer we could find, due to a change by Shopify to specific fields of the `Order` resource and is assumed to get used in BTCPay Server. Find more details [here](https://github.com/btcpayserver/btcpayserver/issues/4510)
:::

## Setting up BTCPay Server with Shopify

1. In Shopify, click on `Apps >` in the left sidebar
2. On the modal popped up, click on `App and sales channel settings`
3. From the page displayed, click on `Develop apps` button
4. If prompted, click on `Allow custom app development`
5. `Create an app` and name it, e.g. BTCPay Server
6. On the app page, in `Overview` tab, click on the `Configure Admin API scopes`
7. In the filter admin access scopes type in `Orders`
8. In `Orders` enable `read_orders` and `write_orders` and then click `Save`
9. Click on the `Install App` in the top right corner and when pop-up window appears click `Install`
10. Reveal `Admin API access token` and `copy` it
11. In your BTCPay Server, go to your store and on the left sidebar click on `Shopify`
12. In the first field, `Shop name` enter the subdomain of your Shopify store e.g. SOME_ID.myshopify.com then enter SOME_ID
13. In third field, `Admin API access token` paste the `Admin API access token` you just copied from Shopify
14. In the second field, `API key` paste the `API key` from Shopify - which you can find at the bottom of the same page where you copied the Admin API access token
15. Click `Save` on BTCPay Shopify settings page
16. Back on Shopify: On left menu select `Checkout` scroll down to "Order status page" and paste the HTML `<script>` code you see in BTCPay Shopify settings into the "Additional scripts" text field.
17. Click `Save` and scroll back up to the top
18. Now click on `Payments` in the left sidebar, scroll down to "Manual payment methods", click on `(+) Manual payment method` and select `Create custom payment method` on the dropdown.
19. In `Custom payment method name` fill in `Bitcoin with BTCPay Server`, optionally you can fill in other fields, but it's not required.
20. Hit `Activate` and you've set up Shopify and BTCPay Server successfully.

:::tip
"Custom Payment method name" **must** contain at least one of the following words (case-insensitive): `bitcoin`, `btcpayserver`, `btcpay server` or `btc` to work.
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

![BTCPay Server shopify step 11](./img/shopify/btcpayshopify11.png)

![BTCPay Server shopify step 12](./img/shopify/btcpayshopify12.png)

![BTCPay Server shopify step 13](./img/shopify/btcpayshopify13.png)

![BTCPay Server shopify step 14](./img/shopify/btcpayshopify14.png)

![BTCPay Server shopify step 14-2](./img/shopify/btcpayshopify14-2.png)

Demo Checkout flow after everything is set up:

![BTCPay Server shopify step 15](./img/shopify/btcpayshopify15.png)

![BTCPay Server shopify step 16](./img/shopify/btcpayshopify16.png)

![BTCPay Server shopify step 17](./img/shopify/btcpayshopify17.png)

![BTCPay Server shopify step 18](./img/shopify/btcpayshopify18.png)
