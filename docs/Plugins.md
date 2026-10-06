---
description: Learn how to find, use, and manage BTCPay Server plugins.
tags:
  - BTCPay Server
  - Plugins
---

# Plugins

Plugins add features to a BTCPay Server instance. They can provide new payment options, integrations, or tools for a store. Some features are included with BTCPay Server, while others are installed by the person who runs the server.

## Find and use plugins

Look under **Plugins** in your BTCPay Server sidebar for features available to you. What you see depends on the plugins installed on the server and the store you have selected. If a plugin you need is missing, ask your server administrator whether it can be installed or enabled for your store.

You can browse the [public plugin directory](https://plugin-builder.btcpayserver.org/public/plugins/) without installing anything. Open a plugin's page to read its description, author, supported BTCPay Server versions, source code link, and user reviews. A plugin listed in the directory is not necessarily installed on your server.

## Install or remove a plugin

Only a server administrator can manage installed plugins. If you are an administrator:

1. Open **Manage Plugins** in your BTCPay Server sidebar.
2. Find the plugin and check its author, documentation, source code, and compatibility with your BTCPay Server version.
3. Select **Install** and restart BTCPay Server if prompted. Some plugins need further setup before a store can use them.

To remove a plugin, return to **Manage Plugins**, find it among the installed plugins, and use its uninstall action. Restart the server if prompted. Check whether any stores rely on the plugin before removing it.

:::warning
Install plugins only from sources you trust. Plugins run inside the BTCPay Server process and can access server services and data. A listing in the public directory is not a security audit or endorsement by BTCPay Server. Review the plugin's source, maintainer, and compatibility before installing it, and keep a backup of your server.
:::

## Review a plugin

If you have used a plugin, you can help others evaluate it. Open the plugin's page in the [public plugin directory](https://plugin-builder.btcpayserver.org/public/plugins/), sign in to Plugin Builder, and select **Write a review**. Give a rating and describe your experience, including the version you used and any problems you encountered. Ratings and detailed reviews build a shared record of users' experiences and help others decide which plugins to trust. They do not replace checking a plugin's security or suitability for your server.

If you want to create a plugin, see the [plugin development guide](/Developers/plugins/).
