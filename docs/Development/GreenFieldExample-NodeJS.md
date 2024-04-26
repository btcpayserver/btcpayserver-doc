# Greenfield API example with Node.js (JavaScript)


The **[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (also available on your instance on `/docs`) allows you to operate BTCPay Server via an easy-to-use REST API.

Note that you can partially generate clients in the language of your choice by using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

In this guide, we will show you how to use it using Node.js/JavaScript.

## Prerequisites

Unless for a few endpoints like creating a store and API key on behalf of a specific user, Basic Auth should be avoided and an API key should be used instead. Make sure that API keys only have the needed permissions and not more. E.g. if you only create invoices you should not give the API key the permission to manage your stores.

You can create a new API key in the BTCPay Server UI under `Account` -> `Manage account` -> `API keys`

For the ecommerce examples below the API key needs the following permissions:
- View invoices
- Create invoice
- Modify invoices
- Modify stores webhooks
- View your stores
- Create non-approved pull payments

For an overview of available permissions see the [API documentation](https://docs.btcpayserver.org/API/Greenfield/v1/#section/Authentication/API_Key) or the permissions documented on each endpoint.

## eCommerce examples

The following examples will show you how to create a basic eCommerce flow using the Greenfield API by creating an invoice, registering a webhook, processing webhooks, and issuing a full refund of an invoice.

### Create an invoice

We create an invoice using the [create invoice endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_CreateInvoice). This is a simple example but you can set a lot more data like order id, buyer email or custom metadata. That said, don't store redundant data on the invoice to prevent data leaks in case of a hack. E.g. in most cases it makes no sense to store the customer address on your eCommerce system and also on the BTCPay invoice.

```JS
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const storeId = 'YOUR_STORE_ID'
const apiKey = 'YOUR_API_KEY'
const amount = 10
const currency = 'USD'

const apiEndpoint = `/api/v1/stores/${storeId}/invoices`

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + apiKey
}
const payload = {
  amount: amount,
  currency: currency
}
fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

### Register a webhook (optional)

Let's register a webhook to be notified when the invoice is paid. You can use the [create webhook endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) to register a webhook.

```JS
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const storeId = 'YOUR_STORE_ID'
const apiKey = 'YOUR_API_KEY'

const apiEndpoint = `/api/v1/stores/${storeId}/webhooks`

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + apiKey
}

const payload = {
  url: 'https://example.com/your-webhook-endpoint'
}
fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

This step is optional, you can also manually create a webhook in the BTCPay Server UI in your store `Settings` -> `Webhooks`.

### Validate and process webhooks

You can use your Node.js Express web application to receive webhook requests from your BTCPay Server.

First you need a route so that your Node.js application can receive POST requests.
Based on how you set up the express server this should look something like this:

```JS
app.post('/your-webhook-endpoint', (req, res) => {
  // Do stuff here
})
```

What's important is that the webhook sends a HTTP-header `BTCPAY-SIG` which is the signed request using the `secret` you got back from the previous step when registering the webhook. You can use that `secret` and the raw payload (as bytes) you get from the webhook, hash it and compare it to `BTCPAY-SIG`. Therefore, you need `body-parser` which is a middleware to parse the raw body of the request. For comparing the hashes you also need `crypto` which is a built-in Node.js module.
```JS
const bodyParser = require('body-parser')
const crypto = require('crypto')
```

You can parse the raw body of the request like this:

```JS
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  })
)
```

This makes sure that in req.rawBody the correct content is parsed so that you can compare the hashed req.rawBody with the `BTCPAY-SIG` header value.

In your router it looks like this put all together: (Change `webhookSecret` with the `secret` you got back from the previous step when registering the webhook).

```JS
app.post('/your-webhook-endpoint', (req, res) => {
  const sigHashAlg = 'sha256'
  const sigHeaderName = 'BTCPAY-SIG'
  const webhookSecret = 'SECRET_FROM_REGISTERING_WEBHOOK' // see previous step
  if (!req.rawBody) {
    res.status(500).send('Request body empty')
  }
  const sig = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
  const hmac = crypto.createHmac(sigHashAlg, webhookSecret)
  const digest = Buffer.from(
    sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'),
    'utf8'
  )

  const checksum = Buffer.from(sig, 'utf8')

  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    console.log(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
    res.status(500).send(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`)
  } else {

    // Your own processing code goes here. E.g. update your internal order id depending on the invoice payment status.

    res.status(200).send('Success: request body was signed')
  }
})
```

### Issue a full refund of an invoice

Using the [invoice refund endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) you can issue a full (or even partial) refund of an invoice. This will return a link where the customer can claim the refund.

```JS
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const storeId = 'YOUR_STORE_ID'
const apiKey = 'YOUR_API_KEY'
const invoiceId = 'EXISTING_INVOICE_ID'

const apiEndpoint = `/api/v1/stores/${storeId}/invoices/${invoiceId}/refund`

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + apiKey
}

const payload = {
  refundVariant: 'CurrentRate',
  paymentMethod: 'BTC'
}

fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    res.send(data)
  })
```

## BTCPay Server management examples

Here we assume you are an ambassador and host BTCPay Server for your users. You manage your users on your own system and want to create a user and set email and password for their BTCPay Server login. Then using the same credentials to create a store and an API key on behalf of that user.

### Create a new user

Creating a new user can be done by using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

```JS
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const adminApiKey = 'YOUR_ADMIN_API_KEY'

const apiEndpoint = '/api/v1/users'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + adminApiKey
}

const payload = {
  email: 'satoshi.nakamoto@example.com',
  password: 'SuperSecurePasswordsShouldBeQuiteLong123',
  isAdministrator: false
}

fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    res.send(data)
  })
```

### Create a new API key (for the user)

While we can use basic authentication to access the greenfield API, it is recommended to use API Keys to limit the scope of the credentials.

For example: If we want to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore) we need the `btcpay.store.canmodifystoresettings` permission for the API key. Warning: If you do not pass any permission then the API key will have unrestricted access.

As mentioned above, you can do this through the BTCPay Server UI of your instance, but let's do it through the API using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/ApiKeys_CreateUserApiKey) where we with our admin API key create an API key for our new user.

```js
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const adminApiKey = 'YOUR_ADMIN_API_KEY'
const email = 'satoshi.nakamoto@example.com'

const apiEndpoint = `/api/v1/users/${email}/api-keys`

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + adminApiKey
}

const payload = {
  label: 'Satoshi Nakamoto API Key',
  permissions: ['btcpay.store.canmodifystoresettings']
}

fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data) // returns apiKey
    res.send(data)
  })
```

### Create a new store

Now, we can use the api key to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

```JS
const btcpayserverUrl = 'https://mainnet.demo.btcpayserver.org'
const userApiKey = 'USER_API_KEY' // From previous step

const apiEndpoint = '/api/v1/stores'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + userApiKey
}
const payload = {
  name: 'Satoshi Store'
}

fetch(btcpayServerUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    res.send(data)
  })
```

### Read store information

We can use the new apikey to [read store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore) information:

```JS
const btcpayServerUrl = 'https://mainnet.demo.btcpayserver.org'
const userApiKey = 'USER_API_KEY' // From previous step
const storeId = 'STORE_ID' // From previous step

const apiEndpoint = `/api/v1/stores/${storeId}`

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + userApiKey
}

fetch(btcpayServerUrl + apiEndpoint, {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    res.send(data)
  })
```
