# Metadata ya ankara

Kila ankara ina metadata, ambayo ni kitu cha JSON kinachoweza kubinafsishwa ambacho kinaweza kurekebishwa kupitia API wakati wa kuunda ankara. Ingawa haina schema iliyowekwa, sifa fulani ndani ya metadata zinaweza kutafsiriwa na UI.

Ukurasa huu unatoa muhtasari wa sifa hizi na kuelezea jinsi zinavyotumika ndani ya BTCPay Server.

## Sifa zinazojulikana

| Njia ya sifa       | Maelezo                                                                                                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.orderId`          | Inarejelea kitambulisho cha agizo kutoka mfumo wa nje, kama vile jukwaa la e-commerce kama WooCommerce. Sifa hii imeorodheshwa kwenye faharasa, ikiruhusu utafutaji mzuri wa ankara kwa kutumia `orderId`.                                                                         |
| `.orderUrl`         | Inarejelea URL inayounganisha tena kwenye ukurasa wa agizo wa mfumo wa nje. Kiungo hiki kinaonyeshwa katika mwonekano wa maelezo ya ankara.                                                                                                                                      |
| `.paymentRequestId` | Katika mwonekano wa maelezo ya ankara, kiungo kinatolewa kwa ajili ya kuenda kwenye ukurasa wa ombi la malipo unaohusishwa na ankara.                                                                                                                                         |
| `.posData`          | Kitu maalum cha JSON kinachowakilisha taarifa zinazoonyeshwa katika mwonekano wa maelezo ya ankara.                                                                                                                                                                         |
| `.receiptData`      | Kitu maalum cha JSON kinachowakilisha taarifa zinazoonyeshwa kwenye ukurasa wa stakabadhi ya ankara.                                                                                                                                                                   |
| `.buyerName`        | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerEmail`       | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerAddress1`    | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerAddress2`    | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerCity`        | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerState`       | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerZip`         | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerCountry`     | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.buyerPhone`       | Inayoonekana katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                                                                                 |
| `.comment`       | Inayoonekana katika mwonekano wa maelezo ya ankara.                                                                                                                                                                                 |
| `.itemDesc`         | Unapotumia Point of Sale (isipokuwa katika mwonekano wa keypad au kikapu), sehemu hii inawekwa kuwa maelezo ya bidhaa ya bidhaa iliyonunuliwa. Taarifa hii imejumuishwa katika kipengele cha usafirishaji wa ankara wa CSV na inaonekana katika mwonekano wa maelezo ya ankara.                          |
| `.itemCode`         | Unapotumia Point of Sale (isipokuwa katika mwonekano wa keypad au kikapu), sehemu hii inawekwa kuwa msimbo wa bidhaa ya bidhaa iliyonunuliwa. Taarifa hii imejumuishwa katika kipengele cha usafirishaji wa ankara wa CSV na inaonekana katika mwonekano wa maelezo ya ankara.                                 |
| `.physical`         | Thamani ya Boolean inayoonyesha kama hii ni bidhaa halisi; inayoonyeshwa katika mwonekano wa maelezo ya ankara na katika vituo vinavyopatana na BitPay API.                                                                                                                     |
| `.taxIncluded`      | Namba inayowakilisha kiasi cha kodi katika sarafu ya ankara. Taarifa hii itaonekana katika mwonekano wa maelezo ya ankara. Wakati wa kuunda ankara, thamani inazungushwa kiotomatiki kwa tarakimu muhimu na kuhakikishiwa kuwa si kubwa zaidi ya bei ya ankara. |

## Mifano

Ankara ya Point of sale (Mwonekano wa orodha ya bidhaa):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "itemCode": "green tea",
  "itemDesc": "Green Tea",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {
    "Title": "Green Tea",
    "Description": "Lovely, fresh and tender, Meng Ding Gan Lu ('sweet dew') is grown in the lush Meng Ding Mountains of the southwestern province of Sichuan where it has been cultivated for over a thousand years."
  }
}
```

Ankara ya Point of sale (Mwonekano wa kikapu):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "posData": {
    "tip": 0.48,
    "cart": [
      {
        "id": "pu erh",
        "count": 1,
        "image": "~/img/pos-sample/pu-erh.jpg",
        "price": {
          "type": 2,
          "value": 2,
          "formatted": "$2.00"
        },
        "title": "Pu Erh",
        "inventory": null
      },
      {
        "id": "rooibos",
        "count": 1,
        "image": "~/img/pos-sample/rooibos.jpg",
        "price": {
          "type": 2,
          "value": 1.2,
          "formatted": "$1.20"
        },
        "title": "Rooibos",
        "inventory": null
      }
    ],
    "total": 3.68,
    "subTotal": 3.2,
    "customAmount": 0,
    "discountAmount": 0,
    "discountPercentage": 0
  },
  "itemDesc": "Tea shop",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {
    "Tip": "$0.48",
    "Cart": {
      "Pu Erh": "$2.00 x 1 = $2.00",
      "Rooibos": "$1.20 x 1 = $1.20"
    }
  }
}
```

Ankara ya Point of sale (Mwonekano wa keypad):

```json
{
  "orderId": "pos-app_346KRC5BjXXXo8cRFKwTBmdR6ZJ4",
  "posData": {
    "total": "12.00",
    "subTotal": "12.00"
  },
  "itemDesc": "Tea shop",
  "orderUrl": "https://localhost:14142/apps/346KRC5BjXXXo8cRFKwTBmdR6ZJ4/pos",
  "receiptData": {}
}
```