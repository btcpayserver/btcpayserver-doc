# Greenfield API example with Node.JS (JavaScript)

The **[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (also available on your instance on `/docs`) allows you to operate BTCPay Server via an easy-to-use REST API.

Note that you can partially generate clients in the language of your choice by using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

In this guide, we will give some examples how to use the Greenfield API with Node.JS.

You can generate your API key in the BTCPay Server UI under "Account" -> "Manage Account" -> "API Keys" (path `/account/apikeys`). Make sure that the API key you are using has the permissions to execute the needed requests.

## Create a new user

Creating a new user can be done by using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

```js
const btcpayserverurl = 'https://mainnet.demo.btcpayserver.org'
const apiendpoint = '/api/v1/users'
const token = 'APIKEYTOKEN'
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + token
}
const user = {
  email: 'MyTestUser@gmail.com',
  password: 'NOTVERYSECURE',
  isAdministrator: false
}

fetch(btcpayserverurl + apiendpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(user)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

## Create a new API key

While we can use basic authentication to access the greenfield API, it is recommended to use API Keys to limit the scope of the credentials.

For example: If we want to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore) we need the `btcpay.store.canmodifystoresettings` permission for the API key.

As mentioned above, you can do through BTCPay Server UI of your instance, but let's do it through the API using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/ApiKeys_CreateApiKey).

```js
const btcpayserverUrl = 'https://mainnet.demo.btcpayserver.org'
const apiEndpoint = '/api/v1/api-keys'
const permission = 'btcpay.store.canmodifystoresettings'
const token = 'APIKEYTOKEN'
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + token
}
const apikey = {
  label: 'LABELNAME',
  permissions: [permission]
}

fetch(btcpayserverUrl + apiEndpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(apikey)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

## Create a new store

Now, we can use the api key to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

```js
const btcpayserverUrl = 'https://mainnet.demo.btcpayserver.org'
const apiEndpoint = '/api/v1/stores'
const token = 'APIKEYTOKEN'
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'token ' + token
}
const store = {
  Name: 'STORENAME'
}

fetch(btcpayserverurl + apiendpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(store)
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

## Webhook implementation with Node.JS + Express

You can use your Node.JS Express web application to receive webhook requests from your BTCPay Server.

First you need a route so that your Node.JS application can receive POST requests.
Based on how you set up the express server this should look somthing like underneath.

```js
app.post('/btcpayserverwebhook', (req, res) => {
  //do stuff here
})
```

What's important is that the webhook (as statet in the documentation) delivers an HTTP-Header `BTCPAY-SIG`.
You should in above function compare the `BTCPAY-SIG` with the actual data from the request body (as bytes).
In your app.js (or similar) add following where you include requirements:

```js
const bodyParser = require('body-parser')
```

and add following

```js
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  })
)
```

This makes sure that in req.rawBody the correct content is parsed so that you can compare the hashed req.rawBody with the `BTCPAY-SIG` header value.

Edit your router function like this: (Obviously change `webhookSecret`)

```js
app.post('/btcpayserverwebhook', (req, res) => {
  const sigHashAlg = 'sha256'
  const sigHeaderName = 'BTCPAY-SIG'
  const webhookSecret = 'VERYVERYSECRET'
  if (!req.rawBody) {
    return next('Request body empty')
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
    console.log(
      `Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`
    )
    return next(
      `Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`
    )
  } else {
    // Do More Stuff here
    res.status(200).send('Request body was signed')
  }
})
```
