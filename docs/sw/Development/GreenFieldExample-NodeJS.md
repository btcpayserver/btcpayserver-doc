# Mfano wa Greenfield API kwa Node.js (JavaScript)


**[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (inapatikana pia kwenye mfano wako kwenye `/docs`) inakuwezesha kuendesha BTCPay Server kupitia REST API rahisi kutumia.

Kumbuka kwamba unaweza kuzalisha kwa sehemu wateja katika lugha ya chaguo lako kwa kutumia [faili ya Swagger](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

Katika mwongozo huu, tutakuonyesha jinsi ya kuitumia kwa kutumia Node.js/JavaScript.

## Masharti ya awali

Isipokuwa kwa vituo vichache kama kuunda duka na funguo ya API kwa niaba ya mtumiaji mahususi, Basic Auth inapaswa kuepukwa na funguo ya API itumike badala yake. Hakikisha kwamba funguo za API zina ruhusa zinazohitajika tu na sio zaidi. Km. ikiwa unaunda ankara tu hupaswi kuipa funguo ya API ruhusa ya kusimamia maduka yako.

Unaweza kuunda funguo mpya ya API katika UI ya BTCPay Server chini ya `Account` -> `Manage account` -> `API keys`

Kwa mifano ya ecommerce hapa chini funguo ya API inahitaji ruhusa zifuatazo:
- View invoices
- Create invoice
- Modify invoices
- Modify stores webhooks
- View your stores
- Create non-approved pull payments

Kwa muhtasari wa ruhusa zinazopatikana angalia [nyaraka za API](https://docs.btcpayserver.org/API/Greenfield/v1/#section/Authentication/API_Key) au ruhusa zilizoandikwa kwenye kila kituo.

## Mifano ya eCommerce

Mifano ifuatayo itakuonyesha jinsi ya kuunda mtiririko wa msingi wa eCommerce kwa kutumia Greenfield API kwa kuunda ankara, kusajili webhook, kuchakata webhooks, na kutoa marejesho kamili ya ankara.

### Unda ankara

Tunaunda ankara kwa kutumia [kituo cha kuunda ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_CreateInvoice). Huu ni mfano rahisi lakini unaweza kuweka data nyingi zaidi kama kitambulisho cha agizo, barua pepe ya mnunuzi au metadata maalum. Hata hivyo, usihifadhi data inayojirudia kwenye ankara ili kuzuia uvujaji wa data iwapo kuna udukuzi. Km. katika hali nyingi haina maana kuhifadhi anwani ya mteja kwenye mfumo wako wa eCommerce na pia kwenye ankara ya BTCPay.

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

### Sajili webhook (hiari)

Tusajili webhook ili kujulishwa wakati ankara inalipwa. Unaweza kutumia [kituo cha kuunda webhook](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) kusajili webhook.

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

Hatua hii ni ya hiari, unaweza pia kuunda webhook kwa mkono katika UI ya BTCPay Server kwenye duka lako `Settings` -> `Webhooks`.

### Thibitisha na chakata webhooks

Unaweza kutumia programu yako ya wavuti ya Node.js Express kupokea maombi ya webhook kutoka kwa BTCPay Server yako.

Kwanza unahitaji njia ili programu yako ya Node.js iweze kupokea maombi ya POST.
Kulingana na jinsi ulivyosanidi seva ya express hii inapaswa kuonekana kitu kama hiki:

```JS
app.post('/your-webhook-endpoint', (req, res) => {
  // Do stuff here
})
```

Kilicho muhimu ni kwamba webhook inatuma kichwa cha HTTP `BTCPAY-SIG` ambacho ni ombi lililosainiwa kwa kutumia `secret` uliyoipata kutoka hatua iliyotangulia wakati wa kusajili webhook. Unaweza kutumia `secret` hiyo na mzigo ghafi (kama baiti) unaopata kutoka kwenye webhook, kuihashi na kuilinganisha na `BTCPAY-SIG`. Kwa hivyo, unahitaji `body-parser` ambayo ni middleware ya kuchanganua mwili ghafi wa ombi. Kwa kulinganisha heshi pia unahitaji `crypto` ambayo ni moduli iliyojengewa ndani ya Node.js.
```JS
const bodyParser = require('body-parser')
const crypto = require('crypto')
```

Unaweza kuchanganua mwili ghafi wa ombi kama hivi:

```JS
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  })
)
```
Hii inahakikisha kwamba katika req.rawBody maudhui sahihi yanachanganuliwa ili uweze kulinganisha req.rawBody iliyohashwa na thamani ya kichwa cha `BTCPAY-SIG`.

Hata hivyo, ikiwa unatumia TypeScript, unaweza kukutana na hitilafu hii:

```
Property 'rawBody' does not exist on type 'Request'.
```

Suluhisho la muda ni kutumia neno kuu la `as` kuambia mkusanyaji kuzingatia kitu cha `req` kama aina nyingine unapofikia `rawBody`. Hapa ni mfano wa jinsi ya kupata `rawBody` kwa kutumia suluhisho hili, hakuna haja ya msimbo wa middleware hapo juu:

```JS
import { Request, Response } from "express-serve-static-core"
import { https } from "firebase-functions";

type FirebaseRequest = https.Request

const myFunc = async (req: Request, res: Response) => {
  const rawBody = (req as FirebaseRequest).rawBody;
}
```
Badilisha `req.rawBody` na `rawBody` katika sehemu zinazofuata ikiwa unatumia njia hii na TypeScript.

Katika kipanga njia chako inaonekana hivi vikiwa pamoja: (Badilisha `webhookSecret` na `secret` uliyoipata kutoka hatua iliyotangulia wakati wa kusajili webhook).

```JS
app.post('/your-webhook-endpoint', (req, res) => {
  const sigHashAlg = 'sha256'
  const sigHeaderName = 'BTCPAY-SIG'
  const webhookSecret = 'SECRET_FROM_REGISTERING_WEBHOOK' // see previous step
  if (!req.rawBody) {
    res.status(500).send('Request body empty')
  }
  const checksum = Buffer.from(req.get(sigHeaderName) || '', 'utf8')
  const hmac = crypto.createHmac(sigHashAlg, webhookSecret)
  const digest = Buffer.from(
    sigHashAlg + '=' + hmac.update(req.rawBody).digest('hex'),
    'utf8'
  )

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

### Toa marejesho kamili ya ankara

Kwa kutumia [kituo cha marejesho ya ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) unaweza kutoa marejesho kamili (au hata sehemu) ya ankara. Hii itarudisha kiungo ambapo mteja anaweza kudai marejesho.

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

## Mifano ya usimamizi wa BTCPay Server

Hapa tunadhani wewe ni balozi na unapangisha BTCPay Server kwa watumiaji wako. Unasimamia watumiaji wako kwenye mfumo wako mwenyewe na unataka kuunda mtumiaji na kuweka barua pepe na nenosiri kwa kuingia kwao kwenye BTCPay Server. Kisha kutumia stakabadhi hizo hizo kuunda duka na funguo ya API kwa niaba ya mtumiaji huyo.

### Unda mtumiaji mpya

Kuunda mtumiaji mpya kunaweza kufanywa kwa kutumia [kituo hiki](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

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

### Unda funguo mpya ya API (kwa mtumiaji)

Ingawa tunaweza kutumia uthibitishaji wa msingi kufikia greenfield API, inapendekezwa kutumia Funguo za API kuweka kikomo cha wigo wa stakabadhi.

Kwa mfano: Ikiwa tunataka [kuunda duka jipya](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore) tunahitaji ruhusa ya `btcpay.store.canmodifystoresettings` kwa funguo ya API. Onyo: Usipopitisha ruhusa yoyote basi funguo ya API itakuwa na ufikiaji usio na kikomo.

Kama ilivyotajwa hapo juu, unaweza kufanya hivi kupitia UI ya BTCPay Server ya mfano wako, lakini tufanye kupitia API kwa kutumia [kituo hiki](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/ApiKeys_CreateUserApiKey) ambapo sisi kwa funguo yetu ya admin API tunaunda funguo ya API kwa mtumiaji wetu mpya.

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

### Unda duka jipya

Sasa, tunaweza kutumia funguo ya API [kuunda duka jipya](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

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

### Soma maelezo ya duka

Tunaweza kutumia funguo mpya ya API [kusoma maelezo ya duka](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore):

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