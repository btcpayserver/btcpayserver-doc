# Greenfield API example with cURL

The **[Greenfield API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (also available on your instance on `/docs`) allows you to operate BTCPay Server via an easy-to-use REST API.

Note that you can partially generate clients in the language of your choice by using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

In this guide, we will show you how to use it via command line on linux using `curl` and `jq`.

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

### Register a webhook (optional)

Let's register a webhook to be notified when the invoice is paid. You can use the [create webhook endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Webhooks_CreateWebhook) to register a webhook.

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

This step is optional, you can also manually create a webhook in the BTCPay Server UI in your store `Settings` -> `Webhooks`.

### Validate and process webhooks

This is not really possible with curl in bash but when you run a webserver. You can check the examples for [NodeJS](./GreenFieldExample-NodeJS.md) and [PHP](./GreenfieldExample-PHP.md).

### Issue a full refund of an invoice

Using the [invoice refund endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_Refund) you can issue a full (or even partial) refund of an invoice. This will return a link where the customer can claim the refund.

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

## BTCPay Server management examples

Here we assume you are an ambassador and host BTCPay Server for your users. You manage your users on your own system and want to create a user and set email and password for their BTCPay Server login. Then using the same credentials to create a store and an API key on behalf of that user.

### Create a new user

Creating a new user can be done by using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Users_CreateUser).

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

### Create a store on behalf of the user

Now we create a store with the new users credentials the user becomes the owner [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_CreateStore).

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

### Create a new API key on behalf of the user

Now we can create an API key and limit it to the new store with e.g. the `btcpay.store.canmodifystoresettings` permission. Likely you also want to allow API key to create invoices, but for this example we keep it simple.

You can find the needed permissions for endpoints on the endpoint docs under "Authorization" or an overview of permissions in the [authorization section](https://docs.btcpayserver.org/API/Greenfield/v1/#section/Authentication/API_Key).

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

### Read store information

We can use the new apikey to [read store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore) information:

```bash
USER_API_KEY="API_KEY_FROM_PREVIOUS_STEP"
NEW_STORE_ID="NEW_STORE_ID_FROM_BEFORE_PREVIOUS_STEP"

curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $USER_API_KEY" \
     -X GET \
     "$BTCPAY_INSTANCE/api/v1/stores/$NEW_STORE_ID"
```
