# Custom Integration

BTCPay Server provides two APIs for integration:

- **[Greenfield API](/Developers/api/)** — A RESTful API that lets you control nearly every aspect of BTCPay Server: managing users, stores, invoices, payment requests, payouts, Lightning nodes, and more. This is the recommended API for all new integrations.
- **Legacy BitPay API** — A compatibility API for older BitPay invoice integrations. Compatibility with BitPay's current API is not guaranteed. Use Greenfield for new integrations.

## Greenfield API

The Greenfield API is the primary way to integrate with BTCPay Server. For the full API reference, see the [Greenfield API documentation](https://docs.btcpayserver.org/API/Greenfield/v1/).

For the API available on your target instance, including installed plugins, use `/docs` on that instance. You can also generate client libraries using its OpenAPI document at `/swagger/v1/swagger.json` or the [public Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

### Examples

- [Greenfield API with cURL](/Developers/api/examples/#curl)
- [Greenfield API with Node.js](/Developers/api/examples/#nodejs)
- [Greenfield API with PHP](/Developers/api/examples/#php)

## Modal Checkout

To generate a pop-up modal experience:

1. Include the btcpay.js script in your html page

```html
<script src="https://your.btcpay.url/modal/btcpay.js"></script>
```

2. Create an invoice on your backend using the Greenfield API. This example uses Axios; set `BTCPAY_URL`, `API_KEY`, and `STORE_ID` on your server. The [API key](/Developers/api/authentication/#api-keys) needs `btcpay.store.cancreateinvoice`, scoped to the selected store. Keep the key on your backend.

```js
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: BTCPAY_URL,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `token ${API_KEY}`
  }
})

const invoiceCreation = {
  amount: '12345.00',
  currency: 'USD',
  metadata: {
    orderId: 'something',
    itemDesc: 'item description'
  },
  checkout: {
    redirectURL: 'https://your-store.example/order/something'
  }
}

const response = await axiosClient.post(
  `/api/v1/stores/${encodeURIComponent(STORE_ID)}/invoices`,
  invoiceCreation
)
const invoiceId = response.data.id
```

3. Return the invoice ID from your backend to your frontend, then use it to open the modal:

```js
window.btcpay.showInvoice(invoiceId)
```

4. You'll often want to do something like refresh the state of your page when the invoice is paid, or note some kind of state before the modal pops up. You can attach event listeners like this:

```js
window.btcpay.onModalWillEnter(yourCallbackFunction)
window.btcpay.onModalWillLeave(yourCallbackFunction)
window.btcpay.onModalReceiveMessage(event => {
  const data = event.data
  if (!data || typeof data !== 'object' || data.invoiceId !== invoiceId || !data.status) return

  console.log(`Invoice ${data.invoiceId}: ${data.status}`)
})
```

`onModalReceiveMessage` receives a browser `MessageEvent`. Invoice status updates are available in `event.data` as `{invoiceId: "x", status: "y" }`. The callback also receives other checkout messages, such as `"loaded"` and `"close"`, so check the payload before reading invoice fields.

Use these browser messages to update the UI. Confirm payments on your backend using [webhooks with signature verification](/Development/ecommerce-integration-guide.md#validate-webhook-signature) or the Greenfield invoice API before fulfilling an order. Greenfield webhooks are configured for the store separately from invoice creation.

---

## Legacy BitPay API

:::warning
The legacy API is retained for existing integrations. The [Greenfield API](#greenfield-api) is actively developed and recommended for all new integrations.
:::

The legacy API was originally designed as a drop-in replacement for BitPay's invoice API as it existed around 2018. At the time, existing e-commerce integrations could often switch to BTCPay Server by changing the server URL.

That historical compatibility does not guarantee compatibility with BitPay's current API, client libraries, or integration requirements. Verify the endpoints, authentication, request and response formats, and notifications used by an existing integration before migrating it. Use Greenfield for new integrations and when updating an integration to use current BTCPay Server features.

### Legacy API keys and access tokens

BTCPay Server **2.4.4 removed the legacy BitPay API keys used with `Authorization: Basic ...`**, including the **Legacy API Keys** section previously shown under store settings. Existing keys of this type were deleted during the upgrade and are no longer supported. See the [2.4.4 release notes](https://github.com/btcpayserver/btcpayserver/releases/tag/v2.4.4) and [API key storage change](https://github.com/btcpayserver/btcpayserver/pull/7561).

**Legacy BitPay pairing and its access tokens remain supported.** They are managed on the store's **Access Tokens** page at `/stores/{storeId}/tokens`, using the [pairing process](#pairing-process) below.

For an integration that used the removed Basic-auth keys, prefer migrating to Greenfield. Create a Greenfield API key under **Account > Manage account > API keys** and update the integration to use Greenfield endpoints with `Authorization: token YOUR_API_KEY`. Replacing the credential alone does not migrate a BitPay API integration to Greenfield; the request and response formats also differ. An existing integration that must retain BitPay compatibility can instead use the legacy BitPay pairing flow and signed requests.

### Official Client Libraries

Existing integrations may use the legacy [Python](https://github.com/btcpayserver/btcpay-python) and [Node.js](https://github.com/btcpayserver/node-btcpay) clients hosted by BTCPay Server. These clients target the BitPay-compatible API.

There is also a legacy [PHP client](https://github.com/btcpayserver/btcpayserver-php-client) and BitPay's [Ruby client](https://github.com/bitpay/ruby-client). For new integrations, use the [Greenfield examples](#examples).

### Accessing the BitPay API Manually

If not using one of the libraries above, the REST API can be accessed manually.

The legacy BitPay API uses BitID to authenticate signed requests.

The `client` of the API (like an e-commerce plugin) generates a private key, then informs the `server` (BTCPay) about the `public key` through pairing.

Every request to the API sent by the client is signed with the client's `private key`.

We call `pairing` the process to inform BTCPay about your `public key`.

### Pairing process

First, create a new store:

1. Log in
2. Go to Stores menu
3. Click on `Create a new store`
4. Enter a friendly name for the store, validate.

There are two methods of `pairing`: client side pairing and server side pairing.

#### Client side pairing

With client side pairing, the `client` generates a URL from their `public key` which a human user can browse to validate the pairing.

Typically the URL looks like `https://btcpay.example.com/api-access-request?pairingCode=<pairingcode_goes_here>`.

You can find documentation about how to achieve this with [this link](https://support.bitpay.com/hc/en-us/articles/115003001183-How-do-I-pair-my-client-and-create-a-token-).

#### Server side pairing

To start pairing from BTCPay Server:

1. Open the store's **Access Tokens** page at `/stores/{storeId}/tokens`, replacing `{storeId}` with your store ID.
2. Click **Create Token**.
3. Enter a label. Enter your client's public key if available, or leave **Public Key** empty for server-initiated pairing.
4. Click **Request Pairing**, then **Approve**.
5. If you left the public key empty, provide the generated pairing code to your client to complete pairing.

### API reference

[BitPay's current invoice API documentation](https://developer.bitpay.com/reference/create-an-invoice) describes BitPay's service and may differ from BTCPay Server's legacy implementation. For the actively developed BTCPay Server API, use the [Greenfield API reference](https://docs.btcpayserver.org/API/Greenfield/v1/) or `/docs` on your instance.
