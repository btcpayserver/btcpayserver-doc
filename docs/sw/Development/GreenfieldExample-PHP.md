# Mifano ya Greenfield API kwa PHP

**[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (inapatikana pia kwenye mfano wako kwenye `/docs`) inakuwezesha kuendesha BTCPay Server kupitia REST API rahisi kutumia.

Kumbuka kwamba unaweza kuzalisha kwa sehemu wateja katika lugha ya chaguo lako kwa kutumia [faili ya Swagger](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

Kwa PHP tuna maktaba ya mteja inayopatikana ambayo inaweza kupatikana [hapa](https://github.com/btcpayserver/btcpayserver-greenfield-php) na inapatikana pia kwa usakinishaji kupitia Composer `composer require btcpayserver/btcpayserver-greenfield-php`

Katika mwongozo huu, tutatoa mifano fulani jinsi ya kutumia Greenfield API na maktaba yetu ya PHP kwa eCommerce na usimamizi wa BTCPay. Mifano ya ziada inaweza kupatikana [hapa](https://github.com/btcpayserver/btcpayserver-greenfield-php/tree/master/examples).


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

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$apiKey = 'API_KEY';
$storeId = 'STORE_ID';
$amount = 10;
$currency = 'USD';
$orderId = 'SN21420';

try {
    $client = new \BTCPayServer\Client\Invoice($host, $apiKey);
    var_dump(
        $client->createInvoice(
            $storeId,
            $currency,
            \BTCPayServer\Util\PreciseNumber::parseString($amount),
            $orderId
        )
    );
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
```

### Sajili webhook (hiari)

Tusajili webhook ili kujulishwa wakati ankara inalipwa. Unaweza kutumia [kituo cha kuunda webhook](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) kusajili webhook.

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$apiKey = 'API_KEY';
$storeId = 'STORE_ID';
$url = 'https://example.com/webhook';
$subscribedEvents = null; // Will subscribe to all events.

try {
    $client = new \BTCPayServer\Client\Webhook($host, $apiKey);
    var_dump(
        $client->createWebhook($storeId, $url, $subscribedEvents, null)
    );
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
```

Hatua hii ni ya hiari, unaweza pia kuunda webhook kwa mkono katika UI ya BTCPay Server kwenye duka lako `Settings` -> `Webhooks`.

### Thibitisha na chakata webhooks

Mizigo ya webhook ya BTCPay Server imesainiwa, na kwa hivyo unaweza kuamini maudhui yake - lakini tu baada ya uthibitishaji sahihi wa ombi. Uthibitishaji wa kichwa cha HTTP cha `BTCPay-Sig` kilichotolewa na mzigo, unafanywa na maktaba.

Katika hatua ya usajili wa webhook (angalia hapo juu), ulitoa `url` inayoelekeza kwenye njia ya kituo kwenye tovuti yako ya PHP. km. `https://example.com/webhook`. `secret` inayotumika kusaini ombi ilirejeshwa katika mfano wetu hapo juu.

Kwenye tovuti yako ya eCommerce sasa unaweza kuthibitisha na kuchakata mzigo wa webhook yako ya BTCPay Server kama hivi:

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$apiKey = 'API_KEY';
$storeId = 'STORE_ID';
$webhookSecret = 'WEBHOOK_SECRET'; // From previous step

// Get the data sent by BTCPay Server.
$raw_post_data = file_get_contents('php://input');
$payload = json_decode($raw_post_data, false, 512, JSON_THROW_ON_ERROR);

// Get the BTCPay signature header.
// This is needed as some webservers camel-case the headers, some not.
$headers = getallheaders();
foreach ($headers as $key => $value) {
    if (strtolower($key) === 'btcpay-sig') {
        $sig = $value;
    }
}

$webhookClient = new \BTCPayServer\Client\Webhook($host, $apiKey);

// Validate the webhook request.
if (!$webhookClient->isIncomingWebhookRequestValid($raw_post_data, $sig, $secret)) {
    throw new \RuntimeException(
        'Invalid BTCPay Server payment webhook message received - signature did not match.'
    );
}

echo 'Validation OK';

// Your own processing code goes here. E.g. update your internal order id depending on the invoice payment status.

```

### Toa marejesho kamili ya ankara

Kwa kutumia [kituo cha marejesho ya ankara](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) unaweza kutoa marejesho kamili (au hata sehemu) ya ankara. Hii itarudisha kiungo ambapo mteja anaweza kudai marejesho.

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$apiKey = 'API_KEY';
$storeId = 'STORE_ID';
$invoiceId = 'EXISTING_INVOICE_ID';

try {
    $client = new \BTCPayServer\Client\Invoice($host, $apiKey);

    $refund = $client->refundInvoice(
        $storeId,
        $invoiceId
    );

    echo $refund->getViewLink();
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
```


## Mifano ya usimamizi wa BTCPay Server

Hapa tunadhani wewe ni balozi na unapangisha BTCPay Server kwa watumiaji wako. Unasimamia watumiaji wako kwenye mfumo wako mwenyewe na unataka kuunda mtumiaji na kuweka barua pepe na nenosiri kwa kuingia kwao kwenye BTCPay Server. Kisha kutumia stakabadhi hizo hizo kuunda duka na funguo ya API kwa niaba ya mtumiaji huyo.

### Unda mtumiaji mpya

Kuunda mtumiaji mpya kunaweza kufanywa kwa kutumia [kituo hiki](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$adminApiKey = 'ADMIN_API_KEY';
$email = 'satoshi.nakamoto@example.com';
$password = 'SuperSecurePasswordsShouldBeQuiteLong123';
$isAdministrator = false;

try {
    $client = new \BTCPayServer\Client\User($host, $adminApiKey);
    var_dump(
        $client->createUser($email, $password, $isAdministrator)
    );
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}
```

### Unda funguo mpya ya API (kwa mtumiaji)

Ingawa tunaweza kutumia uthibitishaji wa msingi kufikia greenfield API, inapendekezwa kutumia Funguo za API kuweka kikomo cha wigo wa stakabadhi.

Kwa mfano: Ikiwa tunataka [kuunda duka jipya](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore) tunahitaji ruhusa ya `btcpay.store.canmodifystoresettings` kwa funguo ya API. Onyo: Usipopitisha ruhusa yoyote basi funguo ya API itakuwa na ufikiaji usio na kikomo.

Kama ilivyotajwa hapo juu, unaweza kufanya hivi kupitia UI ya BTCPay Server ya mfano wako, lakini tufanye kupitia API kwa kutumia [kituo hiki](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/ApiKeys_CreateUserApiKey) ambapo sisi kwa funguo yetu ya admin API tunaunda funguo ya API kwa mtumiaji wetu mpya.

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$userEmail = 'satoshi.nakamoto@example.com';
$adminApiKey = 'ADMIN_API_KEY';

try {
    $client = new \BTCPayServer\Client\ApiKey($host, $adminApiKey);
    $generatedApiKey = $client->createApiKeyForUser($userEmail, 'api generated', ['btcpay.store.canmodifystoresettings']);
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage();
}

echo $generatedApiKey->getData()['apiKey'];
```

### Unda duka jipya

Sasa, tunaweza kutumia funguo ya API ya mtumiaji [kuunda duka jipya](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$userApiKey = 'USER_API_KEY'; // From previous step

try {
  $client = new \BTCPayServer\Client\Store($host, $userApiKey);
  var_dump($client->createStore('my new store'));
} catch (\Throwable $e) {
  echo "Error: " . $e->getMessage();
}
```

### Soma maelezo ya duka

Tunaweza kutumia funguo mpya ya API [kusoma maelezo ya duka](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore):

```PHP
require __DIR__ . './vendor/autoload.php';

$host = 'https://mainnet.demo.btcpayserver.org';
$userApiKey = 'USER_API_KEY'; // From previous step
$storeId = 'STORE_ID'; // From previous step

try {
  $client = new \BTCPayServer\Client\Store($host, $userApiKey);
  var_dump($client->getStore($storeId));
} catch (\Throwable $e) {
  echo "Error: " . $e->getMessage();
}
```

Unatafuta mifano zaidi, unaweza kuipata [hapa](https://github.com/btcpayserver/btcpayserver-greenfield-php/tree/master/examples).