(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{850:function(e,t,r){"use strict";r.r(t);var a=r(17),o=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"btcpay-server-accept-bitcoin-payments-in-grandnode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#btcpay-server-accept-bitcoin-payments-in-grandnode"}},[e._v("#")]),e._v(" BTCPay Server  Accept Bitcoin payments in GrandNode")]),e._v(" "),t("figure",[t("img",{attrs:{src:"https://raw.githubusercontent.com/btcpayserver/grandnode/main/GrandNodeAcceptBitcoin.png",alt:"BTCPay GrandNode Banner",title:"BTCPay GrandNode Banner"}})]),e._v(" "),t("h2",{attrs:{id:"plugin-overview"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#plugin-overview"}},[e._v("#")]),e._v(" Plugin Overview")]),e._v(" "),t("p",[e._v("This plugin allows you to easily start accepting Bitcoin payments in your GrandNode e-commerce store using BTCPay Server  a free, self-hosted and open-source payment gateway.")]),e._v(" "),t("h2",{attrs:{id:"features"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#features"}},[e._v("#")]),e._v(" Features")]),e._v(" "),t("ul",[t("li",[e._v("0% Fees: Enjoy a payment gateway with no fees. Yes, really!")]),e._v(" "),t("li",[e._v("No complicated KYC needed, you're your own self-hosted payment gateway")]),e._v(" "),t("li",[e._v("Automated invoice management and refunds")]),e._v(" "),t("li",[e._v("Simple and customizable checkout UX, available in 30+ languages")]),e._v(" "),t("li",[e._v("Direct payments to your wallet, no intermediary")]),e._v(" "),t("li",[e._v("Reporting and accounting  CSV exports")]),e._v(" "),t("li",[e._v("Real-time exchange price tracking for correct payment amounts")]),e._v(" "),t("li",[e._v("Community-driven support")]),e._v(" "),t("li",[e._v("Extensive documentation and video tutorials")])]),e._v(" "),t("h2",{attrs:{id:"getting-started"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting Started")]),e._v(" "),t("h3",{attrs:{id:"download-and-installation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#download-and-installation"}},[e._v("#")]),e._v(" Download and installation")]),e._v(" "),t("p",[e._v("The plugins can be downloaded through through "),t("a",{attrs:{href:"https://github.com/btcpayserver/nopcommerce/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),t("OutboundLink")],1),e._v(" or "),t("a",{attrs:{href:"https://grandnode.com/btcpay-server-accept-bitcoin-payments",target:"_blank",rel:"noopener noreferrer"}},[e._v("GrandNode Extension Marketplace"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("For installing the plugin on GrandNode, you can either upload the plugin directly to the "),t("code",[e._v("/plugins")]),e._v(" folder in your GrandNode main directory and restart your application, or use the Admin Panel to upload the plugin.")]),e._v(" "),t("p",[e._v("In the "),t("strong",[e._v("Admin Panel")]),e._v(", navigate to "),t("strong",[e._v("Plugins -> Local Plugins")]),e._v(" and click the "),t("strong",[e._v('"Upload"')]),e._v(' button. Ensure the plugin file is in ZIP for successful upload. After uploading, find the plugin in the list, click "Install" next to it, and enable it if needed.')]),e._v(" "),t("h2",{attrs:{id:"plugin-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#plugin-configuration"}},[e._v("#")]),e._v(" Plugin configuration")]),e._v(" "),t("p",[e._v("You can configure the plugin either automatically or manually, depending on your preferences and requirements.")]),e._v(" "),t("h3",{attrs:{id:"automatic-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#automatic-configuration"}},[e._v("#")]),e._v(" Automatic Configuration")]),e._v(" "),t("ol",[t("li",[e._v('Enter Url to your BTCPay Server into "BTCPay Url" field. (e.g. https://mainnet.demo.btcpayserver.org)')]),e._v(" "),t("li",[e._v('Click on the "Configure automatically" button to be redirected to the API authorization page of your BTCPay Server')]),e._v(" "),t("li",[e._v("On the authorization page: Select the store you want to connect to your GrandNode (you might need to login first)")]),e._v(" "),t("li",[e._v('Click on "Authorize App" button and you will be redirected back to your GrandNode')]),e._v(" "),t("li",[e._v('The "API Key", "BTCPay Store ID" and "Webhook Secret" fields will be automatically filled and a webhook created')]),e._v(" "),t("li",[e._v('Click "Save" button at bottom to persist the configuration. Congrats, the configuration is now complete!')])]),e._v(" "),t("p",[t("em",[e._v("Note: given the architecture of GrandNode, it is possible that malfunctions in redirections may occur. Particularly if https is disabled or incorrectly configured. In this case, please opt for manual configuration.")])]),e._v(" "),t("h3",{attrs:{id:"manual-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#manual-configuration"}},[e._v("#")]),e._v(" Manual Configuration")]),e._v(" "),t("p",[e._v("Ensure that the following fields are filled out:")]),e._v(" "),t("ul",[t("li",[e._v("BTCPay Url")]),e._v(" "),t("li",[e._v("BTCPay Store ID")]),e._v(" "),t("li",[e._v("API Key")]),e._v(" "),t("li",[e._v("WebHook Secret")])]),e._v(" "),t("h4",{attrs:{id:"btcpay-url"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#btcpay-url"}},[e._v("#")]),e._v(" BTCPay URL")]),e._v(" "),t("p",[e._v("In the BTCPay URL field of your GrandNode, simply input the link to your self-hosted server or the one hosted by a "),t("a",{attrs:{href:"https://directory.btcpayserver.org/filter/hosts",target:"_blank",rel:"noopener noreferrer"}},[e._v("third-party provider"),t("OutboundLink")],1),e._v(". For example; https://mainnet.demo.btcpayserver.org")]),e._v(" "),t("h4",{attrs:{id:"btcpay-store-id"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#btcpay-store-id"}},[e._v("#")]),e._v(" BTCPay Store ID")]),e._v(" "),t("p",[e._v("BTCPay "),t("strong",[e._v("Store ID")]),e._v(" can be obtained from your BTCPay Server, in Store Settings > General > Store ID field. Copy it and paste it over in the "),t("code",[e._v("BTCPay Store ID")]),e._v(" field.")]),e._v(" "),t("h4",{attrs:{id:"generating-the-api-key"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generating-the-api-key"}},[e._v("#")]),e._v(" Generating the API key")]),e._v(" "),t("ol",[t("li",[e._v("To create the "),t("strong",[e._v("BTCPay API key")]),e._v(", click on the "),t("code",[e._v("Account")]),e._v(" located at the bottom of the sidebar.")]),e._v(" "),t("li",[e._v("Click on the "),t("code",[e._v("Manage Account > API Key")]),e._v(".")]),e._v(" "),t("li",[e._v("Click on the "),t("code",[e._v("Generate API key")]),e._v(" button")]),e._v(" "),t("li",[e._v("Click on the checkboxes and enable the following permissions:")])]),e._v(" "),t("ul",[t("li",[e._v("View invoices")]),e._v(" "),t("li",[e._v("Create an invoice")]),e._v(" "),t("li",[e._v("Modify invoices")]),e._v(" "),t("li",[e._v("Modify selected stores' webhooks")]),e._v(" "),t("li",[e._v("View your stores")]),e._v(" "),t("li",[e._v("Create non-approved pull payments in selected stores (optional)")])]),e._v(" "),t("p",[t("em",[e._v("Note: To use the "),t("RouterLink",{attrs:{to:"/Refund/#refunds"}},[e._v("refund feature")]),e._v(', you must also add the "Create non-approved pull payments" permission. After a refund, an order note is created where you can copy the pull payments link and send to your customer to claim it (this order note is also visible by the customer). The customer can request the refund on that page by filling out refund address.')],1)]),e._v(" "),t("h4",{attrs:{id:"generating-the-webhook"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#generating-the-webhook"}},[e._v("#")]),e._v(" Generating the webhook")]),e._v(" "),t("ol",[t("li",[e._v('In your GrandNode, copy the "Webhook Url" shown on the bottom of the BTCPay plugin configuration screen.')]),e._v(" "),t("li",[e._v("Next, go to your BTCPay Server "),t("code",[e._v("Store Settings > Webhooks")])]),e._v(" "),t("li",[e._v("Click on the "),t("code",[e._v("Create Webhook")]),e._v(" button")]),e._v(" "),t("li",[e._v("Paste the "),t("code",[e._v("Webhook Url")]),e._v(" you copied from GrandNode (step 1) into "),t("code",[e._v("Payload URL")]),e._v(" field")]),e._v(" "),t("li",[e._v('Click on the "Eye" icon next to the '),t("code",[e._v("Secret")]),e._v(" field to reveal the secret key and copy it.")]),e._v(" "),t("li",[e._v("Don't forget to click on the "),t("code",[e._v("Add webhook")]),e._v(" to apply all the changes.")]),e._v(" "),t("li",[e._v("Go back GrandNode and paste the Secret Key into the "),t("code",[e._v("WebHook Secret")]),e._v(" field")]),e._v(" "),t("li",[e._v("Click save to apply all the changes")])]),e._v(" "),t("p",[e._v("Now your BTCPay Server is connected to your GranNode sucessfully.")]),e._v(" "),t("h2",{attrs:{id:"support"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#support"}},[e._v("#")]),e._v(" Support")]),e._v(" "),t("p",[e._v("Feel free to join our support channel over at "),t("a",{attrs:{href:"https://chat.btcpayserver.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mattermost"),t("OutboundLink")],1),e._v(" or "),t("a",{attrs:{href:"https://t.me/btcpayserver",target:"_blank",rel:"noopener noreferrer"}},[e._v("Telegram"),t("OutboundLink")],1),e._v(" if you need help or have any further questions.")]),e._v(" "),t("p",[e._v("If experience a bug please "),t("a",{attrs:{href:"https://github.com/btcpayserver/btcpay-grandnode-plugin/issues",target:"_blank",rel:"noopener noreferrer"}},[e._v("open a bug report"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"license"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[e._v("#")]),e._v(" License")]),e._v(" "),t("p",[e._v("This plugin is released under the "),t("a",{attrs:{href:"https://github.com/btcpayserver/grandnode/blob/master/LICENSE",target:"_blank",rel:"noopener noreferrer"}},[e._v("MIT License"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("The non-profit "),t("a",{attrs:{href:"https://btcpayserver.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("BTCPay Server Foundation"),t("OutboundLink")],1),e._v(" is committed to keeping this powerful payment plugin free forever. Our mission is to enable anyone to accept bitcoin regardless of financial, technical, social or political barriers.")]),e._v(" "),t("hr")])}),[],!1,null,null,null);t.default=o.exports}}]);