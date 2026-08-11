# Mfano wa Greenfield API kwa cURL

**[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (inapatikana pia kwenye mfano wako kwenye `/docs`) inakuwezesha kuendesha BTCPay Server kupitia REST API rahisi kutumia.

Kumbuka kwamba unaweza kuzalisha kwa sehemu wateja katika lugha ya chaguo lako kwa kutumia [faili ya Swagger](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

Katika mwongozo huu, tutakuonyesha jinsi ya kuitumia kupitia mstari wa amri kwenye linux kwa kutumia `curl` na `jq`.

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

```bash
BTCPAY_INSTANCE="https://mainnet.demo.btcpayserver.org"
API_KEY="YOUR_API_KEY"
STORE_ID="YOUR_STORE_ID"
AMOUNT="10"
CURRENCY="USD"

BODY="$(echo "{}" | jq --arg "a" "$AMOUNT" '. + {amount:$a}' \
                  | jq --arg "a" "$CURRENCY" '. + {currency:$a}')"

curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $API_KEY" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/stores/$STORE_ID/invoices"
```

### Sajili webhook (hiari)

Tusajili webhook ili kujulishwa wakati ankara inalipwa. Unaweza kutumia [kituo cha kuunda webhook](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) kusajili webhook.

```bash
BTCPAY_INSTANCE="https://mainnet.demo.btcpayserver.org"
API_KEY="YOUR_API_KEY"
STORE_ID="YOUR_STORE_ID"

URL="https://example.com/your-webhook-endpoint"

BODY="$(echo "{}" | jq --arg "a" "$URL" '. + {url:$a}')"

curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $API_KEY" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/stores/$STORE_ID/webhooks"
```

Hatua hii ni ya hiari, unaweza pia kuunda webhook kwa mkono katika UI ya BTCPay Server kwenye duka lako `Settings` -> `Webhooks`.

### Thibitisha na chakata webhooks

Hii haiwezekani kabisa kwa curl katika bash lakini unapoendesha seva ya wavuti. Unaweza kuangalia mifano ya [NodeJS](./GreenFieldExample-NodeJS.md) na [PHP](./GreenfieldExample-PHP.md).

### Toa marejesho kamili ya ankara

Kwa kutumia [kituo cha marejesho ya ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) unaweza kutoa marejesho kamili (au hata sehemu) ya ankara. Hii itarudisha kiungo ambapo mteja anaweza kudai marejesho.

```bash
BTCPAY_INSTANCE="https://mainnet.demo.btcpayserver.org"
API_KEY="YOUR_API_KEY"
STORE_ID="YOUR_STORE_ID"

INVOICE_ID="EXISTING_INVOICE_ID"
PAYMENT_METHOD="BTC"
REFUND_VARIANT="CurrentRate"

BODY="$(echo "{}" | jq --arg "a" "$REFUND_VARIANT" '. + {refundVariant:$a}' \
                  | jq --arg "a" "$PAYMENT_METHOD" '. + {paymentMethod:$a}')"

curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $API_KEY" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/stores/$STORE_ID/invoices/$INVOICE_ID/refund"
```

## Mifano ya usimamizi wa BTCPay Server

Hapa tunadhani wewe ni balozi na unapangisha BTCPay Server kwa watumiaji wako. Unasimamia watumiaji wako kwenye mfumo wako mwenyewe na unataka kuunda mtumiaji na kuweka barua pepe na nenosiri kwa kuingia kwao kwenye BTCPay Server. Kisha kutumia stakabadhi hizo hizo kuunda duka na funguo ya API kwa niaba ya mtumiaji huyo.

### Unda mtumiaji mpya

Kuunda mtumiaji mpya kunaweza kufanywa kwa kutumia [kituo hiki](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

```bash
BTCPAY_INSTANCE="https://mainnet.demo.btcpayserver.org"
ADMIN_API_KEY="YOUR_ADMIN_API_KEY"

USER="satoshi.nakamoto@example.com"
PASSWORD="SuperSecurePasswordsShouldBeQuiteLong123"

BODY="$(echo "{}" | jq --arg "a" "$USER" '. + {email:$a}' \
                  | jq --arg "a" "$PASSWORD" '. + {password:$a}')"
curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $ADMIN_API_KEY" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/users"
```

### Unda duka kwa niaba ya mtumiaji

Sasa tunaunda duka kwa stakabadhi za mtumiaji mpya mtumiaji anakuwa mmiliki [unda duka jipya](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

```bash
STORE_NAME="My awesome store"

BODY="$(echo "{}" | jq --arg "a" "$STORE_NAME" '. + {name:$a}')"

NEW_STORE_ID="$(curl -s \
     -H "Content-Type: application/json" \
     --user "$USER:$PASSWORD" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/stores"  | jq -r .id)"

echo "New store id: $NEW_STORE_ID"
```

### Unda funguo mpya ya API kwa niaba ya mtumiaji

Sasa tunaweza kuunda funguo ya API na kuiwekea kikomo kwa duka jipya na km. ruhusa ya `btcpay.store.canmodifystoresettings`. Inawezekana pia unataka kuruhusu funguo ya API kuunda ankara, lakini kwa mfano huu tunaiweka rahisi.

Unaweza kupata ruhusa zinazohitajika kwa vituo kwenye nyaraka za vituo chini ya "Authorization" au muhtasari wa ruhusa katika [sehemu ya uthibitishaji](https://docs.btcpayserver.org/API/Greenfield/v1/#section/Authentication/API_Key).

```bash
ADMIN_API_KEY="YOUR_ADMIN_API_KEY"
USER="satoshi.nakamoto@example.com"
PERMISSION="btcpay.store.canmodifystoresettings"
NEW_STORE_ID="NEW_STORE_ID_FROM_PREVIOUS_STEP"

BODY="$(echo "{}" | jq --arg "a" "$PERMISSION:$NEW_STORE_ID" '. + {permissions:[$a]}')"
USER_API_KEY="$(curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $ADMIN_API_KEY" \
     -X POST \
     -d "$BODY" \
     "$BTCPAY_INSTANCE/api/v1/users/$USER/api-keys"  | jq -r .apiKey)"

echo "New user api key: $USER_API_KEY"
```

### Soma maelezo ya duka

Tunaweza kutumia funguo mpya ya API [kusoma maelezo ya duka](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore):

```bash
USER_API_KEY="API_KEY_FROM_PREVIOUS_STEP"
NEW_STORE_ID="NEW_STORE_ID_FROM_BEFORE_PREVIOUS_STEP"

curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $USER_API_KEY" \
     -X GET \
     "$BTCPAY_INSTANCE/api/v1/stores/$NEW_STORE_ID"
```