---
externalRepo: https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/tree/master/Plugins/BTCPayServer.RockstarDev.Plugins.Payroll
editLink: https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/edit/master/Plugins/BTCPayServer.RockstarDev.Plugins.Payroll/README.md
---
# Payroll Plugin for BTCPay Server

The Payroll Plugin for BTCPay Server aims to streamline the payroll process by providing an easy-to-use interface for uploading invoices and facilitating
payments.
This plugin enables administrators to manage payroll users, inspect invoices, and initiate payments seamlessly within the BTCPay Server.

## Usage

- Install the plugin from the BTCPay Server > Settings > Plugin > Available Plugins, and restart

![Payroll Plugin](https://github.com/btcpayserver/btcpayserver/assets/47084273/a918ff08-7444-4b69-a2ca-b75e38f19bcc)

- Once done, you'll see the Payroll plugin listed under plugins in the left sidebar of BTCPay Server
- You can create a payroll user for each person that needs access to the system. It is recommended that you generate strong passwords and share the Invoice
  Upload Link (under the Options button) with the respective users
- To do that click on the manage users button on the top right, then click on the create user button.

![Manage User](https://github.com/btcpayserver/btcpayserver/assets/47084273/629e0d3d-db67-489a-baa1-c7b2eb11932a)

![Create User](https://github.com/btcpayserver/btcpayserver/assets/47084273/9d27aa5e-f187-4b58-b758-320125be277f)

- In addition to Name and Email, be sure to supply a strong password.
- As an admin, you can upload invoices manually on behalf of users by going to the Payroll Invoice section and clicking on admin upload invoice.
- To allow users to log in and upload their own invoice, the admin MUST supply the Invoice Upload Link. Users do NOT receive automated emails, and CANNOT log
  into the main BTCPay site (only to the aforementioned plugin link).

![Share Invoice upload link](https://github.com/btcpayserver/btcpayserver/assets/47084273/f654d1f7-4114-4b46-8f3e-b9410cec95ed)

- Once invoices are uploaded, the admin has the ability to pay the invoice(s), download invoice(s), and also mark an invoice as paid, if it has been initially
  signed off my the admin.
- When an admin clicks on pay invoice, it takes them to a Bitcoin wallet with a prepopulated Send dialog (the amount of Bitcoin is calculated automatically,
  based on current conversion rates)
- The admin can then sign the generated transaction and broadcast it.
- Once the transaction is confirmed on the blockchain, the payroll invoice state will be updated to Completed
- The admin can also manage payroll users. The admin can do all of the following:
    - An admin can reset passwords for users
    - An admin can disable/activate payroll users
    - An admin can edit payroll users
    - An admin can also download invoices belonging to a particular user

## Contributing to plugin development

This documentation is a work in progress. You can contribute by improving it.

Also, a list of open issues is maintained on: https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/issues?q=is%3Aissue+is%3Aopen+label%3Apayroll

If the issue is not assigned to anyone, feel free to pick it up and open a PR

## License

https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/blob/master/LICENSE
