# How to migrate from Bitpay API

## Introduction

BTCPay implements the same API as Bitpay for creating or managing your invoices.
Migrating should just be a matter of pointing to the BTCPay URL instead of Bitpay.

While Bitpay is using one user account for one merchant, BTCPay allows a user to manage multiple stores.
BTCPay also uses BitId.

## Pairing process

Your first need to create a new store:

1. Log in
2. Go to Stores menu
3. Click on `Create a new store`
4. Enter a friendly name for the store, validate.

To provide access to the store's API, you need to go through the process of `pairing` a public key to a store.
There are two ways of doing that:

The first way is to follow the process documented by Bitpay on [this link](https://support.bitpay.com/hc/en-us/articles/115003001183-How-do-I-pair-my-client-and-create-a-token-).

The second way, is to generate your private key, then:

1. Go to the store's settings
2. Click on `Access tokens`
3. Click on `Create new Token`
4. Select merchant's facade and enter your public key,
5. Click request pairing
6. Click on Approve
