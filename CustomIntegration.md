# Custom Integration

BTCPay implements the same API as Bitpay for creating or managing your invoices.
Migrating should just be a matter of pointing to the BTCPay URL instead of Bitpay.

While Bitpay is using one user account for one merchant, BTCPay allows a user to manage multiple stores.


The authentication mechanism is made by called `BitId`.

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

BTCPay Server has an API compatible with Bitpay, it inherits from all its integration to ECommerce solutions with minimal engineering efforts.
You can read the documentation [on Bitpay's website](https://bitpay.com/api#resource-Invoices).

The only difference is that while bitpay support one store per account, BTCPay supports multiple store per account.