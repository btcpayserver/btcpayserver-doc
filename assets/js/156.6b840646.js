(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{907:function(t,e,o){"use strict";o.r(e);var a=o(17),r=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"btcpay-server-payment-gateway-for-odoo-17"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#btcpay-server-payment-gateway-for-odoo-17"}},[t._v("#")]),t._v(" BTCPay Server payment gateway for Odoo 17")]),t._v(" "),e("h2",{attrs:{id:"this-is-the-module-to-connect-odoo-17-and-btcpay-server"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#this-is-the-module-to-connect-odoo-17-and-btcpay-server"}},[t._v("#")]),t._v(" This is the module to connect Odoo 17 and BTCPay Server")]),t._v(" "),e("p",[t._v("This module allows you to accept bitcoin (and other cryptocurrency) payments in your Odoo e-commerce store."),e("br"),t._v(" "),e("img",{attrs:{src:"https://raw.githubusercontent.com/btcpayserver/odoo/17.0/payment_btcpayserver/static/description/BTCPay-Odoo-17-featured.png",alt:"BTCPay Server Banner",title:"BTCPay Server Banner"}})]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("If you use Odoo 16 you can find the documentation "),e("a",{attrs:{href:"https://github.com/btcpayserver/odoo/blob/16.0/payment_btcpayserver/README.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),e("OutboundLink")],1),t._v(".")])]),t._v(" "),e("h2",{attrs:{id:"install-the-module"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-the-module"}},[t._v("#")]),t._v(" Install the module")]),t._v(" "),e("ul",[e("li",[t._v("Clone our "),e("a",{attrs:{href:"https://github.com/btcpayserver/odoo",target:"_blank",rel:"noopener noreferrer"}},[t._v("repository"),e("OutboundLink")],1),t._v(" or download the .zip from the "),e("a",{attrs:{href:"https://github.com/btcpayserver/odoo/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("releases page"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("Make sure you are on branch "),e("code",[t._v("17.0")]),t._v(" or downloaded a release tagged with version v17.x")]),t._v(" "),e("li",[t._v("Place the "),e("code",[t._v("payment_btcpayserver")]),t._v(" directory in your Odoo addons directory")]),t._v(" "),e("li",[t._v("Install dependencies by running "),e("code",[t._v("pip install -r requirements.txt")]),t._v(" (from inside the "),e("code",[t._v("payment_btcpayserver")]),t._v(" directory)")]),t._v(" "),e("li",[t._v("Restart Odoo")]),t._v(" "),e("li",[t._v("Go to Apps -> Update Apps List")]),t._v(" "),e("li",[t._v('Remove the "Apps" filter and search for "btcpay"')]),t._v(" "),e("li",[t._v("Click "),e("strong",[t._v("Activate")]),t._v(" button")])]),t._v(" "),e("h2",{attrs:{id:"configure-btcpay-as-payment-provider"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#configure-btcpay-as-payment-provider"}},[t._v("#")]),t._v(" Configure BTCPay as payment provider")]),t._v(" "),e("ul",[e("li",[t._v("Go to  "),e("strong",[t._v("Website")]),t._v(" -> "),e("strong",[t._v("Configuration")]),t._v(" -> "),e("strong",[t._v("Payment Providers")])]),t._v(" "),e("li",[t._v("Search for BTCPay and click on button "),e("strong",[t._v("Activate")])])]),t._v(" "),e("p",[t._v('In the BTCPay settings form, tab "Credentials":')]),t._v(" "),e("ul",[e("li",[t._v('Set field "State" to enabled')]),t._v(" "),e("li",[t._v('Set field "BTCPay Server URL" as test or live URL including https://. Example URL: https://testnet.demo.btcpayserver.org')]),t._v(" "),e("li",[t._v("Get a pairing code from your BTCPay Server store: Settings -> Access Tokens\n"),e("ul",[e("li",[t._v('Click on "Create Token" button')]),t._v(" "),e("li",[t._v('Label: enter e.g. "My odoo store"')]),t._v(" "),e("li",[t._v("Public Key: leave empty")]),t._v(" "),e("li",[t._v('Click on "Request Pairing" button, on next page click "Approve" button')]),t._v(" "),e("li",[t._v('At the top copy the code next to "Server initiated pairing code", e.g. "hg7z8wN"')])])]),t._v(" "),e("li",[t._v('Back in Odoo, paste the code into "Pairing Code" field')]),t._v(" "),e("li",[t._v("Hit Tab key on your keyboard (or click on another field) and the pairing process will start automatically")]),t._v(" "),e("li",[t._v('When the pairing is successful the "Token" and "Private Key" field will be filled automatically')]),t._v(" "),e("li",[t._v("Field Facade, keep default 'merchant'.")])]),t._v(" "),e("p",[t._v('On the tab "Configuration":')]),t._v(" "),e("ul",[e("li",[t._v('Make sure field "Payment Journal" is set to "Bank", otherwise you can click the dropdown and click on the suggestion "Bank"')]),t._v(" "),e("li",[t._v("Now you can "),e("strong",[t._v("save")]),t._v(" the settings")])]),t._v(" "),e("p",[t._v("Check the payment method is enabled:")]),t._v(" "),e("ul",[e("li",[t._v("Go to  "),e("strong",[t._v("Website")]),t._v(" -> "),e("strong",[t._v("Configuration")]),t._v(" -> "),e("strong",[t._v("Payment Methods")])]),t._v(" "),e("li",[t._v('Make sure "Pay with Bitcoin / Lightning Network" is active')])]),t._v(" "),e("p",[t._v("Congrats, all done. Do some testing to be sure all works.")]),t._v(" "),e("figure",[e("img",{attrs:{src:"https://raw.githubusercontent.com/btcpayserver/odoo/17.0/payment_btcpayserver/static/description/BTCPayPaymentSettings.png",alt:"Payment Provider Settings",title:"Payment Provider Settings"}})]),t._v(" "),e("h2",{attrs:{id:"how-does-the-payment-page-look"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#how-does-the-payment-page-look"}},[t._v("#")]),t._v(" How does the payment page look?")]),t._v(" "),e("p",[t._v('During the checkout the customers will have the option to select the payment method "Pay with Bitcoin / Lightning Network". After selecting they will be redirected to the BTCPay checkout page as shown below.')]),t._v(" "),e("figure",[e("img",{attrs:{src:"https://raw.githubusercontent.com/btcpayserver/odoo/17.0/payment_btcpayserver/static/description/BTCPayLooksLike.png",alt:"Checkout page example",title:"Checkout page example"}})]),t._v(" "),e("h2",{attrs:{id:"transaction-btcpay-details"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#transaction-btcpay-details"}},[t._v("#")]),t._v(" Transaction BTCPay Details")]),t._v(" "),e("p",[t._v("In transaction object, you will find more technical information about this method of payment:")]),t._v(" "),e("ul",[e("li",[t._v("Transaction Id: cryptocurrency transaction hash for the executed payout")]),t._v(" "),e("li",[t._v("Invoice Id: the id of the invoice for which you want to fetch an event token")]),t._v(" "),e("li",[t._v("Transaction Status: That indicates state of transaction")])]),t._v(" "),e("figure",[e("img",{attrs:{src:"https://raw.githubusercontent.com/btcpayserver/odoo/17.0/payment_btcpayserver/static/description/BtcpayTxDetails.png",alt:"Transaction details of BTCPay",title:"Transaction details of BTCPay"}})]),t._v(" "),e("h2",{attrs:{id:"troubleshooting"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[t._v("#")]),t._v(" Troubleshooting")]),t._v(" "),e("h3",{attrs:{id:"the-order-and-transaction-status-does-not-get-updated-to-paid-"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#the-order-and-transaction-status-does-not-get-updated-to-paid-"}},[t._v("#")]),t._v(' The order and transaction status does not get updated to "paid"')]),t._v(" "),e("p",[t._v("If the BTCPay connection generally works, like redirect to BTCPay checkout page (QR-code) then check your odoo logs and make sure PDF generation generally works. If there are errors mentioning wkhtmltopdf then you need to install "),e("code",[t._v("wkhtmltopdf")]),t._v(" on your server.")])])}),[],!1,null,null,null);e.default=r.exports}}]);