# BTCPay Server and Shopify Integration

To integrate BTCPay Server into Shopify, you need to be running BTCPay Server v1.0.5.5 or newer.

* In your BTCPay Server Store > Pay button enable `Allow anyone to create invoice`
* In Shopify Settings > Payment Providers > Manual Payment Methods add one which contains "Bitcoin with BTCPayServer"
* In Shopify Settings > Checkout > Additional Scripts input the following script, with the details from your BTCPayServer instead of the placeholder values.

<script>
    const BTCPAYSERVER_URL = "FULL_BTCPAYSERVER_URL_WITH_HTTPS";
    const STORE_ID = "YOUR_BTCPAY_STORE_ID";
</script>
<script src="FULL_BTCPAYSERVER_URL_WITH_HTTPS/bundles/shopify-bundle.min.js"></script>

To integrate registering of BtcPayServer transactions on Shopify:

 * Create private app
 * Copy-paste credentials from Shopify over to Integrations view in BtcPayServer
 * Turn on integration
