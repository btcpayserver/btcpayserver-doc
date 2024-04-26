# Greenfield API examples with PHP

The **[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (also available on your instance on `/docs`) allows you to operate BTCPay Server via an easy-to-use REST API.

Note that you can partially generate clients in the language of your choice by using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

For PHP we have a client library available which can be found [here](https://github.com/btcpayserver/btcpayserver-greenfield-php) and is also available for installation via Composer `composer require btcpayserver/btcpayserver-greenfield-php`

In this guide, we will give some examples how to use the Greenfield API with our PHP library for eCommerce and BTCPay management. Additional examples can be found [here](https://github.com/btcpayserver/btcpayserver-greenfield-php/tree/master/examples).


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

### Register a webhook (optional)

Let's register a webhook to be notified when the invoice is paid. You can use the [create webhook endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) to register a webhook.

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

This step is optional, you can also manually create a webhook in the BTCPay Server UI in your store `Settings` -> `Webhooks`.

### Validate and process webhooks

The webhook payloads of BTCPay Server are signed, and therefore you can trust its content - but only after proper request validation. The validation of the provided `BTCPay-Sig` HTTP-header and payload, is done by the library.

On webhook registration step (see above), you provided an `url` that points to an endpoint route on your PHP site. e.g. `https://example.com/webhook`. The `secret` which is used to sign the request was returned in our example above.

On your eCommerce site you can now validate and process the payload of your BTCPay Server webhook like this:

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

### Issue a full refund of an invoice

Using the [invoice refund endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) you can issue a full (or even partial) refund of an invoice.  This will return a link where the customer can claim the refund.

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


## BTCPay Server management examples

Here we assume you are an ambassador and host BTCPay Server for your users. You manage your users on your own system and want to create a user and set email and password for their BTCPay Server login. Then using the same credentials to create a store and an API key on behalf of that user.

### Create a new user

Creating a new user can be done by using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

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

### Create a new API key (for the user)

While we can use basic authentication to access the greenfield API, it is recommended to use API Keys to limit the scope of the credentials.

For example: If we want to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore) we need the `btcpay.store.canmodifystoresettings` permission for the API key. Warning: If you do not pass any permission then the API key will have unrestricted access.

As mentioned above, you can do this through the BTCPay Server UI of your instance, but let's do it through the API using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/ApiKeys_CreateUserApiKey) where we with our admin API key create an API key for our new user.

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

### Create a new store

Now, we can use the users API key to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

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

### Read store information

We can use the new apikey to [read store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore) information:

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

Looking for more examples, you can find them [here](https://github.com/btcpayserver/btcpayserver-greenfield-php/tree/master/examples).
