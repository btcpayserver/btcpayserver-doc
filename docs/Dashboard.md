# Dashboard 

:::tip
Balance graph and recent transaction are currently only available for an on-chain payment method. Information about Lightning network balances and transactions is on to-do.
:::

BTCPay Server version 1.5.0 introduced a new dashboard concept that features several tiles that will help with the initial setup, better understand the store's data and manage refunds and payouts with ease.
![BTCPay Server Navigation](./img/dashboard/dashboardgif.gif "BTCPay Server Navigation")

## What do the tiles tell?

There are five main sections to the Dashboard. 

* Wallet Balance 
    This is the current store [Wallet](Wallet.md) balance. 
    The view shows a balance graph by Week, Month, or year. 

![BTCPay Server Navigation](./img/dashboard/wallet-view.jpg "BTCPay Server Navigation")

* Transaction activity 
    Quickly manage Pending Payouts, view recent transactions, and overview outstanding [refunds](Refund.md)

![BTCPay Server Navigation](./img/dashboard/tx-activity-view.jpg "BTCPay Server Navigation")

* Recent Transactions
    The last five transactions are shown.

![BTCPay Server Navigation](./img/dashboard/recent-tx-view.jpg "BTCPay Server Navigation")

* Recent Invoices
    The last five invoices are shown with their corresponding status and value.
    It also allows you to directly access and manage a particular [invoice](/Invoices.md). 

![BTCPay Server Navigation](./img/dashboard/recent-invoice-view.jpg "BTCPay Server Navigation")

* Current active [Crowdfund](Apps.md#Crowdfunding-App)
    This tile shows the current active crowdfunds, including their top-ranked items. 
    When more than one active crowdfund is happening, the tiles will show below the initial one. 
    There's easy access to crowdfund management or to see all the perks you've set from these panels. 

![BTCPay Server Navigation](./img/dashboard/fund-full-view.jpg "BTCPay Server Navigation")


:::warning
This page is subject to change as the software progresses. Features will be updated by release.
:::