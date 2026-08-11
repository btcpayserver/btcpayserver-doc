# Kutumia API ya BTCPay kwa Ushirikiano Maalum

BTCPay Server inatoa API 2 ili kuunganisha nayo:

- [GreenField API](/Development/GreenFieldExample.md) - API ya RESTful inayolenga kukuruhusu kutumia BTCPay Server bila kiolesura cha picha (headless). Hii ndiyo API inayopendekezwa kwa miradi isiyotaka kuchakata tena msimbo kutoka kwenye ushirikiano wa Bitpay.
- Bitpay Invoice API - BTCPay inatekeleza API sawa na Bitpay kwa kuunda na kusimamia ankara.

**Kuhama kutoka BitPay kwenda BTCPay** kwa kawaida ni rahisi kama kubadilisha URL.

Wakati Bitpay inaruhusu akaunti moja tu kwa mfanyabiashara mmoja, BTCPay inamruhusu mtumiaji kusimamia maduka mengi.

## Maktaba Rasmi za Mteja

BTCPay inadumisha maktaba rasmi za mteja kwa [C#](https://github.com/MetacoSA/NBitpayClient), [Python](https://github.com/btcpayserver/btcpay-python) na [NodeJS](https://github.com/btcpayserver/node-btcpay).

Kwa kuongeza, kuna hazina zilizogawanywa (forked) za wateja wa Bitpay wa [PHP](https://github.com/btcpayserver/btcpayserver-php-client) na [Ruby](https://github.com/bitpay/ruby-client).

## Kufikia API kwa Mkono

Ikiwa hutumii mojawapo ya maktaba zilizo hapo juu, API ya REST inaweza kufikiwa kwa mkono.

Utaratibu wa uthibitishaji unatumia `BitId`.

Kwa `BitId`, `mteja` wa API (kama programu-jalizi ya biashara ya mtandaoni) inazalisha ufunguo wa faragha, kisha inaarifu `seva` (BTCPay) kuhusu `ufunguo wa umma`.

Kila ombi kwa API linalotumwa na mteja linasainiwa na `ufunguo wa faragha` wa mteja.

Tunaita `kuoanisha` mchakato wa kuarifu BTCPay kuhusu `ufunguo wako wa umma`.

## Mchakato wa kuoanisha

Kwanza unahitaji kuunda duka jipya:

1. Ingia
2. Nenda kwenye menyu ya Stores
3. Bonyeza `Create a new store`
4. Weka jina la kirafiki kwa duka, thibitisha.

Kuna njia mbili za `kuoanisha`, kuoanisha upande wa mteja na kuoanisha upande wa seva.

### Kuoanisha upande wa mteja

Kwa kuoanisha upande wa mteja, `mteja` inazalisha URL kutoka kwa `ufunguo wao wa umma` ambayo mtumiaji binadamu anaweza kuvinjari ili kuthibitisha kuoanisha.

Kwa kawaida URL inaonekana kama `https://btcpay.example.com/api-access-request?pairingCode=<pairingcode_goes_here>`.

Unaweza kupata hati kuhusu jinsi ya kufanikisha hili kwa [kiungo hiki](https://support.bitpay.com/hc/en-us/articles/115003001183-How-do-I-pair-my-client-and-create-a-token-).

### Kuoanisha upande wa seva

Njia ya pili, ni kuzalisha ufunguo wako wa faragha kupitia maktaba fulani ya bitcoin kisha:

1. Nenda kwenye mipangilio ya duka
2. Bonyeza `Access tokens`
3. Bonyeza `Create new Token`
4. Chagua facade ya mfanyabiashara na weka ufunguo wako wa umma,
5. Bonyeza ombi la kuoanisha
6. Bonyeza Approve

## Kumbuka

**BTCPay Server ina API inayoendana na Bitpay**; kubadilisha programu yako ya biashara ya mtandaoni **kutoka Bitpay kwenda BTCPay** kunapaswa kuchukua juhudi ndogo.

Unaweza kusoma hati kamili ya API [kwenye tovuti ya Bitpay](https://bitpay.com/api#resource-Invoices).

Kuna tofauti moja tu: Bitpay inaruhusu akaunti moja tu kwa mfanyabiashara mmoja, BTCPay inamruhusu mtumiaji kusimamia maduka mengi.

## Modal Checkout

Ili kuzalisha uzoefu wa dirisha ibukizi (modal):

1. Jumuisha hati ya btcpay.js katika ukurasa wako wa html

```html
<script src="https://your.btcpay.url/modal/btcpay.js"></script>
```

2. Ita API ya ankara ili kuzalisha ankara (mfano wa msimbo). Huu ni msimbo wa mfano wa backend kwani una tokeni ya uthibitishaji ambayo haipaswi kuonyeshwa kwenye front-end yako.

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

3. Tumia invoiceId ili kufungua dirisha ibukizi

```js
window.btcpay.showInvoice(invoiceId)
```

4. Mara nyingi utataka kufanya kitu kama kuonyesha upya hali ya ukurasa wako wakati ankara imelipwa, au kubainisha aina fulani ya hali kabla ya dirisha ibukizi kufunguka. Unaweza kuambatisha visikilizaji vya tukio kama hivi:

```js
window.btcpay.onModalWillEnter(yourCallbackFunction)
window.btcpay.onModalWillLeave(yourCallbackFunction)
window.btcpay.onModalReceiveMessage(yourCallbackFunction) // inapatikana kutoka v1.0.5.6
```

`onModalReceiveMessage` itaamsha callback yako wakati hali mpya imesukumwa kutoka BTCPay Server hadi kiolesura cha ankara. Muundo wa data ni `{invoiceId: "x", status: "y" }`
