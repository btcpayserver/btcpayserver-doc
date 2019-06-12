# Accounting in BTCPay

BTCPay offers several tools that make cryptocurrency bookkeeping easier.

## Invoice Export
![Invoice exporting in BTCPay](img/BTCPayInvoiceExport.png)

To export the invoices, go to Invoices > Export invoices, select the export format (CSV/JSON) and download the file. You can then, customize the fields to fit your business needs and import the data into your accounting software, or create pivot tables from the exported data.

The fields are the following:

| Field name  |  Description |
|:-:|---|
| ReceivedDate  | Date when the payment has been received  |
| StoreId |  The store receiving the payment |
| OrderId  | The order Id of the invoice  |
| InvoiceId  | The invoice ID |
| InvoiceCreatedDate  | Date of creation of the invoice |
| InvoiceExpirationDate  | Date of expiration of the invoice |
| InvoiceMonitoringDate  | Date when we cease to monitor events of the invoice |
| PaymentId | Unique identifier of a payment |
| Destination | The destination address the customer paid to |
| PaymentType | The type of payment (`OnChain`, `Offchain`) |
| CryptoCode | Currency code of the method of payment (e.g. `BTC`) |
| Paid | Amount of payment in the currency of CryptoCode |
| NetworkFee | [Network fee](FAQ/FAQ-Stores.md#add-network-fee-to-invoice-vary-with-mining-fees) paid by the user in this payment |
| ConvertionRate | The conversion rate at invoice creation to convert from `CryptoCode` to `InvoiceCurrency` |
| InvoiceCurrency | The currency of the invoice (e.g. `USD`) |
| InvoiceDue | The amount still due to fully pay the Invoice after this payment (without `NetworkFee`, denominated in `InvoiceCurrency`) |
| InvoicePrice | The price of the invoice (without Network Fee, in `InvoiceCurrency`) |
| InvoiceItemCode | The item code of the invoice |
| InvoiceItemDesc | The item description of the invoice |
| InvoiceFullStatus | The status of the invoice (e.g. `expired (paidPartial)`) |
| InvoiceStatus | The status of the invoice (e.g. `expired`) |
| InvoiceException | The status of the invoice (e.g. `paidPartial`) |

## QuickBooks Online Connector for BTCPay Server
BTCQBO is a third-party plugin that enables QuickBooks Online users to connect their BTCPay server easily. Besides bookkeeping, users can quickly generate invoices from their QuickBooks. For more information about the BTCQBO and all the features it offers, [check the plugin repository](https://github.com/JeffVandrewJr/btcqbo) or watch the video below.

[![BTCPay QuickBooks](https://img.youtube.com/vi/srgwL9ozg6c/mqdefault.jpg)](https://www.youtube.com/watch?v=srgwL9ozg6c "BTCPay QuickBooks")
