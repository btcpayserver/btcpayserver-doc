# GreenField API example with cURL

The **[GreenField API](https://docs.btcpayserver.org/API/Greenfield/v1/)** (also available on your instance on `/docs`) allows you to operate BTCPay Server via an easy to use REST API.

Note that you can partially generate clients in the language of your choice by using the [Swagger file](https://docs.btcpayserver.org/API/Greenfield/v1/swagger.json).

In this page, we will show you how to use it via command line on linux using `curl` and `jq`.

## Create a new user

Creating a new user can be done by using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/Users/paths/~1api~1v1~1users/post).


```bash
BTCPAY_INSTANCE="https://mainnet.demo.btcpayserver.org"
USER="MyTestUser@gmail.com"
PASSWORD="NOTVERYSECURE"
body="$(echo "{}" | jq --arg "a" "$USER" '. + {email:$a}' \
                  | jq --arg "a" "$PASSWORD" '. + {password:$a}')"
curl -s \
     -H "Content-Type: application/json" \
     -X POST \
     -d "$body" \
     "$BTCPAY_INSTANCE/api/v1/users"
```

## Create a new API key

While we can use basic authentication to access the greenfield API, it is recommended to use API Keys to limit the scope of the credentials.

For example: If we want to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/Stores/paths/~1api~1v1~1stores/post) we need the `btcpay.store.canmodifystoresettings` permission for the API key.

You can do it through BTCPay Server UI (by browsing `/Manage/APIKeys` of your instance), but let's do it via command line using [this endpoint](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys/paths/~1api~1v1~1api-keys/post).

```bash
permission="btcpay.store.canmodifystoresettings"
body="$(echo "{}" | jq --arg "a" "$permission" '. + {permissions:[$a]}')"
apikey="$(curl -s \
     -H "Content-Type: application/json" \
     --user "$USER:$PASSWORD" \
     -X POST \
     -d "$body" \
     "$BTCPAY_INSTANCE/api/v1/api-keys" | jq -r .apiKey)"
```

## Create a new store

Now, with we can use the api key to [create a new store](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/Stores/paths/~1api~1v1~1stores/post).

```bash
store_name="My awesome store"
body="$(echo "{}" | jq --arg "a" "$store_name" '. + {name:$a}')"
store_id="$(curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $apikey" \
     -X POST \
     -d "$body" \
     "$BTCPAY_INSTANCE/api/v1/stores"  | jq -r .id)"
```

## Create a new API get limiting permission only to read only on the new store

We can make a new specific permission for our new store:
```bash
old_apikey="$apikey"
permission="btcpay.store.canviewstoresettings:$store_id"
body="$(echo "{}" | jq --arg "a" "$permission" '. + {permissions:[$a]}')"
apikey="$(curl -s \
     -H "Content-Type: application/json" \
     --user "$USER:$PASSWORD" \
     -X POST \
     -d "$body" \
     "$BTCPAY_INSTANCE/api/v1/api-keys" | jq -r .apiKey)"
```

We can [revoke our old apikey](https://docs.btcpayserver.org/API/Greenfield/v1/#tag/API-Keys/paths/~1api~1v1~1api-keys~1current/delete).

```bash
curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $old_apikey" \
     -X DELETE \
     "$BTCPAY_INSTANCE/api/v1/api-keys/current"
```

## Read store information

We can then use the new apikey to [read store](https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Stores_GetStore) information:

```bash
curl -s \
     -H "Content-Type: application/json" \
     -H "Authorization: token $apikey" \
     -X GET \
     "$BTCPAY_INSTANCE/api/v1/stores/$store_id"
```
