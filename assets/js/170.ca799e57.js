(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{1001:function(e,t,a){"use strict";a.r(t);var r=a(17),i=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"btctransmuter-docs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#btctransmuter-docs"}},[e._v("#")]),e._v(" BtcTransmuter Docs")]),e._v(" "),t("h2",{attrs:{id:"note-this-project-is-not-maintained"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#note-this-project-is-not-maintained"}},[e._v("#")]),e._v(" Note: This project is not maintained")]),e._v(" "),t("p",[e._v("Btctransmuter is no longer maintained and will not be updated with new features. Avoid using it, if you can.")]),e._v(" "),t("h2",{attrs:{id:"introduction-what-is-btctransmuter"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction-what-is-btctransmuter"}},[e._v("#")]),e._v(" Introduction - What is BtcTransmuter?")]),e._v(" "),t("p",[e._v("BtcTransmuter is a free, open-source & self-hosted tool that allows you to configure actions that execute automatically upon specified conditions. Its primary focus is the integration of cryptocurrency services to help users manage their funds and business workflow.")]),e._v(" "),t("h2",{attrs:{id:"how-does-it-work"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-does-it-work"}},[e._v("#")]),e._v(" How does it work?")]),e._v(" "),t("p",[e._v("There are 3 main components in BtcTransmuter - External Services, Recipes and Extensions.")]),e._v(" "),t("ul",[t("li",[e._v("External services integrated with third parties, such as a BTCPayServer instance or a Cryptocurrency Exchange.")]),e._v(" "),t("li",[e._v("Recipes is a set of instructions created by the user: What to execute and when. The execution part is called a Recipe Action while the condition is called a Recipe Trigger. An action could be "),t("code",[e._v("Send an Email using the SMTP External Service")]),e._v(" and the trigger being "),t("code",[e._v("If a new invoice was created on my BtcPay External Service")])]),e._v(" "),t("li",[e._v("Extensions provide a way to add more external service types, actions and triggers without needing to modify the original code.")])]),e._v(" "),t("h2",{attrs:{id:"can-i-use-this-in-production"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#can-i-use-this-in-production"}},[e._v("#")]),e._v(" Can I use this in production")]),e._v(" "),t("p",[e._v("This project is still in early development and most likely has some bugs and quirks that need to be ironed out. The project is considered to be in ALPHA state, meaning not all desired functionality has been implemented and there can be breaking changes.")]),e._v(" "),t("h2",{attrs:{id:"how-do-i-deploy"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-deploy"}},[e._v("#")]),e._v(" How do I deploy?")]),e._v(" "),t("p",[e._v("If you set up BTCPay using any "),t("RouterLink",{attrs:{to:"/Docker/"}},[e._v("dockerized install method")]),e._v(", you can enable BTC Transmuter easily.")],1),e._v(" "),t("p",[e._v("First, "),t("a",{attrs:{href:"https://github.com/JeffVandrewJr/patron/blob/master/SSH.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("SSH"),t("OutboundLink")],1),e._v(" into your server.\nThen run the following commands:")]),e._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("su")]),e._v(" -\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" btcpayserver-docker\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("BTCPAYGEN_ADDITIONAL_FRAGMENTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),t("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$BTCPAYGEN_ADDITIONAL_FRAGMENTS")]),e._v(';opt-add-btctransmuter"')]),e._v("\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(".")]),e._v(" ./btcpay-setup.sh "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[e._v("-i")]),e._v("\n")])])]),t("p",[e._v("If you have trouble starting your server after running the setup command, verify you have "),t("RouterLink",{attrs:{to:"/FAQ/FAQ-Deployment/#how-can-i-modify-or-deactivate-environment-variables"}},[e._v("added the environment variable")]),e._v(" correctly to enable Transmuter.")],1),e._v(" "),t("p",[e._v("Once completed, your Transmuter will be available at your configured BTCPay website under "),t("code",[e._v("/btctransmuter/")]),e._v(", where the first account to register becomes the Transmuter admin. Open that link in your browser and youll see the homepage.")]),e._v(" "),t("h2",{attrs:{id:"what-extensions-are-provided"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-extensions-are-provided"}},[e._v("#")]),e._v(" What extensions are provided?")]),e._v(" "),t("p",[e._v("You can see a list of built-in extensions once you log into your transmuter application under "),t("code",[e._v("/extensions")]),e._v(".")]),e._v(" "),t("p",[e._v("Currently there are 12 extensions that come bundled with the main application:")]),e._v(" "),t("ul",[t("li",[e._v("Tor - Provides TOR access to your Transmuter app")]),e._v(" "),t("li",[e._v("Presets - Provides one page wizards for quick setups of common scenarios")]),e._v(" "),t("li",[e._v("BtcPayServer - Provides you a way to interact with BTCPayServer stores")]),e._v(" "),t("li",[e._v("Email - Provides you with a way to check a POP3 for incoming emails and a way to send Email via SMTP")]),e._v(" "),t("li",[e._v("Exchange - Provides you a way to connect to a variety of exchanges and place orders on them")]),e._v(" "),t("li",[e._v("Lightning - Provides you interoperability with lightning nodes to be able to do basic channel and invoice management")]),e._v(" "),t("li",[e._v("NBXplorer - Provides you ways to detect incoming funds, send funds, and generate addresses.")]),e._v(" "),t("li",[e._v("Operators - Lets you create conditional workflows")]),e._v(" "),t("li",[e._v("Recipe - Lets you manage existing or create recipes with your workflows")]),e._v(" "),t("li",[e._v("Timer - Run X every Y")]),e._v(" "),t("li",[e._v("WebHook - Trigger Recipes with an http call or execute external web hooks with a recipe")])]),e._v(" "),t("h2",{attrs:{id:"what-preset-recipes-are-provided"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-preset-recipes-are-provided"}},[e._v("#")]),e._v(" What preset recipes are provided?")]),e._v(" "),t("p",[e._v("Currently there are three preset recipes that you can enable easily. In addition to the list below, you can create your own recipes for automating other tasks.")]),e._v(" "),t("ol",[t("li",[e._v("On-chain Forwarder - Forward funds from a wallet elsewhere")]),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/Transmuter/EmailReceiptsPreset/"}},[e._v("BTCPay Email Receipts")]),e._v(" - Send an email when a BTCPay invoice gets paid")],1),e._v(" "),t("li",[e._v("Fiat Conversion - Convert incoming money to fiat on an exchange by market selling when BTCPay invoice statuses change.")]),e._v(" "),t("li",[t("RouterLink",{attrs:{to:"/Transmuter/DCA/"}},[e._v("Dollar Cost Average")]),e._v(" - Schedule daily purchases of Bitcoin")],1)]),e._v(" "),t("h2",{attrs:{id:"how-do-i-write-an-extension"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-write-an-extension"}},[e._v("#")]),e._v(" How do I write an extension?")]),e._v(" "),t("p",[e._v("An extension must be its own .net core class library project that references "),t("code",[e._v("BtcTransmuter.Abstractions")]),e._v("\nThere must be a class implementing "),t("code",[e._v("BtcTransmuterExtension")]),e._v(" in this library. This file bootstraps the plugin name and adds all the services to system on startup.")]),e._v(" "),t("h3",{attrs:{id:"adding-a-trigger"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-trigger"}},[e._v("#")]),e._v(" Adding a Trigger")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Implement "),t("code",[e._v("BaseTrigger")]),e._v(" This class will be used to transport the event data")])]),e._v(" "),t("li",[t("p",[e._v("Implement "),t("code",[e._v("BaseTriggerHandler")]),e._v(" This handles:")]),e._v(" "),t("ul",[t("li",[e._v("Describing the trigger to the main system.")]),e._v(" "),t("li",[e._v("Telling the main UI how to create/edit a recipe trigger using it.")]),e._v(" "),t("li",[e._v("The logic needed to see if a trigger is...triggered.")])]),e._v(" "),t("p",[e._v("You will see that "),t("code",[e._v("BaseTriggerHandler")]),e._v(" has 2 generic arguments, a "),t("code",[e._v("Data")]),e._v(" and "),t("code",[e._v("Parameters")]),e._v(" "),t("code",[e._v("Data")]),e._v(" is the trigger that that was detected, while "),t("code",[e._v("Parameters")]),e._v(" is the data from a Recipe to see if it triggers its actions.")])]),e._v(" "),t("li",[t("p",[e._v("Implement a Partial View (named as the same value as the property "),t("code",[e._v("ViewPartial")]),e._v(" in the "),t("code",[e._v("BaseTriggerHandler")]),e._v(" implementation)\nThis handles displaying the trigger settings in a recipe")])]),e._v(" "),t("li",[t("p",[e._v("Implement a Controller that allows a user to create/edit the necessary data to set the trigger on a recipe.")])])]),e._v(" "),t("h3",{attrs:{id:"adding-an-action"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-an-action"}},[e._v("#")]),e._v(" Adding an Action")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Implement "),t("code",[e._v("BaseActionHandler")]),e._v(" This handles:")]),e._v(" "),t("ul",[t("li",[e._v("Describing the action to the main system.")]),e._v(" "),t("li",[e._v("Telling the main UI how to create/edit a recipe action using it.")]),e._v(" "),t("li",[e._v("The logic needed to execute the action")])]),e._v(" "),t("p",[e._v("You will see that "),t("code",[e._v("BaseActionHandler")]),e._v(" has a generic argument, "),t("code",[e._v("Data")]),e._v(" "),t("code",[e._v("Data")]),e._v(" is the type of the action that holds the payload needed to exeucte the action through the instructions of recipe action")])]),e._v(" "),t("li",[t("p",[e._v("Implement a Partial View (named as the same value as the property "),t("code",[e._v("ViewPartial")]),e._v(" in the "),t("code",[e._v("BaseActionHandler")]),e._v(" implementation)\nThis handles displaying the action settings in a recipe")])]),e._v(" "),t("li",[t("p",[e._v("Implement a Controller that allows a user to create/edit the necessary data to set the action on a recipe.")])])]),e._v(" "),t("h3",{attrs:{id:"adding-an-external-service"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-an-external-service"}},[e._v("#")]),e._v(" Adding an External Service")]),e._v(" "),t("ul",[t("li",[e._v("Implement "),t("code",[e._v("BaseExternalService")]),e._v(" & "),t("code",[e._v("IExternalServiceDescriptor")])]),e._v(" "),t("li",[e._v("Implement a Partial View (named as the same value as the property "),t("code",[e._v("ViewPartial")]),e._v(" in the "),t("code",[e._v("IExternalServiceDescriptor")]),e._v(" implementation)")]),e._v(" "),t("li",[e._v("Implement a Controller that allows a user to create/edit the necessary data for an external service.")])])])}),[],!1,null,null,null);t.default=i.exports}}]);