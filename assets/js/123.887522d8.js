(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{882:function(e,t,a){"use strict";a.r(t);var r=a(35),i=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"btctransmuter-docs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#btctransmuter-docs"}},[e._v("#")]),e._v(" BtcTransmuter Docs")]),e._v(" "),a("h2",{attrs:{id:"introduction-what-is-btctransmuter"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction-what-is-btctransmuter"}},[e._v("#")]),e._v(" Introduction - What is BtcTransmuter?")]),e._v(" "),a("p",[e._v("BtcTransmuter is a free, open-source & self-hosted tool that allows you to configure actions that execute automatically upon specified conditions. Its primary focus is the integration of cryptocurrency services to help users manage their funds and business workflow.")]),e._v(" "),a("h2",{attrs:{id:"how-does-it-work"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-does-it-work"}},[e._v("#")]),e._v(" How does it work?")]),e._v(" "),a("p",[e._v("There are 3 main components in BtcTransmuter - External Services, Recipes and Extensions.")]),e._v(" "),a("ul",[a("li",[e._v("External services integrated with third parties, such as a BTCPayServer instance or a Cryptocurrency Exchange.")]),e._v(" "),a("li",[e._v("Recipes is a set of instructions created by the user: What to execute and when. The execution part is called a Recipe Action while the condition is called a Recipe Trigger. An action could be "),a("code",[e._v("Send an Email using the SMTP External Service")]),e._v(" and the trigger being "),a("code",[e._v("If a new invoice was created on my BtcPay External Service")])]),e._v(" "),a("li",[e._v("Extensions provide a way to add more external service types, actions and triggers without needing to modify the original code.")])]),e._v(" "),a("h2",{attrs:{id:"can-i-use-this-in-production"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#can-i-use-this-in-production"}},[e._v("#")]),e._v(" Can I use this in production")]),e._v(" "),a("p",[e._v("This project is still in early development and most likely has some bugs and quirks that need to be ironed out. The project is considered to be in ALPHA state, meaning not all desired functionality has been implemented and there can be breaking changes.")]),e._v(" "),a("h2",{attrs:{id:"how-do-i-deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-deploy"}},[e._v("#")]),e._v(" How do I deploy?")]),e._v(" "),a("p",[e._v("If you set up BTCPay using any "),a("RouterLink",{attrs:{to:"/Docker/"}},[e._v("dockerized install method")]),e._v(", you can enable BTC Transmuter easily.")],1),e._v(" "),a("p",[e._v("First, "),a("a",{attrs:{href:"https://github.com/JeffVandrewJr/patron/blob/master/SSH.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("SSH"),a("OutboundLink")],1),e._v(" into your server.\nThen run the following commands:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("su")]),e._v(" -\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" btcpayserver-docker\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("BTCPAYGEN_ADDITIONAL_FRAGMENTS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$BTCPAYGEN_ADDITIONAL_FRAGMENTS")]),e._v(';opt-add-btctransmuter"')]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v(".")]),e._v(" ./btcpay-setup.sh -i\n")])])]),a("p",[e._v("If you have trouble starting your server after running the setup command, verify you have "),a("RouterLink",{attrs:{to:"/FAQ/FAQ-Deployment/#how-can-i-modify-or-deactivate-environment-variables"}},[e._v("added the environment variable")]),e._v(" correctly to enable Transmuter.")],1),e._v(" "),a("p",[e._v("Once completed, your Transmuter will be available at your configured BTCPay website under "),a("code",[e._v("/btctransmuter/")]),e._v(", where the first account to register becomes the Transmuter admin. Open that link in your browser and you’ll see the homepage.")]),e._v(" "),a("h2",{attrs:{id:"what-extensions-are-provided"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-extensions-are-provided"}},[e._v("#")]),e._v(" What extensions are provided?")]),e._v(" "),a("p",[e._v("You can see a list of built-in extensions once you log into your transmuter application under "),a("code",[e._v("/extensions")]),e._v(".")]),e._v(" "),a("p",[e._v("Currently there are 12 extensions that come bundled with the main application:")]),e._v(" "),a("ul",[a("li",[e._v("Tor - Provides TOR access to your Transmuter app")]),e._v(" "),a("li",[e._v("Presets - Provides one page wizards for quick setups of common scenarios")]),e._v(" "),a("li",[e._v("BtcPayServer - Provides you a way to interact with BTCPayServer stores")]),e._v(" "),a("li",[e._v("Email - Provides you with a way to check a POP3 for incoming emails and a way to send Email via SMTP")]),e._v(" "),a("li",[e._v("Exchange - Provides you a way to connect to a variety of exchanges and place orders on them")]),e._v(" "),a("li",[e._v("Lightning - Provides you interoperability with lightning nodes to be able to do basic channel and invoice management")]),e._v(" "),a("li",[e._v("NBXplorer - Provides you ways to detect incoming funds, send funds, and generate addresses.")]),e._v(" "),a("li",[e._v("Operators - Lets you create conditional workflows")]),e._v(" "),a("li",[e._v("Recipe - Lets you manage existing or create recipes with your workflows")]),e._v(" "),a("li",[e._v("Timer - Run X every Y")]),e._v(" "),a("li",[e._v("WebHook - Trigger Recipes with an http call or execute external web hooks with a recipe")])]),e._v(" "),a("h2",{attrs:{id:"what-preset-recipes-are-provided"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-preset-recipes-are-provided"}},[e._v("#")]),e._v(" What preset recipes are provided?")]),e._v(" "),a("p",[e._v("Currently there are three preset recipes that you can enable easily. In addition to the list below, you can create your own recipes for automating other tasks.")]),e._v(" "),a("ol",[a("li",[e._v("On-chain Forwarder - Forward funds from a wallet elsewhere")]),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/Transmuter/EmailReceiptsPreset/"}},[e._v("BTCPay Email Receipts")]),e._v(" - Send an email when a BTCPay invoice gets paid")],1),e._v(" "),a("li",[e._v("Fiat Conversion - Convert incoming money to fiat on an exchange by market selling when BTCPay invoice statuses change.")]),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/Transmuter/DCA/"}},[e._v("Dollar Cost Average")]),e._v(" - Schedule daily purchases of Bitcoin")],1)]),e._v(" "),a("h2",{attrs:{id:"how-do-i-write-an-extension"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-write-an-extension"}},[e._v("#")]),e._v(" How do I write an extension?")]),e._v(" "),a("p",[e._v("An extension must be its own .net core class library project that references "),a("code",[e._v("BtcTransmuter.Abstractions")]),e._v("\nThere must be a class implementing "),a("code",[e._v("BtcTransmuterExtension")]),e._v(" in this library. This file bootstraps the plugin name and adds all the services to system on startup.")]),e._v(" "),a("h3",{attrs:{id:"adding-a-trigger"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-trigger"}},[e._v("#")]),e._v(" Adding a Trigger")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Implement "),a("code",[e._v("BaseTrigger")]),e._v(" This class will be used to transport the event data")])]),e._v(" "),a("li",[a("p",[e._v("Implement "),a("code",[e._v("BaseTriggerHandler")]),e._v(" This handles:")]),e._v(" "),a("ul",[a("li",[e._v("Describing the trigger to the main system.")]),e._v(" "),a("li",[e._v("Telling the main UI how to create/edit a recipe trigger using it.")]),e._v(" "),a("li",[e._v("The logic needed to see if a trigger is...triggered.")])]),e._v(" "),a("p",[e._v("You will see that "),a("code",[e._v("BaseTriggerHandler")]),e._v(" has 2 generic arguments, a "),a("code",[e._v("Data")]),e._v(" and "),a("code",[e._v("Parameters")]),e._v(" "),a("code",[e._v("Data")]),e._v(" is the trigger that that was detected, while "),a("code",[e._v("Parameters")]),e._v(" is the data from a Recipe to see if it triggers its actions.")])]),e._v(" "),a("li",[a("p",[e._v("Implement a Partial View (named as the same value as the property "),a("code",[e._v("ViewPartial")]),e._v(" in the "),a("code",[e._v("BaseTriggerHandler")]),e._v(" implementation)\nThis handles displaying the trigger settings in a recipe")])]),e._v(" "),a("li",[a("p",[e._v("Implement a Controller that allows a user to create/edit the necessary data to set the trigger on a recipe.")])])]),e._v(" "),a("h3",{attrs:{id:"adding-an-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-an-action"}},[e._v("#")]),e._v(" Adding an Action")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Implement "),a("code",[e._v("BaseActionHandler")]),e._v(" This handles:")]),e._v(" "),a("ul",[a("li",[e._v("Describing the action to the main system.")]),e._v(" "),a("li",[e._v("Telling the main UI how to create/edit a recipe action using it.")]),e._v(" "),a("li",[e._v("The logic needed to execute the action")])]),e._v(" "),a("p",[e._v("You will see that "),a("code",[e._v("BaseActionHandler")]),e._v(" has a generic argument, "),a("code",[e._v("Data")]),e._v(" "),a("code",[e._v("Data")]),e._v(" is the type of the action that holds the payload needed to exeucte the action through the instructions of recipe action")])]),e._v(" "),a("li",[a("p",[e._v("Implement a Partial View (named as the same value as the property "),a("code",[e._v("ViewPartial")]),e._v(" in the "),a("code",[e._v("BaseActionHandler")]),e._v(" implementation)\nThis handles displaying the action settings in a recipe")])]),e._v(" "),a("li",[a("p",[e._v("Implement a Controller that allows a user to create/edit the necessary data to set the action on a recipe.")])])]),e._v(" "),a("h3",{attrs:{id:"adding-an-external-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-an-external-service"}},[e._v("#")]),e._v(" Adding an External Service")]),e._v(" "),a("ul",[a("li",[e._v("Implement "),a("code",[e._v("BaseExternalService")]),e._v(" & "),a("code",[e._v("IExternalServiceDescriptor")])]),e._v(" "),a("li",[e._v("Implement a Partial View (named as the same value as the property "),a("code",[e._v("ViewPartial")]),e._v(" in the "),a("code",[e._v("IExternalServiceDescriptor")]),e._v(" implementation)")]),e._v(" "),a("li",[e._v("Implement a Controller that allows a user to create/edit the necessary data for an external service.")])])])}),[],!1,null,null,null);t.default=i.exports}}]);