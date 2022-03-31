# Refunds

:::tip
If you are looking for information about requesting a refund from a merchant, please refer to this [FAQ](./FAQ/General.md#what-if-i-have-a-problem-with-a-paid-invoice)
:::

**Refunds** are one of the applications built on top of the [Pull Payments](./PullPayments.md) feature.

On this page, we will talk you through the flow of creating Refunds. 
There are a short few steps to create the Refund for the customer. 
After the refund has been issued, we will continue to the [Payouts](./Payouts.md) page to talk about the refund processing. 

## Create a refund

1. After an invoice has been confirmed but needs a refund, go in the Invoices page and click `Details` on the invoice.

![BTCPay Server refund feature](./img/refunds/invoices-details.jpg "BTCPay Server refund feature")

2. Click `Issue a refund`

![BTCPay Server refund feature](./img/refunds/issue-refund.jpg "BTCPay Server refund feature")

3. Select the way how you want to issue the refund

![BTCPay Server refund feature](./img/refunds/issue-refund-payment-option.jpg "BTCPay Server refund feature")

4. Select the `amount` you want to refund

![BTCPay Server refund feature](./img/refunds/issue-refund-amount.jpg "BTCPay Server refund feature")

5. Share the link of this page with your customer

![BTCPay Server refund feature](./img/refunds/claimingside.jpg "BTCPay Server refund feature")


## Processing refund 

In the next few steps, you follow along on processing a refund. 
Costumer has claimed the refund, and this is how to process it.

1. Goto the Payouts tab in your menu. 

![BTCPay Server Payouts tab](./img/refunds/payouts-status3-options-appr.jpg "BTCPay Server refund feature")

2. Select the Payouts you want to process, go to actions and select `Approve and send`

![BTCPay Server Payouts tab](./img/refunds/payouts-status3-options-appr.jpg "BTCPay Server refund feature")

3. Sign and broadcast the transactions.

![BTCPay Server Payouts tab](./img/refunds/payouts-status4-options-sign3-adv.jpg "BTCPay Server refund feature")

4. Payout has now been Signed and is in progress, this is reflected to the claimant in their view. 

![BTCPay Server Payouts tab](./img/refunds/payout-status-succesfull.jpg "BTCPay Server refund feature")

5. After the Transaction has been confirmed, the status of the Payout will be completed. 

![BTCPay Server Payouts tab](./img/refunds/payouts-status5-completed1.jpg "BTCPay Server refund feature")

Costumers view after the Refund has been paid.

![BTCPay Server Payouts tab](./img/refunds/claiment-completed1.jpg "BTCPay Server refund feature")


## Questions

If you have questions about the BTCPay Server refunds function, you can join the [community chat](https://chat.btcpayserver.org/).
If you have questions about any of the other tools or commands, etc., it's likely you can find answers to your questions by doing a search on the internet or on [StackOverflow](https://stackoverflow.com/).