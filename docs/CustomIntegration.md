# Custom Integration

BTCPay Server provides two APIs for integration:

- **[Greenfield API](/Development/GreenFieldExample.md)** — A RESTful API that lets you control nearly every aspect of BTCPay Server: managing users, stores, invoices, payment requests, payouts, Lightning nodes, and more. This is the recommended API for all new integrations.
- **Legacy BitPay API** — BTCPay implements the same invoice API that BitPay once used. This API is **deprecated** and only maintained for backward compatibility with existing integrations. It should not be used for new projects.

## Greenfield API

The Greenfield API is the primary way to integrate with BTCPay Server. For the full API reference, see the [Greenfield API documentation](https://docs.btcpayserver.org/API/Greenfield/v1/).

You can also generate client libraries in the language of your choice using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

### Examples

- [Greenfield API with cURL](/Development/GreenFieldExample.md)
- [Greenfield API with Node.js](/Development/GreenFieldExample-NodeJS.md)
- [Greenfield API with PHP](/Development/GreenfieldExample-PHP.md)

## Modal Checkout

To generate a pop-up modal experience:

1. Include the btcpay.js script in your html page

```html
<script src="https://your.btcpay.url/modal/btcpay.js"></script>
```

2. Call the invoice API to generate an invoice (example code). This is sample backend code as it contains an auth token that should not be exposed in your front-end.

```js
const axiosClient = axios.create({
  baseURL: BTCPAY_URL,
  timeout: 5000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: BTCPAY_AUTH
  }
})

const invoiceCreation = {
  price: 12345,
  currency: 'USD',
  orderId: 'something',
  itemDesc: 'item description',
  notificationUrl: 'https://webhook.after.checkout.com/goeshere',
  redirectURL: 'https://go.here.after.checkout.com'
}

const response = await axiosClient.post('/invoices', invoiceCreation)
const invoiceId = response.data.data.id
```

3. Use the invoiceId to pop up the modal

```js
window.btcpay.showInvoice(invoiceId)
```

4. You'll often want to do something like refresh the state of your page when the invoice is paid, or note some kind of state before the modal pops up. You can attach event listeners like this:

```js
window.btcpay.onModalWillEnter(yourCallbackFunction)
window.btcpay.onModalWillLeave(yourCallbackFunction)
window.btcpay.onModalReceiveMessage(yourCallbackFunction) // available from v1.0.5.6
```

`onModalReceiveMessage` will invoke your callback when a new status has been pushed from BTCPay Server to the invoice UI. The data format is `{invoiceId: "x", status: "y" }`

---

## Legacy BitPay API (deprecated)

:::warning
The BitPay compatible API is deprecated. Use the [Greenfield API](#greenfield-api) for all new integrations.
:::

BTCPay Server implements the same API BitPay used for creating and managing invoices. This API is no longer actively developed but remains available for existing integrations.

**Migrating from BitPay to BTCPay** normally is as easy as changing a URL.

While BitPay only allows one account for one merchant, BTCPay allows a user to manage multiple stores.

### Official Client Libraries

BTCPay maintains official client libraries for [C#](https://github.com/MetacoSA/NBitpayClient), [Python](https://github.com/btcpayserver/btcpay-python) and [NodeJS](https://github.com/btcpayserver/node-btcpay).

In addition, there are forked repositories of Bitpay's [PHP](https://github.com/btcpayserver/btcpayserver-php-client) and [Ruby](https://github.com/bitpay/ruby-client) clients.

### Accessing the BitPay API Manually

If not using one of the libraries above, the REST API can be accessed manually.

The authentication mechanism is using `BitId`.

With `BitId`, the `client` of the API (like an e-commerce plugin) generates a private key, then informs the `server` (BTCPay) about the `public key`.

Every request to the API sent by the client is signed with the client's `private key`.

We call `pairing` the process to inform BTCPay about your `public key`.

### Pairing process

Your first need to create a new store:

1. Log in
2. Go to Stores menu
3. Click on `Create a new store`
4. Enter a friendly name for the store, validate.

There is two method of `pairing`, client side pairing and server side pairing.

#### Client side pairing

With client side pairing, the `client` generates a URL from their `public key` which a human user can browse to validate the pairing.

Typically the URL looks like `https://btcpay.example.com/api-access-request?pairingCode=<pairingcode_goes_here>`.

You can find documentation about how to achieve this with [this link](https://support.bitpay.com/hc/en-us/articles/115003001183-How-do-I-pair-my-client-and-create-a-token-).

#### Server side pairing

The second way, is to generate your private key via some bitcoin library then:

1. Go to the store's settings
2. Click on `Access tokens`
3. Click on `Create new Token`
4. Select merchant's facade and enter your public key,
5. Click request pairing
6. Click on Approve

### Note

**BTCPay Server has an API compatible with BitPay**; changing your e-commerce application **from BitPay to BTCPay** should take minimal effort.

You can read the full API documentation [on BitPay's website](https://bitpay.com/api#resource-Invoices).

There is only one difference: BitPay only allows one account for one merchant, BTCPay allows a user to manage multiple stores.
