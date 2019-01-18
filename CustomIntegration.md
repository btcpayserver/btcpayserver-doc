# Using the BTCPay API for Custom Integration

BTCPay implements the same API as Bitpay for creating and managing invoices.

Migrating from BitPay to BTCPay normally is as easy as changing a URL.

While Bitpay only allows one account for one merchant, BTCPay allows a user to manage multiple stores.

# Official Client Libraries

BTCPay maintains official client libraries for both [Python](https://github.com/btcpayserver/btcpay-python) and [NodeJS](https://github.com/btcpayserver/node-btcpay). 

In addition, there are forked repositories of Bitpay's [PHP](https://github.com/btcpayserver/php-bitpay-client) and [Ruby](https://github.com/bitpay/ruby-client) clients.

# Accessing the API Manually

If not using one of the libraries above, the REST API can be accessed manually.

The authentication mechanism is using `BitId`.

With `BitId`, the `client` of the API (like an e-commerce plugin) generates a private key, then inform the `server` (BTCPay) about the `public key`.

Every requests to the API sent by the client is signed with the client's `private key`.

We call `pairing` the process to inform BTCPay about your `public key`.

## Pairing process

Your first need to create a new store:

1. Log in
2. Go to Stores menu
3. Click on `Create a new store`
4. Enter a friendly name for the store, validate.

There is two method of `pairing`, client side pairing and server side pairing.

### Client side pairing

With client side pairing, the `client` generates a URL from his `public key` which a human user can browse to validate the pairing.

Typically the URL looks like `https://btcpay.example.com/api-access-request?pairingCode=<pairingcode_goes_here>`.

You can find documentation about how to achieve this with [this link](https://support.bitpay.com/hc/en-us/articles/115003001183-How-do-I-pair-my-client-and-create-a-token-).

### Server side pairing

The second way, is to generate your private key via some bitcoin library then:

1. Go to the store's settings
2. Click on `Access tokens`
3. Click on `Create new Token`
4. Select merchant's facade and enter your public key,
5. Click request pairing
6. Click on Approve

## Note

BTCPay Server has an API compatible with Bitpay; changing your e-commerce application from Bitpay to BTCPay should take minimal effort.

You can read the full API documentation [on Bitpay's website](https://bitpay.com/api#resource-Invoices).

There is only one difference: Bitpay only allows one account for one merchant, BTCPay allows a user to manage multiple stores.
