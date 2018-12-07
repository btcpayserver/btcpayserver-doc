# BTCPay Server Walkthrough

In this article, we will walk you through the BTCPay user interface and show you how to navigate through different options.

Watch video below for an interactive overview of the features.

[![Walkthrough](https://img.youtube.com/vi/AgG1xObHtQU/mqdefault.jpg)](https://www.youtube.com/watch?v=AgG1xObHtQU "BTCPay - WalkThrough")

After you created the account on the BTCPay Server instance hosted by yourself or a third-party, you'll see a variety of options in the navigation menu on top.

![BTCPayNavigation](img/BTCPay-Navigation.jpg)

* Server settings
* Stores
* Apps
* Wallets
* Invoices
* My settings

## Server settings

Server settings is something only a server admin can access. If you're using someone else's server, you won't see Server Settings. Inside the settings, you can perform tasks such as controlling users, rates, updating the server, etc.

- Users - Add, remove or manage users of your BTCPay Server.
- Rates - Set the source for cryptocurrency to fiat rates used by the server.
- Email server - If you want users to verify e-mail address when registering set up the SMTP settings.
- Policies - Enable or disable user registration and e-mail verification
- Services - GRPC used for connecting your LND node and BTCPay SSH keys are located here.
- Theme - Customize the front-end appearance of your BTCPay Server.
- Maintenance - Update your BTCPay to latest version or change domain name
- Logs - Displays most recent logs of the BTCPay Server.

## Stores

Inside BTCPay you can create and manage an unlimited number of stores. Each store has its own wallet, can create apps (Point of Sale or Payment Button) or be paired with external e-commerce software through one of the [integrations](https://docs.btcpayserver.org/integrations/) available. Admin does not have control over the private keys of the other user's stores. For more information, check [Stores FAQ](/FAQ/FAQ-Stores.md)

- General settings - Configure individual store settings, set up derivation scheme for your wallet and adjust the number of confirmations or invoice expiration time. Server admins can enable Lightning Network payments.
- Rates - Set the source for cryptocurrency to fiat rates for your store.
- Checkout experience - [Customize the appearance](https://nbitstack.com/t/how-to-modify-btcpay-css-checkout-page/99/2) of the checkout page, choose default coin, etc.
- Access Tokens - Tokens for [pairing the store to an integration](GettingStarted.md#connecting-your-btcpay-store-to-your-e-commerce-platform)
- Users - Enable other users with a registered BTCPay account to access your store
- Pay Button - [Create a payment button](GettingStarted.md#creating-the-pay-button) you can easily embed into your website

## Apps

Each store has access to different apps. Applications built on top of BTCPay extend [the usecase](usecase.md) of the software and cater to different type of users. Here you can create a new app and connect it to the store and customize it. A good example is [Point of Sale app](GettingStarted.md#creating-the-point-of-sale-app) you can use to receive payments in physical stores or even donations.

For more information, check [Apps FAQ](/FAQ/FAQ-Apps.md)

## Wallets

Each store gets an internal wallet upon adding a derivation scheme. Internal BTCPay wallet shows all of your payments and should be used as a reference if some payments are not shown in your software or hardware wallet due to some wallets [not supporting larger gap limit](FAQ.md#i-do-not-see-the-funds-in-my-softwarehardware-wallet). In Wallets, you can see the total balance of your store. The funds from the wallet can only be spent, if the user signs a transaction with a compatible hardware wallet.

Three elements of the internal BTCPay Wallet are 
* Transaction - tab which shows your entire transaction history
* Send - used for sending funds out of your wallet (has to be signed and confirmed on a compatible hardware wallet)
* Rescan - enables you to easier import old wallets into BTCPay and solves problem with gap limit most external wallets have

For more information, check [Wallet FAQ](/FAQ/FAQ-Wallet.md)

## Invoices

All of the invoices for your user account will be displayed here. You can filter the invoices by the status or a store. You can also create invoices manually. Invoices are sorted by date from new to old. You can open an individual invoice for more information.

## My Settings

My Settings are user settings. Modify your e-mail address, password or set up two-factor authentication.
