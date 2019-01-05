# BTCPay Stores Frequently Asked Questions.

This page shows common issues and frequently asked questions about Stores in BTCPay.

* [How to create a store in BTCPay?](FAQ-Stores.md#how-to-create-a-store-in-btcpay)
* [How many stores can I create?](FAQ-Stores.md#how-many-stores-can-i-create)
* [Store General Settings](FAQ-Stores.md#store-general-settings)
 * [Add network fee to invoice (vary with mining fees)?](FAQ-Stores.md#add-network-fee-to-invoice-vary-with-mining-fees)
 * [Allow anyone to create invoice?](FAQ-Stores.md#allow-anyone-to-create-invoice)
 * [Invoice expires if the full amount has not been paid after ... minutes?](FAQ-Stores.md#invoice-expires-if-the-full-amount-has-not-been-paid-after--minutes)
 * [Payment invalid if transactions fails to confirm ... minutes after invoice expiration?](FAQ-Stores.md#payment-invalid-if-transactions-fails-to-confirm--minutes-after-invoice-expiration)
 * [Consider the invoice confirmed when the payment transaction?](FAQ-Stores.md#consider-the-invoice-confirmed-when-the-payment-transaction)
 * [Consider the invoice paid even if the paid amount is ... % less than expected?](FAQ-Stores.md#consider-the-invoice-paid-even-if-the-paid-amount-is---less-than-expected)

## How to create a store in BTCPay?
To create your first store, go to > Stores from the header menu and click "create a new store."
## How many stores can I create?
There's no limit on a number of stores you can create in BTCPay.

## Store General Settings
Explanation of features inside Store > General Settings configured on a store-level.

## Add network fee to invoice (vary with mining fees)?
Network fee (cost) is a feature in BTCPay which protects merchants from customers who pay the invoice partially. When an invoice is paid from many outputs, the fee for a merchant who needs to move those funds later will be higher.

For example, the customer created an invoice for 20$ and paid it partially, paying 1$ 20 times until the invoice is paid fully. Merchant now has a larger transaction which increases the mining cost in case the merchant decides to move those funds later. By default, BTCPay applies an **additional network cost** to the total invoice amount to cover that expense for the merchant. 

BTCPay offers several options to customize this protection feature. You can apply a network fee :

* Only if the customer makes more than one payment for the invoice (In the above example, if the customer created an invoice for 20$ and paid 1$, total invoice due is now 19$ + the network fee. The network fee is applied **after the first payment**)
* On every payment (including the first payment, in our example, the total  will be 20$ + network fee right away, even on the first payment)
* Never add network fee (disables the network fee entirely)

The network fee in BTCPay is **not the mining fee**. The customers still need to pay for the miner's fee. 

The network cost is an optional feature. It's enabled by default, but it's entirely up to a merchant to enable or disable it. The customer sees the "network cost" at the checkout when they expand the invoice information.

While it protects from dust transactions, it can also reflect negatively on businesses if not communicated properly. Your customers may have additional questions and may think you're overcharging them.

Please think twice about how this may affect your business and make sure to communicate it to your customers properly inside your store Terms of Service or through other means.

## Allow anyone to create invoice
You should enable this option if you want to allow the outside world to create invoices in your store. This option is only useful if you're using the payment button or if you are issuing invoices via API or 3rd party HTML website. POS app is pre-authorised and does not need this enabled for a random visitor to open your POS store and create an invoice. If in doubt, don't enable it as you can always enable it if needed.

## Invoice expires if the full amount has not been paid after ... minutes
The invoice timer is set to 15 minutes by default. The timer is a protection mechanism against the volatility since it locks the cryptocurrency amount according to the crypto to fiat rates. If the customer does not pay the invoice within the defined period, the invoice is considered expired. The invoice is considered "paid" as soon as the transaction is visible on the blockchain (o-confirmations) but considered "complete" when it reaches the number of confirmations the merchant defined (usually, 1-6). The timer is customizable.

## Payment invalid if transactions fails to confirm ... minutes after invoice expiration
If the customer pays the invoice, but it fails to get the defined number of confirmations within the set period, it is marked as "invalid." The merchant can then decide whether to accept the invoice afterward manually or decline it and require additional payment from the customer. This is an additional protection mechanism against the volatility.

## Consider the invoice confirmed when the payment transaction
The invoice is considered "paid," as soon as it's visible on the blockchain. When the invoice reaches the defined number of confirmations, it is considered "confirmed/completed." Here you set the minimum amount of confirmations after which the invoice gets the "confirmed/completed" status.

## Consider the invoice paid even if the paid amount is ... % less than expected
In a situation where a customer uses an exchange wallet to pay directly for an invoice, the exchange takes a small amount of fee. This means that such invoice is not considered fully completed. The invoice gets status "paid partially." If a merchant wants to accept underpaid invoices, you can set the percentage rate here.
