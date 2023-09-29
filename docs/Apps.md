---
description: Apps allow users an easy way to extend BTCPay Server.
tags:
  - BTCPay Server
  - Apps
  - Point of Sale
  - Crowdfunding
  - Payment Button
---

# BTCPay Server Apps

The primary purpose of BTCPay Server is to remove dependencies on trusted third-parties. The Apps are built in applications that obsolete central-authorities and allow users an easy way to extend the [use case](./UseCase.md) of the software. Users can self-host all sorts of customizable applications that work out of the box.

To create an app, go to Apps > Create a new app. Apps are store-dependent, which means that each app needs to be connected to a store.

## Point of Sale App

The **web-based PoS app** allows users with brick and mortar stores to readily **accept cryptocurrencies without fees or a third-party**, directly to their wallet. The **PoS** can be displayed easily on tablets or any other devices which support web browsing. Users can easily create a homescreen shortcut for a quick access to the web-app.

![BTCPay Pos](./img/BTCPayPointOfSale1.jpg)

Adding new products is easy. The app has a **shopping cart feature**, **tips**, **product inventory**, **custom payment options** and more.

The **Point of sale app** can also be used to receive donations, tips or even as a small e-commerce shop, depending on the options or customizations applied.

Curently, the **Point of Sale app** supports three different views:

- A `Static` view representing only the items for sale.
- A `Cart` view including items for sale and a cart for checkout.
- A `Light` view consisting only of a keypad for easy and quick payments (Starting from [v1.0.5.6](https://blog.btcpayserver.org/btcpay-server-1-0-5-6/#simplePOS)).

To get your first **Point of Sale app** running, follow theses few simple steps:

1. Go to `Apps` and `Create a new app`
2. Add a `name` for your app
3. Choose `app type` > Point Of Sale
4. Select the `store` to associate with the app.
5. Customize your PoS by choosing a `view` (Static, Cart, Light), adding your own `items` with prices, photos, and a description.
6. Click `Save Settings`.
7. Click `View App` to view your PoS (Your customers can access the PoS through that link).

You can change the appearance of your **Point of Sale app** by following the [theme customization guide](./Development/Theme.md).

## Crowdfunding App

**Crowdfunding** is an application which you can launch from BTCPay Server interface that allows you to create a **self-hosted funding campaign**, similar to Kickstarter or Indiegogo. Unlike traditional **crowdfunding platforms**, the creator of the campaign is the owner of the platform. Funds go directly to the creator’s wallet **without any fees**.

1. Go to > Apps
2. Add a name of your app
3. Choose app type > Crowdfund
4. Select the store to associate with the app.
5. Customize your Crowdfund by adding your own perks with prices, photos, and description.
6. Check the box > Allow crowdfund to be publicly visible
7. Click "Save Settings".
8. Click "View App" to view your Crowdfund (Contributors can access the crowdfund through that link).

[![BTCPay Server Crowdfunding](https://img.youtube.com/vi/tFbfyneDj88/mqdefault.jpg)](https://www.youtube.com/watch?v=tFbfyneDj88)

If you would like to provide digital or physical products to the backers of your **crowdfunding campaign**, you can [integrate WooCommerce store into it](./FAQ/Apps.md#how-to-integrate-woocommerce-store-into-a-btcpay-crowdfund-app). You can also set limits on contribution perks using the inventory feature.

## Payment Button

Easily-embeddable HTML and highly-customizable **payment buttons** allow users to receive tips and donations. Online stores can also integrate payment buttons. When a site visitor clicks on the button, BTCPay displays the **invoice**.

1. In your left menu bar, under the "PLUGINS" section, select "Pay Button".
2. Allow anyone to create invoices.
3. Customize your button.
4. Copy the generated form and embed it on your website.

[![BTCPay Server Payment Buttons](https://img.youtube.com/vi/MIWGvl6_WzI/mqdefault.jpg)](https://www.youtube.com/watch?v=MIWGvl6_WzI)

### Payment Button for React Developers

Easily integrate the BTCPay Pay Button into your React application with the [React BTCPay Server Pay Button](https://github.com/2140data/react-btcpay-paybutton) package.

1. Run `npm install react-btcpay-paybutton` in your project
2. Import the `ReactBtcPayButton` component
3. Configure `btcPayDomain` and `storeId` props on the component and the Payment Button should be working.

Full documentation of all configuration and styling options on the [package repo](https://github.com/2140data/react-btcpay-paybutton).
