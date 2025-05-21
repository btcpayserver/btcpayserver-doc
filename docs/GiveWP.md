## Requirements

Please ensure that you meet the following requirements before installing this plugin.

- PHP version 8.0 or newer
- The cURL, gd, intl, json, and mbstring PHP extensions are available
- A WordPress site with GiveWP installed ([Installation instructions](https://givewp.com/getting-started/intro-to-givewp/)
- You have a BTCPay Server version 2.0.0 or later, either [self-hosted](/Deployment/README.md) or [hosted by a third-party](/Deployment/ThirdPartyHosting.md)
- [You've a registered account on the instance](./RegisterAccount.md)
- [You've a BTCPay store on the instance](./CreateStore.md)
- [You've a wallet connected to your store](./WalletSetup.md)

## 1. Install BTCPay for GiveWP Plugin

There are three ways to download **BTCPay for GiveWP**:

- From within WordPress via the Admin Dashboard (recommended, see below)
- [WordPress Repository](https://wordpress.org/plugins/btcpay-for-givewp/)
- [GitHub Repository](https://github.com/btcpayserver/givewp/releases)

### 1.1 Install plugin from WordPress Admin Dashboard (recommended)

1. WordPress > Plugins > Add New.
2. In Search, type "BTCPay for GiveWP".
3. Install and activate.

![BTCPay for GiveWP: Plugin installation](./img/givewp/btcpay-givewp-1--01-install-plugin.png)

### 1.2 Download and install plugin from GitHub

[Download the latest BTCPay plugin](https://github.com/btcpayserver/givewp/releases), upload it in .zip format to your WordPress site and activate it.


## 2. Connecting GiveWP and BTCPay Server

BTCPay for GiveWP plugin is a **bridge between your BTCPay Server (payment processor) and your donation forms**.
No matter if you're using a self-hosted or third-party solution, the connection process is identical.


#### Create API key

On your BTCPay Server instance, ideally on a separate tab:

1. Click on _[Account]_ -> _Manage Account_ on the bottom left
   ![BTCPay for GiveWP: Manage Account](./img/givewp/btcpayWooLmode2.jpg)
2. Go to the tab _"API Keys"_
3. Click _[Generate Key]_ to select permissions.
   ![BTCPay for GiveWP: API Keys overview](./img/givewp/btcpayWooLmode3.jpg)
4. Click on the _"Select specific stores"_ link for the following permissions: `View invoices`, `Create invoice`, `Modify invoices`, `Modify stores webhooks`, `View your stores`, `Create non-approved pull payments` (used for refunds (not implemented yet))
   ![BTCPay for GiveWP: API Keys Permissions](./img/givewp/btcpayWooLmode4.jpg)
5. Click on _[Generate API Key]_
   ![BTCPay for GiveWP: API Keys Save](./img/givewp/btcpayWooLmode5.jpg)

#### Enter API key and store ID in GiveWP

Back on your WordPress site:

1. Go to your WordPress dashboard. 

2. GiveWP > Settings > Payment Gateways. 

3. Click on the "BTCPay Gateway" link.

4. Copy the store ID to your WordPress _BTCPay Settings_ form (Advanced settings)
   ![BTCPay for GiveWP: Copy Store ID](./img/givewp/btcpay-wc-2--7-man-api--copy-store-id.png)
5. Copy the generated API Key to your WordPress _BTCPay Settings_ form (Advanced settings)
   ![BTCPay for GiveWP: Copy API Key](./img/givewp/btcpayWooLmode6.jpg)

6. Click on _[Save]_ at the bottom of the page
  ![BTCPay for GiveWP: Save BTCPay Settings form](./img/givewp/btcpay-wc-2--15-man-api--btcpay-settings-fill.png)
7. Make sure you see the notification "_BTCPay Server: Successfully registered a new webhook on BTCPay Server_" and _Setup status_ and _Webhook status_ are green.
   ![BTCPay for GiveWP: Save BTCPay Settings form saved](./img/givewp/btcpay-wc-2--15-man-api--btcpay-settings-save.png)

Congratulations, you are almost set. To make the Bitcoin payment gateway show up on your donation forms. At the top go back to gateways overview by clicking on "Gateways". 


## 3. Testing the donation payment

Making a small test-donation from your store will give you peace of mind.
Always make sure that everything is set up correctly before going live.
