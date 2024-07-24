(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{806:function(t,e,s){"use strict";s.r(e);var n=s(10),a=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("# Sideshift for BTCPay Server plugin")]),t._v(" "),e("p",[t._v("This plugin integrates the no-kyc Sideshift exchanges into various parts of BTCPay Server.")]),t._v(" "),e("ul",[e("li",[t._v("Invoice checkout - Let your customers pay with any coin supported by Sideshift. The settings allow you to show a payment method that loads sideshift with its various options as dropwdown, or you can explicitly show each option as a payment method on its own, or you can have both.")]),t._v(" "),e("li",[t._v("Pull payments - Let your customers claim their payouts in any option supported by Sideshift.")]),t._v(" "),e("li",[t._v("Prism Plugin - Allows you to use Sideshift as a destination in the Prism plugin, so that you can automatically convert incoming Bitcoin to any option Sideshift supports.")])]),t._v(" "),e("h2",{attrs:{id:"usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),e("p",[t._v("For both invoices and pull payments, you will need to enable sideshift through its settings located in the plugins navigation under your store. The prism plugin integration does not require this to be on.")]),t._v(" "),e("h2",{attrs:{id:"configuring-on-individual-invoices"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#configuring-on-individual-invoices"}},[t._v("#")]),t._v(" Configuring on individual invoices")]),t._v(" "),e("p",[t._v("You can configure the sideshift options on individual invoices when creating them through the API by setting a json object under the Metadata property of the invoice. This will merge on top of your existing sideshift settings in your store. The json object should be in the following format, and any property not included, will use the ones on your store:")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sideshift"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"enabled"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//whether it should be enabled/disabled for this invoice")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"explicitMethods"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"USDT_liquid"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//if you want to explicitly show certain options, you can list them here. The format is currencyCode_network. You can look at the html in the sideshift settings page to see the full list of values.")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"onlyShowExplicitMethods"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// if you want to only show the explicit methods, and not the dropdown variant of the plugin")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"preferredTargetPaymentMethodId"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"BTC_LightningLike"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//if you want to set a preferred payment method that you would receive the funds from sideshift on. This is the payment method format as used in the BTCPay Server Greenfield API. ")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"amountMarkupPercentage"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.5")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//if you want to add a markup in case you dont think that sideshift is reliable in convertint into the exact amount.")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);