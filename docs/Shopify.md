# BTCPay Server and Shopify Integration

To integrate BTCPay Server into Shopify, you need to be running BTCPay Server v1.0.5.5 or later.

* In your Shopify, go to Apps > Manage Private apps (at the bottom of the page) and `Create a private app`
If private apps are disabled, enable private apps development.
* Fill in required app details (name and email) and click on the `Show inactive Admin API permissions`
* Enable  `Script tags - Read and write"` and `Orders - Read and write` and `Save`
* Copy the `Example URL` from the Admin API section.

* In your BTCPay Server go to > Store > `Integrations`
* Paste the `Example URL` from Shopify and click `Connect to Shopify`


* In Shopify Settings > Checkout > Order processing > `Additional Scripts` and paste the script.
* In Shopify Settings > Payment Providers > Manual Payment Methods add a `Custom payment methods` named  `Bitcoin with BTCPay Server` and `Activate` it.
