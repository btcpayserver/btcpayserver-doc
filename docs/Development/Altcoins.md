# How to add an Altcoin

Bitcoin is the only focus of the BTCPay Server project and its core developers. However, opt-in integrations are available for several altcoins. For more information check the [Altcoin FAQ page](../FAQ/Altcoin.md).

## Overview

Altcoin integration requires two things:

1. **BTCPay Server plugin** - handles payment logic, wallet management, and UI
2. **Docker Compose fragment** - allows others to run your coin's node infrastructure alongside BTCPay Server

Do **not** modify BTCPay Server core. All new coins must be integrated as plugins.

## Create a BTCPay Server Plugin

Build a plugin that extends `BaseBTCPayServerPlugin`. Your plugin registers the coin's network, payment handler, and UI extensions with BTCPay Server.

Use the [Monero plugin](https://github.com/btcpay-monero/btcpayserver-monero-plugin) as your reference. Key files to study:

* [MoneroPlugin.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/blob/master/Plugins/Monero/MoneroPlugin.cs) - plugin entry point and service registration
* [MoneroLikePaymentMethodHandler.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Payments) - payment handling
* [MoneroListener.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Services) - transaction and block monitoring
* [MoneroLoadUpService.cs](https://github.com/btcpay-monero/btcpayserver-monero-plugin/tree/master/Plugins/Monero/Services) - wallet creation and loading via RPC

See the [Plugin Development docs](./Plugins.md) for general plugin guidance - project setup, UI extensions, database, and publishing.

## Create a Docker Compose Fragment

To allow users to deploy your coin's node alongside BTCPay Server, submit a PR to the [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) repository with the following components. See [Beldex PR #1042](https://github.com/btcpayserver/btcpayserver-docker/pull/1042) for a complete example.

### Docker image

Build and publish a Docker image for your coin's daemon and wallet RPC. Host it in your own Docker Hub or container registry - do not add your build to BTCPay's image build pipeline.

### Docker Compose fragment

Add a YAML file to `docker-compose-generator/docker-fragments/` that defines your coin's daemon and wallet RPC services. The fragment must pass the RPC URIs to BTCPay Server via environment variables so the plugin can connect.

Example: [monero.yml](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/docker-fragments/monero.yml)

### crypto-definitions.json

Add an entry for your coin in [`docker-compose-generator/crypto-definitions.json`](https://github.com/btcpayserver/btcpayserver-docker/blob/master/docker-compose-generator/crypto-definitions.json) so the docker-compose generator includes it.

### Optional extras

You may also include:

* **Expose fragment** (e.g. `opt-yourcoin-expose.yml`) - exposes RPC ports on localhost for debugging
* **Wallet CLI scripts** (e.g. `yourcoin-wallet-cli.sh`) - convenience wrappers for accessing the wallet CLI inside the container
* **Backup script changes** - add your coin's volumes to `btcpay-backup.sh`

## Publishing and Listing

Once your integration is ready:

1. **Publish your plugin** to the [BTCPay Plugin Builder](https://plugin-builder.btcpayserver.org/) so test users can install it from the BTCPay Server UI (they will need to run whatever fork of the BTCPay Server repo you developed your plugin on).
2. **Get your Docker PR merged** into [btcpayserver-docker](https://github.com/btcpayserver/btcpayserver-docker) so users can deploy your coin's node.
3. **Request listing** on the BTCPay Plugin Builder **only** once the Docker PR from the previous step is merged.

## FAQ

### How do I test my plugin locally?

Your plugin repo should include its own `docker-compose.yml` that spins up your coin's daemon (in regtest mode), wallet RPC, and the base BTCPay dependencies (bitcoind, nbxplorer, postgres). You then run BTCPay Server from your IDE with the plugin loaded via `DEBUG_PLUGINS`.

See the [Monero plugin's docker-compose.yml](https://github.com/btcpay-monero/btcpayserver-monero-plugin/blob/master/BTCPayServer.Plugins.IntegrationTests/docker-compose.yml) and its [Local Development Setup](https://github.com/btcpay-monero/btcpayserver-monero-plugin#local-development-setup) for the full workflow.

### How do I test the Docker fragment for production?

Install [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) and run:

```bash
BTCPAYGEN_CRYPTO1='YOUR-COIN'
BTCPAYGEN_SUBNAME='test'
cd docker-compose-generator/src
dotnet run
```

This generates your docker-compose in the `Generated` folder. Review it to verify your fragment was included correctly.

## Maintenance

BTCPay developers do not implement alternative coins on request. Adding a new coin depends entirely on the community and developers of those coins. BTCPay developers do not spend excessive time testing or maintaining altcoins. If you submit a PR, make sure your integration works. If it is not actively maintained, it will be removed.
