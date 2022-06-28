# Dashboard 

:::tip
Balance graph and recent transactions are available only for an on-chain payment method. Information about Lightning network balances and transactions is on the to-do. As of BTCPay Server Version 1.6.0, basic Lightning Network information is available.
:::

BTCPay Server version 1.5.0 introduced a new dashboard concept that features several tiles that will help with the initial setup, better understand the store's data and manage refunds and payouts with ease.

![BTCPay Server Navigation](./img/dashboard/dashboardgif.gif "BTCPay Server Navigation")

##  Dashboard tiles

In the main dashboard view, you'll find a couple of tiles that we think could help you quickly overview your store's performance.

### Wallet Balance 
This is the current store [Wallet](Wallet.md) balance.  The view shows a balance graph by week, month, or a year. 

![BTCPay Server Navigation](./img/dashboard/wallet-view.jpg "BTCPay Server Navigation")

### Transaction activity 
Quickly manage pending payouts, view recent transactions, and overview outstanding [refunds](Refund.md)

![BTCPay Server Navigation](./img/dashboard/tx-activity-view.jpg "BTCPay Server Navigation")

### Lightning Balance
This will show your available balance in `Lightning Channels` and your `On-Chain` Bitcoin balance. 
The `Node Info` will show you a quick overview of your nodes Name, if it's online and the address to connect to for peers. 
For more information on `Lightning Network` check our [Lightning Network page](./LightningNetwork.md).

![BTCPay Server Dashboard LN](./img/dashboard/btcpayLNDashboard3.jpg)

### Lightning Services
In this tile, you will find quick buttons to `Lightning Network` services like:

* Core Lightning (Spark)
* Ride The Lightning 
* ThunderHub 
* Lightning Terminal 

![BTCPay Server Dashboard LN](./img/dashboard/btcpayLNDashboard4.jpg)

### Recent Transactions
Showcasing the five most recent transactions that arrived to your on-chain wallet. 

![BTCPay Server Navigation](./img/dashboard/recent-tx-view.jpg "BTCPay Server Navigation")

### Recent invoices
The five  most recent invoices are shown with their corresponding status and value allowing you to quickly access and manage a particular [invoice](/Invoices.md). 

![BTCPay Server Navigation](./img/dashboard/recent-invoice-view.jpg "BTCPay Server Navigation")

### Current active crowdfund
This tile shows the current active crowdfunds, including their top-ranked items/perks. When more than one crowdfunding app is active crowdfund is, the tiles will show below the initial one. That's an easy way to manage your active crowdfund campaigns and see all the perks and how they're performing. 

![BTCPay Server Navigation](./img/dashboard/fund-full-view.jpg "BTCPay Server Navigation")


:::warning
This page is subject to change as the software progresses. Features will be updated by release.
:::